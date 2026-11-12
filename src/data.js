// ✿ Everything the site says lives here — edit freely ✿
const GH = 'https://github.com/trish404/';

export const profile = {
  name: 'Trisha Vijayekkumaran',
  short: 'trisha',
  handle: 'trish404',
  role: 'Software Engineer · ML Researcher',
  location: 'Bengaluru, India',
  tagline: 'I build trade pipelines by day and neural nets by night.',
  about:
    'Software engineer with a B.Tech in Computer Science from Amrita Vishwa Vidyapeetham (CGPA 8.43), currently pursuing a B.S. in Data Science at IIT Madras. I work on backend integration systems in Java and Spring Boot, including Apache Camel routes, IBM MQ and Oracle, and on applied machine learning with PyTorch, Llama, YOLOv8 and Sentence-BERT, shipped as FastAPI services on Docker and AWS. I have published five research papers in healthcare AI, smart cities and compilers.',
  email: 'trisha.vijay@gmail.com',
  github: 'https://github.com/trish404',
  linkedin: 'https://www.linkedin.com/in/trisha-vijayekkumaran-36569b157',
  // paste your Google Scholar profile URL here ↓ (publications link to it when set)
  scholar: 'https://scholar.google.com/citations?user=E3b1ndQAAAAJ&hl=en'
};

// rotating desktop message box (random on load, "another one" cycles)
export const messages = [
  { title: 'Message : FROM trisha.exe', text: 'new achievement unlocked: you found my portfolio ♡', icon: 'trophy' },
  { title: 'System Alert', text: 'warning: this girl ships to production', icon: 'sparkle' },
  { title: 'Error 404', text: 'bad vibes not found. only good code here', icon: 'smiley' },
  { title: 'Message : FROM a recruiter?', text: 'hire trisha?  [yes]  [YES]', icon: 'heart' },
  { title: 'Training Status', text: 'brb, training a model. currently at epoch 404', icon: 'computer' },
  { title: 'Language Pack', text: 'fluent in java, python & spring boot', icon: 'bubble' },
  { title: 'Bug Report', text: 'bugs squashed: all of them. bugs remaining: 0', icon: 'bin' },
  { title: 'Low Battery', text: 'please insert one (1) job offer to continue', icon: 'phone' },
  { title: 'You have mail!', text: 'you have (1) new message: you look like you would love my projects', icon: 'mail' },
  { title: 'trisha.exe', text: 'trisha.exe is not responding… because she is busy shipping', icon: 'doc' }
];

// skills: level 3 = daily driver, 2 = shipped with it, 1 = familiar
export const skillGroups = [
  { id: 'lang', label: 'languages' },
  { id: 'backend', label: 'backend & integration' },
  { id: 'ml', label: 'machine learning' },
  { id: 'data', label: 'databases' },
  { id: 'devops', label: 'tools & platforms' },
  { id: 'front', label: 'frontend & mobile' },
  { id: 'method', label: 'methodologies' }
];
export const skillList = [
  { n: 'Java', g: 'lang', lv: 3, where: 'NatWest: Camel routes, MXML→XML converters, MQ utilities' },
  { n: 'Python', g: 'lang', lv: 3, where: 'Rubixe, Gabify, every ML project & paper' },
  { n: 'Spring Boot', g: 'backend', lv: 3, where: 'NatWest trade conversion services' },
  { n: 'Apache Camel', g: 'backend', lv: 3, where: 'NatWest file-transfer interface (YAML DSL routes)' },
  { n: 'FastAPI', g: 'backend', lv: 3, where: 'Rubixe microservices, Adaptive Troubleshooting System, FlexiFlow' },
  { n: 'PyTorch', g: 'ml', lv: 3, where: 'Whisper / wav2vec fine-tuning, ECG EfficientNet, change detection' },
  { n: 'IBM MQ', g: 'backend', lv: 2, where: 'NatWest: pushing trade files to downstream systems' },
  { n: 'Murex', g: 'backend', lv: 2, where: 'NatWest: MXML trade messages' },
  { n: 'Llama', g: 'ml', lv: 2, where: 'Rubixe ticket triage (95% accuracy)' },
  { n: 'YOLOv8', g: 'ml', lv: 2, where: 'Rubixe virtual staging pipeline' },
  { n: 'Sentence-BERT', g: 'ml', lv: 2, where: 'Adaptive Troubleshooting System expert matching (97%)' },
  { n: 'Whisper', g: 'ml', lv: 2, where: 'Gabify speech-impediment detection (56% → 75%)' },
  { n: 'scikit-learn', g: 'ml', lv: 2, where: 'fraud detection (LOF), tweet sentiment benchmarks' },
  { n: 'LangGraph', g: 'ml', lv: 2, where: 'agentic workflow, multimodal RAG' },
  { n: 'TensorFlow', g: 'ml', lv: 1, where: 'coursework & early models' },
  { n: 'Oracle', g: 'data', lv: 2, where: 'NatWest integrations' },
  { n: 'MongoDB', g: 'data', lv: 2, where: 'Adaptive Troubleshooting System' },
  { n: 'Neo4j', g: 'data', lv: 2, where: 'SAP O2C graph intelligence system' },
  { n: 'Firestore', g: 'data', lv: 2, where: 'FlexiFlow arthritis care app' },
  { n: 'SQL', g: 'lang', lv: 2, where: 'Oracle, MySQL' },
  { n: 'C++', g: 'lang', lv: 2, where: 'competitive programming (Algomania 1st place)' },
  { n: 'JavaScript', g: 'lang', lv: 2, where: 'zk-SNARK verifier, graph UI, this site' },
  { n: 'R', g: 'lang', lv: 1, where: 'statistics coursework' },
  { n: 'Docker', g: 'devops', lv: 2, where: 'Rubixe services, OpenEnv triage environment' },
  { n: 'AWS', g: 'devops', lv: 2, where: 'Rubixe deployments' },
  { n: 'Jenkins', g: 'devops', lv: 2, where: 'NatWest CI/CD pipelines' },
  { n: 'JUnit', g: 'devops', lv: 2, where: 'NatWest test suites' },
  { n: 'Git', g: 'devops', lv: 3, where: '62 public repos and counting' },
  { n: 'Flutter', g: 'front', lv: 2, where: 'FlexiFlow web + mobile app' },
  { n: 'React', g: 'front', lv: 2, where: 'zk verifier front-end, this portfolio' },
  { n: 'Django', g: 'backend', lv: 1, where: 'side projects' },
  { n: 'Flask', g: 'backend', lv: 2, where: 'ML model serving' },
  { n: 'Node.js', g: 'backend', lv: 1, where: 'chatbot & tooling' },
  { n: 'C', g: 'lang', lv: 2, where: 'systems coursework, multi-language lexical analyser' },
  { n: 'HTML/CSS', g: 'front', lv: 2, where: 'AgriGuru, PyDOC, this portfolio' },
  { n: 'MySQL', g: 'data', lv: 2, where: 'coursework & backend projects' },
  { n: 'Oracle SQL Developer', g: 'data', lv: 2, where: 'NatWest trade data' },
  { n: 'Computer Vision', g: 'ml', lv: 3, where: 'YOLOv8 staging, chest X-ray XAI, ECG, satellite change detection' },
  { n: 'NLP', g: 'ml', lv: 2, where: 'Malayalam fake-news detection, legal jargon simplifier' },
  { n: 'LLMs', g: 'ml', lv: 3, where: 'Rubixe ticket triage engine, Gabify LLM fine-tuning, RAG apps' },
  { n: 'REST APIs', g: 'backend', lv: 3, where: 'FlexiFlow, Adaptive Troubleshooting System, Rubixe microservices' },
  { n: 'Firebase', g: 'devops', lv: 2, where: 'FlexiFlow arthritis care app' },
  { n: 'Tableau', g: 'devops', lv: 1, where: 'data analysis dashboards' },
  { n: 'GSAP', g: 'front', lv: 2, where: 'animations in this portfolio' },
  { n: 'Three.js', g: 'front', lv: 2, where: '3D scenes in this portfolio' },
  { n: 'Scrum', g: 'method', lv: 2, where: 'NatWest sprints' },
  { n: 'Agile', g: 'method', lv: 2, where: 'NatWest and Rubixe teams' },
  { n: 'CI/CD', g: 'method', lv: 2, where: 'Jenkins pipelines at NatWest' }
];

export const stats = [
  { n: '62', l: 'public repos' },
  { n: '5', l: 'papers published' },
  { n: '97%', l: 'expert-match accuracy' },
  { n: 'top 9', l: 'Infosys Global Hackathon' }
];

export const experience = [
  {
    co: 'NatWest Group',
    role: 'Software Engineer',
    when: 'Jun 2026 – Dec 2026',
    where: 'Bengaluru',
    color: '#ff4fa3',
    points: [
      'YAML Apache Camel routes automating trade-file movement between Murex and downstream systems.',
      'MXML → XML conversion of Murex trade messages in Java + Spring Boot.',
      'Java utilities pushing files to targets over IBM MQ + Oracle.',
      'JUnit tests, bug fixes, shipped through Jenkins CI/CD.'
    ],
    tags: ['Java', 'Spring Boot', 'Apache Camel', 'IBM MQ', 'Oracle', 'Jenkins']
  },
  {
    co: 'Rubixe',
    role: 'AI Intern',
    when: 'May 2026 – Jun 2026',
    where: 'Bengaluru',
    color: '#b56cff',
    points: [
      'Llama ticket-triage system: 95% accuracy, 85% fewer manually-handled tickets.',
      'YOLOv8 virtual-staging pipeline swapping furniture, lighting & weather in property photos.',
      'Both shipped as Dockerised FastAPI microservices on AWS.'
    ],
    tags: ['Llama', 'YOLOv8', 'FastAPI', 'Docker', 'AWS']
  },
  {
    co: 'Gabify',
    role: 'AI/ML Intern',
    when: 'Oct 2024 – Dec 2024',
    where: 'Remote',
    color: '#4fd8ff',
    points: [
      'Speech-impediment detection 56% → 75% by fine-tuning Whisper + wav2vec 2.0 on ~10k clips.',
      'ResNet emotion & stress classifier as a second multimodal signal.'
    ],
    tags: ['Whisper', 'wav2vec 2.0', 'ResNet', 'PyTorch']
  }
];

// category → filter chip. emoji is the desktop-icon for the card.
export const projects = [
  { name: 'Adaptive Troubleshooting System', repo: 'Load-Balancing-Crowd-Sourced-Adaptive-Trouble-Shooting-System', cat: 'systems', emoji: '🛠️', year: 2025, featured: true,
    desc: 'Region-aware tech-support platform matching users to experts with 97% accuracy via skill, trust, SBERT similarity and live workload. Load-tested to 1,500 users.',
    tags: ['FastAPI', 'MongoDB', 'Sentence-BERT'] },
  { name: 'FlexiFlow — Arthritis Care', repo: 'FlexiFlow-Arthritis-App', cat: 'apps', emoji: '🌸', year: 2025, featured: true,
    desc: 'Web + mobile app adapting exercise and care plans per user with a LinUCB contextual bandit. Pain, diet & medication logging, gamified progress.',
    tags: ['Flutter', 'FastAPI', 'Firebase'] },
  { name: 'ECG Diagnostic AI', repo: 'ECG-Analysis-Using-EfficientNet', cat: 'ml', emoji: '🩺', year: 2025, featured: true,
    desc: 'EfficientNet myocardial-infarction detection with explainability. Research code for the ICMLDE 2025 paper.',
    tags: ['PyTorch', 'EfficientNet', 'XAI'] },
  { name: 'Building Damage Change Detection', repo: 'china-final-year-proj', cat: 'ml', emoji: '🛰️', year: 2026, featured: true,
    desc: 'Siamese network for pixel-level building damage from pre/post-disaster satellite pairs. Three attention variants × seven augmentation strategies.',
    tags: ['Siamese CNN', 'Attention', 'Remote Sensing'] },
  { name: 'Medical Triage OpenEnv', repo: 'Medical-Triage-Assistant-OpenEnv--Improved', cat: 'ml', emoji: '🏥', year: 2026, featured: true,
    desc: '10-task emergency-department RL environment with real clinical protocols, multi-step decisions and graded rewards.',
    tags: ['OpenEnv', 'RL', 'Docker'] },
  { name: 'SAP O2C Graph Intelligence', repo: 'dodge-ai-v2-task', cat: 'systems', emoji: '🕸️', year: 2026, featured: true, live: 'https://rendering-navy.vercel.app/',
    desc: 'Turns Order-to-Cash transactions into a Neo4j graph for traceability across orders, deliveries, invoices and payments.',
    tags: ['Neo4j', 'Graph', 'JavaScript'] },
  { name: 'zk-SNARK Escrow', repo: 'Defi-Escrow-Project', cat: 'web3', emoji: '🔐', year: 2025,
    desc: 'Privacy-preserving escrow using Circom circuits, Poseidon commitments and Ethereum smart contracts.',
    tags: ['Circom', 'Solidity', 'Poseidon'] },
  { name: 'zk-SNARK Proof Verifier', repo: 'zkp-verifier-project', cat: 'web3', emoji: '🧩', year: 2025,
    desc: 'End-to-end proof verifier with Circom, SnarkJS, Hardhat and a React front-end.',
    tags: ['SnarkJS', 'Hardhat', 'React'] },
  { name: 'AgriGuru', repo: 'AgriGuru', cat: 'ml', emoji: '🌾', year: 2025,
    desc: 'SMS + web crop-guidance for farmers with little internet, powered by ML predictions and a knowledge graph.',
    tags: ['ML', 'Knowledge Graph', 'SMS'] },
  { name: 'Multimodal RAG', repo: 'Multimodal-RAG-application', cat: 'llm', emoji: '📚', year: 2024,
    desc: 'Retrieval-augmented generation over text + images without OCR.',
    tags: ['RAG', 'Vision-LLM', 'LangChain'] },
  { name: 'Agentic Workflow (LangGraph)', repo: 'Agentic-Workflow-Implementation-using-Langgraph', cat: 'llm', emoji: '🤖', year: 2024,
    desc: 'Plan → execute → reflect multi-agent workflow that decomposes queries into sub-tasks.',
    tags: ['LangGraph', 'Agents'] },
  { name: 'BTC Sentiment × Hyperliquid', repo: 'Bitcoin-Market-Sentiment-Hyperliquid-Trader-Performance', cat: 'data', emoji: '₿', year: 2026,
    desc: 'How the Fear & Greed index relates to real trader PnL on Hyperliquid DEX.',
    tags: ['Pandas', 'EDA', 'Finance'] },
  { name: 'Urban Parking (Dijkstra)', repo: 'Urban-Parking-Using-Djkistra-s-Algorithm', cat: 'systems', emoji: '🚗', year: 2024,
    desc: 'Smart parking routing. Published at ICTCS (Springer) 2024.',
    tags: ['Java', 'Graphs'] },
  { name: 'Grid Parking Allocation', repo: 'Efficient-Parking-Spot-Allocation-in-a-Grid-Based-Parking-Lot', cat: 'systems', emoji: '🅿️', year: 2025,
    desc: 'Efficient spot allocation in grid lots. Published at ISACC 2025.',
    tags: ['Java', 'Algorithms'] },
  { name: 'Multi-Language Lexer', repo: 'Multi-Language-Lexical-Analyser', cat: 'systems', emoji: '🔤', year: 2024,
    desc: 'Lexer for Java, C and C++ in Python. Published at GCAT 2024.',
    tags: ['Python', 'Compilers'] },
  { name: 'CheXUI', repo: 'chexui', cat: 'ml', emoji: '🫁', year: 2024,
    desc: 'Explainable chest X-ray abnormality detection UI (Comp-SIF 2025 paper).',
    tags: ['XAI', 'Medical Imaging'] },
  { name: 'Malayalam Fake-News Detection', repo: 'Fake-News-Detection-in-Malayalam', cat: 'llm', emoji: '📰', year: 2024,
    desc: 'DilSeML hackathon entry: classifying misinformation in Malayalam.',
    tags: ['NLP', 'Transformers'] },
  { name: 'Legal Jargon Simplifier', repo: 'NLP-for-simplifiying-legal-jargon', cat: 'llm', emoji: '⚖️', year: 2024,
    desc: 'NLP pipeline that rewrites legalese into plain language.',
    tags: ['NLP', 'Summarisation'] },
  { name: 'Fraud Transactions (LOF)', repo: 'streamlit-app-for-fraud-transactions', cat: 'data', emoji: '💳', year: 2024,
    desc: 'Local Outlier Factor model served on Streamlit to flag fraudulent transactions.',
    tags: ['scikit-learn', 'Streamlit'] },
  { name: 'Tweet Sentiment Benchmarks', repo: 'sentiment-analysis-of-tweets-using-multiple-models', cat: 'data', emoji: '🐦', year: 2024,
    desc: 'Comparing classical and deep models for tweet sentiment.',
    tags: ['NLP', 'Benchmarks'] },
  { name: 'Drone Swarm Search & Rescue', repo: 'Swarm-Search-and-Rescue-For-Natural-Disasters-Using-Drones', cat: 'ml', emoji: '🚁', year: 2025,
    desc: 'Swarm coordination for disaster search-and-rescue drones.',
    tags: ['Swarm', 'Simulation'] },
  { name: 'Habit Tracker', repo: 'Habit-Tracker-App', cat: 'apps', emoji: '✅', year: 2025,
    desc: 'Lightweight habit-tracking web app.',
    tags: ['JavaScript'] },
  { name: 'SARIMA & Trading Models', repo: 'Trading-Strategy-Model', cat: 'data', emoji: '📈', year: 2024,
    desc: 'Time-series forecasting and back-tested trading strategies.',
    tags: ['SARIMA', 'Backtesting'] },
  { name: 'AI Voice Assistant', repo: 'AI-Voice-Assistant', cat: 'llm', emoji: '🎙️', year: 2025,
    desc: 'Voice-driven assistant built on LLM APIs.',
    tags: ['Speech', 'LLM'] }
].map(p => ({ ...p, url: GH + p.repo }));

export const categories = [
  { id: 'all', label: '★ all' },
  { id: 'ml', label: 'ML / vision' },
  { id: 'llm', label: 'LLM / NLP' },
  { id: 'systems', label: 'systems' },
  { id: 'data', label: 'data' },
  { id: 'web3', label: 'web3' },
  { id: 'apps', label: 'apps' }
];

export const skills = [
  'Java', 'Python', 'C++', 'JavaScript', 'SQL', 'R', 'Spring Boot', 'Apache Camel', 'IBM MQ', 'Murex',
  'FastAPI', 'Flask', 'Django', 'Node.js', 'Oracle', 'MongoDB', 'Neo4j', 'Firestore', 'Docker', 'AWS',
  'Jenkins', 'JUnit', 'React', 'Flutter', 'PyTorch', 'TensorFlow', 'scikit-learn', 'YOLOv8', 'Llama', 'Sentence-BERT'
];

export const publications = [
  { t: 'ECG Analysis for Myocardial Infarction Detection via Deep Learning', v: 'ICMLDE 2025' },
  { t: 'Explainable AI-based Detection and Interpretation of Abnormalities in Chest X-rays', v: 'Comp-SIF 2025' },
  { t: 'Transforming Urban Parking: Intelligent System for a Better City Experience', v: 'ICTCS (Springer) 2024' },
  { t: 'Efficient Parking Spot Allocation in a Grid-based Parking Lot', v: 'ISACC 2025' },
  { t: 'Multi Language Lexical Analyser', v: 'GCAT 2024' }
];

export const achievements = [
  { t: 'Infosys Global Hackathon 2025', d: 'Top 9 pre-finalist of 700+ teams' },
  { t: 'HACK4CHANGE 2024', d: 'Top 10 national finalist' },
  { t: 'Algomania 2023', d: '1st place, competitive programming' }
];
