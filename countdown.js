const countdownDate = new Date("2025-10-01T00:00:00").getTime(); // Change to your target time

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const shopButton = document.querySelector(".shop-button");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance <= 0) {
    // Countdown is over
    daysEl.innerHTML = '0';
    hoursEl.innerHTML = '00';
    minutesEl.innerHTML = '00';
    secondsEl.innerHTML = '00';

    // Change button to SOLD OUT
    shopButton.innerText = "SOLD OUT";
    shopButton.classList.add("sold-out");
    shopButton.removeAttribute("href"); // remove link
    shopButton.style.cursor = "default";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.innerHTML = days;
  hoursEl.innerHTML = String(hours).padStart(2, '0');
  minutesEl.innerHTML = String(minutes).padStart(2, '0');
  secondsEl.innerHTML = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();
