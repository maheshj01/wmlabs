import React, { useMemo, useState } from "react";
import { heroMarkers } from "./events";
import { useCountUp, useInView } from "./hooks";
import { dateOfDay, dayOfYear, daysInYear, longDate, relativeDayLabel } from "./time";

const COLS = 21;

/**
 * This year as the app draws it: one dot per day, days gone in sand, days
 * ahead in vermilion, today pulsing, and a handful of moments shown as their
 * own icons. Dots cascade in on first view; tapping or hovering an icon opens
 * the same callout the app shows.
 */
const YearGrid: React.FC<{ now?: Date }> = ({ now = new Date() }) => {
  const year = now.getFullYear();
  const total = daysInYear(year);
  const today = dayOfYear(now);
  const left = total - today;
  const markers = useMemo(() => heroMarkers(today, total), [today, total]);
  const [active, setActive] = useState<number | null>(null);
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  const counted = useCountUp(left, inView, 1800);

  return (
    <div ref={ref} className="relative">
      <div className="mb-5 flex items-baseline justify-between">
        <span className="font-medium tracking-tight text-epoch-ink text-xl tabular-nums">{year}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-epoch-muted">
          Your year
        </span>
      </div>

      <div
        role="img"
        aria-label={`${year}: ${today - 1} days gone, ${left} days left, with moments marked on their days`}
        className={`ep-year grid gap-[5px] sm:gap-[6px] ${inView ? "is-in" : ""}`}
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: total }, (_, i) => {
          const day = i + 1;
          const event = markers.get(day);
          const col = i % COLS;
          const style = { "--i": i } as React.CSSProperties;

          if (event) {
            const Icon = event.icon;
            const open = active === day;
            return (
              <div key={day} className="relative aspect-square" style={style}>
                <button
                  type="button"
                  aria-label={`${event.title}, ${longDate(dateOfDay(year, day))}`}
                  aria-expanded={open}
                  onMouseEnter={() => setActive(day)}
                  onMouseLeave={() => setActive((a) => (a === day ? null : a))}
                  onFocus={() => setActive(day)}
                  onBlur={() => setActive((a) => (a === day ? null : a))}
                  onClick={() => setActive((a) => (a === day ? null : day))}
                  className={`ep-marker grid h-full w-full place-items-center rounded-full outline-none transition-transform hover:scale-125 focus-visible:scale-125 ${
                    open ? "ring-2 ring-offset-2 ring-offset-epoch-card" : ""
                  }`}
                  style={{ color: event.color, ["--tw-ring-color" as string]: `${event.color}66` }}
                >
                  <Icon className="h-full w-full" strokeWidth={2.6} />
                </button>
                {open && (
                  <div
                    role="tooltip"
                    className={`ep-callout pointer-events-none absolute bottom-[calc(100%+10px)] z-20 w-56 rounded-[16px] bg-epoch-card p-3.5 text-left shadow-[0_18px_40px_-12px_rgba(122,90,58,0.35)] ${
                      col < 5 ? "left-0" : col > COLS - 6 ? "right-0" : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-epoch-muted">
                      {longDate(dateOfDay(year, day))}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px]"
                        style={{ background: `${event.color}22`, color: event.color }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-epoch-ink">{event.title}</span>
                        <span className="block text-xs text-epoch-muted tabular-nums">
                          {relativeDayLabel(today, day)}
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          }

          const state = day < today ? "gone" : day === today ? "today" : "ahead";
          return <span key={day} className={`ep-dot ep-dot--${state} aspect-square rounded-full`} style={style} />;
        })}
      </div>

      <p className="mt-6 text-center text-epoch-ink">
        <span className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{counted}</span>
        <span className="ml-2 text-epoch-muted">days left in {year}</span>
      </p>
    </div>
  );
};

export default YearGrid;
