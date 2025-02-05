import JSConfetti from "js-confetti";

const confetti = new JSConfetti();

function fireConfetti() {
  confetti.addConfetti();
}

const confettiBtn = document.querySelector("[data-ui='effect']");

confettiBtn.addEventListener("click", fireConfetti);
