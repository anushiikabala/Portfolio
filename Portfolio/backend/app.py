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

CORS(app,
    resources={r"/*": {"origins": [
        "https://portfolio-anushika.vercel.app",
        "http://localhost:3000"
    ]}},
    supports_credentials=True,
    allow_headers=["Content-Type"],
    expose_headers=["Content-Type"],
    methods=["GET", "POST", "OPTIONS"]
)

EMBED_DIR = "embeddings"     # already contains .pkl files
MODEL = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key)


# ======================= LOAD EXISTING PKL ONLY =======================
def load_embeddings():
    files = [f for f in os.listdir(EMBED_DIR) if f.endswith(".pkl")]
    if not files:
        raise RuntimeError("❌ No embeddings found")

    merged_vectors = []
    merged_texts = []

    for file in files:
        print(f"📌 Loading {file}")
        with open(os.path.join(EMBED_DIR, file), "rb") as f:
            data = pickle.load(f)

        index = data["index"]
        vecs = index.reconstruct_n(0, index.ntotal)

        merged_vectors.append(vecs)
        merged_texts.extend(data["texts"])

    merged_vectors = np.vstack(merged_vectors)

    faiss_index = faiss.IndexFlatL2(merged_vectors.shape[1])
    faiss_index.add(merged_vectors)

    return {
        "index": faiss_index,
        "texts": merged_texts,
        "model": SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2", device="cpu")  # stays minimal
    }


VECTOR_DB = load_embeddings()


# ============================ CHAT ROUTE ============================
@app.route("/chat", methods=["POST"])
def chat():
    try:
        print("🔥 /chat HIT — Request Received")

        data = request.get_json()
        print("📩 Incoming:", data)

        query = data.get("query", "").strip()

        if not query:
            return jsonify({"error": "Empty query"}), 400
        
        q_vec = VECTOR_DB["model"].encode([query], convert_to_numpy=True)
        _, ids = VECTOR_DB["index"].search(q_vec, 5)
        context = "\n\n".join([VECTOR_DB["texts"][i] for i in ids[0]])

        prompt_text = prompt.chat_prompt.replace("{context}", context).replace("{input}", query)

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You speak about Anushika Balamurgan professionally."},
                {"role": "user", "content": prompt_text}
            ],
        )

        result = response.choices[0].message.content
        print("🤖 Response Generated")

        return jsonify({"response": result})

    except Exception as e:
        print("❌ ERROR IN /chat:", e)
        return jsonify({"error": str(e)}), 500


# ============================ PDF DOWNLOAD ============================
@app.route("/download-resume")
def download_resume():
    return send_from_directory("data", "Anushika Resume.pdf", as_attachment=True)


# ============================ RENDER START ============================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
