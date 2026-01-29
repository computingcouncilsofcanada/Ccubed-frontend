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
          "A collaborative student council at Western University dedicated to cybersecurity, bringing students together through workshops, talks, competitions, and industry connections.",
        imageUrl: "/UniversityImages/western-university-logo.png",
      },
      {
        id: 2,
        name: "Dalhousie University",
        description:
          "A collaborative student council at Dalhousie University dedicated to cybersecurity, bringing students together through workshops, talks, competitions, and industry connections.",
        imageUrl: "/UniversityImages/Dalhouse-university-logo.png",
      },
      {
        id: 3,
        name: "Laurier University",
        description:
          "A collaborative student council at Laurier University dedicated to cybersecurity, bringing students together through workshops, talks, competitions, and industry connections.",
        imageUrl: "/UniversityImages/laurier-university-logo.png",
      },
      {
        id: 4,
        name: "McGill University",
        description:
          "A collaborative student council at McGill University dedicated to cybersecurity, bringing students together through workshops, talks, competitions, and industry connections.",
        imageUrl: "/UniversityImages/mcgill-university-logo.jpg",
      },
      {
        id: 5,
        name: "University of Ottawa",
        description:
          "A collaborative student council at University of Ottawa dedicated to cybersecurity, bringing students together through workshops, talks, competitions, and industry connections.",
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
