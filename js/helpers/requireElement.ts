export default function requireElement<T extends Element = Element>(
  selector: string,
): T {
  const element = document.querySelector<T>(selector);

  if (!element) throw new Error(`Missing element: ${selector}`);

  return element;
}
