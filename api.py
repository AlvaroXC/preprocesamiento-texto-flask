from flask import Flask, request, jsonify
from collections import Counter
import Levenshtein


app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>Hello world</h1>"

@app.route('/api/preprocess-text', methods=['POST'])
def preprocess_text():
    data_json = request.get_json()
    text = data_json['text']
    deteced_language = detect_language(text)
    corrected_text = correct_text(text, dictionary)

    return jsonify({
        'language': deteced_language,
        'corrected text': corrected_text
    })


def generate_ngrams(text, n=3):
    text = text.lower()
    text = ''.join([c for c in text if c.isalpha() or c.isspace()])
    ngrams = [text[i:i+n] for i in range(len(text)-n+1)]
    return Counter(ngrams)

# Modelos de n-gramas preentrenados (ejemplo simplificado)
language_profiles = {
    'es': generate_ngrams("hola cómo estás amigo este es un ejemplo en español", n=3),
    'en': generate_ngrams("hello how are you friend this is an example in english", n=3),
    'fr': generate_ngrams("bonjour comment ça va ami ceci est un exemple en français", n=3),
}

# Función para calcular la proporción
def proportion_similarity(profile1, profile2):
    intersection = set(profile1.keys()) & set(profile2.keys())
    matches = sum(profile1[ngram] for ngram in intersection)
    total = sum(profile1.values())
    return matches / total if total > 0 else 0.0

# Función para detectar el idioma
def detect_language(text):
    text_profile = generate_ngrams(text, n=3)
    similarities = {lang: proportion_similarity(text_profile, profile) for lang, profile in language_profiles.items()}
    detected_language = max(similarities, key=similarities.get)
    return detected_language, similarities


# Diccionario de palabras (ejemplo simplificado)
dictionary = ["hola", "mundo", "python", "código", "inteligencia", "artificial", "prueba"]


# Función para encontrar la palabra más cercana en el diccionario
def correct_word(word, dictionary):
    min_distance = float('inf')
    corrected_word = word

    for dict_word in dictionary:
        distance = Levenshtein.distance(word, dict_word)
        if distance < min_distance:
            min_distance = distance
            corrected_word = dict_word

    return corrected_word


# Función principal para corregir un texto
def correct_text(text, dictionary):
    words = text.split()
    corrected_words = [correct_word(word, dictionary) for word in words]
    return " ".join(corrected_words)


if __name__ == '__main__':
    app.run(debug=True)
