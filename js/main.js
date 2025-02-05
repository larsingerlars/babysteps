import detectBrowserLanguage from "./helpers/detectBrowserLanguage";

// Constants
import { BDAY } from "./constants";

function updateTexts(activeLanguage) {
  fetch("./locales.json")
    .then((response) => response.json())
    .then((data) => {
      const { heading, footer } = data[activeLanguage];

      const headingEl = document.querySelector("h1");
      const footerEl = document.querySelector("footer span:first-of-type");

      headingEl.textContent = "";

      heading.forEach((text) => {
        const textEl = document.createElement("span");
        textEl.textContent = text;
        headingEl.appendChild(textEl);
      });
      footerEl.textContent = footer;
    });
}

function updateLangAttribute(activeLanguage) {
  return document.documentElement.setAttribute("lang", activeLanguage);
}

function setSceneLanguage(activeLanguage) {
  switch (activeLanguage) {
    case "de":
      updateLangAttribute("de");
      break;
    case "lv":
      updateLangAttribute("lv");
      break;
    default:
      updateLangAttribute("en");
      break;
  }

  updateTexts(activeLanguage);
}

function updateScene() {
  const currentHour = getCurrentHour();
  const scene = setSceneValue(currentHour);
  switchScene(scene);

  const activeLanguage = detectBrowserLanguage() || "en";
  setSceneLanguage(activeLanguage);
}

function getCurrentHour() {
  return new Date().getHours();
}

function setSceneValue(currentHour) {
  let scene;

  if (currentHour >= 8 && currentHour < 19) {
    scene = "day";
  } else if (currentHour > 5 && currentHour < 8) {
    scene = "morning";
  } else {
    scene = "night";
  }

  return scene;
}

function switchScene(scene) {
  const sceneContainer = document.querySelector("z-wrapper");
  sceneContainer.setAttribute("scene", scene);
}

function toggleScene() {
  const getCurrentScene = document
    .querySelector("z-wrapper")
    .getAttribute("scene");

  const scenes = ["morning", "day", "night"];

  const currentSceneIndex = scenes.indexOf(getCurrentScene);

  const nextSceneIndex =
    currentSceneIndex + 1 === scenes.length ? 0 : currentSceneIndex + 1;

  const nextScene = scenes[nextSceneIndex];

  switchScene(nextScene);
}

function elapsedTime(timeDifference) {
  const units = [
    { unit: "days", value: 86400000, modulo: null },
    { unit: "hours", value: 3600000, modulo: 86400000 },
    { unit: "minutes", value: 60000, modulo: 3600000 },
    { unit: "seconds", value: 1000, modulo: 60000 },
  ];

  const timeValues = {};

  units.forEach(({ unit, value, modulo }) => {
    if (modulo === null) {
      timeValues[unit] = Math.floor(timeDifference / value);
    } else {
      timeValues[unit] = Math.floor((timeDifference % modulo) / value);
    }
  });

  return timeValues;
}

function updateCountdown(values) {
  for (const key in values) {
    const element = document.querySelector(
      `[data-unit="${key}"] p:first-child`
    );

    element.textContent = values[key] < 10 ? `0${values[key]}` : values[key];
  }
}

function getTimeDifference() {
  return Date.now() - BDAY.getTime();
}

const initCountdown = () => {
  setInterval(() => {
    const currentDifference = getTimeDifference();
    const updateTimeValues = elapsedTime(currentDifference);
    updateCountdown(updateTimeValues);
  }, 1000);
};

initCountdown();
updateScene();

const toggleSceneButton = document.querySelector("[data-ui='scene']");
toggleSceneButton.addEventListener("click", toggleScene);
