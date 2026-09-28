import { Heart } from "lucide-react";
import React, { useId, useState } from "react";

const MIN_HORIZON = 60;
const MAX_HORIZON = 100;

/**
 * "Your life in years", interactive: move your birth year and horizon and the
 * grid refills in a wave, one dot per year, the last one a heart, exactly as
 * the profile draws it.
 */
const LifeGrid: React.FC<{ now?: Date }> = ({ now = new Date() }) => {
  const currentYear = now.getFullYear();
  const [born, setBorn] = useState(currentYear - 30);
  const [horizon, setHorizon] = useState(80);
  const bornId = useId();
  const horizonId = useId();

  const age = Math.max(0, currentYear - born);
  const lived = Math.min(age, horizon);
  const ahead = horizon - lived;
  const percent = Math.round((lived / horizon) * 100);

  return (
    <div className="rounded-[28px] bg-epoch-card p-6 shadow-[0_24px_60px_-28px_rgba(122,90,58,0.35)] sm:p-8">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-epoch-muted">Your life in years</p>
        <p className="text-sm text-epoch-muted tabular-nums">{horizon}-year horizon</p>
      </div>

      <div
        role="img"
        aria-label={`${lived} years lived, ${ahead} years ahead`}
        className="mx-auto mt-6 grid max-w-sm grid-cols-10 gap-2 sm:gap-2.5"
      >
        {Array.from({ length: horizon }, (_, i) => {
          const last = i === horizon - 1;
          const filled = i < lived;
          const style = { transitionDelay: `${Math.min(i, 60) * 8}ms` };
          if (last) {
            return (
              <span key={i} className="grid aspect-square place-items-center text-epoch-vermilion" style={style}>
                <Heart className="h-[90%] w-[90%]" strokeWidth={2.2} fill={filled ? "currentColor" : "none"} />
              </span>
            );
          }
          return (
            <span
              key={i}
              style={style}
              className={`aspect-square rounded-full border-[1.5px] transition-colors duration-300 ${
                filled ? "border-epoch-vermilion bg-epoch-vermilion" : "border-epoch-track bg-transparent"
              }`}
            />
          );
        })}
      </div>

      <div className="mt-7 flex gap-10">
        <Stat value={lived} label="years lived" dot="bg-epoch-vermilion" />
        <Stat value={ahead} label="years ahead" dot="bg-epoch-track" />
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-epoch-track">
        <div className="h-full rounded-full bg-epoch-vermilion transition-[width] duration-500" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-3 text-sm text-epoch-muted">
        {ahead > 0 ? `You're ${percent}% through your journey. About ${(ahead * 52).toLocaleString()} weeks to go.` : "Every year from here is a bonus."}
      </p>

      <div className="mt-7 grid gap-5 border-t border-epoch-hairline pt-6 sm:grid-cols-2">
        <Slider id={bornId} label="Born in" value={born} min={currentYear - 95} max={currentYear - 1} onChange={setBorn} />
        <Slider
          id={horizonId}
          label="Horizon"
          value={horizon}
          min={MIN_HORIZON}
          max={MAX_HORIZON}
          suffix=" years"
          onChange={setHorizon}
        />
      </div>
    </div>
  );
};

const Stat: React.FC<{ value: number; label: string; dot: string }> = ({ value, label, dot }) => (
  <div className="flex items-start gap-2">
    <span className={`mt-3 h-2.5 w-2.5 rounded-full ${dot}`} />
    <div>
      <p className="text-3xl font-semibold tracking-tight text-epoch-ink tabular-nums">{value}</p>
      <p className="text-sm text-epoch-muted">{label}</p>
    </div>
  </div>
);

const Slider: React.FC<{
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (value: number) => void;
}> = ({ id, label, value, min, max, suffix = "", onChange }) => (
  <div>
    <div className="flex items-baseline justify-between">
      <label htmlFor={id} className="text-sm text-epoch-muted">
        {label}
      </label>
      <span className="text-sm font-medium text-epoch-ink tabular-nums">
        {value}
        {suffix}
      </span>
    </div>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="ep-range mt-2 w-full"
    />
  </div>
);

export default LifeGrid;
