export const options = [
  { label: "All", value: "all" },
  { label: "Artificial Intelligence", value: "artificialintelligence" },
  { label: "CyberSecurity", value: "cybersecurity" },
  { label: "Women In Tech", value: "womenintech" },
];

export const councilSections = [
  {
    title: "Cybersecurity Council",
    shortDescription:
      "Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically.",
    fullDescription:
      " Our goal is to facilitate the entry of newcomers and enthusiasts into one of Tech's most important fields: cybersecurity. We believe security should be taught sooner, more engagingly, and more enthusiastically. We and numerous Canadian universities have paired up to create this very council, one that facilitates the engagement of your local cyber club by introducing you with industry professionals, educational events tailored to you, and ready made content for your next cybersecurity workshops. No more need to spend countless hours swimming through LinkedIn contacts and Internet write-ups, we've got you.",
    icon: "/FigmaFiles/councilAssets/Cybersecurity_council.png",
  },
  {
    title: "Artificial Intelligence Council",
    shortDescription: "Coming Soon",
    fullDescription: "Coming Soon",
    icon: "/FigmaFiles/councilAssets/CCubed_icon.png",
  },
  {
    title: "Women in Tech Council",
    shortDescription: "Coming Soon",
    fullDescription: "Coming Soon",
    icon: "/FigmaFiles/councilAssets/CCubed_icon.png",
  },
];
export const councils = [];

export const CONTAINER_WIDTH = 600; // px
export const PADDING = 8; // p-1 x2
export const INNER_WIDTH = CONTAINER_WIDTH - PADDING;
export const OPTION_WIDTH = INNER_WIDTH / options.length;

export const VIEW_OPTIONS = ["list", "grid"];
export const VIEW_CONTAINER_WIDTH = 108; // px
export const VIEW_PADDING = 8; // p-1 x2
export const VIEW_INNER_WIDTH = VIEW_CONTAINER_WIDTH - VIEW_PADDING;
export const VIEW_OPTION_WIDTH = VIEW_INNER_WIDTH / VIEW_OPTIONS.length;
export const MOBILE_COLS = 2;
export const MOBILE_OPTION_WIDTH = CONTAINER_WIDTH / MOBILE_COLS;
export const MOBILE_OPTION_HEIGHT = 56;
