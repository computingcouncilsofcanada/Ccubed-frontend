import { CouncilSection } from "@/app/council/types/types";

export const councilSections: CouncilSection[] = [
  {
    title: "Cybersecurity Council",
    shortDescription:
      "Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically.",
    fullDescription:
      " Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically. We and numerous Canadian universities have paired up to create this very council, one that facilitates the engagement of your local cyber club by introducing you with industry professionals, educational events tailored to you, and ready made content for your next cybersecurity workshops. No more need to spend countless hours swimming through LinkedIn contacts and Internet write-ups, we've got you.",
    icon: "/FigmaFiles/councilAssets/Cybersecurity_council.png",
    universities: [
      {
        id: 1,
        name: "Western University",
        description:
          "Western University is a proud member of the Cybersecurity Council, committed to fostering cybersecurity education and building a strong security community on campus.",
        imageUrl: "/UniversityImages/western-university-logo.png",
      },
      {
        id: 2,
        name: "Dalhousie University",
        description:
          "Dalhousie University participates in the Cybersecurity Council to connect students with cybersecurity opportunities and build awareness around security practices.",
        imageUrl: "/UniversityImages/Dalhouse-university-logo.png",
      },
      {
        id: 3,
        name: "Laurier University",
        description:
          "Laurier University joins the Cybersecurity Council to help students explore cybersecurity topics and connect with peers across Canada's universities.",
        imageUrl: "/UniversityImages/laurier-university-logo.png",
      },
      {
        id: 4,
        name: "McGill University",
        description:
          "McGill University is part of the Cybersecurity Council, supporting student engagement in cybersecurity through collaborative learning and community building.",
        imageUrl: "/UniversityImages/mcgill-university-logo.jpg",
      },
      {
        id: 5,
        name: "University of Ottawa",
        description:
          "The University of Ottawa contributes to the Cybersecurity Council by promoting cybersecurity awareness and creating networking opportunities for students.",
        imageUrl: "/UniversityImages/ottawa-university-logo.png",
      },
    ],
  },
  {
    title: "Artificial Intelligence Council",
    shortDescription: "Coming Soon",
    fullDescription: "Coming Soon",
    icon: "/FigmaFiles/councilAssets/CCubed_icon.png",
    comingSoon: true,
  },
  {
    title: "Women in Tech Council",
    shortDescription: "Coming Soon",
    fullDescription: "Coming Soon",
    icon: "/FigmaFiles/councilAssets/CCubed_icon.png",
    comingSoon: true,
  },
];
