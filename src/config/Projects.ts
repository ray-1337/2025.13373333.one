export const ProjectType = ["Platform/Website", "Application", "Entertainment", "Article"] as const;

export const ProjectStateType = ["Discontinued", "Under Construction", "Hiatus"] as const;

interface ProjectsProp extends Record<"name" | "imgURL", string>, Partial<Record<"description" | "url" | "ytVidId", string>> {
  type: typeof ProjectType[number];
  yearRelease?: number;
  credits?: Array<Record<"name" | "url", string>>;
  projectState?: typeof ProjectStateType[number];
  hidden?: boolean
};

type ProjectsVariableProp = Array<ProjectsProp>;

// websites
const Websites: ProjectsVariableProp = [
  {
    name: "Anthro.id",
    type: "Platform/Website",
    url: "https://anthro.id",
    imgURL: "/media/projects/anthro.id/banner-1.webp",
    yearRelease: 2024,
    description: "A reliable source of articles on anthropomorphic culture in Indonesia, and outside in the future."
  },
  {
    name: "cdev.shop (Discord Bot Dashboard)",
    type: "Platform/Website",
    url: "https://dash.cdev.shop/demo",
    imgURL: "/media/projects/dash.cdev.shop/banner-1.webp",
    yearRelease: 2023,
    description: "A Discord bot dashboard for cDev (Community Development), created with Next.js.",
    projectState: "Discontinued",
    ytVidId: "DQJ8P9kgkwk"
  },
  {
    name: "This Website",
    type: "Platform/Website",
    url: "https://github.com/ray-1337/2025.13373333.one",
    imgURL: "/media/projects/2025-13373333/banner-1.webp",
    yearRelease: 2024,
    description: "My renewed website, created from scratch."
  }
];

// applications
const Applications: ProjectsVariableProp = [
  {
    name: "YouTube Discord Embed",
    type: "Application",
    url: "https://github.com/ray-1337/youtube-discord-embed",
    imgURL: "/media/projects/youtube-discord-embed/banner-1.webp",
    yearRelease: 2023,
    description: "Transform YouTube embed into a watchable video without having to redirect user's to the website, inspired by FixTweet."
  },
  {
    name: "Anti-NSFW",
    type: "Application",
    url: "https://discord.com/application-directory/663326517731917844",
    imgURL: "/media/projects/anti-nsfw/banner-1.webp",
    yearRelease: 2020,
    description: "A Discord bot that can detect NSFW content through machine learning.",
    ytVidId: "nmPzkVfQLAM"
  },
  {
    name: "GMDI (Geometry Dash Indonesia) Discord Bot",
    type: "Application",
    url: "https://github.com/ray-1337/gmdi-private-bot",
    imgURL: "/media/projects/gmdibot/banner-1.webp",
    yearRelease: 2021,
    description: "A Discord bot (mainly for server moderation) that is made exclusively for Geometry Dash Indonesia.",
    credits: [{ name: "MeFinity", url: "https://mefinity.eu.org/" }]
  },
  {
    name: "Discord Bot Music",
    description: "A Discord bot music, from scratch.",
    type: "Application",
    yearRelease: 2023,
    url: "https://github.com/ray-1337/discord-music-bot/",
    imgURL: "/media/projects/discord-bot-music/banner-1.webp"
  },
  {
    name: "VALORANT Waiting Room Stream",
    imgURL: "/media/projects/vlr-waiting-room/banner-1.webp",
    type: "Application",
    description: "An app to control the OBS scene with timer. Highly inspired by VALORANT Championships Tour live stream.",
    url: "https://github.com/ray-1337/personal-valorant-broadcasting",
    yearRelease: 2024,
    projectState: "Hiatus",
    ytVidId: "ivvtDl8u-Ro"
  }
];

// entertainment
const Entertainment: ProjectsVariableProp = [
  {
    name: "CupcakKe (Parody)",
    url: "https://www.youtube.com/playlist?list=PLGd05QsjGyxUrnRbKBGB9touvcyj51MJW",
    imgURL: "/media/projects/cupcakke/banner-1.webp",
    type: "Entertainment",
    yearRelease: 2023,
    projectState: "Hiatus",
    description: "It’s a parody of the rap artist CupcakKe, created by mixing her a cappellas (altering pitches, etc.) and transforming another song's lyrics into her most famous unapologetic style.",
    ytVidId: "PLGd05QsjGyxUrnRbKBGB9touvcyj51MJW"
  },
  {
    name: "VALORANT Funny Moment Edits",
    url: "https://www.youtube.com/playlist?list=PLYrHu4ar33mX9Q32QHk90SoGmZTVovVSI",
    imgURL: "/media/projects/valorant-funny-moment/banner-1.webp",
    type: "Entertainment",
    description: "A funny moments compilation of me (Ray) playing VALORANT with friends.",
    ytVidId: "PLYrHu4ar33mX9Q32QHk90SoGmZTVovVSI",
    yearRelease: 2024
  },
  {
    name: "Blob Project",
    url: "https://youtube.com/@blobproj",
    type: "Entertainment",
    imgURL: "/media/projects/blob-project/banner-1.webp",
    description: "Creating a YouTube programming content (mainly into Discord bot) with no fillers.",
    yearRelease: 2020,
    projectState: "Discontinued",
    ytVidId: "PLHSePCXwuwyoFuhV9e23zu1eEjPSVQmmZ"
  }
];

// hidden project
const HiddenProjects: Omit<ProjectsProp, "hidden">[] = [
  {
    name: "Nusantara Furry Convention: Hidden Wonderland",
    description: "A platform for purchasing tickets to a furry convention gathering, which took place in South Jakarta, Indonesia, was introduced.",
    type: "Platform/Website",
    imgURL: "/media/projects/nufc/banner-1.webp",
    yearRelease: 2024,
    projectState: "Discontinued",
    credits: [
      {
        name: "Nusantara Furry Convention",
        url: "https://instagram.com/nusa_furcon"
      },
      {
        name: "Memu",
        url: "https://www.instagram.com/wolfox_09"
      }
    ]
  }
];

const Projects = ([] as ProjectsVariableProp)
  .concat(Websites)
  .concat(Applications)
  .concat(Entertainment)
  .concat(HiddenProjects.map((project) => ({...project, hidden: true})));

export default Projects;