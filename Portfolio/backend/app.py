import os
import pickle
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
import faiss
from groq import Groq
import prompt
from dotenv import load_dotenv

load_dotenv()

# ========================== APP CONFIG ==========================
app = Flask(__name__)
CORS(app)

embedding_folder = "embeddings"  # PKL files live here
os.makedirs(embedding_folder, exist_ok=True)

embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key)


# ========================== LOAD PRE-SAVED EMBEDDINGS ==========================
def initialize_embeddings():
    pkl_files = [f for f in os.listdir(embedding_folder) if f.endswith(".pkl")]
    
    if not pkl_files:
        raise RuntimeError("❌ No .pkl embeddings found inside /embeddings")

    all_vectors = []
    all_texts = []
    all_metadata = []

    for file in pkl_files:
        print(f"[LOADING] → {file}")
        with open(os.path.join(embedding_folder, file), "rb") as f:
            data = pickle.load(f)

        stored_index = data["index"]
        vectors = stored_index.reconstruct_n(0, stored_index.ntotal)

        all_vectors.append(vectors)
        all_texts += data["texts"]
        all_metadata += data["metadata"]

    all_vectors = np.vstack(all_vectors)
    index = faiss.IndexFlatL2(all_vectors.shape[1])
    index.add(all_vectors)

    print("🚀 Embeddings loaded successfully — NO recomputation")
    return {"index": index, "texts": all_texts, "metadata": all_metadata, "model": embedding_model}


print("🔄 Loading embeddings…")
docsearch = initialize_embeddings()
print("✅ Embeddings Ready")


# ========================== CHAT API ==========================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_query = data.get("query", "").strip()
    if not user_query:
        return jsonify({"error": "Empty query"}), 400

    # Retrieve relevant chunks
    query_vec = docsearch["model"].encode([user_query], convert_to_numpy=True)
    distances, indices = docsearch["index"].search(query_vec, 5)
    top_docs = [docsearch["texts"][i] for i in indices[0]]
    context = "\n\n".join(top_docs)

    # Generate answer
    chat_prompt = prompt.chat_prompt.replace("{context}", context).replace("{input}", user_query)
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a helpful assistant about Anushika Balamurgan."},
            {"role": "user", "content": chat_prompt},
        ],
    )
    answer = response.choices[0].message.content.strip()

    # Follow-up questions
    suggest_text = prompt.suggest_prompt.replace("{query}", user_query).replace("{answer}", answer)
    suggest_resp = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "Suggest short follow-up questions."},
            {"role": "user", "content": suggest_text},
        ],
    )
    suggestions = [s.strip() for s in suggest_resp.choices[0].message.content.split("\n")][:3]

    return jsonify({"response": answer, "suggestions": suggestions})


# ========================== DOWNLOAD RESUME ROUTE ==========================
@app.route("/download-resume")
def download_resume():
    return send_from_directory("data", "Anushika Resume.pdf", as_attachment=True)


# ========================== RUN (RENDER DEPLOY) ==========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
