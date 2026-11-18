import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDocumentHead } from "../../../useDocumentHead";

const EFFECTIVE = "18 November 2026";
const CONTACT = process.env.REACT_APP_CONTACT_EMAIL;

interface Block {
  heading: string;
  body: React.ReactNode;
}

const Mail: React.FC = () =>
  CONTACT ? (
    <a href={`mailto:${CONTACT}`} className="font-medium text-tb-lived underline-offset-4 hover:underline">
      {CONTACT}
    </a>
  ) : (
    <>the contact address on our store listing</>
  );

const External: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-tb-lived underline-offset-4 hover:underline"
  >
    {children}
  </a>
);

const B: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong className="font-medium text-tb-ink">{children}</strong>
);

const List: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="mt-3 space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-tb-lived" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const SECTIONS: Block[] = [
  {
    heading: "What stays on your phone",
    body: (
      <>
        <p>These never leave your phone:</p>
        <List
          items={[
            <>The name you give during setup, your income and pay frequency, your monthly budget, your savings goal and the goals you pick.</>,
            <>Your currency and other preferences.</>,
          ]}
        />
      </>
    ),
  },
  {
    heading: "What's backed up",
    body: (
      <>
        <p>
          Your <B>entries</B> (amount, date, note, category, how many ways a bill was split, and when each was
          created and changed) and your <B>categories</B> (name, emoji, color, type and order) are stored on your
          phone first and backed up to your own account in Google Firebase (Cloud Firestore), so they can be
          restored. Every install gets an account automatically, with no sign-up, and only that account can read its
          data.
        </p>
      </>
    ),
  },
  {
    heading: "Splitting bills with people",
    body: (
      <>
        <p>Sharing is optional. Nothing is shared with anyone unless you use it.</p>
        <List
          items={[
            <>
              <B>Signing in.</B> To share, you sign in with Apple or Google. They share your name and email address
              with us through Firebase Authentication (with Apple you can hide your email behind a private relay
              address). We use them only to recognise your account.
            </>,
            <>
              <B>Your username and name</B> can be seen by anyone signed in who types your exact username. There is no
              search or list of users. Invite links and QR codes contain your username.
            </>,
            <>
              <B>Connections.</B> When you add someone or accept a request, both of you can see each other's username
              and name.
            </>,
            <>
              <B>Shared bills</B> are visible to everyone on them: the amount, currency, date, note, the note you add
              for them, category, who is on it, and any flag with its reason and note. Each person's share is also
              added to their own entries.
            </>,
            <>
              <B>Settling up</B> records who paid whom, how much and when, visible to the two of you. No money moves
              through the app.
            </>,
          ]}
        />
      </>
    ),
  },
  {
    heading: "What we don't collect",
    body: (
      <List
        items={[
          <>No bank or card logins. Three Bucks never connects to your bank.</>,
          <>No analytics, crash reporting or advertising tools.</>,
          <>No contacts, location, camera or photos. Your phone's own camera app reads invite QR codes.</>,
        ]}
      />
    ),
  },
  {
    heading: "What we don't do",
    body: (
      <p>
        We don't sell your data, show ads, or share your data with anyone except Google, whose Firebase services store
        and sign in your account on our behalf. Their own policies apply:{" "}
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
            <B>Settings, Sign out</B> signs you out of sharing. Your entries stay on your phone.
          </>,
          <>
            <B>Settings, Delete account</B> deletes your sign-in, your username, your name and your connections. Bills
            you already shared stay visible to the other people on them.
          </>,
          <>
            To have your backed-up entries and categories deleted as well, email <Mail /> from the address you signed
            in with, or include your username.
          </>,
        ]}
      />
    ),
  },
  {
    heading: "Security",
    body: (
      <p>
        Data travels encrypted. Your backup can only be read by your own account, and a shared bill only by the people
        on it. No system is perfectly secure, but we take reasonable steps to protect what you store.
      </p>
    ),
  },
  {
    heading: "Children",
    body: (
      <p>
        Three Bucks is not directed at children under 13, and we don't knowingly collect their data. If you believe a
        child has used it, contact us and we'll delete it.
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
 * Three Bucks' privacy policy, in the app's own palette. Opened inside the
 * app with `?embed=1`, it drops the site's navigation and footer so it reads
 * like a native screen under the app's own app bar.
 */
const ThreeBucksPrivacy: React.FC = () => {
  const [params] = useSearchParams();
  const embedded = params.get("embed") === "1";

  useDocumentHead({
    title: "Privacy policy · Three Bucks",
    description: "How Three Bucks handles your data: what stays on your phone, what's backed up, what's shared, and how to delete it.",
    icon: `${process.env.PUBLIC_URL}/three-bucks/favicon.png`,
    appleTouchIcon: `${process.env.PUBLIC_URL}/three-bucks/apple-touch-icon.png`,
    themeColor: "#FAF9F6",
  });

  return (
    <div className="min-h-screen bg-tb-paper font-[Inter,ui-sans-serif,system-ui,sans-serif] text-tb-ink antialiased">
      {!embedded && (
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
      )}

      <main className={`mx-auto max-w-2xl px-6 ${embedded ? "pb-12 pt-6" : "pb-20 pt-8 sm:pt-14"}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-tb-lived">Privacy policy</p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">Your money is your business.</h1>
        <p className="mt-4 text-sm text-tb-muted">Effective {EFFECTIVE}</p>

        <div className="mt-8 rounded-[20px] border border-tb-line bg-tb-card p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tb-muted">The short version</p>
          <List
            items={[
              "Your entries live on your phone and are backed up to your own account. Your income, budget and goals never leave your phone.",
              "Nothing is shared unless you split a bill, and then only with the people on it.",
              "No bank logins, no ads, no analytics. We don't sell your data.",
            ]}
          />
        </div>

        <div className="mt-10 space-y-9 leading-relaxed text-tb-ink/85">
          {SECTIONS.map(({ heading, body }) => (
            <section key={heading}>
              <h2 className="text-lg font-semibold tracking-tight text-tb-ink">{heading}</h2>
              <div className="mt-2">{body}</div>
            </section>
          ))}
        </div>
      </main>

      {!embedded && (
        <footer className="border-t border-tb-line">
          <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-tb-muted sm:flex-row">
            <p>© {new Date().getFullYear()} Widget Media Labs</p>
            <Link to="/" className="hover:text-tb-ink">
              More apps
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ThreeBucksPrivacy;
