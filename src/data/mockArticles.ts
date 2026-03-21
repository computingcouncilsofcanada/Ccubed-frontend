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
// const ARTICLE_HERO_IMG = "/ArticlePics/ArticleHero.png";
// const ARTICLE_BIG_IMG = "/ArticlePics/ArticleBigImage.png";

export const mockArticles: IArticle[] = [
  {
    id: 1,
    img_url: "/ArticlePics/ArticleBigImage",
    title: "Neural Network",
    read_min: "7 mins read",
    date: "Feb 21, 2025",
    description: "Neural Network EP1 - Financial Modeling in the Age of AI with TD & Layer 6 AI",
    council: "artificialintelligencecouncil",
    author: "Sarah Johnson",
    role: "AI Coordinator",
    bigdescription:
      "Coming Soon",
    heroImage: "/ArticlePics/ArticleBigImage",
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
          "/ArticlePics/ArticleBigImage",
          "/ArticlePics/ArticleBigImage",
          "/ArticlePics/ArticleBigImage",
          "/ArticlePics/ArticleBigImage",
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
];
