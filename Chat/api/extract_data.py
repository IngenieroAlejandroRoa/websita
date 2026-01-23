"""
Extractor de datos del CV y LanguageContext para alimentar la base vectorial
"""
import re
import json
from pathlib import Path

def extract_from_tex(tex_path):
    """Extrae información estructurada de un CV en LaTeX"""
    with open(tex_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    chunks = []
    
    # Extraer nombre
    name_match = re.search(r'\\name{([^}]+)}', content)
    if name_match:
        name = name_match.group(1)
        chunks.append(f"Nombre completo: {name}")
    
    # Extraer email
    emails = re.findall(r'\\href{mailto:([^}]+)}', content)
    if emails:
        chunks.append(f"Contacto profesional: Email {', '.join(emails)}")
    
    # Extraer teléfono
    phone_match = re.search(r'{(\+\d+\s*\d+)}', content)
    if phone_match:
        chunks.append(f"Teléfono: {phone_match.group(1)}")
    
    # Extraer enlaces
    github = re.search(r'\\faGithub~\\href{([^}]+)}', content)
    if github:
        chunks.append(f"GitHub: {github.group(1)}")
    
    linkedin = re.search(r'\\faLinkedin~\\href{([^}]+)}', content)
    if linkedin:
        chunks.append(f"LinkedIn: {linkedin.group(1)}")
    
    website = re.search(r'\\faGlobe~\\href{([^}]+)}', content)
    if website:
        chunks.append(f"Portafolio web: {website.group(1)}")
    
    # Extraer perfil
    profile_section = re.search(r'\\cvsection{(?:Profile|Perfil)}(.*?)\\cvsection', content, re.DOTALL)
    if profile_section:
        profile_items = re.findall(r'\\cvitem{([^}]+)}', profile_section.group(1))
        if profile_items:
            chunks.append("Perfil profesional: " + " ".join(profile_items))
    
    # Extraer educación
    education_section = re.search(r'\\cvsection{(?:Education|Educación)}(.*?)\\cvsection', content, re.DOTALL)
    if education_section:
        events = re.findall(r'\\cvevent{([^}]+)}{([^}]+)}\s*{([^}]+)}{([^}]*)}', education_section.group(1))
        for period, degree, institution, location in events:
            edu_text = f"Educación: {degree} en {institution}"
            if location:
                edu_text += f", {location}"
            edu_text += f" ({period})"
            chunks.append(edu_text)
        
        # Proyecto de grado
        project_match = re.search(r'Proyecto de grado:\s*([^\\]+)', education_section.group(1))
        if not project_match:
            project_match = re.search(r'Degree Project:\s*([^\\]+)', education_section.group(1))
        if project_match:
            chunks.append(f"Proyecto de grado: {project_match.group(1).strip()}")
    
    # Extraer experiencia laboral
    work_section = re.search(r'\\cvsection{(?:Work Experience|Experiencia Laboral)}(.*?)\\cvsection', content, re.DOTALL)
    if work_section:
        events = re.findall(r'\\cvevent{([^}]+)}{([^}]+)}\s*{([^}]+)}{([^}]*)}.*?\\cvitem{([^}]+)}', work_section.group(1), re.DOTALL)
        for period, title, company, location, description in events:
            work_text = f"Experiencia: {title} en {company}"
            if location:
                work_text += f", {location}"
            work_text += f" ({period}). {description}"
            chunks.append(work_text)
    
    # Extraer habilidades técnicas
    skills_section = re.search(r'\\cvsection{(?:Technical Skills|Habilidades Técnicas)}(.*?)\\cvsection', content, re.DOTALL)
    if skills_section:
        skills = re.findall(r'\\cvskill{([^}]+)}', skills_section.group(1))
        if skills:
            chunks.append("Habilidades técnicas: " + ", ".join(skills))
    
    # Extraer proyectos destacados
    projects_section = re.search(r'\\cvsection{(?:Featured Projects|Proyectos Destacados)}(.*?)\\cvsection', content, re.DOTALL)
    if projects_section:
        # Buscar bloques de proyectos
        project_blocks = re.findall(r'\\cvitem{\\textbf{([^}]+)}\\newblock\s*([^}]+)}', projects_section.group(1), re.DOTALL)
        for title, description in project_blocks:
            # Limpiar el texto
            description = re.sub(r'\\newblock\s*', ' ', description)
            description = re.sub(r'\\fa\w+~\\href{[^}]+}{[^}]+}', '', description)
            chunks.append(f"Proyecto destacado: {title}. {description.strip()}")
    
    # Extraer idiomas
    lang_section = re.search(r'\\cvsection{(?:Languages|Idiomas)}.*?\\cvlangitem{([^}]+)}{([^}]+)}', content, re.DOTALL)
    if lang_section:
        chunks.append(f"Idiomas: {lang_section.group(1)}, {lang_section.group(2)}")
    
    # Extraer competencias
    comp_section = re.search(r'\\cvsection{(?:Competitions|Competencias)}.*?\\cvitem{([^}]+)}', content, re.DOTALL)
    if comp_section:
        comp_text = comp_section.group(1)
        # Buscar lista de competencias
        competitions = re.findall(r'\\faCheckCircle}~([^\\]+)', content)
        if competitions:
            chunks.append("Competencias y hackatones: " + ", ".join([c.strip() for c in competitions]))
    
    return chunks


def extract_from_language_context(tsx_path):
    """Extrae información del LanguageContext.tsx"""
    with open(tsx_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    chunks = []
    
    # Extraer traducciones en español e inglés
    translations = {}
    
    # Buscar secciones de traducción
    es_section = re.search(r"es:\s*{(.*?)}\s*};", content, re.DOTALL)
    en_section = re.search(r"en:\s*{(.*?)},\s*es:", content, re.DOTALL)
    
    for lang, section in [('es', es_section), ('en', en_section)]:
        if section:
            # Extraer pares clave-valor
            pairs = re.findall(r"'([^']+)':\s*'([^']+)'", section.group(1))
            translations[lang] = dict(pairs)
    
    # Generar chunks de información importante
    if 'es' in translations:
        t = translations['es']
        
        # Hero/Perfil
        if 'hero.focus' in t:
            chunks.append(f"Enfoque profesional: {t['hero.focus']}")
        
        # About
        if 'about.description' in t:
            chunks.append(f"Sobre Alejandro: {t['about.description']}")
        
        # Servicios
        services = [v for k, v in t.items() if k.startswith('contact.service')]
        if services:
            chunks.append(f"Servicios que ofrece: {', '.join(services)}")
        
        # Proyectos destacados
        if 'featured.shortcircuit.desc' in t:
            chunks.append(f"Proyecto Corto Circuito: {t['featured.shortcircuit.desc']}")
        
        if 'featured.angelrobot.desc' in t:
            chunks.append(f"Proyecto Robot Angel: {t['featured.angelrobot.desc']}")
    
    return chunks


def generate_all_chunks():
    """Genera todos los chunks desde CV y LanguageContext"""
    # Rutas dentro del contenedor Docker
    cv_base = Path("/app/cv_data")
    web_base = Path("/app/web_data")
    
    chunks = []
    
    # Extraer de CV en español
    cv_es_path = cv_base / "Spanish" / "cv.tex"
    if cv_es_path.exists():
        print(f"📄 Extrayendo de CV Español...")
        chunks.extend(extract_from_tex(cv_es_path))
    else:
        print(f"⚠️  No se encontró {cv_es_path}")
    
    # Extraer de CV en inglés
    cv_en_path = cv_base / "English" / "cv.tex"
    if cv_en_path.exists():
        print(f"📄 Extrayendo de CV Inglés...")
        chunks.extend(extract_from_tex(cv_en_path))
    else:
        print(f"⚠️  No se encontró {cv_en_path}")
    
    # Extraer de LanguageContext
    lang_context_path = web_base / "LanguageContext.tsx"
    if lang_context_path.exists():
        print(f"📄 Extrayendo de LanguageContext...")
        chunks.extend(extract_from_language_context(lang_context_path))
    else:
        print(f"⚠️  No se encontró {lang_context_path}")
    
    # Eliminar duplicados manteniendo orden
    seen = set()
    unique_chunks = []
    for chunk in chunks:
        chunk_lower = chunk.lower()
        if chunk_lower not in seen:
            seen.add(chunk_lower)
            unique_chunks.append(chunk)
    
    return unique_chunks


if __name__ == "__main__":
    chunks = generate_all_chunks()
    print(f"\n✅ {len(chunks)} chunks extraídos")
    print("\nPrimeros 5 chunks:")
    for i, chunk in enumerate(chunks[:5], 1):
        print(f"{i}. {chunk[:100]}...")
