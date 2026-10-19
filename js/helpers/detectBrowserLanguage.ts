function detectBrowserLanguage(): string {
  const browserLanguage = navigator.language;
  const language = browserLanguage.split("-")[0];

  return language;
}

export default detectBrowserLanguage;
