import JSConfetti from "js-confetti";
import requireElement from "@/helpers/requireElement";
import { isBirthdayToday } from "@/helpers/birthday";

// Constants
import { BDAYS } from "@/constants";

const confetti = new JSConfetti();

const BURST_PAUSE_MS = 1200;

function fireConfetti() {
  confetti.addConfetti();
}

const confettiBtn = requireElement<HTMLButtonElement>("[data-ui='effect']");

confettiBtn.addEventListener("click", fireConfetti);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function celebrateBirthdays() {
  const today = new Date();

  for (const birthday of BDAYS) {
    if (!isBirthdayToday(birthday, today)) continue;

    const yearsPassed = today.getFullYear() - birthday.getFullYear();
    if (yearsPassed < 0) continue;

    const bursts = Math.max(yearsPassed, 1);

    for (let i = 0; i < bursts; i++) {
      fireConfetti();
      await wait(BURST_PAUSE_MS);
    }
  }
}

celebrateBirthdays();
