const countdownDate = new Date("2025-10-01T00:00:00").getTime(); 

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const shopButton = document.querySelector(".shop-button");

// Unique WhatsApp modal elements
const whatsappModal = document.getElementById("whatsappModalUnique");
const whatsappClose = whatsappModal.querySelector(".whatsapp-modal-close");

function openWhatsappModal(e) {
  e.preventDefault();
  whatsappModal.style.display = "flex";
}

// Close when clicking ❌
if (whatsappClose) {
  whatsappClose.addEventListener("click", () => {
    whatsappModal.style.display = "none";
  });
}

// Close when clicking outside the box
window.addEventListener("click", (event) => {
  if (event.target === whatsappModal) {
    whatsappModal.style.display = "none";
  }
});

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  const oneDay = 1000 * 60 * 60 * 24;

  // Reset button to avoid stacking listeners
  shopButton.replaceWith(shopButton.cloneNode(true));
  const newButton = document.querySelector(".shop-button");

  if (distance > 0) {
    // Coming soon
    newButton.innerText = "COMING SOON";
    newButton.className = "shop-button coming-soon";
  } else if (distance <= 0 && distance > -oneDay) {
    // Shop now
    newButton.innerText = "SHOP NOW";
    newButton.className = "shop-button shop-now";
    newButton.addEventListener("click", openWhatsappModal);
  } else {
    // Sold out
    newButton.innerText = "SOLD OUT";
    newButton.className = "shop-button sold-out";
  }

  // Update countdown numbers
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

// WhatsApp modal close logic (only for this modal)
whatsappClose.addEventListener("click", () => whatsappModal.style.display = "none");
window.addEventListener("click", (event) => {
  if (event.target === whatsappModal) {
    whatsappModal.style.display = "none";
  }
});


