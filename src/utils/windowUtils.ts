export function onEnterKeydown(cb: () => void) {
  const onEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      cb();
    }
  }
  window.addEventListener("keydown", onEnter)
  return () => window.removeEventListener("keydown", onEnter)
}