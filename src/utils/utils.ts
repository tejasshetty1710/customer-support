export function debounce(func: (seachTerm: string) => void, delay: number) {
  let timeoutId: number;

  return function (...args: unknown[]) {
    // Clear the previous timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = window.setTimeout(() => {
      // @ts-ignore
      func.apply(this, args);
    }, delay);
  };
}
