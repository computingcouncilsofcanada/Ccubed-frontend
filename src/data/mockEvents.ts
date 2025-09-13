// Mock data for testing events implementation
export const mockEvents = [
  {
    id: 1,
    name: "TechTalk: Your CS Pathway",
    description:
      "We hosted a tech panel featuring top students from diverse domains—co-op, leadership, entrepreneurship, and research—who shared their unique perspectives on what computer science means beyond big tech and social media. Attendees had the opportunity to ask questions directly, gaining insights into the panelists’ learning styles, backgrounds, journeys, and networking approaches. The session highlighted the many pathways in CS and offered valuable advice on building skills, resumes, and connections.",
    status: 1,
    date: "2024-10-04",
    time: "3:00 PM - 5:00 PM",
    location: "Discord",
    images: "",
    files: [
      {
        id: 1,
        name: "cs pathway.png",
        url: "https://lh3.googleusercontent.com/d/1YJReI17iI2upeD5Oh_C1pL2_4Zj37Pw5",
      },
    ],
    types: ["Online"],
  },
  {
    id: 2,
    name: "DevOps Live Series",
    description:
      "In August, we hosted a beginner-friendly live series on DevOps, designed to make concepts like Kubernetes and server management approachable. Led by Nathan, the sessions walked participants through building a small server setup (a “homelab”) from scratch, with a focus on practical learning in a relaxed, interactive environment. The series also opened the floor for broader conversations—whether about technology, career development, or graduate school—drawing on Nathan’s unique perspective as a Master’s graduate and former PhD candidate. Sessions ran every Thursday evening, 6–8 PM EDT, throughout the month.",
    status: 1,
    date: "Every Thursday",
    time: "6:00 PM - 8:00 PM",
    location: "YouTube Live",
    images: "",
    files: [
      {
        id: 2,
        name: "Kubernetes_Series_Post.png",
        url: "https://lh3.googleusercontent.com/d/12zbm6XJtbMuo4pbh6oJub86sFk3-kPBr",
      },
    ],
    types: ["Online"],
  },
  {
    id: 3,
    name: "Intro to CTF",
    description:
      "We hosted an introductory Capture the Flag (CTF) workshop to help students get started with cybersecurity competitions. The session began with an overview of what CTFs are and how they work, followed by hands-on practice with beginner-friendly challenges on PicoCTF. Our team guided participants through the problem-solving process, offering hints and support as they tackled real-world inspired security puzzles.",
    status: 1,
    date: "2025-07-30",
    time: "10:00 AM - 10:00 AM",
    location: "Google Meet",
    images: "",
    files: [
      {
        id: 3,
        name: "Intro_to_CTF.png",
        url: "https://lh3.googleusercontent.com/d/1F2Lg3AnC3r9k0Up0_xgumdiDlXd6_ixQ",
      },
    ],
    types: ["Online"],
  },
  {
    id: 4,
    name: "Networking Event",
    description:
      "We bring to you Canada's top 9 startups from different domains. Further details TBD",
    status: 1,
    date: "TBD",
    time: "TBD",
    location: "TBD",
    images: "",
    files: [
      {
        id: 4,
        name: "CCubed_icon.png",
        url: "https://lh3.googleusercontent.com/d/1H9WOmrtzV-cjLf7MFWwQkYy_WxnyKjPP",
      },
    ],
    types: ["Online"],
  },
  {
    id: 5,
    name: "TechTalk: Landing Your dream internship",
    description:
      "TechTalk: Landing Your Dream Internship brought together top student panelists with experience at companies like Google, Amazon, Tesla, Meta, and more. Hosted in partnership with universities across Canada, the session gave attendees a chance to hear first-hand internship experiences, tips on applications, and navigating the recruitment process. Students also engaged directly with panelists to learn about resumes, interviews, and building the right connections to land their dream roles.",
    status: 1,
    date: "2025-01-11",
    time: "3:00 PM - 5:00 PM",
    location: "Discord Server",
    images: "",
    files: [
      {
        id: 5,
        name: "TechTalk_Landing_your_dream_internshpip.png",
        url: "https://lh3.googleusercontent.com/d/1d4IHBMddnLr5mOY-Sw7b5FAabc8R7x3a",
      },
    ],
    types: ["Online"],
  },
  {
    id: 6,
    name: "Cybersecurity Bootcamp: Level Up with CCubed Day 1",
    description:
      "We hosted a 5-day intensive Cybersecurity Bootcamp designed for beginners, starting from the fundamentals and building up to hands-on challenges. Participants learned the essentials of cybersecurity, including the CIA triad and core security principles, before putting their skills to the test in a Capture the Flag (CTF) competition. The program was enriched by guest sessions from two industry leaders: Azzam Hamdan (AWS) and Dominic Vogel (cybersecurity entrepreneur).",
    status: 1,
    date: "2025-06-20",
    time: "2:00 PM - 4:00 PM",
    location: "Google Meet and YouTube",
    images: "",
    files: [
      {
        id: 6,
        name: "Cyber_bootcamp.png",
        url: "https://lh3.googleusercontent.com/d/1JEN4OaAh0YxyKDQd-h0_LHibJbdPRyzY",
      },
    ],
    types: ["Online"],
  },
];

// Export the type for TypeScript usage
export type MockEvent = (typeof mockEvents)[0];


// old mock events 

// // Mock data for testing events implementation
// export const mockEvents = [
//   {
//     id: 1,
//     name: "Tech Talk: AI & the Future of Jobs",
//     description:
//       "Join industry experts as they discuss how AI is reshaping the job market. Get insights on staying relevant and building future-proof skills.",
//     status: 1,
//     date: "2025-08-10",
//     time: "3:00 PM - 5:00 PM",
//     location: "Google Meet",
//     images: "",
//     files: [
//       {
//         id: 1,
//         name: "event-image-1.jpg",
//         url: "/FigmaFiles/eventsAssets/discord.svg",
//       },
//     ],
//     types: ["Online"],
//   },
//   {
//     id: 2,
//     name: "Beginner Coding Bootcamp: Web Dev",
//     description:
//       "Perfect for beginners! Learn the fundamentals of web development in this hands-on bootcamp.",
//     status: 1,
//     date: "2025-08-29",
//     time: "2:00 PM - 6:00 PM",
//     location: "Dawson College - Lab B203",
//     images: "",
//     files: [
//       {
//         id: 2,
//         name: "event-image-2.jpg",
//         url: "/FigmaFiles/eventsAssets/ppl.svg",
//       },
//     ],
//     types: ["In Person"],
//   },
//   {
//     id: 3,
//     name: "React Workshop: Building Modern UIs",
//     description:
//       "Learn to build modern user interfaces with React. Hands-on workshop covering components, hooks, and state management.",
//     status: 1,
//     date: "2025-09-05",
//     time: "10:00 AM - 4:00 PM",
//     location: "Toronto Tech Hub",
//     images: "",
//     files: [
//       {
//         id: 3,
//         name: "event-image-3.jpg",
//         url: "/FigmaFiles/eventsAssets/discord.svg",
//       },
//     ],
//     types: ["In Person"],
//   },
//   {
//     id: 4,
//     name: "Networking Night: Computing Students Connect",
//     description:
//       "Join fellow computing students for an evening of networking, sharing experiences, and building connections.",
//     status: 1,
//     date: "2025-09-12",
//     time: "6:00 PM - 9:00 PM",
//     location: "Discord Community Server",
//     images: "",
//     files: [
//       {
//         id: 4,
//         name: "event-image-4.jpg",
//         url: "/FigmaFiles/eventsAssets/discord.svg",
//       },
//     ],
//     types: ["Online"],
//   },
//   {
//     id: 5,
//     name: "Python Data Science Fundamentals",
//     description:
//       "Introduction to data science using Python. Learn pandas, numpy, and basic machine learning concepts.",
//     status: 1,
//     date: "2025-09-20",
//     time: "1:00 PM - 5:00 PM",
//     location: "University of Toronto - BA Building",
//     images: "",
//     files: [
//       {
//         id: 5,
//         name: "event-image-5.jpg",
//         url: "/FigmaFiles/eventsAssets/ppl.svg",
//       },
//     ],
//     types: ["In Person"],
//   },
//   {
//     id: 6,
//     name: "Cybersecurity Workshop: Protecting Your Code",
//     description:
//       "Learn essential cybersecurity practices for developers. Secure coding, authentication, and vulnerability assessment.",
//     status: 1,
//     date: "2025-10-01",
//     time: "2:00 PM - 6:00 PM",
//     location: "Google Meet & Local Labs",
//     images: "",
//     files: [
//       {
//         id: 6,
//         name: "event-image-6.jpg",
//         url: "/FigmaFiles/eventsAssets/discord.svg",
//       },
//     ],
//     types: ["Online"],
//   },
//   {
//     id: 7,
//     name: "Open Source Contribution Workshop",
//     description:
//       "Learn how to contribute to open source projects. Git workflows, issue tracking, and community collaboration.",
//     status: 1,
//     date: "2025-10-10",
//     time: "11:00 AM - 3:00 PM",
//     location: "GitHub Virtual Event",
//     images: "",
//     files: [
//       {
//         id: 7,
//         name: "event-image-7.jpg",
//         url: "/FigmaFiles/eventsAssets/ppl.svg",
//       },
//     ],
//     types: ["Online"],
//   },
//   {
//     id: 8,
//     name: "Mobile App Development with Flutter",
//     description:
//       "Build cross-platform mobile applications using Flutter. From setup to deployment on app stores.",
//     status: 1,
//     date: "2025-10-18",
//     time: "9:00 AM - 5:00 PM",
//     location: "McGill University - Engineering Building",
//     images: "",
//     files: [
//       {
//         id: 8,
//         name: "event-image-8.jpg",
//         url: "/FigmaFiles/eventsAssets/ppl.svg",
//       },
//     ],
//     types: ["In Person"],
//   },
// ];

// // Export the type for TypeScript usage
// export type MockEvent = (typeof mockEvents)[0];

