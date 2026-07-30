# 🛡️ Code Risk Advisor & Architect

> **A 100% Offline, Privacy-First Local AI System for Code Risk Analysis, Intent Detection, and Automated Refactoring.**

![Python](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square&logo=fastapi)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-000000?style=flat-square&logo=next.js)
![Ollama](https://img.shields.io/badge/AI%20Engine-Ollama%20(Local)-white?style=flat-square&logo=ollama)
![Security](https://img.shields.io/badge/Security-Local%20%26%20Isolated-emerald?style=flat-square)

---

## 📌 Executive Summary

**Code Risk Advisor & Architect** is an enterprise-grade, privacy-centric code auditing platform designed to review source code, identify critical security vulnerabilities (such as SQL Injection, XSS, and race conditions), analyze performance bottlenecks, and generate optimized refactored code.

Powered by local open-weight Large Language Models (e.g., `qwen2.5-coder:7b` via **Ollama**), this tool ensures **zero data leakage**, making it fully compliant with strict corporate privacy and intellectual property policies.

---

## ✨ Key Features

- **🔍 Intent Analysis**: Automatically detects the functional goal of the provided code block.
- **🛡️ Vulnerability & Risk Auditing**: Scans for OWASP Top 10 vulnerabilities, runtime inefficiencies, and technical debt with categorized risk levels (*High / Medium / Low*).
- **⚡ Automated Refactoring**: Generates production-ready, security-hardened replacement code adhering to industry best practices.
- **🔒 100% Local Execution**: Operates entirely offline—no data leaves your machine or enterprise perimeter.
- **💻 Modern Interactive Dashboard**: Built with Next.js 14 and Tailwind CSS for seamless full-stack user experience.

---

## 🏗️ System Architecture\




+------------------------------------+
|        Next.js Frontend            |
|    (React / TypeScript / Markdown) |
+------------------+-----------------+
|  HTTP POST /analyze
v
+------------------------------------+
|        FastAPI Backend             |
|    (Pydantic / Ollama SDK)         |
+------------------+-----------------+
|  Local IPC / API
v
+------------------------------------+
|        Ollama AI Server            |
|   Model: qwen2.5-coder:7b (Offline)|
+------------------------------------+





---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React, React-Markdown.
- **Backend**: Python 3.11+, FastAPI, Uvicorn, Pydantic, Ollama Python SDK.
- **AI / LLM Engine**: Ollama (`qwen2.5-coder:7b` or any compatible open-source code model).

---

## 🚀 Quick Start & Installation

### Prerequisites

- [Git](https://git-scm.com/) installed on your machine.
- [Node.js](https://nodejs.org/) (v18+ recommended).
- [Python](https://www.python.org/) (v3.10+ recommended).
- [Ollama](https://ollama.com/) downloaded and installed.

---

### Step 1: Clone the Repository

```bash
git clone [https://github.com/YOUR_USERNAME/code-risk-advisor.git](https://github.com/YOUR_USERNAME/code-risk-advisor.git)
cd code-risk-advisor






Step 2: Prepare the Local AI Model (Ollama)
Ensure Ollama is installed and run the following command to download the code model:

Bash
ollama pull qwen2.5-coder:7b
Step 3: Setup & Run Backend (FastAPI)
Create and activate a Python virtual environment:

Bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux / macOS
python3 -m venv venv
source venv/bin/activate
Install backend dependencies:

Bash
pip install fastapi uvicorn pydantic ollama
Start the FastAPI server:

Bash
python main.py
The API server will run at http://127.0.0.1:8000.

Step 4: Setup & Run Frontend (Next.js)
Navigate to the frontend folder:

Bash
cd frontend
Install dependencies:

Bash
npm install
Launch the development server:

Bash
npm run dev
Open your browser and navigate to http://localhost:3000.

📖 Usage Example
Paste your code snippet (e.g., Python, JavaScript, TypeScript, C++, Java) into the input editor.

Click "تشغيل استشارة الكود" (Run Code Consultation).

Review the generated audit report containing:

Functional Intent Breakdown

Identified Security & Performance Risks

Clean, Refactored Production Code

🗺️ Future Roadmap
[ ] Support multi-file workspace directory scanning.

[ ] Integration with Monaco Editor & Inline CodeLens warning indicators.

[ ] AST-based static analysis integration (Bandit / ESLint).

[ ] Custom risk scoring matrix & PDF report generation.

