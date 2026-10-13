const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const header = document.querySelector(".site-header");
const backToTop = document.querySelector("#back-to-top");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

function setMenu(open) {
  navigation.classList.toggle("open", open);

  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation"
  );

  menuButton.textContent = open ? "×" : "☰";
}

// Toggle mobile navigation.
menuButton.addEventListener("click", () => {
  const isOpen =
    menuButton.getAttribute("aria-expanded") === "true";

  setMenu(!isOpen);
});

// Close navigation after selecting a section.
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenu(false);
  });
});

// Close navigation with Escape.
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenu(false);
    menuButton.focus();
  }
});

// Close navigation when clicking outside the header.
document.addEventListener("click", (event) => {
  if (!header.contains(event.target)) {
    setMenu(false);
  }
});

// Reset mobile navigation when switching to desktop.
window.addEventListener("resize", () => {
  if (window.innerWidth > 1050) {
    setMenu(false);
  }
});

// Show the back-to-top button after scrolling.
function updateBackToTop() {
  backToTop.hidden = window.scrollY < 500;
}

window.addEventListener("scroll", updateBackToTop, {
  passive: true
});

updateBackToTop();

backToTop.addEventListener("click", () => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? "instant" : "smooth"
  });

  document.querySelector(".brand").focus({
    preventScroll: true
  });
});

// Open an email draft without exposing email credentials.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message =
    document.querySelector("#message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent =
      "Please enter your name, email, and message.";
    return;
  }

  const subject = encodeURIComponent(
    `Portfolio inquiry from ${name}`
  );

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  window.location.href =
    `mailto:mdnoorishnauman@gmail.com` +
    `?subject=${subject}&body=${body}`;

  formStatus.textContent =
    "Your email app should open with a draft. Send it there " +
    "to complete your message. If it does not open, email " +
    "mdnoorishnauman@gmail.com directly.";
});