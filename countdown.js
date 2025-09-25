const countdownDate = new Date("2025-10-01T00:00:00").getTime(); // Target time

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const shopButton = document.querySelector(".shop-button");

// Modal elements
const modal = document.getElementById("whatsappModal");
const closeBtn = modal.querySelector(".close");

function openModal(e) {
  e.preventDefault(); // stop <a> default click
  modal.style.display = "block";
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  const oneDay = 1000 * 60 * 60 * 24;

  if (distance > oneDay) {
    // Coming soon
    shopButton.innerText = "COMING SOON";
    shopButton.className = "shop-button coming-soon";
    shopButton.removeAttribute("href");
    shopButton.onclick = null;
  } else if (distance > 0 && distance <= oneDay) {
    // Pre-order
    shopButton.innerText = "PRE-ORDER NOW";
    shopButton.className = "shop-button pre-order";
    shopButton.removeAttribute("href");
    shopButton.onclick = openModal;
  } else if (distance <= 0 && distance > -oneDay) {
    // Buy now
    shopButton.innerText = "BUY NOW";
    shopButton.className = "shop-button buy-now";
    shopButton.removeAttribute("href");
    shopButton.onclick = openModal;
  } else {
    // Sold out
    shopButton.innerText = "SOLD OUT";
    shopButton.className = "shop-button sold-out";
    shopButton.removeAttribute("href");
    shopButton.onclick = null;
  }

  // Countdown numbers
  if (distance <= 0) {
    daysEl.innerHTML = '0';
    hoursEl.innerHTML = '00';
    minutesEl.innerHTML = '00';
    secondsEl.innerHTML = '00';
  } else {
    const days = Math.floor(distance / oneDay);
    const hours = Math.floor((distance % oneDay) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerHTML = days;
    hoursEl.innerHTML = String(hours).padStart(2, '0');
    minutesEl.innerHTML = String(minutes).padStart(2, '0');
    secondsEl.innerHTML = String(seconds).padStart(2, '0');
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Close modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};