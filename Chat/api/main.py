from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chromadb
import requests
from sentence_transformers import SentenceTransformer
import os

app = FastAPI()

# CORS para permitir conexión desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Embeddings
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Vector DB
client = chromadb.PersistentClient(path="./chroma_db")
try:
    collection = client.get_collection("portfolio")
except:
    collection = None

class ChatRequest(BaseModel):
    question: str

SYSTEM_PROMPT = """
Eres el asistente del portafolio de Alejandro Roa.
Responde SOLO con la información proporcionada.
Si no hay información suficiente, responde:
"No tengo información sobre eso."
"""

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "collection_ready": collection is not None,
        "ollama_host": os.getenv("OLLAMA_HOST", "http://ollama:11434")
    }

@app.post("/chat")
async def chat(request: ChatRequest):
    if not collection:
        raise HTTPException(status_code=500, detail="Base de datos vectorial no inicializada. Ejecuta ingest.py primero.")
    
    try:
        # 1. Vectorizar pregunta
        query_embedding = embedder.encode([request.question])

        # 2. Buscar chunks relevantes
        results = collection.query(
            query_embeddings=query_embedding.tolist(),
            n_results=3
        )

        context = "\n".join(results["documents"][0]) if results["documents"] else ""

        # 3. Llamar al LLM (usa variable de entorno)
        ollama_host = os.getenv("OLLAMA_HOST", "http://ollama:11434")
        response = requests.post(
            f"{ollama_host}/api/generate",
            json={
                "model": "llama3:8b-instruct-q4_0",
                "prompt": f"""
{SYSTEM_PROMPT}

Contexto:
{context}

Pregunta:
{request.question}
""",
                "stream": False,
                "options": {
                    "num_predict": 256,
                    "temperature": 0.2
                }
            },
            timeout=60
        )
        response.raise_for_status()
        
        return {"answer": response.json()["response"]}
    
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=503, detail=f"Error al conectar con Ollama: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
