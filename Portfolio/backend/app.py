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

# ========================== CONFIG ==========================
app = Flask(__name__)
CORS(app)

EMBED_DIR = "embeddings"     # already contains .pkl files
MODEL = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key)


# ======================= LOAD EXISTING PKL ONLY =======================
def load_embeddings():
    files = [f for f in os.listdir(EMBED_DIR) if f.endswith(".pkl")]
    if not files:
        raise RuntimeError("❌ No embeddings found — upload .pkl files inside /embeddings")

    all_vec, all_texts, all_meta = [], [], []

    for file in files:
        print(f"📌 Loading {file} ...")
        with open(os.path.join(EMBED_DIR, file), "rb") as f:
            data = pickle.load(f)

        idx = data["index"]
        vectors = idx.reconstruct_n(0, idx.ntotal)

        all_vec.append(vectors)
        all_texts += data["texts"]
        all_meta += data["metadata"]

    all_vec = np.vstack(all_vec)
    index = faiss.IndexFlatL2(all_vec.shape[1])
    index.add(all_vec)

    print("🔥 FAISS Ready — No recomputation!")
    return {"index": index, "texts": all_texts, "meta": all_meta, "model": MODEL}


VECTOR_DB = load_embeddings()


# ============================ CHAT ROUTE ============================
@app.route("/chat", methods=["POST"])
def chat():
    q = request.json.get("query", "").strip()
    if not q:
        return jsonify({"error": "Empty input"}), 400

    q_vec = VECTOR_DB["model"].encode([q], convert_to_numpy=True)
    _, ids = VECTOR_DB["index"].search(q_vec, 5)
    context = "\n\n".join([VECTOR_DB["texts"][i] for i in ids[0]])

    prompt_text = prompt.chat_prompt.replace("{context}", context).replace("{input}", q)
    resp = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You speak about Anushika Balamurgan professionally."},
            {"role": "user", "content": prompt_text},
        ],
    ).choices[0].message.content

    return jsonify({"response": resp})


# ============================ PDF DOWNLOAD ============================
@app.route("/download-resume")
def download_resume():
    return send_from_directory("data", "Anushika Resume.pdf", as_attachment=True)


# ============================ RENDER START ============================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
