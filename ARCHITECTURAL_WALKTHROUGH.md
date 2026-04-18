# PLAGIX | Technical Architecture & Logic Documentation

This document provides a comprehensive deep dive into the **PLAGIX** plagiarism detection ecosystem, covering the full stack from the mathematical similarity engine to the interaction physics of the user interface.

---

## 🚀 1. Technology Stack
PLAGIX is built as a high-performance, AI-driven SaaS platform using a modern Python-centic stack.

*   **Backend Framework**: Flask (Python)
*   **Database & ORM**: SQLite + Flask-SQLAlchemy (Relational persistence)
*   **Mathematical Processing**: 
    *   `Scikit-learn`: TF-IDF Vectorization & Cosine Similarity
    *   `NLTK`: Natural Language Processing (Tokenization, Stopword removal)
    *   `Levenshtein`: Fuzzy string matching
*   **Security**: `Werkzeug` (Salted PBKDF2 Password Hashing)
*   **Frontend**: Vanilla ES6+ Javascript (No heavy frameworks for maximum performance)
*   **UI/UX Engine**: Pure CSS3 (Glassmorphism, Flexbox, Variable-driven theming)

---

## 🧠 2. Backend Logic (app.py)

### Identity & Security Functions
*   **`User` Model**: A SQLAlchemy class representing the registered identities. Stores `email` and `password_hash`.
*   **`api_signup()`**: Handles new user registration. It hashes passwords using `generate_password_hash` to ensure data remains secure even if the database is compromised.
*   **`api_login()`**: Verifies credentials by comparing hashes using `check_password_hash`. On success, sets `session['logged_in'] = True`.
*   **`logout()`**: Destroys the current session and resets the user's interface state.

### Document Extraction Engine (`extract_text`)
PLAGIX handles multiple file formats by utilizing specific parser libraries:
*   **PDF Parsing (`PyPDF2`)**: Iterates through PDF byte streams, extracting textual layers from every page.
*   **DOCX Parsing (`python-docx`)**: Reads XML-based word structures to extract paragraphs and sequences.
*   **Plain Text**: Decodes raw byte streams using UTF-8 with error handling for edge-case characters.

### The Intelligence Engine (`get_similarity_report`)
This is the core of PLAGIX. It doesn't just check for "matching words"; it analyzes the text through three distinct mathematical lenses:

1.  **Cosine Similarity (`cosine_sim`)**: 
    *   **Logic**: Converts text into high-dimensional vectors (TF-IDF). It measures the *angle* between these vectors. 
    *   **Strength**: Detects paraphrasing and structural theft where words are changed but the "meaning" or "vector weight" remains similar.
2.  **Jaccard Similarity**: 
    *   **Logic**: Measures the intersection over union of word sets.
    *   **Strength**: Excellent for detecting direct "Copy-Paste" scenarios and word overlap.
3.  **Levenshtein Distance**: 
    *   **Logic**: Calculates the minimum edit operations (insertions/deletions) to transform Text A into Text B.
    *   **Strength**: Great for identifying minor character-level tweaks and typos meant to bypass checkers.

### Advanced NLP Sub-functions
*   **`get_sentence_level_similarity`**: Breaks the document into individual sentences and runs a focused similarity check on each. This highlights specific "plagiarized sentences" in the UI.
*   **`get_exact_matched_phrases`**: Uses an N-gram sliding window (default 5 words) to find contiguous strings of identical text—the hallmark of unoriginal work.

---

## 🎨 3. Frontend Physics (script.js)

### Interaction Layer
*   **`initInteractions()`**: Powers the "Living Interface".
    *   **Mouse Glow**: A `radial-gradient` follows the cursor with high-frequency interpolation (0.15 dampening) for a glassy, modern feel.
    *   **Magnetic Buttons**: Uses `getBoundingClientRect` to calculate the distance between the cursor and button center, applying a 30% attraction force for kinetic feedback.
    *   **Card Tilt**: Applies 3D perspective rotations based on cursor entry position, giving the dashboard depth.

### Navigation Router
*   **`navLinks.forEach()` Router**: A client-side "Single Page" router. It toggles visibility between `view-compare`, `view-history`, and `view-documents` by manipulating the DOM `display` property without page reloads.

### Data Processing
*   **`processFiles()`**: Handles drag-and-drop or manual file uploads. It utilizes the `/extract_text` endpoint to convert PDF/DOCX content into raw analysis-ready strings.
*   **`runSmartAnalysis()`**: The primary pipeline. It sends text to the backend, parses the multi-metric response, and triggers the "Count Up" animations for the scores.

---

## 📊 4. Data Flow & Quota Logic
1.  **Ingestion**: User pastes text or drops a file.
2.  **Quota Guard**: If the user is unauthenticated, `calculate()` checks `session['usage_count']`. If it exceeds 10, it triggers the Login Wall.
3.  **Analysis**: The backend executes the mathematical matrix and returns a JSON report containing:
    *   `overall_score`: A weighted average of all metrics.
    *   `risk`: A human-readable assessment (Critical/High/Low) based on internal thresholds.
    *   `diff`: A GitHub-style HTML table showing side-by-side color-coded changes.
4.  **Persistence**: The frontend `renderHistory()` function saves the results to `localStorage` (Workspace Cache) so the user can view previous scans without re-running them.

---

## 📂 5. File Anatomy Summary

| File | Purpose | Key Complexity |
| :--- | :--- | :--- |
| `app.py` | Command Center | Multi-metric similarity matrix and Auth API. |
| `index.html` | Hero/Landing | High-performance Canvas/SVG "Detector" graphics. |
| `dashboard.html` | Workspace | Dynamic injection of analysis reports and History view. |
| `style.css` | Design System | Glassmorphism, CSS Variables, and Night/Day theme logic. |
| `script.js` | Interaction Logic | Physics engine, AJAX communication, and UI routing. |

---

**PLAGIX** is optimized for both mathematical precision and extreme visual polish, bridging the gap between a "code tool" and a premium consumer SaaS product.
