export interface IArticleSection {
  type: "text" | "heading" | "list" | "image" | "images";
  heading?: string;
  content?: string;
  items?: string[];
  images?: string[];
}

export interface IArticleShareLinks {
  icon: string;
  url: string;
}
export interface IArticle {
  id: number;
  img_url: string;
  title: string;
  read_min: string;
  date: string;
  description: string;
  bigdescription?: string;
  council: string;
  author?: string;
  role?: string;
  heroImage?: string;
  sections?: IArticleSection[];
  tableOfContents?: string[];
  shareLinks?: IArticleShareLinks[];
}

// Use only images that exist in public/ArticlePics: ArticleHero.png, ArticleBigImage.png, ArticleImage.png, ArticleComputer.png, computer.png
const ARTICLE_HERO_IMG = "/ArticlePics/ArticleHero.png";
const ARTICLE_BIG_IMG = "/ArticlePics/ArticleBigImage.png";

export const mockArticles: IArticle[] = [
  {
    id: 1,
    img_url: ARTICLE_HERO_IMG,
    title: "Information Security",
    read_min: "7 mins read",
    date: "Nov 21, 2025",
    description: "Top Cyber Threats Every User Should Watch Out For",
    council: "cybersecuritycouncil",
    author: "Sarah Johnson",
    role: "Cybersecurity Analyst",
    bigdescription:
      "From phishing and ransomware to supply chain attacks, learn which threats matter most in 2025 and how to defend yourself and your organization with practical, up-to-date security practices.",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "What Exactly is Cybersecurity?",
      "Top Threats in 2025",
      "Best Practices for Protection",
      "The Future of Security",
    ],
    sections: [
      {
        type: "text",
        content:
          "Staying safe online is no longer just an IT concern—it affects everyone. Whether you use email, social media, or work from a company device, understanding today’s main cyber threats and how to respond is essential. This guide walks you through what to watch for and how to protect yourself and your data.",
      },
      {
        type: "heading",
        heading: "What Exactly is Cybersecurity?",
        content:
          "Cybersecurity is the set of practices, tools, and processes used to protect systems, networks, and data from digital attacks. It covers everything from securing your passwords and devices to how organizations defend their infrastructure and customer data against breaches and misuse.",
      },
      {
        type: "heading",
        heading: "Why Cybersecurity Matters Today",
        content:
          "Attacks are more frequent, automated, and targeted than ever. A single breach can lead to identity theft, financial loss, or damage to your employer’s reputation. Good security habits and awareness significantly reduce your risk and make you a harder target.",
      },
      {
        type: "heading",
        heading: "Top Threats in 2025",
        content:
          "The threat landscape keeps changing. These are some of the most common and impactful risks you should be aware of:",
      },
      {
        type: "list",
        items: [
          "Phishing and social engineering—emails and messages that trick you into clicking links or sharing credentials",
          "Ransomware—malware that locks your files or systems until a ransom is paid",
          "Supply chain and third-party attacks—compromises through vendors or software you trust",
          "Credential theft and account takeover—stolen or leaked passwords used to access your accounts",
        ],
      },
      {
        type: "heading",
        heading: "Best Practices for Protection",
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
      {
        type: "text",
        content:
          "You don’t need to be an expert to improve your security. A few consistent habits go a long way:",
      },
      {
        type: "list",
        items: [
          "Use strong, unique passwords and enable multi-factor authentication (MFA) wherever possible",
          "Keep your devices and software updated so security patches are applied",
          "Be cautious with links and attachments—verify the sender and avoid rushing",
          "Use encryption for sensitive data and prefer HTTPS and trusted networks",
        ],
      },
      {
        type: "heading",
        heading: "The Future of Security",
        content:
          "Security will keep evolving with AI, automation, and new regulations. Staying informed, following basic best practices, and supporting your organization’s security policies will help you stay ahead of threats and protect what matters most.",
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 2,
    img_url: ARTICLE_HERO_IMG,
    title: "Machine Learning Fundamentals",
    read_min: "5 mins read",
    date: "Nov 20, 2025",
    description: "Understanding the basics of machine learning algorithms",
    council: "artificialintelligencecouncil",
    author: "Dr. Michael Chen",
    role: "AI Research Scientist",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "What is Machine Learning?",
      "Supervised vs Unsupervised Learning",
      "Key Algorithms to Know",
      "Getting Started in ML",
    ],
    sections: [
      {
        type: "text",
        content:
          "Machine learning (ML) is a branch of artificial intelligence where systems learn patterns from data instead of being explicitly programmed. From recommendation engines to fraud detection, ML powers many of the tools we use every day.",
      },
      {
        type: "heading",
        heading: "What is Machine Learning?",
        content:
          "ML enables computers to improve at a task through experience. You provide data and a goal; the algorithm finds relationships and makes predictions or decisions. Common applications include image recognition, natural language processing, and forecasting.",
      },
      {
        type: "heading",
        heading: "Supervised vs Unsupervised Learning",
        content:
          "In supervised learning, you train on labeled data (inputs with known outputs). In unsupervised learning, the model finds structure in unlabeled data—clustering, dimensionality reduction, or anomaly detection. Semi-supervised and reinforcement learning extend these ideas.",
      },
      {
        type: "heading",
        heading: "Key Algorithms to Know",
        content:
          "A solid foundation includes:",
      },
      {
        type: "list",
        items: [
          "Linear and logistic regression for prediction and classification",
          "Decision trees and random forests for interpretable, robust models",
          "Gradient boosting (e.g. XGBoost) for tabular data",
          "Neural networks and deep learning for complex patterns in images and text",
        ],
      },
      {
        type: "heading",
        heading: "Getting Started in ML",
        content:
          "Start with Python, libraries like scikit-learn and pandas, and a course or book on ML fundamentals. Practice on real datasets, then explore deep learning with PyTorch or TensorFlow. A strong grasp of math (linear algebra, calculus, statistics) will help you go further.",
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 3,
    img_url: ARTICLE_HERO_IMG,
    title: "Breaking Barriers in Tech",
    read_min: "8 mins read",
    date: "Nov 19, 2025",
    description: "How women are leading innovation in technology",
    council: "womenintechcouncil",
    author: "Emily Rodriguez",
    role: "Tech Diversity Advocate",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Why Representation in Tech Matters",
      "Women Leading Innovation",
      "Building Inclusive Teams",
      "Resources and Communities",
    ],
    sections: [
      {
        type: "text",
        content:
          "Women are driving some of the most impactful innovations in technology—from AI and cybersecurity to product design and engineering. Diverse teams build better products and create more inclusive solutions for everyone.",
      },
      {
        type: "heading",
        heading: "Why Representation in Tech Matters",
        content:
          "When tech teams reflect the people they serve, products are more thoughtful and accessible. Representation also inspires the next generation and helps close the gender gap in STEM education and hiring.",
      },
      {
        type: "heading",
        heading: "Women Leading Innovation",
        content:
          "Across startups, research labs, and enterprises, women are leading in areas such as ethical AI, human-centered design, and security. Their leadership highlights the value of collaboration, empathy, and diverse problem-solving.",
      },
      {
        type: "heading",
        heading: "Building Inclusive Teams",
        content:
          "Inclusive cultures don’t happen by accident. They require clear policies, mentorship, sponsorship, and accountability. Companies that invest in diversity and inclusion see better retention and stronger outcomes.",
      },
      {
        type: "heading",
        heading: "Resources and Communities",
        content:
          "Communities like Women in Tech councils, coding bootcamps, and professional networks offer support, mentorship, and opportunities. Finding your community can accelerate your growth and open doors.",
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 4,
    img_url: ARTICLE_HERO_IMG,
    title: "Network Security Best Practices",
    read_min: "6 mins read",
    date: "Nov 18, 2025",
    description: "Essential practices for securing your network infrastructure",
    council: "cybersecuritycouncil",
    author: "Robert Kim",
    role: "Network Security Engineer",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Why Network Security Matters",
      "Segmentation and Access Control",
      "Monitoring and Incident Readiness",
      "Staying Ahead of Threats",
    ],
    sections: [
      {
        type: "text",
        content:
          "A secure network is the backbone of any organization. From firewalls and segmentation to access controls and monitoring, these practices help protect your infrastructure from unauthorized access and attacks.",
      },
      {
        type: "heading",
        heading: "Why Network Security Matters",
        content:
          "A well-secured network limits exposure to attacks and helps contain breaches. Segmentation, access controls, and monitoring are foundational to protecting infrastructure and data.",
      },
      {
        type: "heading",
        heading: "Top Threats in 2025",
        content:
          "The cybersecurity landscape is constantly evolving. Here are the main threats organizations face today:",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 5,
    img_url: ARTICLE_HERO_IMG,
    title: "Deep Learning Applications",
    read_min: "10 mins read",
    date: "Nov 17, 2025",
    description: "Exploring real-world applications of deep neural networks",
    council: "artificialintelligencecouncil",
    author: "Dr. Lisa Wang",
    role: "Machine Learning Engineer",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "What is Deep Learning?",
      "Computer Vision and NLP",
      "Healthcare and Science",
      "Getting Hands-On",
    ],
    sections: [
      {
        type: "text",
        content:
          "Deep learning powers many of today’s most impressive AI systems. From image and speech recognition to language models and drug discovery, neural networks are solving problems that were once thought to require human-only insight.",
      },
      {
        type: "heading",
        heading: "What is Deep Learning?",
        content:
          "Deep learning uses multi-layer neural networks to learn complex patterns from data. It drives advances in vision, language, and decision-making across industries.",
      },
      {
        type: "heading",
        heading: "Top Threats in 2025",
        content:
          "The cybersecurity landscape is constantly evolving. Here are the main threats organizations face today:",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 6,
    img_url: ARTICLE_HERO_IMG,
    title: "Women Tech Leaders to Watch",
    read_min: "4 mins read",
    date: "Nov 16, 2025",
    description: "Profiles of influential women shaping the tech industry",
    council: "womenintechcouncil",
    author: "Jessica Thompson",
    role: "Tech Journalist",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Leaders in AI and Research",
      "Entrepreneurs and Executives",
      "Why Visibility Matters",
      "How to Follow Their Work",
    ],
    sections: [
      {
        type: "text",
        content:
          "Women are leading some of the most important initiatives in tech—from AI research and product development to company building and policy. Here are leaders whose work is shaping the industry and inspiring the next generation.",
      },
      {
        type: "heading",
        heading: "Leaders in AI and Research",
        content:
          "Women are leading research and product teams in AI, robotics, and related fields. Their work is shaping how we build and govern technology for the future.",
      },
      {
        type: "heading",
        heading: "Top Threats in 2025",
        content:
          "The cybersecurity landscape is constantly evolving. Here are the main threats organizations face today:",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 7,
    img_url: ARTICLE_HERO_IMG,
    title: "Modern Encryption Techniques",
    read_min: "9 mins read",
    date: "Nov 15, 2025",
    description: "Advanced encryption methods for data protection",
    council: "cybersecuritycouncil",
    author: "David Martinez",
    role: "Cryptography Specialist",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Encryption at Rest and in Transit",
      "Symmetric vs Asymmetric Crypto",
      "Best Practices for Key Management",
      "Future-Proofing with Post-Quantum",
    ],
    sections: [
      {
        type: "text",
        content:
          "Encryption is one of the strongest tools we have to protect data from unauthorized access. Modern techniques secure everything from messages and payments to stored files and backups—when implemented and managed correctly.",
      },
      {
        type: "heading",
        heading: "Encryption at Rest and in Transit",
        content:
          "Data should be protected both when stored (at rest) and when sent over networks (in transit). TLS for transport and AES for storage are common standards.",
      },
      {
        type: "heading",
        heading: "Top Threats in 2025",
        content:
          "The cybersecurity landscape is constantly evolving. Here are the main threats organizations face today:",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 8,
    img_url: ARTICLE_HERO_IMG,
    title: "AI in Robotics",
    read_min: "7 mins read",
    date: "Nov 14, 2025",
    description: "How artificial intelligence is revolutionizing robotics",
    council: "artificialintelligencecouncil",
    author: "Dr. Amanda Foster",
    role: "Robotics Engineer",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "From Factories to Everyday Life",
      "AI and Perception in Robotics",
      "Safety and Ethics",
      "Careers in Robotics",
    ],
    sections: [
      {
        type: "text",
        content:
          "Robotics and automation are reshaping manufacturing, logistics, healthcare, and more. Combined with AI for perception and decision-making, robots are becoming safer, more flexible, and increasingly part of our daily lives.",
      },
      {
        type: "heading",
        heading: "From Factories to Everyday Life",
        content:
          "AI enables robots to sense, plan, and adapt in real time. From assembly lines to warehouses and even homes, intelligent robots are handling tasks that once required rigid programming or human intervention.",
      },
      {
        type: "heading",
        heading: "AI and Perception in Robotics",
        content:
          "Computer vision, lidar, and other sensors feed into ML models that help robots navigate, grasp objects, and collaborate with humans. Reinforcement learning is increasingly used for control and optimization.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 9,
    img_url: ARTICLE_HERO_IMG,
    title: "Coding Bootcamps for Women",
    read_min: "6 mins read",
    date: "Nov 13, 2025",
    description: "Best coding bootcamps with strong female communities",
    council: "womenintechcouncil",
    author: "Rachel Green",
    role: "Software Developer",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Why Bootcamps Work",
      "Programs with Strong Communities",
      "What to Look For",
      "After Graduation",
    ],
    sections: [
      {
        type: "text",
        content:
          "Coding bootcamps offer an intensive path into tech. For women, choosing a program with a supportive community and inclusive culture can make a big difference in learning, networking, and landing your first role.",
      },
      {
        type: "heading",
        heading: "Why Bootcamps Work",
        content:
          "Bootcamps focus on practical skills and project work, often with career support. Many graduates successfully transition into software development, data, or related roles within months.",
      },
      {
        type: "heading",
        heading: "Programs with Strong Communities",
        content:
          "Look for bootcamps that highlight diversity, women-in-tech initiatives, mentorship, and alumni networks. Community support can help you stay motivated and open doors to opportunities.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 10,
    img_url: ARTICLE_HERO_IMG,
    title: "Firewall Configuration Guide",
    read_min: "8 mins read",
    date: "Nov 12, 2025",
    description: "Step-by-step guide to configuring enterprise firewalls",
    council: "cybersecuritycouncil",
    author: "James Wilson",
    role: "Infrastructure Security Lead",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Why Firewalls Matter",
      "Rules and Segmentation",
      "Monitoring and Tuning",
      "Common Pitfalls",
    ],
    sections: [
      {
        type: "text",
        content:
          "Firewalls are a core part of network security. Proper configuration—rules, segmentation, and monitoring—helps block unauthorized access while keeping legitimate traffic flowing.",
      },
      {
        type: "heading",
        heading: "Why Firewalls Matter",
        content:
          "Firewalls filter traffic between networks based on rules. They help prevent unauthorized access, limit blast radius of breaches, and support compliance and segmentation strategies.",
      },
      {
        type: "heading",
        heading: "Rules and Segmentation",
        content:
          "Define clear allow/deny rules, segment critical assets, and document changes. Default-deny and least-privilege principles reduce risk and make troubleshooting easier.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 11,
    img_url: ARTICLE_HERO_IMG,
    title: "Natural Language Processing",
    read_min: "12 mins read",
    date: "Nov 11, 2025",
    description: "Understanding how computers process human language",
    council: "artificialintelligencecouncil",
    author: "Dr. Priya Patel",
    role: "NLP Research Lead",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "What is NLP?",
      "From Rules to Deep Learning",
      "Applications Today",
      "Ethics and Limitations",
    ],
    sections: [
      {
        type: "text",
        content:
          "Natural language processing (NLP) lets machines read, interpret, and generate human language. From search and translation to chatbots and large language models, NLP is at the heart of how we interact with AI.",
      },
      {
        type: "heading",
        heading: "What is NLP?",
        content:
          "NLP combines linguistics and machine learning to work with text and speech. Tasks include classification, extraction, translation, summarization, and generation—all of which power modern applications.",
      },
      {
        type: "heading",
        heading: "From Rules to Deep Learning",
        content:
          "Early NLP relied on hand-crafted rules and statistics. Today, transformers and large language models have dramatically improved quality and flexibility across many languages and use cases.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 12,
    img_url: ARTICLE_HERO_IMG,
    title: "Mentoring the Next Generation",
    read_min: "5 mins read",
    date: "Nov 10, 2025",
    description: "How women in tech can mentor aspiring developers",
    council: "womenintechcouncil",
    author: "Maria Garcia",
    role: "Senior Engineering Manager",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Why Mentorship Matters",
      "Finding a Mentor",
      "Being a Mentor",
      "Building a Mentorship Culture",
    ],
    sections: [
      {
        type: "text",
        content:
          "This article covers key concepts and practical advice for this topic. Whether you're new to the field or looking to deepen your knowledge, you'll find useful takeaways and next steps.",
      },
      {
        type: "heading",
        heading: "Going Deeper",
        content:
          "Depending on your role and goals, you can explore certifications, hands-on labs, open source, or community events. Consistency and curiosity will take you far.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 13,
    img_url: ARTICLE_HERO_IMG,
    title: "Phishing Attack Prevention",
    read_min: "7 mins read",
    date: "Nov 9, 2025",
    description: "Identifying and preventing phishing attacks in organizations",
    council: "cybersecuritycouncil",
    author: "Kevin Lee",
    role: "Security Operations Analyst",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "What is Phishing?",
      "How to Spot Phishing",
      "Prevention and Training",
      "Responding to Incidents",
    ],
    sections: [
      {
        type: "text",
        content:
          "This article covers key concepts and practical advice for this topic. Whether you're new to the field or looking to deepen your knowledge, you'll find useful takeaways and next steps.",
      },
      {
        type: "heading",
        heading: "Going Deeper",
        content:
          "Depending on your role and goals, you can explore certifications, hands-on labs, open source, or community events. Consistency and curiosity will take you far.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 14,
    img_url: ARTICLE_HERO_IMG,
    title: "Building Intelligent Chatbots",
    read_min: "9 mins read",
    date: "Nov 8, 2025",
    description: "Creating AI-powered conversational interfaces",
    council: "artificialintelligencecouncil",
    author: "Sophie Turner",
    role: "Conversational AI Developer",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "What Makes a Good Chatbot",
      "Design and UX",
      "NLP and Integration",
      "Ethics and Safety",
    ],
    sections: [
      {
        type: "text",
        content:
          "This article covers key concepts and practical advice for this topic. Whether you're new to the field or looking to deepen your knowledge, you'll find useful takeaways and next steps.",
      },
      {
        type: "heading",
        heading: "Going Deeper",
        content:
          "Depending on your role and goals, you can explore certifications, hands-on labs, open source, or community events. Consistency and curiosity will take you far.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 15,
    img_url: ARTICLE_HERO_IMG,
    title: "Women-Founded Tech Startups",
    read_min: "6 mins read",
    date: "Nov 7, 2025",
    description: "Success stories from female tech entrepreneurs",
    council: "womenintechcouncil",
    author: "Victoria Chang",
    role: "Tech Entrepreneur",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Founder Stories",
      "Challenges and Wins",
      "Advice for Aspiring Founders",
      "Resources and Networks",
    ],
    sections: [
      {
        type: "text",
        content:
          "This article covers key concepts and practical advice for this topic. Whether you're new to the field or looking to deepen your knowledge, you'll find useful takeaways and next steps.",
      },
      {
        type: "heading",
        heading: "Going Deeper",
        content:
          "Depending on your role and goals, you can explore certifications, hands-on labs, open source, or community events. Consistency and curiosity will take you far.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 16,
    img_url: ARTICLE_HERO_IMG,
    title: "Incident Response Planning",
    read_min: "11 mins read",
    date: "Nov 6, 2025",
    description:
      "Creating effective incident response plans for your organization",
    council: "cybersecuritycouncil",
    author: "Thomas Anderson",
    role: "Incident Response Manager",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Why Incident Response Matters",
      "Building Your Plan",
      "Roles and Communication",
      "Testing and Improvement",
    ],
    sections: [
      {
        type: "text",
        content:
          "This article covers key concepts and practical advice for this topic. Whether you're new to the field or looking to deepen your knowledge, you'll find useful takeaways and next steps.",
      },
      {
        type: "heading",
        heading: "Going Deeper",
        content:
          "Depending on your role and goals, you can explore certifications, hands-on labs, open source, or community events. Consistency and curiosity will take you far.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 17,
    img_url: ARTICLE_HERO_IMG,
    title: "Computer Vision Advances",
    read_min: "8 mins read",
    date: "Nov 5, 2025",
    description: "Latest breakthroughs in computer vision technology",
    council: "artificialintelligencecouncil",
    author: "Dr. Nina Kowalski",
    role: "Computer Vision Researcher",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "What is Computer Vision?",
      "Key Applications",
      "Recent Advances",
      "Getting Started",
    ],
    sections: [
      {
        type: "text",
        content:
          "This article covers key concepts and practical advice for this topic. Whether you're new to the field or looking to deepen your knowledge, you'll find useful takeaways and next steps.",
      },
      {
        type: "heading",
        heading: "Going Deeper",
        content:
          "Depending on your role and goals, you can explore certifications, hands-on labs, open source, or community events. Consistency and curiosity will take you far.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 18,
    img_url: ARTICLE_HERO_IMG,
    title: "Building Inclusive Tech Teams",
    read_min: "7 mins read",
    date: "Nov 4, 2025",
    description: "Strategies for creating diverse and inclusive workplaces",
    council: "womenintechcouncil",
    author: "Zara Ahmed",
    role: "Diversity & Inclusion Specialist",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Why Diversity and Inclusion Matter",
      "Inclusive Hiring and Retention",
      "Culture and Belonging",
      "Measuring Progress",
    ],
    sections: [
      {
        type: "text",
        content:
          "This article covers key concepts and practical advice for this topic. Whether you're new to the field or looking to deepen your knowledge, you'll find useful takeaways and next steps.",
      },
      {
        type: "heading",
        heading: "Going Deeper",
        content:
          "Depending on your role and goals, you can explore certifications, hands-on labs, open source, or community events. Consistency and curiosity will take you far.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 19,
    img_url: ARTICLE_HERO_IMG,
    title: "Security Compliance Standards",
    read_min: "10 mins read",
    date: "Nov 3, 2025",
    description:
      "Understanding major cybersecurity compliance frameworks",
    council: "cybersecuritycouncil",
    author: "Mark Thompson",
    role: "Compliance Officer",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Why Compliance Matters",
      "Key Frameworks (e.g. NIST, ISO, SOC 2)",
      "Implementing Controls",
      "Audits and Continuous Improvement",
    ],
    sections: [
      {
        type: "text",
        content:
          "This article covers key concepts and practical advice for this topic. Whether you're new to the field or looking to deepen your knowledge, you'll find useful takeaways and next steps.",
      },
      {
        type: "heading",
        heading: "Going Deeper",
        content:
          "Depending on your role and goals, you can explore certifications, hands-on labs, open source, or community events. Consistency and curiosity will take you far.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 20,
    img_url: ARTICLE_HERO_IMG,
    title: "AI Ethics and Bias",
    read_min: "9 mins read",
    date: "Nov 2, 2025",
    description: "Addressing ethical considerations in artificial intelligence",
    council: "artificialintelligencecouncil",
    author: "Dr. Aisha Kumar",
    role: "AI Ethics Researcher",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Why AI Ethics Matter",
      "Bias, Fairness, and Transparency",
      "Accountability and Governance",
      "Practical Guidelines",
    ],
    sections: [
      {
        type: "text",
        content:
          "This article covers key concepts and practical advice for this topic. Whether you're new to the field or looking to deepen your knowledge, you'll find useful takeaways and next steps.",
      },
      {
        type: "heading",
        heading: "Going Deeper",
        content:
          "Depending on your role and goals, you can explore certifications, hands-on labs, open source, or community events. Consistency and curiosity will take you far.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
  {
    id: 21,
    img_url: ARTICLE_HERO_IMG,
    title: "Top Tech Conferences for Women",
    read_min: "5 mins read",
    date: "Nov 1, 2025",
    description: "Must-attend conferences for women in technology",
    council: "womenintechcouncil",
    author: "Hannah Davis",
    role: "Community Manager",
    heroImage: ARTICLE_BIG_IMG,
    tableOfContents: [
      "Why Conferences Matter",
      "Top Picks by Region and Focus",
      "Getting the Most Out of Events",
      "Virtual and Hybrid Options",
    ],
    sections: [
      {
        type: "text",
        content:
          "This article covers key concepts and practical advice for this topic. Whether you're new to the field or looking to deepen your knowledge, you'll find useful takeaways and next steps.",
      },
      {
        type: "heading",
        heading: "Going Deeper",
        content:
          "Depending on your role and goals, you can explore certifications, hands-on labs, open source, or community events. Consistency and curiosity will take you far.",
      },
      {
        type: "heading",
        heading: "Key Takeaways",
        content:
          "Apply these principles in your own context—whether you're securing systems, building AI, or growing your career in tech.",
      },
      {
        type: "list",
        items: [
          "Stay curious and keep learning; the field evolves quickly",
          "Connect with communities and mentors for support",
          "Practice on real projects to build skills and confidence",
          "Share what you learn and help others get started",
        ],
      },
      {
        type: "images",
        images: [
          ARTICLE_BIG_IMG,
          ARTICLE_BIG_IMG,
        ],
      },
    ],
    shareLinks: [
      { icon: "/ArticlePics/icons/Discord.svg", url: "/" },
      { icon: "/ArticlePics/icons/Instagram.svg", url: "/" },
      { icon: "/ArticlePics/icons/Facebook.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitch.svg", url: "/" },
      { icon: "/ArticlePics/icons/Twitter.svg", url: "/" },
    ],
  },
];
