import { useEffect } from "react";

interface Head {
  title: string;
  description?: string;
  /** Tab icon (favicon) and home-screen icon for this page. */
  icon?: string;
  appleTouchIcon?: string;
  themeColor?: string;
}

/** Points the <head> at this page while it is mounted, and puts the site's
 *  own values back when it unmounts, so each app page shows its own tab icon
 *  and title. */
export function useDocumentHead({ title, description, icon, appleTouchIcon, themeColor }: Head) {
  useEffect(() => {
    const restore: Array<() => void> = [];

    const previousTitle = document.title;
    document.title = title;
    restore.push(() => {
      document.title = previousTitle;
    });

    const set = (selector: string, attr: "href" | "content", value?: string) => {
      const el = value ? document.head.querySelector(selector) : null;
      if (!el || !value) return;
      const previous = el.getAttribute(attr);
      el.setAttribute(attr, value);
      restore.push(() => {
        if (previous !== null) el.setAttribute(attr, previous);
      });
    };

    set('link[rel="icon"]', "href", icon);
    set('link[rel="apple-touch-icon"]', "href", appleTouchIcon);
    set('meta[name="description"]', "content", description);
    set('meta[name="theme-color"]', "content", themeColor);

    return () => restore.reverse().forEach((undo) => undo());
  }, [title, description, icon, appleTouchIcon, themeColor]);
}
