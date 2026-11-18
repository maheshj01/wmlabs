import { Check, CloudOff, Flag, Minus, Plus, RefreshCw, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInView, useTypewriter } from "../epoch/landing/hooks";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const usdWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const money = (cents: number) => usd.format(cents / 100);
export const moneyWhole = (cents: number) => usdWhole.format(cents / 100);

export type Kind = "lived" | "invested" | "earned";

export const KIND: Record<Kind, { label: string; text: string; soft: string; bar: string }> = {
  lived: { label: "Lived", text: "text-tb-lived", soft: "bg-tb-lived-soft", bar: "bg-tb-lived" },
  invested: {
    label: "Invested",
    text: "text-tb-invested",
    soft: "bg-tb-invested-soft",
    bar: "bg-tb-invested",
  },
  earned: { label: "Earned", text: "text-tb-earned", soft: "bg-tb-earned-soft", bar: "bg-tb-earned" },
};

/** Eases a number to each new value, so totals count instead of jumping. */
export function useTween(value: number, duration = 700) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(value);
      return;
    }
    const start = from.current;
    const began = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - began) / duration);
      const v = start + (value - start) * (1 - Math.pow(1 - t, 3));
      from.current = v;
      setShown(v);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return Math.round(shown);
}

const Segmented: React.FC<{
  label: string;
  options: Array<[string, string]>;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, options, value, onChange }) => (
  <div role="radiogroup" aria-label={label} className="inline-flex rounded-full bg-tb-sunk p-1">
    {options.map(([v, text]) => {
      const selected = v === value;
      return (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={selected}
          onClick={() => onChange(v)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected ? "bg-tb-card text-tb-ink shadow-sm" : "text-tb-muted hover:text-tb-ink"
          }`}
        >
          {text}
        </button>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ */
/* Hero: quick entry types itself and fills the rest in                */
/* ------------------------------------------------------------------ */

interface Sample {
  text: string;
  note: string;
  emoji: string;
  tile: string;
  category: string;
  kind: Kind;
  cents: number;
  split?: number;
}

const SAMPLES: Sample[] = [
  { text: "costco 46 split", note: "Costco", emoji: "🛒", tile: "#E8F3E4", category: "Food", kind: "lived", cents: 4600, split: 2 },
  { text: "VOO 1250", note: "VOO", emoji: "📈", tile: "#E7EBFF", category: "Investment", kind: "invested", cents: 125000 },
  { text: "kroger 18.42", note: "Kroger", emoji: "🛒", tile: "#E8F3E4", category: "Food", kind: "lived", cents: 1842 },
  { text: "paycheck 3605", note: "Paycheck", emoji: "💼", tile: "#FBF0DC", category: "Salary", kind: "earned", cents: 360500 },
  { text: "gas 41.20", note: "Gas", emoji: "🚗", tile: "#E3EEFB", category: "Car", kind: "lived", cents: 4120 },
  { text: "rent 1166", note: "Rent", emoji: "🏠", tile: "#EDE9FB", category: "Housing", kind: "lived", cents: 116600 },
];

export const QUICK_ENTRIES = SAMPLES;

export const QuickEntryCard: React.FC = () => {
  const [text, index] = useTypewriter(SAMPLES.map((s) => s.text), { type: 85, erase: 30, hold: 2200 });
  const sample = SAMPLES[index];
  const done = text === sample.text;
  const k = KIND[sample.kind];
  const share = sample.split ? Math.round(sample.cents / sample.split) : sample.cents;

  return (
    <div className="w-full max-w-[380px] rounded-[24px] border border-tb-line bg-tb-card p-4 shadow-[0_30px_60px_-30px_rgba(21,23,26,0.35)]">
      <div className="flex items-center gap-3 rounded-[14px] border border-tb-line bg-tb-paper px-3.5 py-3">
        <Sparkles className="h-4 w-4 shrink-0 text-tb-lived" aria-hidden />
        <p className="min-w-0 flex-1 truncate font-medium" aria-live="off">
          {text}
          <span className="tb-caret" aria-hidden />
        </p>
      </div>
      <div className="h-[86px] pt-3">
        {done && (
          <div key={index} className="tb-pop flex items-center gap-3 px-1">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] text-xl"
              style={{ background: sample.tile }}
              aria-hidden
            >
              {sample.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{sample.note}</p>
              <div className="mt-0.5 flex items-center gap-1.5 text-[13px] text-tb-muted">
                <span>{sample.category}</span>
                <span className={`rounded-[6px] px-1.5 py-px text-[11px] font-semibold ${k.soft} ${k.text}`}>
                  {k.label}
                </span>
                {sample.split && (
                  <span className="rounded-[6px] bg-tb-lived-soft px-1.5 py-px text-[11px] font-bold text-tb-lived">
                    ½
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className={`tb-num font-semibold ${sample.kind === "earned" ? "text-tb-earned" : sample.kind === "invested" ? "text-tb-invested" : ""}`}>
                {sample.kind === "earned" ? "+" : ""}
                {money(share)}
              </p>
              {sample.split && <p className="tb-num text-[12px] text-tb-muted">of {money(sample.cents)}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Investing isn't spending                                            */
/* ------------------------------------------------------------------ */

const MONTH = { lived: 132140, invested: 381000, earned: 721000, budget: 234000 };

const Bar: React.FC<{ label: string; cents: number; of: number; kind: Kind | "warn"; note: string }> = ({
  label,
  cents,
  of,
  kind,
  note,
}) => {
  const shown = useTween(cents);
  const width = Math.min(100, (cents / of) * 100);
  const color = kind === "warn" ? "bg-tb-warn" : KIND[kind].bar;
  const text = kind === "warn" ? "text-tb-warn" : KIND[kind].text;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-medium">{label}</p>
        <p className={`tb-num text-lg font-semibold ${text}`}>{moneyWhole(shown)}</p>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-tb-sunk">
        <div className={`tb-bar h-full rounded-full ${color}`} style={{ width: `${width}%` }} />
      </div>
      <p className="mt-1.5 text-[13px] text-tb-muted">{note}</p>
    </div>
  );
};

export const BucketsDemo: React.FC = () => {
  const [mode, setMode] = useState("tb");
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const scale = (cents: number) => (inView ? cents : 0);
  const lumped = MONTH.lived + MONTH.invested;

  return (
    <div ref={ref} className="rounded-[28px] border border-tb-line bg-tb-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tb-muted">
          One month, two ways
        </p>
        <Segmented
          label="Compare"
          value={mode}
          onChange={setMode}
          options={[
            ["other", "Most apps"],
            ["tb", "Three Bucks"],
          ]}
        />
      </div>
      <div className="mt-7 space-y-6">
        {mode === "other" ? (
          <>
            <Bar
              label="Spent"
              cents={scale(lumped)}
              of={MONTH.budget}
              kind="warn"
              note={`Over your ${moneyWhole(MONTH.budget)} budget by ${moneyWhole(lumped - MONTH.budget)}. Except most of it went into index funds.`}
            />
            <div className="rounded-[14px] bg-tb-warn-soft px-4 py-3 text-sm text-tb-warn">
              Your best month of saving looks like your worst month of spending.
            </div>
          </>
        ) : (
          <>
            <Bar
              label="Lived"
              cents={scale(MONTH.lived)}
              of={MONTH.budget}
              kind="lived"
              note={`${Math.round((MONTH.lived / MONTH.budget) * 100)}% of your ${moneyWhole(MONTH.budget)} living budget`}
            />
            <Bar
              label="Invested"
              cents={scale(MONTH.invested)}
              of={MONTH.earned}
              kind="invested"
              note="Money you kept. Never counted as spending."
            />
            <Bar label="Earned" cents={scale(MONTH.earned)} of={MONTH.earned} kind="earned" note="Two paychecks" />
          </>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Split a bill                                                        */
/* ------------------------------------------------------------------ */

const FRIENDS = [
  { id: "sam", name: "Sam", initials: "SL", tint: "#EDE9FB", ink: "#5B45B0" },
  { id: "ana", name: "Ana", initials: "AR", tint: "#FFF4D6", ink: "#8A6100" },
  { id: "jo", name: "Jordan", initials: "JP", tint: "#E6F4F3", ink: "#26706A" },
];

const BILL = 8400;

export const SplitDemo: React.FC = () => {
  const [picked, setPicked] = useState<string[]>(["sam", "ana"]);
  const [guests, setGuests] = useState(0);
  const [flagged, setFlagged] = useState<string[]>([]);

  const ways = 1 + picked.length + guests;
  const share = Math.round(BILL / ways);
  const owed = picked.filter((id) => !flagged.includes(id)).length * share;
  const shownShare = useTween(share);
  const shownOwed = useTween(owed);

  const toggle = (id: string) => {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    setFlagged((f) => f.filter((x) => x !== id));
  };
  const toggleFlag = (id: string) =>
    setFlagged((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <div className="rounded-[28px] border border-tb-line bg-tb-card p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold">Pizza night</p>
          <p className="text-sm text-tb-muted">You paid · today</p>
        </div>
        <p className="tb-num text-3xl font-semibold tracking-tight">{money(BILL)}</p>
      </div>

      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-tb-muted">Split with</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {FRIENDS.map((f) => {
          const on = picked.includes(f.id);
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(f.id)}
              className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-sm font-medium transition-colors ${
                on ? "border-tb-ink bg-tb-ink text-tb-paper" : "border-tb-line bg-tb-card text-tb-ink hover:border-tb-ink/40"
              }`}
            >
              <span
                className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold"
                style={{ background: f.tint, color: f.ink }}
              >
                {f.initials}
              </span>
              {f.name}
              {on && <Check className="h-3.5 w-3.5" aria-hidden />}
            </button>
          );
        })}
        <span className="inline-flex items-center gap-1 rounded-full border border-tb-line py-1 pl-3 pr-1 text-sm">
          <span className="text-tb-muted">Not on the app</span>
          <button
            type="button"
            aria-label="One fewer person not on the app"
            disabled={guests === 0}
            onClick={() => setGuests((g) => g - 1)}
            className="grid h-7 w-7 place-items-center rounded-full hover:bg-tb-sunk disabled:opacity-30"
          >
            <Minus className="h-3.5 w-3.5" aria-hidden />
          </button>
          <span className="tb-num w-4 text-center font-semibold">{guests}</span>
          <button
            type="button"
            aria-label="One more person not on the app"
            disabled={guests >= 4}
            onClick={() => setGuests((g) => g + 1)}
            className="grid h-7 w-7 place-items-center rounded-full hover:bg-tb-sunk disabled:opacity-30"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
          </button>
        </span>
      </div>

      <p className="tb-num mt-5 font-semibold text-tb-lived">
        {ways > 1 ? `Split ${ways} ways · your share ${money(shownShare)}` : `Not split · ${money(BILL)} is all yours`}
      </p>

      <ul className="mt-4 divide-y divide-tb-line border-y border-tb-line">
        {FRIENDS.filter((f) => picked.includes(f.id)).map((f) => {
          const isFlagged = flagged.includes(f.id);
          return (
            <li key={f.id} className="tb-pop flex items-center gap-3 py-3">
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold"
                style={{ background: f.tint, color: f.ink }}
                aria-hidden
              >
                {f.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{f.name}</p>
                <p className={`text-[13px] ${isFlagged ? "text-tb-warn" : "text-tb-muted"}`}>
                  {isFlagged ? "Flagged: wrong amount. On hold until you fix it." : `owes ${money(share)}`}
                </p>
              </div>
              <span className={`tb-num font-semibold ${isFlagged ? "text-tb-muted line-through" : ""}`}>
                {money(share)}
              </span>
              <button
                type="button"
                aria-pressed={isFlagged}
                aria-label={isFlagged ? `Withdraw ${f.name}'s flag` : `Flag ${f.name}'s share`}
                onClick={() => toggleFlag(f.id)}
                className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
                  isFlagged ? "bg-tb-warn-soft text-tb-warn" : "text-tb-muted hover:bg-tb-sunk"
                }`}
              >
                <Flag className="h-4 w-4" aria-hidden />
              </button>
            </li>
          );
        })}
        {guests > 0 && (
          <li className="py-3 text-sm text-tb-muted">
            + {guests} not on the app · only your share is tracked for them
          </li>
        )}
      </ul>

      <div className="mt-5 flex items-baseline justify-between">
        <p className="text-sm text-tb-muted">Owed to you</p>
        <p className="tb-num text-2xl font-semibold text-tb-lived">{money(shownOwed)}</p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Offline first                                                       */
/* ------------------------------------------------------------------ */

const SYNC_STATES = [
  { icon: CloudOff, title: "Offline", body: "3 changes saved on this phone. They’ll sync when you’re back online.", tone: "text-tb-warn bg-tb-warn-soft", spin: false },
  { icon: RefreshCw, title: "Syncing…", body: "Back online. Sending your changes.", tone: "text-tb-invested bg-tb-invested-soft", spin: true },
  { icon: Check, title: "Backed up", body: "Everything is on this phone and in the cloud.", tone: "text-tb-lived bg-tb-lived-soft", spin: false },
];

export const SyncCard: React.FC = () => {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const [step, setStep] = useState(prefersReducedMotion() ? 2 : 0);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const timer = setInterval(() => setStep((s) => (s + 1) % SYNC_STATES.length), 2600);
    return () => clearInterval(timer);
  }, [inView]);

  const state = SYNC_STATES[step];
  const Icon = state.icon;
  return (
    <div ref={ref} className="mx-auto max-w-sm rounded-[24px] bg-tb-card p-6 text-tb-ink">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tb-muted">Sync</p>
      <div key={step} className="tb-pop mt-4 flex items-center gap-4">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[12px] ${state.tone}`}>
          <Icon className={`h-5 w-5 ${state.spin ? "tb-spin" : ""}`} aria-hidden />
        </span>
        <div>
          <p className="font-medium">{state.title}</p>
          <p className="text-sm text-tb-muted">{state.body}</p>
        </div>
      </div>
      <div className="mt-5 h-px bg-tb-line" />
      <p className="mt-4 text-sm leading-relaxed text-tb-muted">
        No account needed to start. Your entries live on your phone first, so the app works the same on a plane as on Wi‑Fi.
      </p>
    </div>
  );
};
