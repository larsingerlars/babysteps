import { applyTranslations, getLocale, LOCALES, setLocale } from "@/i18n";

export function mountLocaleSwitcher(
  button: HTMLButtonElement,
  code: HTMLElement,
): void {
  const render = () => {
    code.textContent = getLocale().toUpperCase();
  };

  button.addEventListener("click", () => {
    const next = (LOCALES.indexOf(getLocale()) + 1) % LOCALES.length;
    setLocale(LOCALES[next]);
    applyTranslations();
    render();
  });

  render();
}
