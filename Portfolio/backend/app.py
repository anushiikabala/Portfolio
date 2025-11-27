import os
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import faiss
from groq import Groq
import prompt
from flask import send_from_directory
import os
from dotenv import load_dotenv
load_dotenv()
# ========================== CONFIG ==========================
app = Flask(__name__)
CORS(app)
embedding_folder = "embeddings"
os.makedirs(embedding_folder, exist_ok=True)
embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

groq_api_key = os.getenv("GROQ_API_KEY")  # now env loads correctly 🚀


client = Groq(
    api_key=groq_api_key
)



# ============ LOAD AND EMBED 2 RESUME PDFs ============
def initialize_embeddings():
    docs_dir = "data"
    pdf_files = [f for f in os.listdir(docs_dir) if f.endswith(".pdf")]
    all_texts, all_metadata = [], []

    for pdf in pdf_files:
        file_path = os.path.join(docs_dir, pdf)
        file_name = os.path.splitext(pdf)[0]
        faiss_index_path = os.path.join(embedding_folder, f"{file_name}.pkl")

        if os.path.exists(faiss_index_path):
            print(f"[INFO] Using existing embeddings for {pdf}")
            with open(faiss_index_path, "rb") as f:
                data = pickle.load(f)
            all_texts.extend(data["texts"])
            all_metadata.extend(data["metadata"])
        else:
            print(f"[INFO] Creating embeddings for {pdf}...")
            loader = PyPDFLoader(file_path)
            documents = loader.load()
            splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=200)
            chunks = splitter.split_documents(documents)

            texts = [doc.page_content for doc in chunks]
            metadata = [doc.metadata for doc in chunks]
            vectors = embedding_model.encode(texts, convert_to_numpy=True)

            dim = vectors.shape[1]
            index = faiss.IndexFlatL2(dim)
            index.add(vectors)

            data = {"index": index, "texts": texts, "metadata": metadata, "model": embedding_model}
            with open(faiss_index_path, "wb") as f:
                pickle.dump(data, f)

            all_texts.extend(texts)
            all_metadata.extend(metadata)

    all_vectors = embedding_model.encode(all_texts, convert_to_numpy=True)
    dim = all_vectors.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(all_vectors)

    return {"index": index, "texts": all_texts, "metadata": all_metadata, "model": embedding_model}


print("[INFO] Loading embeddings...")
docsearch = initialize_embeddings()
print("[INFO] Embeddings ready ✅")

client = Groq(api_key=groq_api_key)


# ========================== MAIN CHAT ==========================
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

    # ----- Generate main answer -----
    chat_prompt = prompt.chat_prompt.replace("{context}", context).replace("{input}", user_query)
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a helpful assistant about Anushika Balamurgan."},
            {"role": "user", "content": chat_prompt},
        ],
    )
    bot_reply = response.choices[0].message.content.strip()

    # ----- Generate follow-up questions -----
    suggest_text = prompt.suggest_prompt.replace("{query}", user_query).replace("{answer}", bot_reply)
    suggestion_resp = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a helpful AI that suggests concise follow-up questions."},
            {"role": "user", "content": suggest_text},
        ],
        temperature=0.4,
    )
    suggestions_raw = suggestion_resp.choices[0].message.content.strip()
    suggestions = [s.strip() for s in suggestions_raw.split("\n") if s.strip()][:3]

    return jsonify({"response": bot_reply, "suggestions": suggestions})



# ========================== RESUME DOWNLOAD ==========================
@app.route('/download-resume', methods=['GET'])
def download_resume():
    resume_path = os.path.join("data", "Anushika Resume.pdf")
    return send_from_directory(
        directory=os.path.dirname(resume_path),
        path=os.path.basename(resume_path),
        as_attachment=True
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))   # Railway gives automatic port
    app.run(host="0.0.0.0", port=port)


