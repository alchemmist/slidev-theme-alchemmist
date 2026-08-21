import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import type { ComputedRef, Ref } from "vue";

const enteringSlideSelector = '.slidev-page[class*="-enter-active"]';
const transitionPromises = new WeakMap<Element, Promise<void>>();

function frame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function parseTimeList(value: string): number[] {
  return value.split(",").map((item) => {
    const time = item.trim();
    return Number.parseFloat(time) * (time.endsWith("ms") ? 1 : 1000);
  });
}

function transitionTimeout(element: Element): number {
  const style = getComputedStyle(element);
  const durations = parseTimeList(style.transitionDuration);
  const delays = parseTimeList(style.transitionDelay);

  return Math.max(
    0,
    ...durations.map(
      (duration, index) => duration + (delays[index % delays.length] ?? 0),
    ),
  );
}

function waitForTransition(element: Element): Promise<void> {
  const existing = transitionPromises.get(element);
  if (existing) return existing;

  const promise = new Promise<void>((resolve) => {
    const timeout = transitionTimeout(element);
    if (timeout === 0) {
      resolve();
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      element.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(timer);
      resolve();
    };
    const onTransitionEnd = (event: Event) => {
      if (event.target === element) finish();
    };
    const timer = window.setTimeout(finish, timeout + 50);

    element.addEventListener("transitionend", onTransitionEnd);
  });

  transitionPromises.set(element, promise);
  void promise.finally(() => {
    if (transitionPromises.get(element) === promise)
      transitionPromises.delete(element);
  });
  return promise;
}

async function waitForSlideTransition(): Promise<void> {
  if (typeof document === "undefined") return;

  await nextTick();
  await frame();
  await frame();
  const enteringSlide = document.querySelector(enteringSlideSelector);
  if (enteringSlide) await waitForTransition(enteringSlide);
}

export function useDeferredChromeVisibility(
  desiredVisibility: ComputedRef<boolean>,
): Ref<boolean> {
  const visible = ref(false);
  let revision = 0;

  watch(
    desiredVisibility,
    async (desired) => {
      const currentRevision = ++revision;
      if (!desired) {
        visible.value = false;
        return;
      }

      await waitForSlideTransition();
      if (currentRevision === revision) visible.value = true;
    },
    { immediate: true },
  );

  onBeforeUnmount(() => {
    revision += 1;
  });

  return visible;
}
