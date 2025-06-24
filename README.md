# AI-Powered Resume Analyzer

An intelligent resume analyzer built with **React** (frontend) and **Express.js** (backend) that uses **OpenAI (GPT-4o)** to review resumes in PDF format and optionally match them with job keywords.

---

## 🧠 Features

- ✅ Upload and analyze resume (PDF)
- 🤖 AI-powered review using GPT-4o (OpenAI)
- 📊 Suggestions, strengths, weaknesses
- 🛠️ Built with `React`, `Express`, `pdf-parse`, `OpenAI`

---

---

## 🚀 Demo

Coming soon! You can deploy it easily to:
- 🌐 Frontend: [Vercel](https://vercel.com/)
- ☁️ Backend: [Render](https://render.com/) or [Railway](https://railway.app/)

---

## 🛠️ Setup Guide

### 1. Clone the Project

```bash
git clone https://github.com/yourusername/resume-analyzer.git
cd resume-analyzer

# Navigate to your project
cd D:\Projects\resume-analyzer\resume-analyzer

# Set correct git configuration for 7032dhruvil
git config --global user.name "7032dhruvil"
git config --global user.email "your-email@example.com"

# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/7032dhruvil/resume-analyzer.git

# Verify remote
git remote -v

# Push to GitHub (you'll be prompted for credentials)
git push -u origin main

# Login with the correct account
gh auth login

# Then push
git push -u origin main

# Update remote URL
git remote set-url origin https://github.com/7032dhruvil/resume-analyzer-app.git

# Push again
git push -u origin main

# Check current git user
git config --global user.name
git config --global user.email

# Check current remote
git remote -v

# Check git status
git status

# Check if you have commits to push
git log --oneline

git init

git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main


