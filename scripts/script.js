// GLOBAL VARIABLES
const bg = document.querySelector(".bg");
const heading = document.querySelector(".timer__heading");
const timer = document.querySelectorAll(".timer__display > *");
const msg = document.querySelector(".msg");
const link = document.querySelector(".link");
const values = Array.from(timer);
const valueText = document.querySelectorAll(".value");
const unitText = document.querySelectorAll(".unit");
const github = document.querySelector(".github");

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
const dayMode = [sun, birdCage];

// VARIABLES NIGHT-MODE
const moon = document.querySelector(".moonlight");
const stars = document.querySelector(".overlay-stars");
const owl = document.querySelector(".owl");
const nightMode = [moon, stars, owl];

// VARIABLES MORNING-MODE
const sunrise = document.querySelector(".sunlight");
const morningMode = [sunrise, owl];

// LANGUAGE DETECTION
const detectLanguage = () => {
  const language = navigator.language;
  if (language === "de-DE") {
    heading.textContent = "Auf dem Weg";
    unitText[0].textContent = "Tage";
    unitText[1].textContent = "Stunden";
    unitText[2].textContent = "Minuten";
    unitText[3].textContent = "Sekunden";
    msg.textContent = "Mit Liebe gemacht";
  } else if (language === "lv-LV") {
    heading.textContent = "Gaidām mazulīti";
    unitText[0].textContent = "dienas";
    unitText[1].textContent = "stundas";
    unitText[2].textContent = "minūtes";
    unitText[3].textContent = "sekundes";
    msg.textContent = "Ar mīlestību taisīts";
  } else {
    console.log("English version");
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
    if (time >= 8 && time < 19) {
      bg.style.backgroundImage = `url("./ressources/img/bg_${img.day}.webp")`;
      heading.style.backgroundImage = `url("./ressources/img/bg_${img.day}.webp")
      `;
      showComponents(dayMode);
      valueText.forEach((element) => {
        element.style.color = `${color.day}`;
      });
    } else if (time > 5 && time < 8) {
      bg.style.backgroundImage = `url("./ressources/img/bg_${img.morning}.webp")`;
      heading.style.backgroundImage = `url("./ressources/img/bg_${img.morning}.webp")`;
      showComponents(morningMode);
      valueText.forEach((element) => {
        element.style.color = `${color.morning}`;
      });
    } else if (time >= 19 || time < 5) {
      bg.style.backgroundImage = `url("./ressources/img/bg_${img.night}.webp")`;
      heading.style.backgroundImage = `url("./ressources/img/bg_${img.night}.webp")`;
      showComponents(nightMode);
      footer.style.color = "rgb(250,250,250)";
      valueText.forEach((element) => {
        element.style.color = `${color.night}`;
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// COUNTDOWN
const updateCountdown = (timeDifference) => {
  const days = Math.floor(timeDifference / day);
  const hours = Math.floor((timeDifference % day) / hr);
  const minutes = Math.floor((timeDifference % hr) / min);
  const seconds = Math.floor((timeDifference % min) / sec);

  if (days > 9) {
    values[0].firstElementChild.textContent = `${days}`;
  } else {
    values[0].firstElementChild.textContent = `0${days}`;
  }
  if (hours > 9) {
    values[1].firstElementChild.textContent = `${hours}`;
  } else {
    values[1].firstElementChild.textContent = `0${hours}`;
  }
  if (minutes > 9) {
    values[2].firstElementChild.textContent = `${minutes}`;
  } else {
    values[2].firstElementChild.textContent = `0${minutes}`;
  }
  if (seconds > 9) {
    values[3].firstElementChild.textContent = `${seconds}`;
  } else {
    values[3].firstElementChild.textContent = `0${seconds}`;
  }
};

const runCountdown = () => {
  countdownActive = setInterval(() => {
    const now = Date.now();
    const goal = new Date(2021, 2, 6).getTime();
    const difference = goal - now;
    updateCountdown(difference);
  }, sec);
};

// EVENT LISTENER
document.addEventListener("load", detectLanguage());
document.addEventListener("load", detectTime());
window.addEventListener("load", runCountdown());
