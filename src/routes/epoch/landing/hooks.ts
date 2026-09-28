import { useEffect, useRef, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** True once the element has scrolled into view; never flips back. */
export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/** Counts from 0 to [target] with an ease-out once [start] is true. */
export function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let frame = 0;
    const began = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - began) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);

  return value;
}

/** Types each word out, holds it, erases it, and moves to the next. Returns the
 *  visible text and the index of the word being shown. */
export function useTypewriter(words: string[], { type = 70, erase = 35, hold = 1600 } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(prefersReducedMotion() ? words[0] : "");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const word = words[index];
    let timer: ReturnType<typeof setTimeout>;
    if (!erasing && text === word) {
      timer = setTimeout(() => setErasing(true), hold);
    } else if (erasing && text === "") {
      setErasing(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timer = setTimeout(
        () => setText(erasing ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        erasing ? erase : type
      );
    }
    return () => clearTimeout(timer);
  }, [text, erasing, index, words, type, erase, hold]);

  return [text, index] as const;
}

/** Moves the element vertically by [speed] × its distance from the viewport
 *  centre. Writes the transform directly, so scrolling never re-renders. */
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}
