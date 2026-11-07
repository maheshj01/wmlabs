/** Epoch's store listings, shared by the landing page and the open link. */
export const PLAY_URL = "https://play.google.com/store/apps/details?id=com.wml.epoch";
export const APP_STORE_URL = "https://apps.apple.com/app/epoch-life-in-dots/id6817970106";

/** True on iPhone and iPad, including iPads that report a Mac user agent. */
export const isAppleDevice = () =>
  typeof navigator !== "undefined" &&
  (/iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.userAgent?.includes?.("MacIntel") && navigator.maxTouchPoints > 1));
