'use strict'

// GLOBAL VARIABLES
const bg = document.querySelector('.bg')
const heading = document.querySelector('.timer__heading')
const timer = document.querySelectorAll('.timer__display > *')
const msg = document.querySelector('.msg')
const link = document.querySelector('.link')
const values = Array.from(timer)
const valueText = document.querySelectorAll('.value')
const github = document.querySelector('.github')
const footer = document.querySelector('footer')

const BIRTHDATE = new Date(2021, 1, 12)

// COUNTDOWN VARIABLES
const sec = 1000
const min = sec * 60
const hr = min * 60
const day = hr * 24

// MODE OBJECTS
const img = { morning: 'morning', day: 'day', night: 'night' }
const color = { morning: '#e07a51', day: '#44CCEE', night: '#0A1239' }

// VARIABLES DAY-MODE
const sun = document.querySelector('.sun_day')
const birdCage = document.querySelector('.birdcage')

// VARIABLES NIGHT-MODE
const moon = document.querySelector('.moonlight')
const stars = document.querySelector('.overlay-stars')
const owl = document.querySelector('.owl')

// VARIABLES MORNING-MODE
const sunrise = document.querySelector('.sunlight')

// MODE ARRAYS
const dayMode = [sun, birdCage]
const morningMode = [sunrise, owl]
const nightMode = [moon, stars, owl]

// LANGUAGE CODES
const GERMANY_LANGUAGE_CODE = 'de-DE'
const LATVIA_LANGUAGE_CODE = 'lv-LV'

const LOCALES = {
    DE: {
        heading: 'Es ist was es ist, sagt die Liebe',
        message: 'Mit Liebe gemacht'
    },
    LV: {
        heading: 'Ir kā ir. Teica mīlestība.',
        message: 'Ar mīlestību taisīts'
    }
}

// LANGUAGE DETECTION
const detectLanguage = () => {
    // navigator.language checks which language the client is using
    if (
        navigator.language !== GERMANY_LANGUAGE_CODE ||
        navigator.language !== LATVIA_LANGUAGE_CODE
    ) {
        return
    } else if (navigator.language === GERMANY_LANGUAGE_CODE) {
        heading.textContent = LOCALES.DE.heading
        msg.textContent = LOCALES.DE.message
    } else if (navigator.language === LATVIA_LANGUAGE_CODE) {
        heading.textContent = LOCALES.LV.heading
        msg.textContent = LOCALES.LV.message
    }
}

// TIME DETECTION
const detectTime = () => {
    const currentTime = new Date().getHours()
    return changeColor(currentTime)
}

const showComponents = (componentList) => {
    componentList.forEach((element) => {
        element.style.display = 'block'
    })
}

const changeColor = (time) => {
    try {
        const isDay = time >= 8 && time < 19
        const isMorning = time > 5 && time < 8
        const isNight = time >= 19 || time < 5

        if (isDay) {
            bg.style.backgroundImage = `url("./resources/img/bg_${img.day}.png")`
            heading.style.backgroundImage = `url("./resources/img/bg_${img.day}.png")`
            showComponents(dayMode)
        } else if (isMorning) {
            bg.style.backgroundImage = `url("./resources/img/bg_${img.morning}.png")`
            heading.style.backgroundImage = `url("./resources/img/bg_${img.morning}.png")`
            showComponents(morningMode)
        } else if (isNight) {
            bg.style.backgroundImage = `url("./resources/img/bg_${img.night}.png")`
            heading.style.backgroundImage = `url("./resources/img/bg_${img.night}.png")`
            showComponents(nightMode)
            msg.style.color = 'rgb(250,250,250)'
            github.style.color = 'rgb(250,250,250)'
        }
    } catch (error) {
        console.log(error)
    }
}

// COUNTDOWN
const updateCountdown = (timeDifference) => {
    const days = Math.floor(timeDifference / day)
    const hours = Math.floor((timeDifference % day) / hr)
    const minutes = Math.floor((timeDifference % hr) / min)
    const seconds = Math.floor((timeDifference % min) / sec)

    if (days > 9) {
        values[0].firstElementChild.textContent = `${days}`
    } else {
        values[0].firstElementChild.textContent = `0${days}`
    }
    if (hours > 9) {
        values[1].firstElementChild.textContent = `${hours}`
    } else {
        values[1].firstElementChild.textContent = `0${hours}`
    }
    if (minutes > 9) {
        values[2].firstElementChild.textContent = `${minutes}`
    } else {
        values[2].firstElementChild.textContent = `0${minutes}`
    }
    if (seconds > 9) {
        values[3].firstElementChild.textContent = `${seconds}`
    } else {
        values[3].firstElementChild.textContent = `0${seconds}`
    }
}

const runCountdown = () => {
    const countdownActive = setInterval(() => {
        const now = Date.now()
        const birthday = BIRTHDATE.getTime()
        const difference = now - birthday
        updateCountdown(difference)
    }, sec)
}

// EVENT LISTENER
document.addEventListener('load', detectLanguage())
document.addEventListener('load', detectTime())
window.addEventListener('load', runCountdown())

// const countdownTimer = () => {
//   const config = {
//     timeValues: ["days", "hours", "minutes", "seconds"],
//     ratio: {
//       days: 86_400_000,
//       hours: 3_600_000,
//       minutes: 60_000,
//       seconds: 1_000,
//     },
//     remainder: {
//       days: 365,
//       hours: 24,
//       minutes: 60,
//       seconds: 60,
//     },
//     rootClass: document.querySelector(".countdown"),
//   };

//   const elements = getTimeValueElements(config.timeValues, config.rootClass);
//   setInterval(
//     () => updateCountdown(elements, config.ratio, config.remainder),
//     1000
//   );
// };

// const getTimeValueElements = (timeValues, root) => {
//   const elements = [];
//   // Return all countdown display list elements in an array
//   timeValues.forEach((value) => elements.push(root.querySelector(`#${value}`)));
//   return elements;
// };

// const getCurrentTimeDifference = () => {
//   const now = Date.now();
//   // Transform endDate into miliseconds by using getTime()
//   const endDate = new Date("December 31, 2021 23:00:00").getTime();
//   return endDate - now;
// };

// const updateCountdown = (elements, divisors, remainder) => {
//   const currentTimeDifference = getCurrentTimeDifference();
//   const keys = Object.keys(divisors);

//   elements.forEach((element) => {
//     if (keys.includes(element.id)) {
//       element.textContent = formatOneDigitDisplay(
//         calculateTimeValue(currentTimeDifference, divisors, remainder, element)
//       );
//     }
//   });
// };

// const calculateTimeValue = (currentTime, divisor, remainder, element) => {
//   return Math.floor(
//     (currentTime / divisor[element.id]) % remainder[element.id]
//   );
// };

// const formatOneDigitDisplay = (value) => {
//   if (value < 10) {
//     return (value = `0${value}`);
//   }
//   return value;
// };

// countdownTimer();
