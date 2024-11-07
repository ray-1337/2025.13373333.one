interface SocialsProp extends Record<"url" | "iconURL", string> {};

const Socials: Array<SocialsProp> = [
  {
    url: "https://github.com/ray-1337",
    iconURL: "https://cdn.simpleicons.org/github/white"
  },
  {
    url: "https://www.linkedin.com/in/ray1337/",
    iconURL: "https://cdn.simpleicons.org/linkedin/white"
  }
];

export default Socials;