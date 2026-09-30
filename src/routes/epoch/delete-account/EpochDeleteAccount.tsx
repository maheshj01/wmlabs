import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useDocumentHead } from "../../../useDocumentHead";

const CONTACT = process.env.REACT_APP_CONTACT_EMAIL;
const SUBJECT = "Delete my Epoch account";

const Step: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
  <li className="flex gap-4">
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-epoch-vermilion/10 text-sm font-semibold text-epoch-vermilion">
      {n}
    </span>
    <span className="pt-0.5">{children}</span>
  </li>
);

const Card: React.FC<{ eyebrow: string; title: string; children: React.ReactNode }> = ({ eyebrow, title, children }) => (
  <section className="rounded-[20px] bg-epoch-card p-5 sm:p-6">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-epoch-muted">{eyebrow}</p>
    <h2 className="mt-1 text-lg font-semibold tracking-tight text-epoch-ink">{title}</h2>
    <div className="mt-4 leading-relaxed text-epoch-ink/85">{children}</div>
  </section>
);

/**
 * How to delete an Epoch account, with or without the app. Google Play
 * requires this page to exist outside the app; it is linked from the Play
 * listing's Data safety form and from the privacy policy.
 */
const EpochDeleteAccount: React.FC = () => {
  useDocumentHead({
    title: "Delete your account · Epoch",
    description: "How to delete your Epoch account and its data, from the app or by email.",
    icon: `${process.env.PUBLIC_URL}/epoch/favicon.png`,
    appleTouchIcon: `${process.env.PUBLIC_URL}/epoch/apple-touch-icon.png`,
    themeColor: "#FFF2E0",
  });

  const mailto = CONTACT ? `mailto:${CONTACT}?subject=${encodeURIComponent(SUBJECT)}` : undefined;

  return (
    <div className="epoch-page min-h-screen bg-epoch-cream font-[Poppins,ui-sans-serif,system-ui,sans-serif] text-epoch-ink antialiased">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
        <Link to="/epoch" className="flex items-center gap-2.5">
          <img src={`${process.env.PUBLIC_URL}/epoch/icon.webp`} alt="" width={28} height={28} className="h-7 w-7" />
          <span className="font-semibold tracking-tight">Epoch</span>
        </Link>
        <Link to="/epoch" className="inline-flex items-center gap-1.5 text-sm text-epoch-muted hover:text-epoch-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Epoch
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-20 pt-8 sm:pt-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-epoch-vermilion">Account</p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">Delete your account</h1>
        <p className="mt-4 text-epoch-muted">
          Epoch by Widget Media Labs. You can delete your account and everything in it at any time.
        </p>

        <div className="mt-10 space-y-5">
          <Card eyebrow="Fastest" title="From the app">
            <ol className="space-y-3">
              <Step n={1}>Open Epoch and go to Settings.</Step>
              <Step n={2}>
                Under Account, tap <strong className="font-medium text-epoch-ink">Delete account</strong> (or{" "}
                <strong className="font-medium text-epoch-ink">Erase my journey</strong> if you never signed in).
              </Step>
              <Step n={3}>Hold the button until it fills.</Step>
            </ol>
          </Card>

          <Card eyebrow="No app?" title="By email">
            <p>
              {mailto ? (
                <>
                  Email{" "}
                  <a href={mailto} className="font-medium text-epoch-vermilion underline-offset-4 hover:underline">
                    {CONTACT}
                  </a>
                </>
              ) : (
                <>Email the contact address on our Google Play listing</>
              )}{" "}
              with the subject “{SUBJECT}”, from the Google or Apple address you signed in with. We'll confirm it's
              you and delete the account within 30 days.
            </p>
          </Card>

          <Card eyebrow="What happens" title="What is deleted, and when">
            <ul className="space-y-3">
              <li>
                <strong className="font-medium text-epoch-ink">Deleted:</strong> your profile (name, birth date,
                gender, avatar), every event with its notes and reminders, and your sign-in account.
              </li>
              <li>
                <strong className="font-medium text-epoch-ink">Signed in with Google or Apple:</strong> your account is
                paused at once and deleted for good after 30 days. Sign in again before then to restore it.
              </li>
              <li>
                <strong className="font-medium text-epoch-ink">Never signed in:</strong> there is no way to come back
                to your data, so it is deleted immediately.
              </li>
              <li>
                <strong className="font-medium text-epoch-ink">Kept:</strong> anonymous usage statistics and crash
                reports, which are not linked to your account and expire under Firebase's own retention settings,
                and any feedback you chose to send us.
              </li>
            </ul>
          </Card>
        </div>

        <p className="mt-10 text-sm text-epoch-muted">
          More about how Epoch handles your data in the{" "}
          <Link to="/epoch/privacy" className="font-medium text-epoch-vermilion underline-offset-4 hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </main>

      <footer className="border-t border-epoch-hairline">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-epoch-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Widget Media Labs</p>
          <Link to="/" className="hover:text-epoch-ink">
            More apps
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default EpochDeleteAccount;
