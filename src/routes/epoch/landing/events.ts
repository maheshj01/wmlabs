import {
  Briefcase,
  Cake,
  Car,
  Footprints,
  GraduationCap,
  Guitar,
  Heart,
  House,
  Plane,
  TreePine,
  type LucideIcon,
} from "lucide-react";

export interface SampleEvent {
  title: string;
  icon: LucideIcon;
  color: string;
}

/** The kind of moments people keep in Epoch; used across the page. */
export const SAMPLE_EVENTS: SampleEvent[] = [
  { title: "Launch party", icon: Cake, color: "#EF5B25" },
  { title: "Mum's 60th", icon: Cake, color: "#E0457B" },
  { title: "First marathon", icon: Footprints, color: "#10A37F" },
  { title: "Moving day", icon: House, color: "#14A3A3" },
  { title: "Anniversary", icon: Heart, color: "#D63BD6" },
  { title: "Trip to Lisbon", icon: Plane, color: "#3B82F6" },
  { title: "Graduation", icon: GraduationCap, color: "#2563EB" },
  { title: "New job", icon: Briefcase, color: "#4F7BE8" },
  { title: "Road trip", icon: Car, color: "#F97316" },
  { title: "Learning guitar", icon: Guitar, color: "#8B5CF6" },
  { title: "Christmas", icon: TreePine, color: "#E5484D" },
];

const byTitle = (title: string) => SAMPLE_EVENTS.find((e) => e.title === title)!;

/** Events pinned to days of the current year for the hero grid. Fixed days
 *  spread across the year, plus a launch party three days from today so there
 *  is always something just ahead. */
export function heroMarkers(today: number, total: number) {
  const placed: Array<[number, SampleEvent]> = [
    [18, byTitle("Mum's 60th")],
    [40, byTitle("New job")],
    [45, byTitle("Anniversary")],
    [96, byTitle("First marathon")],
    [118, byTitle("Road trip")],
    [158, byTitle("Graduation")],
    [185, byTitle("Trip to Lisbon")],
    [212, byTitle("Learning guitar")],
    [247, byTitle("Moving day")],
    [today + 3, byTitle("Launch party")],
    [today + 34, byTitle("Road trip")],
    [359, byTitle("Christmas")],
  ];
  const markers = new Map<number, SampleEvent>();
  for (const [day, event] of placed) {
    if (day >= 1 && day <= total && day !== today && !markers.has(day)) markers.set(day, event);
  }
  return markers;
}
