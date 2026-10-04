import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDocumentHead } from "../../../useDocumentHead";

const EFFECTIVE = "4 October 2026";
const CONTACT = process.env.REACT_APP_CONTACT_EMAIL;

interface Block {
  heading: string;
  body: React.ReactNode;
}

const Mail: React.FC = () =>
  CONTACT ? (
    <a href={`mailto:${CONTACT}`} className="font-medium text-epoch-vermilion underline-offset-4 hover:underline">
      {CONTACT}
    </a>
  ) : (
    <>the contact address on our Google Play listing</>
  );

const External: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-epoch-vermilion underline-offset-4 hover:underline"
  >
    {children}
  </a>
);

const List: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="mt-3 space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-epoch-vermilion" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const SECTIONS: Block[] = [
  {
    heading: "What Epoch keeps",
    body: (
      <List
        items={[
          <>
            <strong className="font-medium text-epoch-ink">Your profile:</strong> name, birth date, gender, the
            horizon you set, and the avatar you pick.
          </>,
          <>
            <strong className="font-medium text-epoch-ink">Your events:</strong> title, date and time, note, icon,
            colour, category, reminder choice, and when each was created and last changed.
          </>,
          <>
            <strong className="font-medium text-epoch-ink">Your settings</strong> and progress styles, which stay on
            your phone.
          </>,
        ]}
      />
    ),
  },
  {
    heading: "Where it's stored",
    body: (
      <>
        <p>
          Everything is stored on your phone first. Your profile and events are also backed up to your Epoch account
          in Google Firebase (Cloud Firestore), so they can be restored on a new phone. Every install gets an account
          automatically, with no sign-up. Only that account can read its data.
        </p>
      </>
    ),
  },
  {
    heading: "Your calendar",
    body: (
      <List
        items={[
          <>
            Bringing in moments from your calendar is optional and only starts when you ask for it. With your
            permission, Epoch reads the calendar on your phone once, from the past year and the next, to suggest
            trips, birthdays and plans worth counting down to.
          </>,
          <>
            Reading happens on your phone. Only the events you choose to keep are added to Epoch, and they are then
            stored and backed up like any event you add yourself. Nothing else from your calendar leaves your phone.
          </>,
          <>
            Epoch never adds, changes or deletes anything in your calendar. You can turn calendar access off at any
            time in your phone's settings.
          </>,
        ]}
      />
    ),
  },
  {
    heading: "Signing in with Apple or Google",
    body: (
      <p>
        Signing in is optional. If you choose to, Apple or Google shares your name and email address with us through
        Firebase Authentication (Google also shares your profile picture; with Apple you can hide your email behind a
        private relay address). We use them only to recognise your account so your journey can be restored.
      </p>
    ),
  },
  {
    heading: "Smart suggestions",
    body: (
      <p>
        When you type an event's title, the title and note are sent to our server, which asks TypeSafe (typesafe.ai),
        an AI service, to suggest a category, icon and colour. Our server keeps the title in its logs for a short time
        to find and fix problems. Suggestions are never used to identify you.
      </p>
    ),
  },
  {
    heading: "Analytics and crash reports",
    body: (
      <List
        items={[
          <>
            <strong className="font-medium text-epoch-ink">Google Analytics for Firebase</strong> tells us how the
            app is used, such as which screens are opened. When you create or edit an event, its title and date are
            included.
          </>,
          <>
            <strong className="font-medium text-epoch-ink">Firebase Crashlytics</strong> sends a report when the app
            crashes, with details like your device model and system version.
          </>,
        ]}
      />
    ),
  },
  {
    heading: "Notifications and app integrity",
    body: (
      <p>
        Reminders are scheduled on your phone. Firebase Cloud Messaging gives your phone a token so we can send app
        announcements. Firebase App Check confirms that requests to our server come from the genuine Epoch app.
      </p>
    ),
  },
  {
    heading: "Feedback",
    body: (
      <p>
        If you send feedback from the app, we receive what you write and, if you add it, your email address, so we
        can reply.
      </p>
    ),
  },
  {
    heading: "What we don't do",
    body: (
      <p>
        We don't sell your data, show ads, or share your data with anyone except the services named above, which
        process it on our behalf. Their own policies apply:{" "}
        <External href="https://policies.google.com/privacy">Google</External> and{" "}
        <External href="https://firebase.google.com/support/privacy">Firebase</External>.
      </p>
    ),
  },
  {
    heading: "Deleting your data",
    body: (
      <List
        items={[
          <>Uninstalling the app removes everything stored on your phone.</>,
          <>
            <strong className="font-medium text-epoch-ink">Settings, Sign out of this phone</strong> removes your data
            from the phone and keeps your backup, so you can restore it later.
          </>,
          <>
            <strong className="font-medium text-epoch-ink">Settings, Delete account</strong> deletes your account and
            its backup. If you signed in with Google or Apple, it is paused at once and deleted for good after 30 days;
            signing in again before then restores it. If you never signed in, it is deleted immediately.
          </>,
          <>
            No longer have the app? See{" "}
            <Link to="/epoch/delete-account" className="font-medium text-epoch-vermilion underline-offset-4 hover:underline">
              how to delete your account
            </Link>{" "}
            or email <Mail />.
          </>,
        ]}
      />
    ),
  },
  {
    heading: "Security",
    body: (
      <p>
        Data travels encrypted and your backup can only be read by your own account. No system is perfectly secure,
        but we take reasonable steps to protect what you store.
      </p>
    ),
  },
  {
    heading: "Children",
    body: (
      <p>
        Epoch is not directed at children under 13, and we don't knowingly collect their data. If you believe a child
        has used Epoch, contact us and we'll delete it.
      </p>
    ),
  },
  {
    heading: "Changes",
    body: (
      <p>
        If this policy changes, we'll update it here and change the date at the top. Significant changes will also be
        mentioned in the app's release notes.
      </p>
    ),
  },
  {
    heading: "Contact",
    body: (
      <p>
        Questions about your privacy? Email <Mail />.
      </p>
    ),
  },
];

/**
 * Epoch's privacy policy, in the app's own palette. Opened inside the app
 * with `?embed=1`, it drops the site's navigation and footer so it reads like
 * a native screen under the app's own app bar.
 */
const EpochPrivacy: React.FC = () => {
  const [params] = useSearchParams();
  const embedded = params.get("embed") === "1";

  useDocumentHead({
    title: "Privacy policy · Epoch",
    description: "How Epoch handles your data: what it keeps, where it's stored, and how to delete it.",
    icon: `${process.env.PUBLIC_URL}/epoch/favicon.png`,
    appleTouchIcon: `${process.env.PUBLIC_URL}/epoch/apple-touch-icon.png`,
    themeColor: "#FFF2E0",
  });

  return (
    <div className="epoch-page min-h-screen bg-epoch-cream font-[Poppins,ui-sans-serif,system-ui,sans-serif] text-epoch-ink antialiased">
      {!embedded && (
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
      )}

      <main className={`mx-auto max-w-2xl px-6 ${embedded ? "pb-12 pt-6" : "pb-20 pt-8 sm:pt-14"}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-epoch-vermilion">Privacy policy</p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">Your time is yours.</h1>
        <p className="mt-4 text-sm text-epoch-muted">Effective {EFFECTIVE}</p>

        <div className="mt-8 rounded-[20px] bg-epoch-card p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-epoch-muted">The short version</p>
          <List
            items={[
              "Your events and profile live on your phone and are backed up to your own Epoch account.",
              "We don't sell your data or show ads.",
              "You can have everything deleted at any time.",
            ]}
          />
        </div>

        <div className="mt-10 space-y-9 leading-relaxed text-epoch-ink/85">
          {SECTIONS.map(({ heading, body }) => (
            <section key={heading}>
              <h2 className="text-lg font-semibold tracking-tight text-epoch-ink">{heading}</h2>
              <div className="mt-2">{body}</div>
            </section>
          ))}
        </div>
      </main>

      {!embedded && (
        <footer className="border-t border-epoch-hairline">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-epoch-muted sm:flex-row">
            <p>© {new Date().getFullYear()} Widget Media Labs</p>
            <Link to="/" className="hover:text-epoch-ink">
              More apps
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default EpochPrivacy;
