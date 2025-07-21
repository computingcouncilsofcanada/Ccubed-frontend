// Mock data for testing events implementation
export const mockEvents = [
  {
    id: 1,
    name: "Tech Talk: AI & the Future of Jobs",
    description: "Join industry experts as they discuss how AI is reshaping the job market. Get insights on staying relevant and building future-proof skills.",
    status: 1,
    date: "2025-08-10",
    time: "3:00 PM - 5:00 PM",
    location: "Google Meet",
    images: "",
    files: [
      {
        id: 1,
        name: "event-image-1.jpg",
        url: "/FigmaFiles/eventsAssets/discord.svg"
      }
    ],
    types: ["Online"]
  },
  {
    id: 2,
    name: "Beginner Coding Bootcamp: Web Development",
    description: "Perfect for beginners! Learn the fundamentals of web development in this hands-on bootcamp.",
    status: 1,
    date: "2025-08-29",
    time: "2:00 PM - 6:00 PM",
    location: "Dawson College - Lab B203",
    images: "",
    files: [
      {
        id: 2,
        name: "event-image-2.jpg",
        url: "/FigmaFiles/eventsAssets/ppl.svg"
      }
    ],
    types: ["In person"]
  },
  {
    id: 3,
    name: "React Workshop: Building Modern UIs",
    description: "Learn to build modern user interfaces with React. Hands-on workshop covering components, hooks, and state management.",
    status: 1,
    date: "2025-09-05",
    time: "10:00 AM - 4:00 PM",
    location: "Toronto Tech Hub",
    images: "",
    files: [
      {
        id: 3,
        name: "event-image-3.jpg",
        url: "/FigmaFiles/eventsAssets/discord.svg"
      }
    ],
    types: ["Hybrid"]
  },
  {
    id: 4,
    name: "Networking Night: Computing Students Connect",
    description: "Join fellow computing students for an evening of networking, sharing experiences, and building connections.",
    status: 1,
    date: "2025-09-12",
    time: "6:00 PM - 9:00 PM",
    location: "Discord Community Server",
    images: "",
    files: [
      {
        id: 4,
        name: "event-image-4.jpg",
        url: "/FigmaFiles/eventsAssets/discord.svg"
      }
    ],
    types: ["Online"]
  },
  {
    id: 5,
    name: "Python Data Science Fundamentals",
    description: "Introduction to data science using Python. Learn pandas, numpy, and basic machine learning concepts.",
    status: 1,
    date: "2025-09-20",
    time: "1:00 PM - 5:00 PM",
    location: "University of Toronto - BA Building",
    images: "",
    files: [
      {
        id: 5,
        name: "event-image-5.jpg",
        url: "/FigmaFiles/eventsAssets/ppl.svg"
      }
    ],
    types: ["In person"]
  },
  {
    id: 6,
    name: "Cybersecurity Workshop: Protecting Your Code",
    description: "Learn essential cybersecurity practices for developers. Secure coding, authentication, and vulnerability assessment.",
    status: 1,
    date: "2025-10-01",
    time: "2:00 PM - 6:00 PM",
    location: "Google Meet & Local Labs",
    images: "",
    files: [
      {
        id: 6,
        name: "event-image-6.jpg",
        url: "/FigmaFiles/eventsAssets/discord.svg"
      }
    ],
    types: ["Hybrid"]
  },
  {
    id: 7,
    name: "Open Source Contribution Workshop",
    description: "Learn how to contribute to open source projects. Git workflows, issue tracking, and community collaboration.",
    status: 1,
    date: "2025-10-10",
    time: "11:00 AM - 3:00 PM",
    location: "GitHub Virtual Event",
    images: "",
    files: [
      {
        id: 7,
        name: "event-image-7.jpg",
        url: "/FigmaFiles/eventsAssets/ppl.svg"
      }
    ],
    types: ["Online"]
  },
  {
    id: 8,
    name: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile applications using Flutter. From setup to deployment on app stores.",
    status: 1,
    date: "2025-10-18",
    time: "9:00 AM - 5:00 PM",
    location: "McGill University - Engineering Building",
    images: "",
    files: [
      {
        id: 8,
        name: "event-image-8.jpg",
        url: "/FigmaFiles/eventsAssets/ppl.svg"
      }
    ],
    types: ["In person"]
  }
];

// Export the type for TypeScript usage
export type MockEvent = typeof mockEvents[0]; 