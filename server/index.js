const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Mock AI Resume Analysis Function
function analyzeResumeWithMockAI(pdfText) {
  // Extract key information from the resume text
  const text = pdfText.toLowerCase();
  
  // Analyze different sections
  const hasContact = /(email|phone|address|linkedin)/.test(text);
  const hasExperience = /(experience|work|job|employment)/.test(text);
  const hasEducation = /(education|degree|university|college|bachelor|master|phd)/.test(text);
  const hasSkills = /(skills|technologies|programming|languages|tools)/.test(text);
  const hasProjects = /(projects|portfolio|github|repository)/.test(text);
  const hasSummary = /(summary|objective|profile|about)/.test(text);
  
  // Calculate scores based on content
  const contactScore = hasContact ? 85 : 40;
  const summaryScore = hasSummary ? 75 : 50;
  const experienceScore = hasExperience ? 80 : 30;
  const educationScore = hasEducation ? 85 : 40;
  const skillsScore = hasSkills ? 70 : 35;
  const projectsScore = hasProjects ? 65 : 25;
  
  // Calculate overall score
  const overallScore = Math.round((contactScore + summaryScore + experienceScore + educationScore + skillsScore + projectsScore) / 6);
  
  // Generate strengths based on content
  const strengths = [];
  if (hasContact) strengths.push("Complete contact information provided");
  if (hasExperience) strengths.push("Work experience section is present");
  if (hasEducation) strengths.push("Educational background is included");
  if (hasSkills) strengths.push("Skills section demonstrates technical capabilities");
  if (hasProjects) strengths.push("Project experience shows practical application");
  if (text.length > 1000) strengths.push("Resume has substantial content");
  
  // Generate weaknesses based on missing content
  const weaknesses = [];
  if (!hasContact) weaknesses.push("Missing or incomplete contact information");
  if (!hasSummary) weaknesses.push("No professional summary or objective");
  if (!hasExperience) weaknesses.push("Work experience section is missing");
  if (!hasEducation) weaknesses.push("Educational background is not included");
  if (!hasSkills) weaknesses.push("Skills section is missing or minimal");
  if (!hasProjects) weaknesses.push("No project portfolio or GitHub links");
  if (text.length < 500) weaknesses.push("Resume content is too brief");
  
  // Generate suggestions
  const suggestions = [
    "Add quantifiable achievements to experience section",
    "Include specific metrics and results",
    "Optimize for ATS with relevant keywords",
    "Add a compelling professional summary",
    "Include relevant certifications if applicable",
    "Add links to portfolio or GitHub projects"
  ];
  
  // Generate missing elements
  const missingElements = [];
  if (!hasSummary) missingElements.push("Professional summary");
  if (!hasProjects) missingElements.push("Project portfolio");
  if (!hasSkills) missingElements.push("Detailed skills section");
  if (!hasContact) missingElements.push("Complete contact details");
  
  // Determine industry fit based on keywords
  let industryFit = "General";
  if (/(software|developer|programming|coding|javascript|python|java|react|node)/.test(text)) {
    industryFit = "Technology/Software Development";
  } else if (/(marketing|sales|business|management|strategy)/.test(text)) {
    industryFit = "Business/Marketing";
  } else if (/(design|creative|ui|ux|graphic|art)/.test(text)) {
    industryFit = "Design/Creative";
  } else if (/(finance|accounting|banking|investment)/.test(text)) {
    industryFit = "Finance/Accounting";
  }
  
  // Determine experience level
  let experienceLevel = "Entry-level";
  if (/(senior|lead|manager|director|vp|chief)/.test(text)) {
    experienceLevel = "Senior/Executive";
  } else if (/(mid|intermediate|3\+|5\+)/.test(text)) {
    experienceLevel = "Mid-level";
  }
  
  // Extract keywords
  const keywords = [];
  const keywordPatterns = [
    /javascript|js/gi, /python/gi, /react/gi, /node/gi, /java/gi, /sql/gi,
    /html/gi, /css/gi, /git/gi, /agile/gi, /scrum/gi, /aws/gi, /docker/gi,
    /marketing/gi, /sales/gi, /management/gi, /leadership/gi, /analysis/gi
  ];
  
  keywordPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      keywords.push(matches[0].toLowerCase());
    }
  });
  
  // Remove duplicates and limit to top 10
  const uniqueKeywords = [...new Set(keywords)].slice(0, 10);
  
  // Generate recommendations
  const recommendations = [
    "Tailor resume for specific job descriptions",
    "Use action verbs to describe achievements",
    "Include relevant certifications and training",
    "Optimize resume for applicant tracking systems",
    "Add a professional headshot if appropriate",
    "Keep resume to 1-2 pages maximum"
  ];
  
  return {
    overallScore,
    summary: `This resume shows ${overallScore >= 70 ? 'good' : overallScore >= 50 ? 'moderate' : 'basic'} structure and content. ${overallScore >= 70 ? 'It demonstrates professional presentation and includes most essential sections.' : 'Consider adding more details and optimizing for better impact.'}`,
    strengths,
    weaknesses,
    suggestions,
    missingElements,
    sections: {
      contact: { 
        score: contactScore, 
        feedback: hasContact ? "Contact information is complete and professional" : "Contact information is missing or incomplete"
      },
      summary: { 
        score: summaryScore, 
        feedback: hasSummary ? "Professional summary provides good overview" : "Missing professional summary or objective statement"
      },
      experience: { 
        score: experienceScore, 
        feedback: hasExperience ? "Work experience section demonstrates relevant background" : "Work experience section needs more detail or is missing"
      },
      education: { 
        score: educationScore, 
        feedback: hasEducation ? "Educational background is well presented" : "Educational information could be more detailed"
      },
      skills: { 
        score: skillsScore, 
        feedback: hasSkills ? "Skills section shows technical capabilities" : "Skills section needs more specific technical details"
      },
      projects: { 
        score: projectsScore, 
        feedback: hasProjects ? "Project experience demonstrates practical skills" : "Project portfolio could enhance the resume"
      }
    },
    keywords: uniqueKeywords.length > 0 ? uniqueKeywords : ["resume", "professional", "experience"],
    industryFit,
    experienceLevel,
    recommendations
  };
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Resume Analyzer API is running with Mock AI' });
});

app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Parse PDF
    const pdfData = await pdfParse(req.file.buffer);
    const pdfText = pdfData.text;

    if (!pdfText || pdfText.trim().length === 0) {
      return res.status(400).json({ error: 'Could not extract text from PDF' });
    }

    // Analyze resume using mock AI
    const analysis = analyzeResumeWithMockAI(pdfText);

    res.json({
      success: true,
      analysis,
      fileName: req.file.originalname,
      fileSize: req.file.size
    });

  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ 
      error: 'Failed to analyze resume',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Resume Analyzer Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 Using Mock AI for analysis (No API key required!)`);
}); 