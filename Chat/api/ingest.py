from sentence_transformers import SentenceTransformer
import chromadb
import os
import sys
from pathlib import Path

# Importar el extractor de datos
from extract_data import generate_all_chunks

def main():
    print("🤖 Generando base de datos vectorial desde CV y web...")
    print("=" * 60)
    
    # 1. Generar chunks automáticamente
    print("\n📊 Extrayendo información...")
    chunks = generate_all_chunks()
    
    if not chunks:
        print("❌ No se pudieron extraer chunks. Verifica los archivos fuente.")
        sys.exit(1)
    
    print(f"✅ {len(chunks)} chunks generados")
    
    # 2. Modelo de embeddings (LIGERO)
    print("\n📦 Cargando modelo de embeddings...")
    model = SentenceTransformer("all-MiniLM-L6-v2")
    
    # 3. Base vectorial local
    persist_dir = "./chroma_db"
    os.makedirs(persist_dir, exist_ok=True)
    
    print(f"\n🗄️  Inicializando ChromaDB en {persist_dir}...")
    client = chromadb.PersistentClient(path=persist_dir)
    
    # Eliminar colección si existe para recrearla
    try:
        client.delete_collection("portfolio")
        print("🗑️  Colección anterior eliminada")
    except:
        pass
    
    collection = client.create_collection("portfolio")
    
    # 4. Crear embeddings
    print("\n🔄 Generando embeddings...")
    embeddings = model.encode(chunks)
    
    collection.add(
        documents=chunks,
        embeddings=embeddings.tolist(),
        ids=[f"chunk_{i}" for i in range(len(chunks))]
    )
    
    print("\n" + "=" * 60)
    print(f"✅ Base vectorial creada con {len(chunks)} documentos")
    print(f"📍 Ubicación: {os.path.abspath(persist_dir)}")
    print("\n📝 Primeros 3 chunks almacenados:")
    for i, chunk in enumerate(chunks[:3], 1):
        print(f"  {i}. {chunk[:80]}...")
    print("=" * 60)

if __name__ == "__main__":
    main()

