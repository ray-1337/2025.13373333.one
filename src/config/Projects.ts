export const ProjectType = ["Platform/Website", "Application", "Entertainment", "Article"] as const;

export const ProjectStateType = ["Discontinued", "Under Construction", "Hiatus"] as const;

interface ProjectsProp extends Record<"name" | "imgURL", string>, Partial<Record<"description" | "url" | "ytVidId", string>> {
  type: typeof ProjectType[number];
  yearRelease?: number;
  credits?: Array<Record<"name" | "url", string>>;
  projectState?: typeof ProjectStateType[number];
  hidden?: boolean
  vidURL?: string; // will be used when user's click the project's item 
};

type ProjectsVariableProp = Array<ProjectsProp>;

// websites
const Websites: ProjectsVariableProp = [
  {
    name: "Anthro.id",
    type: "Platform/Website",
    url: "https://anthro.id",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/anthro.id/banner-1.webp",
    yearRelease: 2024,
    description: "A reliable source of articles on anthropomorphic culture in Indonesia, and outside in the future."
  },
  {
    name: "This Website",
    type: "Platform/Website",
    url: "https://github.com/ray-1337/2025.13373333.one",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/2025-13373333/banner-1.webp",
    yearRelease: 2024,
    description: "My renewed website, created from scratch.",
    vidURL: "https://saint-chroma.cdn.13373333.one/0001/projects/2025-13373333/snapshots/001.webm"
  }
];

// applications
const Applications: ProjectsVariableProp = [
  {
    name: "YouTube Discord Embed",
    type: "Application",
    url: "https://github.com/ray-1337/youtube-discord-embed",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/youtube-discord-embed/banner-1.webp",
    yearRelease: 2023,
    description: "Transform YouTube embed into a watchable video without having to redirect user's to the website, inspired by FixTweet.",
    vidURL: "https://saint-chroma.cdn.13373333.one/0001/projects/youtube-discord-embed/snapshots/005.webm"
  },
  {
    name: "Anti-NSFW",
    type: "Application",
    url: "https://discord.com/application-directory/663326517731917844",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/anti-nsfw/banner-1.webp",
    yearRelease: 2020,
    description: "A Discord bot that can detect NSFW content through machine learning.",
    ytVidId: "nmPzkVfQLAM",
    credits: [
      {
        name: "Jpuf",
        url: "https://github.com/Jpuf0"
      }
    ]
  },
  {
    name: "GMDI (Geometry Dash Indonesia) Discord Bot",
    type: "Application",
    url: "https://github.com/ray-1337/gmdi-private-bot",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/gmdibot/banner-1.webp",
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
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/discord-bot-music/banner-1.webp"
  },
  {
    name: "VALORANT Waiting Room Stream",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/vlr-waiting-room/banner-1.webp",
    type: "Application",
    description: "An app to control the OBS scene with timer. Highly inspired by VALORANT Championships Tour live stream.",
    url: "https://github.com/ray-1337/personal-valorant-broadcasting",
    yearRelease: 2024,
    projectState: "Hiatus",
    ytVidId: "ivvtDl8u-Ro",
    vidURL: "https://saint-chroma.cdn.13373333.one/0001/projects/vlr-waiting-room/snapshots/001.webm"
  }
];

// entertainment
const Entertainment: ProjectsVariableProp = [
  {
    name: "CupcakKe (Parody)",
    url: "https://www.youtube.com/playlist?list=PLGd05QsjGyxUrnRbKBGB9touvcyj51MJW",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/cupcakke/banner-1.webp",
    type: "Entertainment",
    yearRelease: 2023,
    projectState: "Hiatus",
    description: "It’s a parody of the rap artist CupcakKe, created by mixing her a cappellas (altering pitches, etc.) and transforming another song's lyrics into her most famous unapologetic style.",
    ytVidId: "PLGd05QsjGyxUrnRbKBGB9touvcyj51MJW",
    vidURL: "https://saint-chroma.cdn.13373333.one/0001/projects/cupcakke/snapshots/002.webm"
  },
  {
    name: "VALORANT Funny Moment Edits",
    url: "https://www.youtube.com/playlist?list=PLYrHu4ar33mX9Q32QHk90SoGmZTVovVSI",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/valorant-funny-moment/banner-1.webp",
    type: "Entertainment",
    description: "A funny moments compilation of me (Ray) playing VALORANT with friends.",
    ytVidId: "PLYrHu4ar33mX9Q32QHk90SoGmZTVovVSI",
    yearRelease: 2024,
    vidURL: "https://saint-chroma.cdn.13373333.one/0001/projects/valorant-funny-moment/snapshots/001.webm"
  },
  {
    name: "Blob Project",
    url: "https://youtube.com/@blobproj",
    type: "Entertainment",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/blob-project/banner-1.webp",
    description: "Creating a YouTube programming content (mainly into Discord bot) with no fillers.",
    yearRelease: 2020,
    projectState: "Discontinued",
    ytVidId: "PLHSePCXwuwyoFuhV9e23zu1eEjPSVQmmZ",
    vidURL: "https://saint-chroma.cdn.13373333.one/0001/projects/blob-project/snapshots/001.webm"
  }
];

// hidden project
const HiddenProjects: Omit<ProjectsProp, "hidden">[] = [
  {
    name: "Nusantara Furry Convention: Hidden Wonderland",
    description: "A platform for purchasing tickets to a furry convention gathering, which took place in South Jakarta, Indonesia, was introduced.",
    type: "Platform/Website",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/nufc/banner-1.webp",
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
  },
  {
    name: "cdev.shop (Discord Bot Dashboard)",
    type: "Platform/Website",
    url: "https://dash.cdev.shop/demo",
    imgURL: "https://saint-chroma.cdn.13373333.one/0001/projects/dash.cdev.shop/banner-1.webp",
    yearRelease: 2023,
    description: "A Discord bot dashboard for cDev (Community Development), created with Next.js.",
    projectState: "Discontinued"
  }
];

const Projects = ([] as ProjectsVariableProp)
  .concat(Websites)
  .concat(Applications)
  .concat(Entertainment)
  .concat(HiddenProjects.map((project) => ({...project, hidden: true})));

export default Projects;