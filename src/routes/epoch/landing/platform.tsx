import React, { createContext, useContext, useState } from "react";

export type Platform = "android" | "ios";

/** Screenshot size per platform: the framed exports differ in aspect. */
export const SHOT_SIZE: Record<Platform, { width: number; height: number }> = {
  android: { width: 720, height: 1516 },
  ios: { width: 720, height: 1440 },
};

const detect = (): Platform =>
  typeof navigator !== "undefined" &&
  /iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? "ios"
    : "android";

const PlatformContext = createContext<{
  platform: Platform;
  setPlatform: (p: Platform) => void;
}>({
  platform: "android",
  setPlatform: () => {},
});

/** Which phone the page shows: the visitor's own by default, switchable. */
export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [platform, setPlatform] = useState<Platform>(detect);
  return (
    <PlatformContext.Provider value={{ platform, setPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => useContext(PlatformContext);

/** "Android | iPhone" segmented switch for the screenshots. */
export const PlatformSwitch: React.FC = () => {
  const { platform, setPlatform } = usePlatform();
  const options: Array<[Platform, string]> = [
    ["android", "Android"],
    ["ios", "iPhone"],
  ];
  return (
    <div className="inline-flex items-center gap-3 text-sm text-epoch-muted">
      <span id="ep-platform-label">Screens from</span>
      <div
        role="radiogroup"
        aria-labelledby="ep-platform-label"
        className="inline-flex rounded-full bg-epoch-hairline p-1"
      >
        {options.map(([value, label]) => {
          const selected = platform === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setPlatform(value)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                selected
                  ? "bg-epoch-card text-epoch-ink shadow-sm"
                  : "text-epoch-muted hover:text-epoch-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
