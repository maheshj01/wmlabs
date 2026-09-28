import {
  ArrowRight,
  Bell,
  CloudUpload,
  Palette,
  Smartphone,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useDocumentHead } from "../../../useDocumentHead";
import { SAMPLE_EVENTS } from "./events";
import { useInView, useParallax, useTypewriter } from "./hooks";
import LifeGrid from "./LifeGrid";
import {
  PlatformProvider,
  PlatformSwitch,
  SHOT_SIZE,
  usePlatform,
} from "./platform";
import YearGrid from "./YearGrid";
import "./epoch.css";

const PLAY_URL = "https://play.google.com/store/apps/details?id=com.wml.epoch";

/** Google Play mark (Simple Icons, CC0). */
const PlayGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
  </svg>
);

/** Apple mark (Simple Icons, CC0). */
const AppleGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

/** Standalone landing page for Epoch, the life-in-dots countdown app. */
const EpochLanding: React.FC = () => {
  useDocumentHead({
    title: "Epoch · Make every day count",
    description:
      "Don't just count days. See your time as dots, plan what matters, and make every day count.",
    icon: `${process.env.PUBLIC_URL}/epoch/favicon.png`,
    appleTouchIcon: `${process.env.PUBLIC_URL}/epoch/apple-touch-icon.png`,
    themeColor: "#FFF2E0",
  });

  return (
    <PlatformProvider>
      <div className="epoch-page min-h-screen overflow-x-hidden bg-epoch-cream text-epoch-ink">
        <Nav />
        <Hero />
        <Marquee />
        <MarkWhatMatters />
        <YearDots />
        <Timeline />
        <LifeInYears />
        <MakeItYours />
        <Backup />
        <FinalCta />
        <Footer />
      </div>
    </PlatformProvider>
  );
};

/* ------------------------------------------------------------------ */

const PlayButton: React.FC<{ size?: "md" | "lg"; tone?: "ink" | "cream" }> = ({
  size = "md",
  tone = "ink",
}) => (
  <a
    href={PLAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`group inline-flex items-center gap-3 rounded-full font-medium transition-transform hover:-translate-y-0.5 active:translate-y-0 ${tone === "ink"
      ? "bg-epoch-ink text-epoch-cream"
      : "bg-epoch-cream text-epoch-ink"
      } ${size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm"}`}
  >
    <PlayGlyph className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
    Get it on Google Play
    <ArrowRight
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
      aria-hidden
    />
  </a>
);

/** The iPhone app is waiting on App Store review of the developer account, so
 *  this is a quiet badge rather than a link until it ships. */
const AppStoreSoon: React.FC<{ size?: "md" | "lg" }> = ({ size = "md" }) => (
  <span
    className={`inline-flex items-center gap-3 rounded-full border border-epoch-ink/15 text-epoch-ink ${size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-3 text-sm"
      }`}
  >
    <AppleGlyph className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
    <span className="leading-tight">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-epoch-muted">
        Coming soon
      </span>
      <span className="block font-medium">App Store</span>
    </span>
  </span>
);

const StoreButtons: React.FC<{ size?: "md" | "lg"; center?: boolean }> = ({
  size = "lg",
  center = false,
}) => (
  <div
    className={`flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`}
  >
    <PlayButton size={size} />
    <AppStoreSoon size={size} />
  </div>
);

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div
      ref={ref}
      className={`ep-reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

const Phone: React.FC<{
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
}> = ({ name, alt, className = "", eager = false }) => {
  const { platform } = usePlatform();
  const { width, height } = SHOT_SIZE[platform];
  return (
    <img
      key={platform}
      src={`${process.env.PUBLIC_URL}/epoch/${platform}/${name}.webp`}
      alt={`${alt} (${platform === "ios" ? "iPhone" : "Android"})`}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`ep-phone ep-shot-in h-auto w-full select-none ${className}`}
      draggable={false}
    />
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-epoch-vermilion">
    {children}
  </p>
);

const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = "", id }) => (
  <section
    id={id}
    className={`mx-auto max-w-6xl px-6 py-24 sm:py-32 ${className}`}
  >
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
    <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
      {title}
    </h2>
    <p className="mt-5 max-w-md text-lg leading-relaxed text-epoch-muted">
      {body}
    </p>
    {points && (
      <ul className="mt-7 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-epoch-ink">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-epoch-vermilion" />
            {point}
          </li>
        ))}
      </ul>
    )}
  </div>
);

/* ------------------------------------------------------------------ */

const Nav: React.FC = () => (
  <header className="sticky top-0 z-40 border-b border-transparent bg-epoch-cream/80 backdrop-blur-md">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link to="/epoch" className="flex items-center gap-2.5">
        <img
          src={`${process.env.PUBLIC_URL}/epoch/icon.webp`}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="text-lg font-semibold tracking-tight">Epoch</span>
      </Link>
      <a
        href={PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-epoch-ink px-4 py-2 text-sm font-medium text-epoch-cream transition-transform hover:-translate-y-0.5"
      >
        <PlayGlyph className="h-3.5 w-3.5" />
        Get the app
      </a>
    </nav>
  </header>
);

const Hero: React.FC = () => (
  <div className="relative">
    <div
      className="ep-paper pointer-events-none absolute inset-0 -top-20"
      aria-hidden
    />
    <Section className="relative grid items-center gap-14 !pt-12 sm:!pt-20 lg:grid-cols-[1.05fr_1fr]">
      <div>
        <Reveal>
          <Eyebrow>On Android · Coming to iPhone</Eyebrow>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Make every
            <br />
            day <span className="text-epoch-vermilion">count.</span>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-epoch-muted">
            A calendar tells you the date. Epoch shows you your time. Every day
            is a dot, so you can see what's gone, what's left, and what's worth
            planning before it slips by.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-9">
            <StoreButtons />
            <p className="mt-4 text-sm text-epoch-muted">
              Free · No sign-up needed
            </p>
          </div>
          <div className="mt-8">
            <PlatformSwitch />
          </div>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div className="rounded-[32px] bg-epoch-card p-5 shadow-[0_40px_80px_-40px_rgba(122,90,58,0.45)] sm:p-8">
          <YearGrid />
          <p className="mt-3 text-center text-xs text-epoch-muted">
            Hover or tap an icon.
          </p>
        </div>
      </Reveal>
    </Section>
  </div>
);

const Marquee: React.FC = () => {
  const items = [...SAMPLE_EVENTS, ...SAMPLE_EVENTS];
  return (
    <div
      className="ep-marquee overflow-hidden border-y border-epoch-hairline bg-epoch-card/60 py-5"
      aria-hidden
    >
      <div className="ep-marquee-track flex w-max gap-4">
        {items.map(({ title, icon: Icon, color }, i) => (
          <span
            key={`${title}-${i}`}
            className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-epoch-hairline bg-epoch-card px-4 py-2 text-sm"
          >
            <span
              className="grid h-7 w-7 place-items-center rounded-full"
              style={{ background: `${color}1f`, color }}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
            {title}
          </span>
        ))}
      </div>
    </div>
  );
};

const COMPOSER_EVENTS = SAMPLE_EVENTS.slice(0, 6);
const COMPOSER_DAYS = [3, 12, 41, 67, 104, 9];

const MarkWhatMatters: React.FC = () => {
  const [text, index] = useTypewriter(COMPOSER_EVENTS.map((e) => e.title));
  const event = COMPOSER_EVENTS[index];
  const Icon = event.icon;
  const days = COMPOSER_DAYS[index];

  return (
    <Section className="grid items-center gap-16 lg:grid-cols-2">
      <Reveal>
        <Feature
          eyebrow="Plan what matters"
          title={
            <>
              Don't just count the days.
              <br />
              Plan them.
            </>
          }
          body="The trip you keep talking about. The race you signed up for. Mum's 60th. Give them a date and they stop being someday. Every time you open Epoch, you see them getting closer."
          points={[
            "Always something to look forward to, right in front of you",
            "A gentle nudge before the day arrives, so nothing sneaks up on you",
            "The story behind each moment, kept for when you look back",
          ]}
        />
        {/* A live event card that types itself out, like the app's preview. */}
        <div
          className="mt-10 max-w-md rounded-[16px] border-[1.5px] p-5 transition-colors duration-500"
          style={{ borderColor: event.color, background: `${event.color}14` }}
        >
          <div className="flex items-center gap-4">
            <span
              key={index}
              className="ep-pop grid h-12 w-12 shrink-0 place-items-center rounded-[16px] transition-colors duration-500"
              style={{ background: `${event.color}26`, color: event.color }}
            >
              <Icon className="h-6 w-6" strokeWidth={2.3} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-medium">
                {text}
                <span className="ep-caret" aria-hidden />
              </p>
              <p className="text-sm text-epoch-muted tabular-nums">
                In {days} days
              </p>
            </div>
            <Bell className="h-5 w-5 shrink-0 text-epoch-muted" aria-hidden />
          </div>
        </div>
      </Reveal>
      <Reveal delay={150} className="mx-auto w-full max-w-[320px]">
        <Phone
          name="add_event_filled"
          alt="Adding a Launch party event with a date, a reminder and a live preview"
        />
      </Reveal>
    </Section>
  );
};

const YearDots: React.FC = () => {
  const back = useParallax<HTMLDivElement>(0.06);
  const front = useParallax<HTMLDivElement>(-0.05);
  return (
    <div className="bg-epoch-card/50">
      <Section className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto h-[560px] w-full max-w-[440px] sm:h-[640px]">
            <div ref={back} className="absolute left-0 top-0 w-[62%]">
              <Phone
                name="home_progress"
                alt="The year view: every day of the year as a dot, with events shown as icons"
              />
            </div>
            <div ref={front} className="absolute bottom-0 right-0 w-[62%]">
              <Phone
                name="year_event_callout"
                alt="Tapping an icon on the year view opens the day's events"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={120} className="order-1 lg:order-2">
          <Feature
            eyebrow="See your time"
            title="You never notice a year passing. Until you see it."
            body="Calendars hide your time in little boxes you rarely open. Epoch puts your whole year in front of you at once. One glance shows how much is already behind you, how much is left, and where your plans sit in between."
            points={[
              "Feel the year move, not just the date change",
              "Spot the empty stretches and fill them with something good",
              "Everything you're looking forward to, in a single glance",
            ]}
          />
        </Reveal>
      </Section>
    </div>
  );
};

const Timeline: React.FC = () => (
  <Section className="grid items-center gap-16 lg:grid-cols-2">
    <Reveal>
      <Feature
        eyebrow="Look forward. Look back."
        title="Something to look forward to. Something to look back on."
        body="The moments that shape your life deserve one home: the ones you're counting down to and the ones you've already lived. The next ones are worth planning. The last ones are worth remembering."
      />
      <div className="mt-10 flex flex-wrap gap-3">
        {[
          { label: "3 days left", ahead: true },
          { label: "12 days ago", ahead: false },
          { label: "In 41 days", ahead: true },
          { label: "2 years ago", ahead: false },
        ].map(({ label, ahead }) => (
          <span
            key={label}
            className={`rounded-full px-4 py-2 text-sm font-medium tabular-nums ${ahead
              ? "bg-epoch-vermilion/10 text-epoch-vermilion"
              : "bg-epoch-hairline text-epoch-muted"
              }`}
          >
            {label}
          </span>
        ))}
      </div>
    </Reveal>
    <Reveal delay={150} className="mx-auto w-full max-w-[320px]">
      <Phone
        name="home_events_added"
        alt="The timeline of events with countdowns and month headers"
        className="ep-float"
      />
    </Reveal>
  </Section>
);

const LifeInYears: React.FC = () => (
  <div className="bg-epoch-card/50">
    <Section className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
      <Reveal>
        <Feature
          eyebrow="The bigger picture"
          title={
            <>
              Your life,
              <br />
              in years.
            </>
          }
          body="Seeing a whole life as a grid of dots changes how you spend the rest of it. It's not there to scare you. It's there to remind you there's still time for the things you keep putting off, as long as you start."
        />
        <p className="mt-6 text-sm text-epoch-muted">
          Try it with your own birth year.
        </p>
      </Reveal>
      <Reveal delay={120}>
        <LifeGrid />
      </Reveal>
    </Section>
  </div>
);

const MakeItYours: React.FC = () => (
  <Section className="text-center">
    <Reveal>
      <Eyebrow>Make it yours</Eyebrow>
      <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
        Your avatar. Your icons. Your colours.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-epoch-muted">
        An app you'll actually want to open. Playful avatars, 150 icons and
        colours for every kind of moment, so your grid looks like your life
        and not like a spreadsheet.
      </p>
    </Reveal>
    <Reveal delay={150}>
      <div className="ep-fan mx-auto mt-16 grid max-w-3xl grid-cols-3 items-end">
        <Phone
          name="onboard_avatar"
          alt="Picking an avatar during onboarding"
        />
        <Phone
          name="add_event_icons"
          alt="Choosing an icon and colour for an event"
          className="relative z-10"
        />
        <Phone
          name="style_sheet"
          alt="Restyling the dots of a progress view with a live preview"
        />
      </div>
    </Reveal>
    <div className="mx-auto mt-16 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
      {[
        {
          icon: Palette,
          title: "A glance, not a chore",
          body: "One look tells you more than a week of calendar ever does.",
        },
        {
          icon: Bell,
          title: "Never miss what matters",
          body: "A gentle reminder before the moments you're counting down to.",
        },
        {
          icon: Smartphone,
          title: "Android and iPhone",
          body: "On Android today, iPhone coming soon.",
        },
      ].map(({ icon: Icon, title, body }, i) => (
        <Reveal key={title} delay={i * 100}>
          <div className="h-full rounded-[16px] bg-epoch-card p-5">
            <Icon className="h-5 w-5 text-epoch-vermilion" aria-hidden />
            <p className="mt-3 font-medium">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-epoch-muted">
              {body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);

const Backup: React.FC = () => (
  <div className="bg-epoch-ink text-epoch-cream">
    <Section className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-epoch-vermilion">
          Backed up
        </p>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          Years of memories shouldn't live on one phone.
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-epoch-cream/70">
          Sign in with Google whenever you're ready and your journey is backed
          up. Lose your phone, switch phones, reinstall: sign in again and
          every moment comes back.
        </p>
      </Reveal>
      <Reveal delay={150}>
        <div className="mx-auto max-w-sm rounded-[24px] bg-epoch-card p-6 text-epoch-ink">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-epoch-muted">
            Backup
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-epoch-vermilion/10 text-epoch-vermilion">
              <CloudUpload className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-medium">Backed up</p>
              <p className="text-sm text-epoch-muted">you@gmail.com</p>
            </div>
          </div>
          <div className="mt-5 h-px bg-epoch-hairline" />
          <p className="mt-4 text-sm leading-relaxed text-epoch-muted">
            No account needed to start. Sign in with Google when you want your
            journey on more than one phone.
          </p>
        </div>
      </Reveal>
    </Section>
  </div>
);

const FinalCta: React.FC = () => (
  <Section className="text-center">
    <Reveal>
      <img
        src={`${process.env.PUBLIC_URL}/epoch/icon.webp`}
        alt=""
        width={72}
        height={72}
        className="mx-auto h-[72px] w-[72px]"
        loading="lazy"
      />
      <h2 className="mx-auto mt-8 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
        The days are going to pass anyway.
        <span className="block text-epoch-vermilion">Make them count.</span>
      </h2>
      <div className="mt-10">
        <StoreButtons center />
      </div>
    </Reveal>
  </Section>
);

const Footer: React.FC = () => (
  <footer className="border-t border-epoch-hairline">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-epoch-muted sm:flex-row">
      <p>© {new Date().getFullYear()} Widget Media Labs</p>
      <div className="flex gap-6">
        <Link to="/epoch/privacy" className="hover:text-epoch-ink">
          Privacy policy
        </Link>
        <Link to="/" className="hover:text-epoch-ink">
          More apps
        </Link>
      </div>
    </div>
  </footer>
);

export default EpochLanding;
