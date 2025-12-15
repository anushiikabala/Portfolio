import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import faiss
from groq import Groq
import prompt
from dotenv import load_dotenv 
load_dotenv()   # ✅ ADD THIS
print("Loaded key starts with:", os.getenv("GROQ_API_KEY")[:8])


# ========================== CONFIG ==========================
app = Flask(__name__)
CORS(app)

embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
groq_api_key = os.getenv("GROQ_API_KEY")
client = Groq(api_key=groq_api_key)

@app.route("/")
def home():
    return jsonify({"status": "Backend running ✅"})


# ============ LOAD & EMBED PDFs (ONCE AT STARTUP) ============
def initialize_embeddings():
    docs_dir = "data"
    pdf_files = [f for f in os.listdir(docs_dir) if f.endswith(".pdf")]

    all_texts = []

    for pdf in pdf_files:
        print(f"[INFO] Processing {pdf}")
        file_path = os.path.join(docs_dir, pdf)

        loader = PyPDFLoader(file_path)
        documents = loader.load()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1500,
            chunk_overlap=200
        )
        chunks = splitter.split_documents(documents)

        all_texts.extend([doc.page_content for doc in chunks])

    print(f"[INFO] Total chunks: {len(all_texts)}")

    vectors = embedding_model.encode(
        all_texts,
        convert_to_numpy=True,
        batch_size=16
    )

    dim = vectors.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(vectors)

    print("🔥 Embeddings initialized ONCE")

    return {
        "index": index,
        "texts": all_texts,
        "model": embedding_model
    }


print("[INFO] Loading embeddings...")
docsearch = initialize_embeddings()
print("[INFO] Embeddings ready ✅")


# ========================== MAIN CHAT ==========================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_query = data.get("query", "").strip()

    if not user_query:
        return jsonify({"error": "Empty query"}), 400

    print("💬 Chat request received")

    query_vec = docsearch["model"].encode(
        [user_query],
        convert_to_numpy=True
    )

    _, indices = docsearch["index"].search(query_vec, 5)
    context = "\n\n".join(
        docsearch["texts"][i] for i in indices[0]
    )

    chat_prompt = (
        prompt.chat_prompt
        .replace("{context}", context)
        .replace("{input}", user_query)
    )

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant about Anushika Balamurgan."
            },
            {
                "role": "user",
                "content": chat_prompt
            },
        ],
        temperature=0.2,
    )

    bot_reply = response.choices[0].message.content.strip()

    # Follow-up suggestions
    suggest_text = (
        prompt.suggest_prompt
        .replace("{query}", user_query)
        .replace("{answer}", bot_reply)
    )

    suggestion_resp = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "Suggest concise follow-up questions."},
            {"role": "user", "content": suggest_text},
        ],
        temperature=0.4,
    )

    suggestions = [
        s.strip()
        for s in suggestion_resp.choices[0].message.content.split("\n")
        if s.strip()
    ][:3]

    return jsonify({
        "response": bot_reply,
        "suggestions": suggestions
    })


# ========================== RESUME DOWNLOAD ==========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route("/download-resume", methods=["GET"])
def download_resume():
    return send_from_directory(
        os.path.join(BASE_DIR, "data"),
        "Anushika Resume.pdf",
        as_attachment=True
    )



# ========================== RUN ==========================
if __name__ == "__main__":
    app.run(debug=True)
