# 🌌 PLAGIX — Intelligent Plagiarism Detection Engine

> *Not just a plagiarism checker — a full-stack analytical system built for precision, performance, and premium user experience.*

---

## 🚀 Overview

**PLAGIX** is a modern, AI-inspired plagiarism detection platform that analyzes documents using **multiple mathematical models**, delivering accurate, explainable, and visually rich similarity reports.

It bridges the gap between:

* ⚙️ *Raw algorithmic detection*
* 🎨 *High-end interactive UI/UX*

---

## ✨ Key Highlights

* 🧠 **Multi-Engine Similarity System**

  * Cosine Similarity (TF-IDF)
  * Jaccard Similarity
  * Levenshtein Distance

* 🎯 **Sentence-Level Detection**

  * Pinpoints exact matching sentences
  * Highlights suspicious sections

* 📊 **Smart Report System**

  * Overall similarity score
  * Risk classification (Low / Medium / High / Critical)
  * GitHub-style diff comparison

* ⚡ **Real-Time UX**

  * Live feedback while typing
  * Smooth count-up animations
  * Interactive UI physics

* 🔐 **Auth + Usage Control**

  * Free usage limit
  * Login wall after threshold
  * Secure session handling

* 📁 **Multi-Format Support**

  * `.txt`, `.pdf`, `.docx`

---

## 🧠 How It Works

PLAGIX doesn't rely on a single metric — it combines multiple algorithms to produce a **weighted similarity score**:

```text
Final Score =
(0.5 × Cosine Similarity)
+ (0.3 × Jaccard Similarity)
+ (0.2 × Levenshtein Score)
```

### 🔍 Why this matters:

* Detects **copy-paste**
* Identifies **paraphrasing**
* Catches **minor edits and obfuscation**

---

## 🏗️ Tech Stack

### Backend

* 🐍 Flask (Python)
* 🗄️ SQLite + SQLAlchemy
* 🧠 Scikit-learn, NLTK, Levenshtein

### Frontend

* ⚡ Vanilla JavaScript (ES6+)
* 🎨 Pure CSS3 (Glassmorphism + Animations)
* 🧩 No heavy frameworks → maximum performance

### Security

* 🔐 Werkzeug Password Hashing (PBKDF2)

---

## 🎨 UI/UX Philosophy

PLAGIX is built like a **product, not a project**:

* 🌗 Dynamic Light/Dark sky themes
* ☁️ Cloud & 🌌 Star-based environment
* 🧲 Magnetic buttons & cursor interactions
* ✨ Micro-animations for feedback

> Every interaction is designed to feel *alive*.

---

## 🔄 Data Flow

1. User inputs text / uploads file
2. System checks usage quota
3. Backend runs similarity engine
4. JSON report returned
5. UI renders:

   * Score
   * Highlights
   * Diff view
6. Result stored in local history

---

## 📂 Project Structure

```
PLAGIX/
│
├── app.py              # Core backend logic
├── templates/
│   ├── index.html     # Landing page
│   ├── dashboard.html # Main workspace
│
├── static/
│   ├── style.css      # Design system
│   ├── script.js      # UI + interaction logic
│
└── database.db        # SQLite database
```

---

## 🧪 Example Use Cases

* 📚 Academic plagiarism detection
* 💻 Code similarity checking
* 📝 Content originality validation
* 🧠 NLP experimentation

---

## 🔥 What Makes PLAGIX Different

Unlike basic tools, PLAGIX:

* Combines **multiple similarity models**
* Provides **visual explanations**
* Includes **real-time interaction design**
* Feels like a **premium SaaS product**

---

## ⚡ Future Enhancements

* 🤖 Semantic similarity (transformers)
* 🌐 Web plagiarism detection
* 📄 PDF report export
* 👥 Multi-document comparison
* 🧬 Code AST-based detection

---

## Screenshot
<img width="400" height="300" alt="image" src="https://github.com/user-attachments/assets/a3bb9b7f-0f6a-4dfa-835c-9958af3151e9" />
<img width="400" height="300" alt="image" src="https://github.com/user-attachments/assets/3ace9e70-ab42-4351-950f-03fc30253769" />
<img width="400" height="300" alt="image" src="https://github.com/user-attachments/assets/5e8e0986-c81b-4b1c-b4cb-9ec3c78b92b0" />
<img width="400" height="300" alt="image" src="https://github.com/user-attachments/assets/fc1f0afb-c7a2-4eef-9f2d-58243cc7e5a3" />
<img width="400" height="300" alt="image" src="https://github.com/user-attachments/assets/284bfe72-9390-4e15-8cc5-736de8c01a4e" />

## 👨‍💻 Author

Built with precision and creativity by **[Plagix Team]**

---

## ⭐ Final Note

> PLAGIX is not just about detecting similarity —
> it's about understanding *how* and *why* content overlaps.

---

⭐ If you like this project, give it a star!
