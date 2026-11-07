import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDocumentHead } from "../../../useDocumentHead";
import { APP_STORE_URL, PLAY_URL, isAppleDevice } from "../stores";


/**
 * /epoch/open, the link in epoch's emails. With the app installed, the
 * phone opens epoch instead of this page (Universal Links on iOS, App Links
 * on Android; see public/.well-known). Reaching this page means it isn't
 * installed, so send the person to their store.
 */
const EpochOpen: React.FC = () => {
  useDocumentHead({
    title: "Open Epoch",
    description: "Opening Epoch.",
    icon: `${process.env.PUBLIC_URL}/epoch/favicon.png`,
    appleTouchIcon: `${process.env.PUBLIC_URL}/epoch/apple-touch-icon.png`,
    themeColor: "#FFF2E0",
  });

  const store = /android/i.test(navigator.userAgent)
    ? PLAY_URL
    : isAppleDevice()
      ? APP_STORE_URL
      : null;

  useEffect(() => {
    if (store) window.location.replace(store);
  }, [store]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-epoch-cream px-4 font-[Poppins,ui-sans-serif,system-ui,sans-serif] text-epoch-ink antialiased">
      <span className="h-3 w-3 animate-pulse rounded-full bg-epoch-vermilion" aria-hidden />
      <p className="text-lg font-semibold tracking-tight">{store ? "Taking you to Epoch" : "Get Epoch"}</p>
      <div className="flex gap-4 text-sm font-medium">
        <a href={PLAY_URL} className="text-epoch-vermilion underline-offset-4 hover:underline">
          Google Play
        </a>
        <a href={APP_STORE_URL} className="text-epoch-vermilion underline-offset-4 hover:underline">
          App Store
        </a>
        <Link to="/epoch" className="text-epoch-muted underline-offset-4 hover:underline">
          About Epoch
        </Link>
      </div>
    </div>
  );
};

export default EpochOpen;
