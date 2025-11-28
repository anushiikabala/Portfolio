import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import numpy as np
import faiss
from groq import Groq
import prompt
from dotenv import load_dotenv

load_dotenv()

# ================================= CONFIG =================================
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": [
    "https://portfolio-anushika.vercel.app",
    "http://localhost:3000"
]}})

PDF_DIR = "data"
MODEL = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2", device="cpu")

groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key)


# ============================ INT8 OPTIMIZED INDEX ============================
def create_int8_faiss(vectors):
    d = vectors.shape[1]

    # IVF index (coarse clusters → faster & lighter)
    nlist = 25  # cluster count
    quantizer = faiss.IndexFlatL2(d)
    index = faiss.IndexIVFFlat(quantizer, d, nlist, faiss.METRIC_L2)

    # train IVF clusters
    index.train(vectors)

    # product quantization → INT8
    pq_m = 32  # lower = more compression
    index = faiss.IndexIVFPQ(quantizer, d, nlist, pq_m, 8)  # 8-bit compression

    index.train(vectors)
    index.add(vectors)

    return index


# ============================ BUILD VECTOR STORE ============================
def load_pdfs_embeddings():
    all_chunks = []

    for pdf in os.listdir(PDF_DIR):
        if pdf.endswith(".pdf"):
            print(f"📄 Processing {pdf}")

            docs = PyPDFLoader(os.path.join(PDF_DIR, pdf)).load()
            splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            chunks = splitter.split_documents(docs)

            all_chunks.extend([c.page_content for c in chunks])

    print(f"🔹 Total Chunks: {len(all_chunks)} — generating embeddings...")

    vectors = MODEL.encode(all_chunks, convert_to_numpy=True, batch_size=12)

    print(f"🔹 Creating INT8 FAISS index (Low RAM mode ON)...")
    index = create_int8_faiss(vectors)

    print("🔥 FAISS Index Ready (INT8 compressed & optimized)")

    return {
        "index": index,
        "texts": all_chunks
    }


DB = load_pdfs_embeddings()


# ============================== /chat =======================================
@app.route("/chat", methods=["POST"])
def chat():
    q = request.json.get("query", "").strip()
    if not q:
        return jsonify({"error": "Query is required"}), 400

    q_vec = MODEL.encode([q], convert_to_numpy=True)

    # search top 5 docs
    DB["index"].nprobe = 8  # search depth control
    _, idx = DB["index"].search(q_vec, 5)

    context = "\n\n".join(DB["texts"][i] for i in idx[0])

    filled_prompt = prompt.chat_prompt.replace("{context}", context).replace("{input}", q)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a helpful assistant about Anushika Balamurgan."},
            {"role": "user", "content": filled_prompt},
        ],
    ).choices[0].message.content.strip()

    return jsonify({"response": response})


# ========================== DOWNLOAD RESUME ==========================
@app.route("/download-resume")
def download_resume():
    return send_from_directory("data", "Anushika Resume.pdf", as_attachment=True)


# ========================== RUN ==========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=False)
