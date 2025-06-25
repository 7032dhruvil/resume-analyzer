# Resume Analyzer

AI-powered Resume Analyzer with Modern UI/UX

---

## 🚀 Overview
Resume Analyzer is a full-stack web application that leverages AI to analyze resumes, providing comprehensive feedback, scoring, and actionable suggestions. Built with a modern React frontend and a robust Node.js/Express backend, it offers a seamless and intuitive user experience.

---

## ✨ Features
- **AI-Powered Analysis:** Get instant, intelligent feedback on your resume.
- **PDF Upload:** Securely upload and analyze PDF resumes.
- **Detailed Scoring:** Receive scores and suggestions for improvement.
- **User Authentication:** Secure login and account management.
- **Modern UI/UX:** Responsive, accessible, and visually appealing design.
- **Downloadable Reports:** Export analysis results for offline use.
- **Dark Mode:** Switch between light and dark themes.

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS, Axios, Recharts, Framer Motion
- **Backend:** Node.js, Express, Multer, PDF-Parse
- **Security:** Helmet, Express-Rate-Limit, CORS
- **Other:** dotenv, Compression

---

## 📁 Folder Structure
```
resume-analyzer/
├── client/           # React frontend
│   ├── public/
│   │   └── ...
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── services/     # API service layer
│   │   ├── index.js      # App entry point
│   │   └── index.css     # Tailwind & global styles
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/           # Node.js backend
│   ├── index.js      # Express server entry
│   ├── env.example   # Example environment variables
│   ├── package.json
│   └── ...
├── package.json      # Root scripts (dev, build, install-all)
└── README.md         # Project documentation
```

---

## ⚡ Quick Start

### 1. Clone the repository
```sh
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer
```

### 2. Install dependencies
```sh
npm run install-all
```

### 3. Set up environment variables
- Copy `server/env.example` to `server/.env` and fill in required values.

### 4. Start the development servers
```sh
npm run dev
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5002](http://localhost:5002)

---

## 📝 Usage
- Visit the frontend URL and upload your resume (PDF).
- View instant analysis, scores, and suggestions.
- Download or share your results.

---

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the MIT License.

---

## 🙋‍♂️ Contact
For questions or support, please open an issue or contact the maintainer at [your-email@example.com].


