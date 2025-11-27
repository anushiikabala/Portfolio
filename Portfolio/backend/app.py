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

EMBED_DIR = "embeddings"   # 🔥 Folder containing PKL files
MODEL = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

groq_api = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api)


# ========================== LOAD EMBEDDINGS ==========================
def initialize_embeddings():
    pkl_files = [f for f in os.listdir(EMBED_DIR) if f.endswith(".pkl")]

    if not pkl_files:
        raise RuntimeError("❌ No .pkl embeddings found inside /embeddings — upload required.")

    all_vectors = []
    all_texts = []
    all_metadata = []

    print("\n====== 🔥 Loading FAISS Embeddings from PKL ======\n")
    for file in pkl_files:
        print(f"[LOAD] {file}")
        with open(os.path.join(EMBED_DIR, file), "rb") as f:
            data = pickle.load(f)   # contains index + text + metadata

        index = data["index"]                      # Extract FAISS index
        dim = index.d                              # read dimension
        vectors = np.zeros((index.ntotal, dim))    # allocate array
        index.reconstruct_n(0, index.ntotal, vectors)  # 🔥 PROPER reconstruct

        all_vectors.append(vectors)
        all_texts += data["texts"]
        all_metadata += data["metadata"]

    # Merge everything for unified querying
    all_vectors = np.vstack(all_vectors)
    final_index = faiss.IndexFlatL2(all_vectors.shape[1])
    final_index.add(all_vectors)

    print("\n🚀 Embeddings loaded successfully — NO RECOMPUTATION\n")
    return {"index": final_index, "texts": all_texts, "metadata": all_metadata, "model": MODEL}


print("🔄 Loading embeddings…")
docsearch = initialize_embeddings()
print("✅ Ready for Chat!\n")


# ========================== CHAT ENDPOINT ==========================
@app.route("/chat", methods=["POST"])
def chat():
    user_query = request.json.get("query", "").strip()
    if not user_query:
        return jsonify({"error": "Empty query"}), 400

    # Retrieve chunks
    q_vec = docsearch["model"].encode([user_query], convert_to_numpy=True)
    distances, indices = docsearch["index"].search(q_vec, 5)

    context = "\n\n".join(docsearch["texts"][i] for i in indices[0])

    # Main answer
    chat_prompt = prompt.chat_prompt.replace("{context}", context).replace("{input}", user_query)
    res = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You assist with information about Anushika Balamurgan."},
            {"role": "user", "content": chat_prompt},
        ],
    )
    answer = res.choices[0].message.content.strip()

    # Follow-up questions
    suggest_text = prompt.suggest_prompt.replace("{query}", user_query).replace("{answer}", answer)
    sug = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": suggest_text}],
    )
    suggestions = [s.strip() for s in sug.choices[0].message.content.split("\n")][:3]

    return jsonify({"response": answer, "suggestions": suggestions})


# ========================== RESUME DOWNLOAD ==========================
@app.route("/download-resume")
def download_resume():
    return send_from_directory("data", "Anushika Resume.pdf", as_attachment=True)


# ========================== RENDER SERVER ==========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
