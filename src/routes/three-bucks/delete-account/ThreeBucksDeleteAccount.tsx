import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useDocumentHead } from "../../../useDocumentHead";

const CONTACT = process.env.REACT_APP_CONTACT_EMAIL;
const SUBJECT = "Delete my Three Bucks account";

const B: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong className="font-medium text-tb-ink">{children}</strong>
);

const Step: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
  <li className="flex gap-4">
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tb-lived-soft text-sm font-semibold text-tb-lived">
      {n}
    </span>
    <span className="pt-0.5">{children}</span>
  </li>
);

const Card: React.FC<{ eyebrow: string; title: string; children: React.ReactNode }> = ({ eyebrow, title, children }) => (
  <section className="rounded-[20px] border border-tb-line bg-tb-card p-5 sm:p-6">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tb-muted">{eyebrow}</p>
    <h2 className="mt-1 text-lg font-semibold tracking-tight text-tb-ink">{title}</h2>
    <div className="mt-4 leading-relaxed text-tb-ink/85">{children}</div>
  </section>
);

/**
 * How to delete a Three Bucks account and its data, with or without the
 * app. Google Play requires this page to exist outside the app; it is linked
 * from the Play listing's Data safety form and from the privacy policy.
 */
const ThreeBucksDeleteAccount: React.FC = () => {
  useDocumentHead({
    title: "Delete your account · Three Bucks",
    description: "How to delete your Three Bucks account and its data, from the app or by email.",
    icon: `${process.env.PUBLIC_URL}/three-bucks/favicon.png`,
    appleTouchIcon: `${process.env.PUBLIC_URL}/three-bucks/apple-touch-icon.png`,
    themeColor: "#FAF9F6",
  });

  const mailto = CONTACT ? `mailto:${CONTACT}?subject=${encodeURIComponent(SUBJECT)}` : undefined;

  return (
    <div className="min-h-screen bg-tb-paper font-[Inter,ui-sans-serif,system-ui,sans-serif] text-tb-ink antialiased">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
        <Link to="/three-bucks" className="flex items-center gap-2.5">
          <img src={`${process.env.PUBLIC_URL}/three-bucks/icon.webp`} alt="" width={28} height={28} className="h-7 w-7" />
          <span className="font-semibold tracking-tight">Three Bucks</span>
        </Link>
        <Link to="/three-bucks" className="inline-flex items-center gap-1.5 text-sm text-tb-muted hover:text-tb-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Three Bucks
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-6 pb-20 pt-8 sm:pt-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tb-lived">Account</p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">Delete your account</h1>
        <p className="mt-4 text-tb-muted">
          Three Bucks by Widget Media Labs. You can delete your account and the data in it at any time.
        </p>

        <div className="mt-10 space-y-5">
          <Card eyebrow="Fastest" title="From the app">
            <ol className="space-y-3">
              <Step n={1}>Open Three Bucks and tap the gear on Home to open Settings.</Step>
              <Step n={2}>
                Under Account, tap <B>Delete account</B>, then <B>Delete</B> to confirm.
              </Step>
              <Step n={3}>If asked, sign in with Apple or Google once more to confirm it's you.</Step>
            </ol>
            <p className="mt-4 text-sm text-tb-muted">
              Delete account appears once you've signed in to split bills. If you never signed in, see “Never signed
              in” below.
            </p>
          </Card>

          <Card eyebrow="No app, or want everything gone?" title="By email">
            <p>
              {mailto ? (
                <>
                  Email{" "}
                  <a href={mailto} className="font-medium text-tb-lived underline-offset-4 hover:underline">
                    {CONTACT}
                  </a>
                </>
              ) : (
                <>Email the contact address on our store listing</>
              )}{" "}
              with the subject “{SUBJECT}”, from the Apple or Google address you signed in with, or include your
              username. We'll confirm it's you and delete your account and all of its data, including your backed-up
              entries and categories, within 30 days.
            </p>
          </Card>

          <Card eyebrow="What happens" title="What is deleted">
            <ul className="space-y-3">
              <li>
                <B>Deleted in the app, right away:</B> your sign-in, your username and name, and your connections
                with other people.
              </li>
              <li>
                <B>Deleted when you email us:</B> all of the above, plus the backup of your entries and categories.
              </li>
              <li>
                <B>On your phone:</B> your entries, categories and settings stay on the phone until you uninstall the
                app, which removes them.
              </li>
              <li>
                <B>Kept:</B> bills you already split stay visible to the other people on them, with your name as it was
                when the bill was saved, and payments you recorded with someone stay in their history. They're part of
                the other people's records too.
              </li>
              <li>
                <B>Never signed in:</B> uninstalling removes everything from your phone. The backup made for that
                install isn't linked to your name or email.
              </li>
            </ul>
          </Card>
        </div>

        <p className="mt-10 text-sm text-tb-muted">
          More about how Three Bucks handles your data in the{" "}
          <Link to="/three-bucks/privacy" className="font-medium text-tb-lived underline-offset-4 hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </main>

      <footer className="border-t border-tb-line">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-tb-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Widget Media Labs</p>
          <Link to="/" className="hover:text-tb-ink">
            More apps
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ThreeBucksDeleteAccount;
