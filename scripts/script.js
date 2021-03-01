// GLOBAL VARIABLES
const bg = document.querySelector(".bg");
const heading = document.querySelector(".timer__heading");
const timer = document.querySelectorAll(".timer__display > *");
const welcome = document.querySelector(".timer__welcome");
const birthday = document.querySelector(".timer__birthday");
const msg = document.querySelector(".msg");
const link = document.querySelector(".link");
const values = Array.from(timer);
const valueText = document.querySelectorAll(".value");
const github = document.querySelector(".github");
const footer = document.querySelector("footer");

// COUNTDOWN VARIABLES
const sec = 1000;
const min = sec * 60;
const hr = min * 60;
const day = hr * 24;

// MODE OBJECTS
const img = { morning: "morning", day: "day", night: "night" };
const color = { morning: "#e07a51", day: "#44CCEE", night: "#0A1239" };

// VARIABLES DAY-MODE
const sun = document.querySelector(".sun_day");
const birdCage = document.querySelector(".birdcage");

// VARIABLES NIGHT-MODE
const moon = document.querySelector(".moonlight");
const stars = document.querySelector(".overlay-stars");
const owl = document.querySelector(".owl");

// VARIABLES MORNING-MODE
const sunrise = document.querySelector(".sunlight");

// MODE ARRAYS
const dayMode = [sun, birdCage];
const morningMode = [sunrise, owl];
const nightMode = [moon, stars, owl];

// LANGUAGE CODES
const GERMANY_LANGUAGE_CODE = "de-DE";
const LATVIA_LANGUAGE_CODE = "lv-LV";

// LANGUAGE DETECTION
const detectLanguage = () => {
  const language = navigator.language;
  if (language === GERMANY_LANGUAGE_CODE) {
    heading.textContent = "Es ist was es ist, sagt die Liebe";
    welcome.textContent = "Willkommen, kleines Wesen!";
    msg.textContent = "Mit Liebe gemacht";
  } else if (language === LATVIA_LANGUAGE_CODE) {
    heading.textContent = "Ir kā ir. Teica mīlestība.";
    welcome.textContent = "Laipni lūgts, mazais!";
    msg.textContent = "Ar mīlestību taisīts";
  } else {
    return;
  }
};

// TIME DETECTION
const detectTime = () => {
  const currentTime = new Date().getHours();
  changeColor(currentTime);
};

const showComponents = (componentList) => {
  componentList.forEach((element) => {
    element.style.display = "block";
  });
};

const changeColor = (time) => {
  try {
    const isDay = time >= 8 && time < 19;
    const isMorning = time > 5 && time < 8;
    const isNight = time >= 19 || time < 5;

    if (isDay) {
      bg.style.backgroundImage = `url("./resources/img/bg_${img.day}.png")`;
      heading.style.backgroundImage = `url("./resources/img/bg_${img.day}.png")`;
      showComponents(dayMode);
      welcome.style.color = `${color.day}`;
      birthday.style.color = `${color.day}`;
    } else if (isMorning) {
      bg.style.backgroundImage = `url("./resources/img/bg_${img.morning}.png")`;
      heading.style.backgroundImage = `url("./resources/img/bg_${img.morning}.png")`;
      showComponents(morningMode);
      welcome.style.color = `${color.morning}`;
      birthday.style.color = `${color.morning}`;
    } else if (isNight) {
      bg.style.backgroundImage = `url("./resources/img/bg_${img.night}.png")`;
      heading.style.backgroundImage = `url("./resources/img/bg_${img.night}.png")`;
      showComponents(nightMode);
      msg.style.color = "rgb(250,250,250)";
      github.style.color = "rgb(250,250,250)";
      welcome.style.color = `${color.night}`;
      birthday.style.color = `${color.night}`;
    }
  } catch (error) {
    console.log(error);
  }
};

// EVENT LISTENER
document.addEventListener("load", detectLanguage());
document.addEventListener("load", detectTime());
