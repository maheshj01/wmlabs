/** Calendar helpers for the landing page's live grids. Pure, so the numbers on
 *  the page always match today's date without a server. */

const DAY_MS = 86_400_000;

export const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const daysInYear = (year: number) => (isLeapYear(year) ? 366 : 365);

/** 1-based day of the year (Jan 1 = 1), counted on calendar dates in UTC so a
 *  daylight-saving shift can never move a dot. */
export const dayOfYear = (date: Date) => {
  const start = Date.UTC(date.getFullYear(), 0, 1);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.round((today - start) / DAY_MS) + 1;
};

/** The calendar date of the 1-based [day] in [year]. */
export const dateOfDay = (year: number, day: number) => new Date(year, 0, day);

/** "Today", "Tomorrow", "In 12 days", "98 days ago", as the app words it. */
export const relativeDayLabel = (fromDay: number, toDay: number) => {
  const diff = toDay - fromDay;
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  return diff > 0 ? `In ${diff} days` : `${-diff} days ago`;
};

/** "Wednesday, 30 September", the callout eyebrow's format. */
export const longDate = (date: Date) => {
  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
  const dayMonth = date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  return `${weekday}, ${dayMonth}`;
};
