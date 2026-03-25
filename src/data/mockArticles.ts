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
  tag: string;
  read_min: string;
  date: string;
  title: string;
  bigdescription?: string;
  author_img_url?: string;
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

const articles: IArticle[] = [
  {
    id: 1,
    img_url: "/ArticlePics/ArticleBigImage.png",
    tag: "Neural Network",
    read_min: "15 mins read",
    date: "March 22, 2025",
    title: "Neural Network: Top 5 Insights from TD Bank Leaders",
    council: "artificialintelligencecouncil",
    author: "",
    role: "",
    bigdescription:
      "Last Saturday, CCubed, in partnership with UTMIST, invited Anshuman Panwar, Director of AI at TD Asset Management, and Chad Koziel, Associate VP GenAI at Layer6 (TD’s AI research hub), to UofT’s downtown campus. We sat down to discuss the growing complexities and rapid development in the AI space, and to understand how TD is navigating this landscape through the expertise of these leaders. With new innovations dropping what seems like every week, uncertainty among students and industry professionals continues to rise. Hearing directly from experts in the trenches is incredibly valuable. Here are the top 5 insights that stood out from our interview, which included busting myths about complete automation, the changing job market, and much more.",
    heroImage: "/ArticlePics/ArticleBigImage",
    sections: [
      {
        type: "text",
        content:
          "(Note: This interview has been lightly edited for length and clarity.) ",
      },
      {
        type: "text",
        content:
          "Last Saturday, CCubed, in partnership with UTMIST, invited Anshuman Panwar, Director of AI at TD Asset Management, and Chad Koziel, Associate VP GenAI at Layer6 (TD’s AI research hub), to UofT’s downtown campus. We sat down to discuss the growing complexities and rapid development in the AI space, and to understand how TD is navigating this landscape through the expertise of these leaders. With new innovations dropping what seems like every week, uncertainty among students and industry professionals continues to rise. Hearing directly from experts in the trenches is incredibly valuable. Here are the top 5 insights that stood out from our interview, which included busting myths about complete automation, the changing job market, and much more.",
      },
      {
        type: "heading",
        heading: "Simplifying Everyday Workflows at TD",
        content:
          "When asked about how TD incorporates AI solutions into their employees' day-to-day lives, they mentioned that it is important that every solution is built to serve a single purpose, and serves it well. This saves an employee's time by simplifying their workload, which gives them more bandwidth to focus on innovative problem-solving.",
      },
      {
        type: "text",
        content:
          '"If you walk into a TD branch today, every single branch employee in Canada is empowered with a bespoke Gen AI tool tailored to help them answer really complex questions. For example, if a customer asks about their mother\'s estate, a situation a frontline colleague might only handle once a year, they have a tool in front of them that guides them through it step by step." – Chad Koziel',
      },
      {
        type: "text",
        content:
          '"We incorporate AI directly into the portfolio manager\'s workflow. We use AI to rank assets or provide insights into macro indicators, which helps them pick the right investments. It is not fully automated fund management; they still invest traditionally, but AI serves as a highly targeted input to enhance their decision-making.\" – Anshuman Panwar',
      },
      {
        type: "text",
        content:
          "With these inputs from Anshuman and Chad, it is clear that TD's AI teams are working hard to build cutting-edge solutions that streamline the repetitive tasks, making it easier for employees to focus on the high-value, human elements of their jobs and ultimately offer a better experience for TD’s customers.",
      },
      {
        type: "heading",
        heading: "AI Agents: And the risks involved",
        content:
          "When asked about AI agents and complete automation, the leaders expressed caution. And Chad spoke about how AI is still not completely ready to take over end-to-end jobs and how critical it is to incorporate strict guardrails. To illustrate this, he pointed to the recent event of a Meta executive whose emails were accidentally deleted by an AI agent, despite commands being given to stop..",
      },
      {
        type: "text",
        content:
          "\"Having that type of open-ended agentic capability on someone's desktop at TD frankly horrifies me. It is simply not sufficiently performant in a highly general-purpose task; we can't measure and manage it today. What is going to explode over the next five years, however, is optimizing agentic solutions for specific tasks that are much narrower in scope—fit-to-purpose areas where we can identify discrete inputs and outputs and build an operational process around them.\" – Chad Koziel",
      },
      {
        type: "text",
        content:
          "This goes to show that we are still a long way off from giving AI general, open-ended autonomy. Implementing AI solutions has to be narrow and fit-to-purpose, especially in the banking industry, where the operational risks have to be mitigated before anything else.",
      },
      {
        type: "heading",
        heading: "AI being a Copilot rather than an Autopilot",
        content:
          "One of the key takeaways from the conversation was Anshuman busting the myth of 100% automation. Today, many people believe that entire teams could be replaced by AI and that complex business processes will become obsolete overnight.",
      },
      {
        type: "text",
        content:
          '"One of the wrong assumptions that both technical and non-technical people have is the 100% automation of a business process. Business processes are much more complex than just chatting with a chatbot. I have never seen 100% automation be possible for a complex process. It is always a co-pilot versus auto-pilot scenario. AI will help you in the process and make it more efficient, but it won\'t fully automate it. You still need people." – Anshuman Panwar',
      },
      {
        type: "text",
        content:
          "Understanding this insight is critical to comprehending the strategic use of AI at an enterprise level. It makes a lot more sense to engineer AI as a copilot integrated into your existing workflows to simplify complex operations, rather than trying to build a fully autonomous replacement.",
      },

      {
        type: "heading",
        heading: "Why Simpler Solutions are Still Irreplaceable",
        content:
          "Something that is incredibly important to know, especially for new developers, is that the latest trendy LLM is not always the right choice. Especially when dealing with the banking industry and with money, the choice of solution must be strictly tailored to the requirement.",
      },
      {
        type: "text",
        content:
          '"Wherever you are more closer to money, more explainability is required... Sometime full explainability is required. So maybe a simple linear regression model would be something to start with. In high frequency trading, where latency is very important, each microsecond matters... simpler models are still kind of preferred." – Anshuman Panwar',
      },
      {
        type: "text",
        content:
          "For students building their own predictive models, this is a great reminder. Before jumping straight to a massive transformer model, consider if a traditional machine learning algorithm, like a Support Vector Machine or Linear Regression, might actually be the better, more explainable option for the job.",
      },

      {
        type: "heading",
        heading: "The Rising Bar: Advice for Fresh Graduates",
        content:
          "With AI tools now at a point which is frankly “magic” according to Chad and most developers familiar with the mind blowing developments, with it being able to generate boilerplate code in seconds that would take normal teams weeks to do. A major concern for fresh graduates is how to stand out. Both leaders emphasized that despite the barrier to entry is rising, the demand for smart, adaptable junior talent is still incredibly high.",
      },
      {
        type: "text",
        content:
          '"The bar now for scientists and engineers is being raised continuously... Whereas in the past core talents that you needed to hone were your ability to write the code. Now in my view, it\'s flipping a little bit to your ability to interrogate the code, to understand blind spots... writing tests to ensure that the agents are building the right thing." – Chad Koziel',
      },
      {
        type: "text",
        content:
          "\"Any one skill is typically fairly easy to replace... You bring a combination of skills that's unique and that is truly impossible to replace... Focus on the skills which can't be replaced by AI: how you handle stakeholders, how you build trust, and how you understand business processes end-to-end.\" – Chad Koziel & Anshuman Panwar",
      },
      {
        type: "text",
        content:
          "The days of just memorizing syntax are fading. Today's developers need to act more like code reviewers understanding system architecture, maintaining rigorous coding standards, and testing AI outputs. If you can combine that technical foundation with the ability to coordinate projects and communicate effectively with non-technical stakeholders, you will become an irreplaceable asset to any organization.",
      },

      {
        type: "heading",
        heading: "Thanks for reading!",
        content:
          "(The full interview will be uploaded to the CCubed YouTube channel very soon!)",
      },
    ],
  },
];
export const mockArticles: IArticle[] = articles.map((article) => ({
  ...article,
  tableOfContents: article.sections
    ?.filter((section) => section.type === "heading")
    .map((section) => section.heading!) || [],
}));
