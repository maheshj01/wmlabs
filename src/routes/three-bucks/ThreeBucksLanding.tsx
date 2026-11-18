import {
  ArrowRight,
  CalendarRange,
  Flag,
  Handshake,
  Layers,
  ShieldCheck,
  Sparkles,
  Tags,
  UserRound,
  WifiOff,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useDocumentHead } from "../../useDocumentHead";
import { useInView, useParallax } from "../epoch/landing/hooks";
import { BucketsDemo, KIND, QUICK_ENTRIES, QuickEntryCard, SplitDemo, SyncCard } from "./demos";
import { APP_STORE_URL, PLAY_URL, isPublished } from "./stores";
import "./three-bucks.css";

/** Google Play mark (Simple Icons, CC0). */
const PlayGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
  </svg>
);

/** Apple mark (Simple Icons, CC0). */
const AppleGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const ICON = `${process.env.PUBLIC_URL}/three-bucks/icon.webp`;

/** Standalone landing page for Three Bucks, the offline-first expense tracker. */
const ThreeBucksLanding: React.FC = () => {
  useDocumentHead({
    title: "Three Bucks · Know where every buck goes",
    description:
      "Log an expense in one line, keep investing apart from spending, and split bills with friends. An offline-first expense tracker for iPhone and Android.",
    icon: `${process.env.PUBLIC_URL}/three-bucks/favicon.png`,
    appleTouchIcon: `${process.env.PUBLIC_URL}/three-bucks/apple-touch-icon.png`,
    themeColor: "#FAF9F6",
  });

  return (
    <div className="tb-page min-h-screen overflow-x-hidden bg-tb-paper text-tb-ink">
      <Nav />
      <Hero />
      <Marquee />
      <NotSpending />
      <EveryYear />
      <SplitBills />
      <Plan />
      <Offline />
      <FinalCta />
      <Footer />
    </div>
  );
};

/* ------------------------------------------------------------------ */

const StoreButton: React.FC<{
  href: string;
  store: "play" | "apple";
  filled: boolean;
  size: "md" | "lg";
}> = ({ href, store, filled, size }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group inline-flex items-center gap-3 rounded-full font-medium transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
      filled ? "bg-tb-ink text-tb-paper" : "border border-tb-ink/15 text-tb-ink"
    } ${size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm"}`}
  >
    {store === "play" ? <PlayGlyph className="h-5 w-5" /> : <AppleGlyph className="h-5 w-5" />}
    {store === "play" ? "Get it on Google Play" : "Download on the App Store"}
    {filled && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />}
  </a>
);

/** Store buttons once published; until then a quiet "coming soon". */
const StoreButtons: React.FC<{ center?: boolean }> = ({ center = false }) => {
  if (!isPublished()) {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className="inline-flex items-center gap-3 rounded-full bg-tb-ink px-6 py-4 text-base font-medium text-tb-paper">
          <AppleGlyph className="h-5 w-5" />
          <PlayGlyph className="h-[18px] w-[18px]" />
          <span className="sm:hidden">Coming soon</span>
          <span className="hidden sm:inline">Coming soon to iPhone and Android</span>
        </span>
      </div>
    );
  }
  return (
    <div className={`flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`}>
      {APP_STORE_URL && <StoreButton href={APP_STORE_URL} store="apple" filled size="lg" />}
      {PLAY_URL && <StoreButton href={PLAY_URL} store="play" filled={!APP_STORE_URL} size="lg" />}
    </div>
  );
};

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`tb-reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

/** A framed iPhone screenshot from the app's own screenshot run. */
const Phone: React.FC<{ name: string; alt: string; className?: string; eager?: boolean }> = ({
  name,
  alt,
  className = "",
  eager = false,
}) => (
  <img
    src={`${process.env.PUBLIC_URL}/three-bucks/ios/${name}.webp`}
    alt={alt}
    width={720}
    height={1440}
    loading={eager ? "eager" : "lazy"}
    decoding="async"
    draggable={false}
    className={`tb-phone h-auto w-full select-none ${className}`}
  />
);

const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "text-tb-lived",
}) => (
  <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${className}`}>{children}</p>
);

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({
  children,
  className = "",
  id,
}) => (
  <section id={id} className={`mx-auto max-w-6xl px-6 py-24 sm:py-32 ${className}`}>
    {children}
  </section>
);

const Feature: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  points?: string[];
}> = ({ eyebrow, title, body, points }) => (
  <div>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">{title}</h2>
    <p className="mt-5 max-w-md text-lg leading-relaxed text-tb-muted">{body}</p>
    {points && (
      <ul className="mt-7 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-[2px] bg-tb-lived" />
            {point}
          </li>
        ))}
      </ul>
    )}
  </div>
);

/* ------------------------------------------------------------------ */

const Nav: React.FC = () => (
  <header className="sticky top-0 z-40 bg-tb-paper/80 backdrop-blur-md">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link to="/three-bucks" className="flex items-center gap-2.5">
        <img src={ICON} alt="" width={32} height={32} className="h-8 w-8" />
        <span className="text-lg font-semibold tracking-tight">Three Bucks</span>
      </Link>
      {isPublished() ? (
        <a
          href={(APP_STORE_URL ?? PLAY_URL) as string}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-tb-ink px-4 py-2 text-sm font-medium text-tb-paper transition-transform hover:-translate-y-0.5"
        >
          Get the app
        </a>
      ) : (
        <span className="rounded-full bg-tb-lived-soft px-3.5 py-1.5 text-sm font-medium text-tb-lived">
          Coming soon
        </span>
      )}
    </nav>
  </header>
);

const Hero: React.FC = () => (
  <div className="relative">
    <div className="tb-ledger pointer-events-none absolute inset-0 -top-20" aria-hidden />
    <Section className="relative grid items-center gap-14 !pt-12 sm:!pt-20 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <Reveal>
          <Eyebrow>Expense tracker · iPhone and Android</Eyebrow>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Know where
            <br />
            every <span className="text-tb-lived">buck</span> goes.
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-tb-muted">
            Type “costco 46 split” and you’re done. Three Bucks fills in the amount, the split and the
            category, and keeps what you live on, what you invest and what you earn apart.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-9">
            <StoreButtons />
            <p className="mt-4 text-sm text-tb-muted">Free · No sign-up · No bank login</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={150} className="relative mx-auto w-full max-w-[420px]">
        <div className="mx-auto w-[78%]">
          <Phone
            name="08_home"
            eager
            alt="The Three Bucks home screen: living spend against the monthly budget, this month's lived, invested and earned totals, and recent entries"
          />
        </div>
        <div className="absolute -left-2 bottom-10 w-[88%] sm:-left-10">
          <QuickEntryCard />
        </div>
      </Reveal>
    </Section>
  </div>
);

const Marquee: React.FC = () => {
  const items = [
    ...QUICK_ENTRIES,
    { text: "verizon 28", emoji: "📱", kind: "lived" as const },
    { text: "movie 14", emoji: "🎬", kind: "lived" as const },
    { text: "QQQ 500", emoji: "📈", kind: "invested" as const },
    { text: "dominos 10.50", emoji: "🍕", kind: "lived" as const },
    { text: "rent back 500", emoji: "↩︎", kind: "lived" as const },
  ];
  const doubled = [...items, ...items];
  return (
    <div className="tb-marquee overflow-hidden border-y border-tb-line bg-tb-card/70 py-5" aria-hidden>
      <div className="tb-marquee-track flex w-max gap-4">
        {doubled.map(({ text, emoji, kind }, i) => (
          <span
            key={`${text}-${i}`}
            className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-tb-line bg-tb-card px-4 py-2 text-sm"
          >
            <span className={`grid h-7 w-7 place-items-center rounded-full text-sm ${KIND[kind].soft}`}>{emoji}</span>
            <span className="font-medium">{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const NotSpending: React.FC = () => (
  <Section className="grid items-center gap-16 lg:grid-cols-2">
    <Reveal>
      <Feature
        eyebrow="Investing isn’t spending"
        title="Your best month of saving shouldn’t look like overspending."
        body="Most apps add everything up into one scary number. Three Bucks keeps three: what you lived on, what you invested and what you earned. Put $3,800 into index funds and your budget still says you’re doing fine, because you are."
        points={[
          "Every category is spending, investing or income",
          "Your budget only counts what you actually lived on",
          "Money back, like a refund or a roommate paying you, comes off your spending",
        ]}
      />
    </Reveal>
    <Reveal delay={150}>
      <BucketsDemo />
    </Reveal>
  </Section>
);

const EveryYear: React.FC = () => {
  const back = useParallax<HTMLDivElement>(0.06);
  const front = useParallax<HTMLDivElement>(-0.05);
  return (
    <div className="bg-tb-card/60">
      <Section className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto h-[560px] w-full max-w-[440px] sm:h-[640px]">
            <div ref={back} className="absolute left-0 top-0 w-[62%]">
              <Phone name="11_history" alt="History: every year with its lived, invested and earned totals" />
            </div>
            <div ref={front} className="absolute bottom-0 right-0 w-[62%]">
              <Phone name="12_year" alt="One year: a monthly chart, totals and the top categories" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="order-1 lg:order-2">
          <Feature
            eyebrow="Every year, every month"
            title="The spreadsheet you kept, without the spreadsheet."
            body="Three Bucks started as a yearly expense sheet. It still thinks that way: every year side by side, every month a bar, every entry one tap away. See how this year’s average month compares with last year’s, not a half-finished year against a whole one."
            points={[
              "Every past year, with its own totals and chart",
              "Tap any month to see exactly what happened",
              "Search and filter: “costco”, “> 100”, only split bills",
            ]}
          />
        </Reveal>
      </Section>
    </div>
  );
};

const SplitBills: React.FC = () => (
  <Section className="grid items-start gap-16 lg:grid-cols-[1fr_1.05fr]">
    <div>
      <Reveal>
        <Feature
          eyebrow="Split with friends"
          title="Split it once. Everyone sees their share."
          body="Pick friends in the same sheet you log the bill in. It shows up in their app as their share and in yours as what they owe. If a share looks wrong, they flag it, and it stops counting until you fix it."
        />
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          { icon: UserRound, title: "Add by username", body: "Friends find you by your exact username. Nobody can browse who’s on the app." },
          { icon: Flag, title: "Flag a share", body: "A disputed share counts for nothing until the payer edits the bill." },
          { icon: Handshake, title: "Settle up", body: "Record a bank transfer or cash. No money moves through the app." },
          { icon: Sparkles, title: "Friends not on the app", body: "Split with them too. Only your share is tracked." },
        ].map(({ icon: Icon, title, body }, i) => (
          <Reveal key={title} delay={i * 80}>
            <div className="h-full rounded-[16px] border border-tb-line bg-tb-card p-5">
              <Icon className="h-5 w-5 text-tb-lived" aria-hidden />
              <p className="mt-3 font-medium">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-tb-muted">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
    <div className="space-y-10">
      <Reveal delay={120}>
        <SplitDemo />
        <p className="mt-3 text-center text-xs text-tb-muted">Try it: pick people, or flag a share.</p>
      </Reveal>
      <Reveal delay={200}>
        <div className="tb-fan mx-auto grid max-w-[520px] grid-cols-3 items-end">
          <Phone name="16_people" alt="People: what you're owed and what you owe, a request to accept and balances per person" />
          <Phone name="19_bill_disputed" alt="A shared dinner bill with one flagged share and the reason" className="relative z-10" />
          <Phone name="21_inbox" alt="The inbox: a flag to resolve, a friend request, a new bill and a payment" />
        </div>
      </Reveal>
    </div>
  </Section>
);

const Plan: React.FC = () => (
  <div className="bg-tb-card/60">
    <Section className="text-center">
      <Reveal>
        <Eyebrow>A plan in a minute</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          Tell it what you earn. It tells you what’s safe to spend.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-tb-muted">
          A short setup asks about your pay, your monthly spending and what you’re saving for, then splits
          your income into live on, set aside and unplanned. Every morning, Home shows what’s safe to spend today.
        </p>
      </Reveal>
      <Reveal delay={150}>
        <div className="tb-fan mx-auto mt-16 grid max-w-3xl grid-cols-3 items-end">
          <Phone name="02_income" alt="Setup: take-home pay every two weeks with its monthly equivalent" />
          <Phone name="07_plan" alt="Setup: the monthly plan split into live on, set aside and unplanned" className="relative z-10" />
          <Phone name="04_goals" alt="Setup: picking goals and a monthly savings target" />
        </div>
      </Reveal>
      <div className="mx-auto mt-16 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
        {[
          { icon: Layers, title: "Paid every two weeks?", body: "Weekly, biweekly or twice a month, turned into a real monthly number." },
          { icon: CalendarRange, title: "Safe to spend today", body: "What’s left of this month’s budget, divided by the days left." },
          { icon: Tags, title: "Your categories", body: "Start with the common ones, then add, recolor and archive your own." },
        ].map(({ icon: Icon, title, body }, i) => (
          <Reveal key={title} delay={i * 100}>
            <div className="h-full rounded-[16px] bg-tb-card p-5">
              <Icon className="h-5 w-5 text-tb-lived" aria-hidden />
              <p className="mt-3 font-medium">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-tb-muted">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  </div>
);

const Offline: React.FC = () => (
  <div className="bg-tb-ink text-tb-paper">
    <Section className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
      <Reveal>
        <Eyebrow className="text-[#45C487]">Offline first</Eyebrow>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          Works without a signal. Stays yours.
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-tb-paper/70">
          Every entry is saved on your phone first and backed up when you’re online, so logging a coffee never
          waits for a network. There’s no bank to connect and nothing is shared unless you split it.
        </p>
        <ul className="mt-8 grid max-w-lg gap-4 sm:grid-cols-2">
          {[
            { icon: WifiOff, text: "Add, edit and browse offline" },
            { icon: ShieldCheck, text: "No bank login, ever" },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-tb-paper/85">
              <Icon className="h-5 w-5 text-[#45C487]" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={150}>
        <SyncCard />
      </Reveal>
    </Section>
  </div>
);

const FinalCta: React.FC = () => (
  <Section className="text-center">
    <Reveal>
      <img src={ICON} alt="" width={80} height={80} className="mx-auto h-20 w-20" loading="lazy" />
      <h2 className="mx-auto mt-8 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
        Every buck, accounted for.
        <span className="block text-tb-lived">In one line.</span>
      </h2>
      <div className="mt-10">
        <StoreButtons center />
      </div>
    </Reveal>
  </Section>
);

const Footer: React.FC = () => (
  <footer className="border-t border-tb-line">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-tb-muted sm:flex-row">
      <p>© {new Date().getFullYear()} Widget Media Labs</p>
      <div className="flex gap-6">
        <Link to="/three-bucks/privacy" className="hover:text-tb-ink">
          Privacy policy
        </Link>
        <Link to="/" className="hover:text-tb-ink">
          More apps
        </Link>
      </div>
    </div>
  </footer>
);

export default ThreeBucksLanding;
