import React from "react";
import { Link } from "react-router-dom";
import { useDocumentHead } from "../useDocumentHead";

const EFFECTIVE = "27 September 2026";
const CONTACT = process.env.REACT_APP_CONTACT_EMAIL;

const Mail: React.FC = () =>
  CONTACT ? (
    <a href={`mailto:${CONTACT}`} className="font-medium text-blue-700 underline-offset-4 hover:underline">
      {CONTACT}
    </a>
  ) : (
    <>the contact address on the app's Google Play listing</>
  );

const External: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline-offset-4 hover:underline">
    {children}
  </a>
);

const SECTIONS: Array<{ heading: string; body: React.ReactNode }> = [
  {
    heading: "Information we collect",
    body: (
      <>
        <p>
          Each app collects only what it needs to work. Depending on the app, that can include what you enter into it,
          basic information about your device, and how the app is used.
        </p>
        <p className="mt-3">
          If an app offers an account or sign-in, it is optional unless the app says otherwise, and we receive only
          the details needed to recognise your account, such as your name and email address.
        </p>
      </>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>To provide the app's features and keep your data available to you.</li>
        <li>To understand how the app is used, so we can improve it.</li>
        <li>To find and fix crashes and bugs.</li>
        <li>To reply when you contact us.</li>
      </ul>
    ),
  },
  {
    heading: "Third-party services",
    body: (
      <>
        <p>Our apps use trusted services that process data on our behalf, under their own policies:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <External href="https://policies.google.com/privacy">Google Play Services</External>
          </li>
          <li>
            <External href="https://firebase.google.com/support/privacy">
              Google Firebase (Analytics, Crashlytics, and, where used, Authentication and Cloud Firestore)
            </External>
          </li>
        </ul>
        <p className="mt-3">Some apps have their own policy with more detail; it's linked from inside that app.</p>
      </>
    ),
  },
  {
    heading: "What we don't do",
    body: <p>We don't sell your personal data, and we don't share it with anyone except the services above.</p>,
  },
  {
    heading: "Deleting your data",
    body: (
      <p>
        Uninstalling an app removes the data it stored on your device. To have any data we hold about you deleted,
        email <Mail /> and tell us which app you use.
      </p>
    ),
  },
  {
    heading: "Security",
    body: (
      <p>
        We take reasonable steps to protect your data, and it travels encrypted. No system is perfectly secure, so
        please take care with what you share online.
      </p>
    ),
  },
  {
    heading: "Children",
    body: (
      <p>
        Our apps are not directed at children under 13, and we don't knowingly collect their data. If you believe a
        child has shared data with us, contact us and we'll delete it.
      </p>
    ),
  },
  {
    heading: "Changes",
    body: <p>We may update this policy. When we do, we'll change the date at the top of this page.</p>,
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

/** The general privacy policy for Widget Media Labs apps. Apps with their own
 *  policy (Epoch, Autofill, Pastelog) link to theirs instead. */
const PrivacyPolicy: React.FC = () => {
  useDocumentHead({
    title: "Privacy policy · Widget Media Labs",
    description: "How Widget Media Labs apps handle your data.",
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="gradient px-6 pb-16 pt-12 text-white">
        <div className="mx-auto max-w-2xl">
          <Link to="/" className="text-sm font-medium text-white/85 hover:text-white">
            Widget Media Labs
          </Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">Privacy policy</h1>
          <p className="mt-3 text-white/85">Effective {EFFECTIVE}</p>
        </div>
      </header>

      <main className="mx-auto -mt-8 max-w-2xl px-6 pb-16">
        <div className="rounded-[20px] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-lg leading-relaxed">
            Your privacy matters to us. This policy explains what our apps collect, why, and the choices you have.
          </p>
          <div className="mt-8 space-y-8 leading-relaxed text-slate-700">
            {SECTIONS.map(({ heading, body }) => (
              <section key={heading}>
                <h2 className="text-lg font-semibold text-slate-900">{heading}</h2>
                <div className="mt-2">{body}</div>
              </section>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-800">
            Back to Widget Media Labs
          </Link>
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
