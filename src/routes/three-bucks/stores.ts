/** Three Bucks' store listings. Null until the app is published; the page
 *  then shows "Coming soon" instead of store buttons. */
export const PLAY_URL: string | null = null;
export const APP_STORE_URL: string | null = null;

export const isPublished = () => PLAY_URL !== null || APP_STORE_URL !== null;
