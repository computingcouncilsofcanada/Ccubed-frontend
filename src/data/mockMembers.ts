// Types
type SocialLinks = {
  linkedin?: string;
  // Add other social platforms as needed
};

type Member = {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  info: string;
  category: string;
  council?: string; // Optional field
  social: SocialLinks;
};

type Team = {
  team: string;
  members: Member[];
};

// Fixed mock data
export const mockMembers: Team[] = [
  {
    team: "Board of Advisors",
    members: [
      {
        id: 43,
        name: "Parth Doshi",
        role: "Board of advisor",
        imageUrl: "/MemberPics/parth.png",
        info: "Board of Advisor",
        category: "board_of_advisors",
        social: {
          linkedin: "https://www.linkedin.com/in/parthdoshiml/",
        },
      },
    ],
  },
  {
    team: "Executive Leadership Team",
    members: [
      {
        id: 29,
        name: "Het Jivani",
        role: "President",
        imageUrl: "/MemberPics/het.png",
        info: "President",
        category: "directors",
        social: {
          linkedin: "https://linkedin.com/in/hetjivani",
        },
      },
    ],
  },
  {
    team: "Board of Directors",
    members: [
      {
        id: 40,
        name: "Vardaan Randev",
        role: "Director of Communications",
        imageUrl: "/MemberPics/Vardaan.jpg",
        info: "Director of Communications",
        category: "directors",
        social: {
          linkedin: "https://www.linkedin.com/in/vardaan-r-ab9ba436b/",
        },
      },
      {
        id: 41,
        name: "Fopefoluwa Ikufisile",
        role: "Director of Systems Admin",
        imageUrl: "/MemberPics/fope.png",
        info: "Director of Systems Administration",
        category: "directors",
        social: {
          linkedin:
            "https://www.linkedin.com/in/fopefoluwa-ikufisile-0a5881296/",
        },
      },
      {
        id: 44,
        name: "Dhruv Thakar",
        role: "Director of Outreach",
        imageUrl: "/MemberPics/Dhruv.jpeg",
        info: "Director of Outreach",
        category: "directors",
        social: {
          linkedin:
            "https://www.linkedin.com/in/dhruv-thakar-ba46aa296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        },
      },
      {
        id: 48,
        name: "Pragati Puri",
        role: "Director of WITS",
        imageUrl: "/MemberPics/Pragati_Puri.jpeg",
        info: "Director of WITS",
        category: "directors",
        social: {
          linkedin: "https://www.linkedin.com/in/pragatipuri187/",
        },
      },
      {
        id: 34,
        name: "Rastin Aghighi",
        role: "Director of AI",
        imageUrl: "/MemberPics/Rastin.jpg",
        info: "Director of AI",
        category: "directors",
        council: "ai",
        social: {
          linkedin: "https://www.linkedin.com/in/rastinaghighi/",
        },
      },
      {
        id: 39,
        name: "Michael Ugwu",
        role: "Director of Finance",
        imageUrl: "/MemberPics/Michael_Ugwu.jpg",
        info: "Director of Finance",
        category: "directors",
        social: {
          linkedin: "https://www.linkedin.com/in/",
        },
      },
    ],
  },
  {
    team: "System Administration Team",
    members: [
      {
        id: 4,
        name: "Fopefoluwa Ikufisile",
        role: "Director of Systems Admin",
        imageUrl: "/MemberPics/fope.png",
        info: "Director of Systems Administration",
        category: "sysadmin",
        social: {
          linkedin:
            "https://www.linkedin.com/in/fopefoluwa-ikufisile-0a5881296/",
        },
      },
      {
        id: 8,
        name: "James Ha",
        role: "Software Developer",
        imageUrl: "/MemberPics/no-picture.png",
        info: "Software Developer",
        category: "sysadmin",
        social: {
          linkedin: "https://www.linkedin.com/in/jameshaa/",
        },
      },
      {
        id: 9,
        name: "Raymond Lam",
        role: "Software Developer",
        imageUrl: "/MemberPics/raymond2.png",
        info: "Software Developer",
        category: "sysadmin",
        social: {
          linkedin: "https://www.linkedin.com/in/raymondlamdev/",
        },
      },
      {
        id: 46,
        name: "Tiana Wong",
        role: "UI/UX Designer",
        imageUrl: "/MemberPics/tiana.jpg",
        info: "UI/UX Designer",
        category: "sysadmin",
        social: {
          linkedin: "https://www.linkedin.com/in/tianawong26/",
        },
      },
      {
        id: 45,
        name: "Zaid Mohiuddin",
        role: "Software Developer",
        imageUrl: "/MemberPics/zaid.png",
        info: "Software Developer",
        category: "sysadmin",
        social: {
          linkedin: "https://www.linkedin.com/in/zaid-mohiuddin-ba98462a8/",
        },
      },
      {
        id: 47,
        name: "Nafisah Nubah",
        role: "Software Developer",
        imageUrl: "/MemberPics/Nafisah_Nubah.jpg",
        info: "Software Developer",
        category: "sysadmin",
        social: {
          linkedin: "https://www.linkedin.com/in/nafisah-nubah-3a355829b/",
        },
      },
    ],
  },
  {
    team: "Communications Team",
    members: [
      {
        id: 10,
        name: "Danielle Eng",
        role: "Director of Communications",
        imageUrl: "/MemberPics/Danielle_Eng.jpg",
        info: "Director of Communications",
        category: "communications",
        social: {
          linkedin: "http://www.linkedin.com/in/danielle-eng-1bb865281",
        },
      },
      {
        id: 13,
        name: "Ruth Nyambeki",
        role: "Content creator",
        imageUrl: "/MemberPics/Ruth_Nyambeki.jpeg",
        info: "Content creator",
        category: "communications",
        social: {
          linkedin:
            "https://www.linkedin.com/in/ruth-nyambeki-b41a142a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        },
      },
    ],
  },
  {
    team: "Events Team",
    members: [
      {
        id: 16,
        name: "Zaid Mohiuddin",
        role: "Events Coordinator",
        imageUrl: "/MemberPics/zaid.png",
        info: "Events Coordinator",
        category: "events",
        social: {
          linkedin: "https://www.linkedin.com/in/zaid-mohiuddin-ba98462a8/",
        },
      },
      {
        id: 18,
        name: "Minahil Fatima",
        role: "Events Coordinator",
        imageUrl: "/MemberPics/fatima.png",
        info: "Events Coordinator",
        category: "events",
        social: {
          linkedin: "https://www.linkedin.com/in/minahil-fatima-4201172b4/",
        },
      },
      {
        id: 30,
        name: "Anupreet Kaur",
        role: "Events Coordinator",
        imageUrl: "/MemberPics/Anupreet_Kaur.jpeg",
        info: "Events Coordinator",
        category: "events",
        social: {
          linkedin: "http://www.linkedin.com/in/anupreet-kaur-6433b5309",
        },
      },
      {
        id: 31,
        name: "Carol Dong",
        role: "Events Coordinator",
        imageUrl: "/MemberPics/Carol_Dong.jpg",
        info: "Events Coordinator",
        category: "events",
        social: {
          linkedin: "https://www.linkedin.com/in/carol-dong-dkr/",
        },
      },
      {
        id: 32,
        name: "Aayan Areejo",
        role: "Events Coordinator",
        imageUrl: "/MemberPics/Aayan_Areejo.jpeg",
        info: "Events Coordinator",
        category: "events",
        social: {
          linkedin:
            "https://www.linkedin.com/in/aayanareejo?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        },
      },
    ],
  },
  {
    team: "Finance Team",
    members: [
      {
        id: 33,
        name: "Michael Ugwu",
        role: "Director of Finance",
        imageUrl: "/MemberPics/Michael_Ugwu.jpg",
        info: "Director of Finance",
        category: "finance",
        social: {
          linkedin: "https://linkedin.com/in/",
        },
      },
      {
        id: 49,
        name: "Ben Zhou",
        role: "Finance coordinator",
        imageUrl: "/MemberPics/Ben_Zhou.jpeg",
        info: "Finance coordinator",
        category: "finance",
        social: {
          linkedin: "https://www.linkedin.com/in/-ben-zhou-",
        },
      },
    ],
  },
  {
    team: "Outreach Team",
    members: [
      {
        id: 28,
        name: "Pragati Puri",
        role: "Director of WITS",
        imageUrl: "/MemberPics/Pragati_Puri.jpeg",
        info: "Director of WITS",
        category: "outreach",
        social: {
          linkedin: "https://www.linkedin.com/in/pragatipuri187/",
        },
      },
      {
        id: 6,
        name: "Rastin Aghighi",
        role: "Director of AI",
        imageUrl: "/MemberPics/Rastin.jpg",
        info: "Director of AI",
        category: "outreach",
        council: "ai",
        social: {
          linkedin: "https://www.linkedin.com/in/rastinaghighi/",
        },
      },
      {
        id: 42,
        name: "Dhruv Thakar",
        role: "Director of Outreach",
        imageUrl: "/MemberPics/Dhruv.jpeg",
        info: "Director of Outreach",
        category: "outreach",
        social: {
          linkedin:
            "https://www.linkedin.com/in/dhruv-thakar-ba46aa296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        },
      },
      {
        id: 22,
        name: "Sparsh Ladani",
        role: "Cybersecurity Program Manager",
        imageUrl: "/MemberPics/sparsh-ladani.png",
        info: "Cybersecurity Program Manager",
        category: "outreach",
        council: "cybersecurity",
        social: {
          linkedin: "https://www.linkedin.com/in/sparshladani/",
        },
      },
      {
        id: 37,
        name: "Roshan Banisetti",
        role: "AI Program Manager",
        imageUrl: "/MemberPics/Roshan.jpg",
        info: "AI Program Manager",
        category: "outreach",
        council: "ai",
        social: {
          linkedin: "https://www.linkedin.com/in/roshan-banisetti/",
        },
      },
    ],
  },
  {
    team: "Human Resources Team",
    members: [],
  },
];
