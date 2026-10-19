import detectBrowserLanguage from "@/helpers/detectBrowserLanguage";
import requireElement from "@/helpers/requireElement";
import { applyTranslations, resolveLanguage, setLocale } from "@/i18n";
import { mountLocaleSwitcher } from "@/i18n/devLocaleSwitcher";
import { hasBirthdayToday } from "@/helpers/birthday";

// Constants
import { BDAYS } from "@/constants";

function updateScene() {
  const currentHour = getCurrentHour();
  const scene = setSceneValue(currentHour);
  switchScene(scene);
}

function getCurrentHour(): number {
  return new Date().getHours();
}

function setSceneValue(currentHour: number): string {
  let scene: string;

  if (currentHour >= 8 && currentHour < 19) {
    scene = "day";
  } else if (currentHour > 5 && currentHour < 8) {
    scene = "morning";
  } else {
    scene = "night";
  }

  return scene;
}

function switchScene(scene: string) {
  const sceneContainer = requireElement("z-wrapper");
  sceneContainer.setAttribute("scene", scene);
}

function toggleScene() {
  const getCurrentScene = requireElement("z-wrapper").getAttribute("scene");

  const scenes = ["morning", "day", "night"];

  const currentSceneIndex = scenes.indexOf(getCurrentScene ?? "");

  const nextSceneIndex =
    currentSceneIndex + 1 === scenes.length ? 0 : currentSceneIndex + 1;

  const nextScene = scenes[nextSceneIndex];

  switchScene(nextScene);
}

function elapsedTime(timeDifference: number): Record<string, number> {
  const units = [
    { unit: "days", value: 86400000, modulo: null },
    { unit: "hours", value: 3600000, modulo: 86400000 },
    { unit: "minutes", value: 60000, modulo: 3600000 },
    { unit: "seconds", value: 1000, modulo: 60000 },
  ];

  const timeValues: Record<string, number> = {};

  units.forEach(({ unit, value, modulo }) => {
    if (modulo === null) {
      timeValues[unit] = Math.floor(timeDifference / value);
    } else {
      timeValues[unit] = Math.floor((timeDifference % modulo) / value);
    }
  });

  return timeValues;
}

function updateCountdown(values: Record<string, number>) {
  for (const key in values) {
    const element = requireElement(`[data-unit="${key}"] p:first-child`);

    element.textContent =
      values[key] < 10 ? `0${values[key]}` : String(values[key]);
  }
}

let activeBdayIndex = 0;

function getTimeDifference(): number {
  return Date.now() - BDAYS[activeBdayIndex].getTime();
}

function refreshCountdown() {
  const currentDifference = getTimeDifference();
  const updateTimeValues = elapsedTime(currentDifference);
  updateCountdown(updateTimeValues);
}

const initCountdown = () => {
  setInterval(refreshCountdown, 1000);
};

function toggleBirthday() {
  activeBdayIndex = (activeBdayIndex + 1) % BDAYS.length;
  refreshCountdown();
}

setLocale(resolveLanguage(detectBrowserLanguage()));
applyTranslations();
initCountdown();
updateScene();
requireElement("z-countdown").toggleAttribute("birthday", hasBirthdayToday());

const toggleSceneButton =
  requireElement<HTMLButtonElement>("[data-ui='scene']");
toggleSceneButton.addEventListener("click", toggleScene);

const toggleChildButton =
  requireElement<HTMLButtonElement>("[data-ui='child']");
toggleChildButton.addEventListener("click", toggleBirthday);

mountLocaleSwitcher(
  requireElement<HTMLButtonElement>("[data-ui='locale']"),
  requireElement("[data-locale-code]"),
);
