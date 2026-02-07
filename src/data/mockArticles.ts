export interface Article {
  id: string;
  rank: number;
  title: string;
  punchyTitle: string;
  source: string;
  sourceUrl: string;
  originalUrl: string;
  author?: string;
  publishedAt: Date;
  timeAgo: string;
  summary: string;
  punchySummary: string;
  keyInsights: string[];
  powerQuote?: string;
  tags: string[];
  category: 'ml' | 'nlp' | 'cv' | 'robotics' | 'research' | 'industry';
  engagement: {
    score: number;
    comments: number;
    shares: number;
  };
  isNew: boolean;
  isTrending: boolean;
  isHot: boolean;
  imageUrl?: string;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    rank: 1,
    title: 'OpenAI Announces GPT-5 with Unprecedented Reasoning Capabilities',
    punchyTitle: 'OpenAI Drops GPT-5 — And It\'s Not Playing Around',
    source: 'TechCrunch',
    sourceUrl: 'https://techcrunch.com',
    originalUrl: 'https://techcrunch.com/2024/ai/openai-gpt5',
    author: 'Kyle Wiggers',
    publishedAt: new Date(Date.now() - 45 * 60 * 1000),
    timeAgo: '45 mins ago',
    summary: 'Revolutionary breakthrough in artificial general intelligence as OpenAI unveils GPT-5 with unprecedented reasoning capabilities that could transform every industry.',
    punchySummary: '🚀 The AI world just shifted gears. OpenAI\'s GPT-5 isn\'t just an upgrade—it\'s a paradigm shift in how machines understand human context. Smarter reasoning. Fewer hallucinations. This is the model we\'ve been waiting for.',
    keyInsights: [
      '10x faster inference than GPT-4',
      'Native multimodal understanding across text, image, and audio',
      'Real-time learning capabilities without fine-tuning',
      'Reduced hallucinations by 90% in benchmark tests'
    ],
    powerQuote: '"This isn\'t just an upgrade—it\'s a paradigm shift in how machines understand human context." — Sam Altman, CEO',
    tags: ['GPT-5', 'OpenAI', 'AGI', 'LLM'],
    category: 'nlp',
    engagement: { score: 12400, comments: 1247, shares: 3891 },
    isNew: true,
    isTrending: true,
    isHot: true
  },
  {
    id: '2',
    rank: 2,
    title: 'Google DeepMind Achieves Major Breakthrough in Protein Structure Prediction',
    punchyTitle: 'DeepMind Just Cracked Biology\'s Biggest Puzzle',
    source: 'DeepMind Blog',
    sourceUrl: 'https://deepmind.com',
    originalUrl: 'https://deepmind.com/blog/alphafold-3',
    author: 'Demis Hassabis',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    timeAgo: '2 hours ago',
    summary: 'AlphaFold 3 can now predict protein-drug interactions with 99% accuracy, potentially accelerating drug discovery by years.',
    punchySummary: '🧬 AlphaFold 3 just dropped and pharma companies are scrambling. 99% accuracy on protein-drug interactions. Years of research? Compressed into hours. The drug discovery game just changed forever.',
    keyInsights: [
      '99% accuracy on protein-drug binding predictions',
      'Can model entire cellular complexes',
      '50x faster than previous generation',
      'Open-sourced for academic research'
    ],
    powerQuote: '"We\'ve essentially given biology a new pair of eyes." — Demis Hassabis',
    tags: ['AlphaFold', 'DeepMind', 'BioAI', 'Research'],
    category: 'research',
    engagement: { score: 9800, comments: 892, shares: 2341 },
    isNew: false,
    isTrending: true,
    isHot: true
  },
  {
    id: '3',
    rank: 3,
    title: 'NVIDIA Unveils Blackwell B200 GPU with 20 Petaflops AI Performance',
    punchyTitle: 'NVIDIA\'s B200 Is a Monster — 20 Petaflops of Pure AI Power',
    source: 'NVIDIA Blog',
    sourceUrl: 'https://nvidia.com',
    originalUrl: 'https://blogs.nvidia.com/blackwell-b200',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    timeAgo: '3 hours ago',
    summary: 'The new Blackwell architecture delivers 4x the AI training performance of H100 while using 25% less energy.',
    punchySummary: '⚡ Jensen just dropped the mic. The B200? 20 petaflops. That\'s not a typo. 4x faster than H100, uses less power. Every AI lab on Earth is rewriting their hardware budgets right now.',
    keyInsights: [
      '20 petaflops AI performance per chip',
      '4x training speed improvement over H100',
      '25% reduction in energy consumption',
      'Native support for 1 trillion parameter models'
    ],
    tags: ['NVIDIA', 'Blackwell', 'GPU', 'Hardware'],
    category: 'industry',
    engagement: { score: 8700, comments: 634, shares: 1987 },
    isNew: false,
    isTrending: true,
    isHot: false
  },
  {
    id: '4',
    rank: 4,
    title: 'Anthropic Releases Claude 3.5 with Enhanced Safety Features',
    punchyTitle: 'Claude 3.5 Is Here — Safer, Smarter, Unstoppable',
    source: 'Anthropic',
    sourceUrl: 'https://anthropic.com',
    originalUrl: 'https://anthropic.com/news/claude-3-5',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    timeAgo: '4 hours ago',
    summary: 'Claude 3.5 introduces constitutional AI improvements that make it the most reliable assistant for enterprise applications.',
    punchySummary: '🛡️ Anthropic played it smart. Claude 3.5 isn\'t just powerful—it\'s predictable. Enterprise teams are already switching. Constitutional AI just became the gold standard.',
    keyInsights: [
      'Constitutional AI 2.0 framework',
      '40% reduction in harmful outputs',
      'Extended context window to 200K tokens',
      'Native code execution in sandbox'
    ],
    powerQuote: '"Safety and capability are not a trade-off. They\'re synergistic." — Dario Amodei',
    tags: ['Claude', 'Anthropic', 'Safety', 'Enterprise'],
    category: 'nlp',
    engagement: { score: 7600, comments: 521, shares: 1654 },
    isNew: false,
    isTrending: true,
    isHot: false
  },
  {
    id: '5',
    rank: 5,
    title: 'Tesla Optimus Robot Demonstrates Unprecedented Dexterity',
    punchyTitle: 'Tesla\'s Optimus Just Did the Impossible',
    source: 'Electrek',
    sourceUrl: 'https://electrek.co',
    originalUrl: 'https://electrek.co/tesla-optimus-gen-3',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    timeAgo: '5 hours ago',
    summary: 'The latest Optimus prototype can now fold laundry, cook basic meals, and navigate complex environments autonomously.',
    punchySummary: '🦾 Forget what you knew about robots. Optimus Gen 3 just folded laundry. Cooked eggs. Walked stairs. Elon wasn\'t exaggerating—humanoid robots are coming faster than anyone predicted.',
    keyInsights: [
      'Human-level dexterity in fine motor tasks',
      '22 hours continuous operation on single charge',
      'Real-time environment mapping and adaptation',
      'Target price: under $20,000 by 2026'
    ],
    tags: ['Tesla', 'Optimus', 'Robotics', 'Humanoid'],
    category: 'robotics',
    engagement: { score: 7200, comments: 1892, shares: 2134 },
    isNew: false,
    isTrending: false,
    isHot: true
  },
  {
    id: '6',
    rank: 6,
    title: 'Meta Releases Llama 4 Open Source with 400B Parameters',
    punchyTitle: 'Meta Goes Nuclear — Llama 4 Is Open Source and It\'s Massive',
    source: 'Meta AI Blog',
    sourceUrl: 'https://ai.meta.com',
    originalUrl: 'https://ai.meta.com/blog/llama-4',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    timeAgo: '6 hours ago',
    summary: 'Llama 4 matches GPT-4 performance on most benchmarks while being completely open source and free for commercial use.',
    punchySummary: '🔓 Zuck just disrupted the AI industry. Again. Llama 4 is open source, 400B parameters, and it\'s FREE. GPT-4 level performance for everyone. The democratization of AI is here.',
    keyInsights: [
      '400 billion parameter model',
      'Matches GPT-4 on 95% of benchmarks',
      'Full Apache 2.0 license for commercial use',
      'Runs on consumer hardware with quantization'
    ],
    tags: ['Llama', 'Meta', 'OpenSource', 'LLM'],
    category: 'nlp',
    engagement: { score: 6900, comments: 723, shares: 4521 },
    isNew: false,
    isTrending: true,
    isHot: false
  },
  {
    id: '7',
    rank: 7,
    title: 'Researchers Achieve Real-Time 4D Scene Understanding',
    punchyTitle: 'Computer Vision Just Learned to See Through Time',
    source: 'MIT CSAIL',
    sourceUrl: 'https://csail.mit.edu',
    originalUrl: 'https://csail.mit.edu/news/4d-vision',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    timeAgo: '8 hours ago',
    summary: 'New neural architecture can understand and predict scene dynamics in real-time, enabling true spatial-temporal reasoning.',
    punchySummary: '👁️ MIT just broke the fourth wall of computer vision. Their new model doesn\'t just see—it predicts. Real-time 4D understanding. Autonomous driving just got a whole lot safer.',
    keyInsights: [
      'Real-time 4D scene reconstruction',
      'Predicts object trajectories 10 seconds ahead',
      '98% accuracy on autonomous driving scenarios',
      '30fps processing on edge devices'
    ],
    tags: ['ComputerVision', 'MIT', '4D', 'Autonomous'],
    category: 'cv',
    engagement: { score: 5400, comments: 312, shares: 892 },
    isNew: false,
    isTrending: false,
    isHot: false
  },
  {
    id: '8',
    rank: 8,
    title: 'Hugging Face Launches Enterprise MLOps Platform',
    punchyTitle: 'Hugging Face Just Made Enterprise AI Stupid Simple',
    source: 'Hugging Face Blog',
    sourceUrl: 'https://huggingface.co',
    originalUrl: 'https://huggingface.co/blog/enterprise-platform',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    timeAgo: '10 hours ago',
    summary: 'The new platform provides end-to-end ML lifecycle management with one-click deployment to any cloud provider.',
    punchySummary: '🤗 Hugging Face isn\'t just for researchers anymore. Their enterprise platform? One-click deployment. Any cloud. Any model. MLOps just became accessible to everyone.',
    keyInsights: [
      'One-click deployment to AWS, GCP, Azure',
      'Built-in model versioning and A/B testing',
      'Automatic scaling based on demand',
      'SOC2 and HIPAA compliance built-in'
    ],
    tags: ['HuggingFace', 'MLOps', 'Enterprise', 'Platform'],
    category: 'industry',
    engagement: { score: 4800, comments: 287, shares: 654 },
    isNew: false,
    isTrending: false,
    isHot: false
  },
  {
    id: '9',
    rank: 9,
    title: 'Stanford Develops Self-Improving AI Agents',
    punchyTitle: 'Stanford\'s AI Agents Learn While They Work — No Training Required',
    source: 'Stanford AI Lab',
    sourceUrl: 'https://ai.stanford.edu',
    originalUrl: 'https://ai.stanford.edu/blog/self-improving-agents',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    timeAgo: '12 hours ago',
    summary: 'New framework allows AI agents to improve their performance on tasks without explicit retraining or human feedback.',
    punchySummary: '🧠 Stanford just solved the feedback loop problem. Their AI agents improve themselves. No retraining. No human oversight. They just get better. Continuously. Autonomously.',
    keyInsights: [
      'Continuous improvement without human feedback',
      '300% performance gain over 30-day period',
      'Works across multiple task domains',
      'Memory-efficient implementation'
    ],
    powerQuote: '"We\'ve created agents that learn like children—through experience." — Lead Researcher',
    tags: ['Agents', 'Stanford', 'Research', 'SelfImproving'],
    category: 'research',
    engagement: { score: 4200, comments: 198, shares: 543 },
    isNew: false,
    isTrending: false,
    isHot: false
  },
  {
    id: '10',
    rank: 10,
    title: 'Mistral AI Raises $1B at $6B Valuation',
    punchyTitle: 'Mistral Just Became Europe\'s AI Unicorn — $6B Valuation',
    source: 'VentureBeat',
    sourceUrl: 'https://venturebeat.com',
    originalUrl: 'https://venturebeat.com/ai/mistral-1b-funding',
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    timeAgo: '14 hours ago',
    summary: 'The French AI startup closes historic funding round as investors bet big on European AI independence.',
    punchySummary: '💰 Europe just entered the AI arms race. Mistral\'s $6B valuation isn\'t just money—it\'s a statement. The AI duopoly is about to become a three-way fight.',
    keyInsights: [
      '$1 billion Series B at $6B valuation',
      'Led by Andreessen Horowitz and Lightspeed',
      'Plans to launch GPT-4 competitor by Q2',
      'Will open R&D centers in Dubai and Singapore'
    ],
    tags: ['Mistral', 'Funding', 'Startup', 'Europe'],
    category: 'industry',
    engagement: { score: 3900, comments: 234, shares: 876 },
    isNew: false,
    isTrending: false,
    isHot: false
  },
  {
    id: '11',
    rank: 11,
    title: 'New Benchmark Shows LLMs Can Now Pass Bar Exam With 90% Score',
    punchyTitle: 'AI Lawyers? LLMs Just Crushed the Bar Exam',
    source: 'Ars Technica',
    sourceUrl: 'https://arstechnica.com',
    originalUrl: 'https://arstechnica.com/ai/llm-bar-exam',
    publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000),
    timeAgo: '16 hours ago',
    summary: 'Latest evaluation shows top LLMs scoring 90%+ on all sections of the bar examination, surpassing average human performance.',
    punchySummary: '⚖️ The legal profession just felt a tremor. 90% on the bar exam. That\'s not just passing—that\'s crushing it. AI paralegals aren\'t coming. They\'re here.',
    keyInsights: [
      'GPT-5 scored 94% on Multistate Bar',
      'Claude 3.5 achieved 91% average',
      'Outperforms 85% of human test-takers',
      'Law firms already piloting AI associates'
    ],
    tags: ['LLM', 'Legal', 'Benchmark', 'Enterprise'],
    category: 'nlp',
    engagement: { score: 3600, comments: 567, shares: 432 },
    isNew: false,
    isTrending: false,
    isHot: false
  },
  {
    id: '12',
    rank: 12,
    title: 'Boston Dynamics Atlas Achieves Parkour-Level Mobility',
    punchyTitle: 'Atlas Just Did a Backflip. Then It Did Parkour.',
    source: 'IEEE Spectrum',
    sourceUrl: 'https://spectrum.ieee.org',
    originalUrl: 'https://spectrum.ieee.org/boston-dynamics-atlas-parkour',
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    timeAgo: '18 hours ago',
    summary: 'The humanoid robot can now navigate complex obstacle courses with fluid, human-like movements.',
    punchySummary: '🤸 Atlas isn\'t walking anymore. It\'s flowing. Backflips. Wall runs. Gap jumps. Boston Dynamics just proved humanoid robots can move like athletes.',
    keyInsights: [
      'Completes parkour courses at near-human speed',
      'Real-time terrain adaptation',
      'Zero-shot generalization to new obstacles',
      'Commercial applications launching 2025'
    ],
    tags: ['BostonDynamics', 'Atlas', 'Robotics', 'Mobility'],
    category: 'robotics',
    engagement: { score: 3400, comments: 892, shares: 1234 },
    isNew: false,
    isTrending: false,
    isHot: false
  },
  {
    id: '13',
    rank: 13,
    title: 'Apple Announces On-Device AI Features for iOS 19',
    punchyTitle: 'Apple\'s AI Play: Everything Runs On Your Phone',
    source: 'Apple Newsroom',
    sourceUrl: 'https://apple.com/newsroom',
    originalUrl: 'https://apple.com/newsroom/ios-19-ai',
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    timeAgo: '20 hours ago',
    summary: 'iOS 19 will feature powerful AI capabilities that run entirely on-device, prioritizing user privacy.',
    punchySummary: '🍎 Apple just bet everything on privacy. iOS 19 AI? Runs 100% on-device. No cloud. No data leaving your phone. They\'re not competing on features—they\'re competing on trust.',
    keyInsights: [
      '100% on-device processing',
      'Real-time translation in 40 languages',
      'Photo editing with natural language',
      'Siri 2.0 with conversational memory'
    ],
    tags: ['Apple', 'iOS', 'OnDevice', 'Privacy'],
    category: 'industry',
    engagement: { score: 3200, comments: 1456, shares: 2341 },
    isNew: false,
    isTrending: false,
    isHot: false
  },
  {
    id: '14',
    rank: 14,
    title: 'UAE Launches $10B Sovereign AI Initiative',
    punchyTitle: 'Dubai Goes All-In on AI — $10 Billion Sovereign Fund',
    source: 'Reuters',
    sourceUrl: 'https://reuters.com',
    originalUrl: 'https://reuters.com/technology/uae-ai-fund',
    publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
    timeAgo: '22 hours ago',
    summary: 'The United Arab Emirates announces massive investment to become a global AI hub, with Dubai as the center.',
    punchySummary: '🇦🇪 Dubai isn\'t waiting for the AI future—it\'s building it. $10 billion sovereign fund. World-class talent visas. Tax-free AI zones. The Middle East just became the dark horse in the AI race.',
    keyInsights: [
      '$10 billion sovereign AI investment fund',
      'New AI University opening in Dubai',
      'Golden Visa for AI researchers',
      'Partnerships with OpenAI and Google'
    ],
    powerQuote: '"We will make Dubai the global capital of artificial intelligence." — Sheikh Mohammed',
    tags: ['UAE', 'Dubai', 'Investment', 'MENA'],
    category: 'industry',
    engagement: { score: 2900, comments: 234, shares: 567 },
    isNew: false,
    isTrending: false,
    isHot: false
  },
  {
    id: '15',
    rank: 15,
    title: 'Researchers Create AI That Writes Secure Code',
    punchyTitle: 'This AI Writes Code — And Finds Its Own Bugs',
    source: 'GitHub Blog',
    sourceUrl: 'https://github.blog',
    originalUrl: 'https://github.blog/secure-code-ai',
    publishedAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
    timeAgo: '23 hours ago',
    summary: 'New model can generate code while simultaneously identifying and fixing security vulnerabilities.',
    punchySummary: '🔐 Copilot just got a security upgrade. This new model doesn\'t just write code—it hunts for vulnerabilities. Finds them. Fixes them. Before you even hit save.',
    keyInsights: [
      'Reduces security vulnerabilities by 80%',
      'Real-time threat detection during coding',
      'Supports 40+ programming languages',
      'Integrates with existing CI/CD pipelines'
    ],
    tags: ['GitHub', 'Security', 'Copilot', 'DevTools'],
    category: 'industry',
    engagement: { score: 2700, comments: 187, shares: 432 },
    isNew: false,
    isTrending: false,
    isHot: false
  }
];

export const categories = [
  { id: 'all', label: 'All', icon: '🔥' },
  { id: 'ml', label: 'Machine Learning', icon: '🤖' },
  { id: 'nlp', label: 'NLP & LLMs', icon: '🧠' },
  { id: 'cv', label: 'Computer Vision', icon: '👁️' },
  { id: 'robotics', label: 'Robotics', icon: '🦾' },
  { id: 'research', label: 'Research', icon: '🔬' },
  { id: 'industry', label: 'Industry', icon: '💼' },
];

export const filters = [
  { id: 'trending', label: 'Trending', icon: '🔥' },
  { id: 'latest', label: 'Latest', icon: '⚡' },
  { id: 'top', label: 'Top Sources', icon: '🎯' },
];

export const sources = [
  'OpenAI', 'DeepMind', 'Google AI', 'Meta AI', 'NVIDIA', 'Anthropic',
  'Hugging Face', 'Microsoft', 'Tesla', 'Apple', 'MIT CSAIL', 'Stanford AI',
  'TechCrunch', 'VentureBeat', 'Ars Technica', 'IEEE Spectrum', 'GitHub'
];
