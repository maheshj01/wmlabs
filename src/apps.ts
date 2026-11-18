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
    platforms: "iPhone · Android",
  },
  {
    name: "Three Bucks",
    tagline: "Know where every buck goes. Expenses in one line, investing kept apart.",
    path: "/three-bucks",
    icon: "/three-bucks/icon.webp",
    platforms: "Coming soon · iPhone · Android",
  },
];
