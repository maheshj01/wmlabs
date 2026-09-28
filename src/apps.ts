/** Apps with their own landing page on this site. Add one entry per app. */
export interface AppEntry {
  name: string;
  tagline: string;
  path: string;
  icon: string;
  platforms: string;
}

export const APPS: AppEntry[] = [
  {
    name: "Epoch",
    tagline: "See your time. Plan what matters. Make every day count.",
    path: "/epoch",
    icon: "/epoch/icon.webp",
    platforms: "Android · iPhone soon",
  },
];
