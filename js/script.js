// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }

  // Save theme preference to localStorage
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light",
  );
});

// Load saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

// Hamburger Menu Functionality
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navLinksItems = navLinks.querySelectorAll("a");
navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Close mobile menu on window resize (if resizing to desktop)
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

// Carousel Functionality
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
let currentSlide = 0;
let carouselInterval;
let isPaused = false;

function showSlide(n) {
  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Remove active class from all indicators
  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });

  // Show the selected slide
  currentSlide = n;
  slides[currentSlide].classList.add("active");
  indicators[currentSlide].classList.add("active");
}

function nextSlide() {
  if (!isPaused) {
    let next = currentSlide + 1;
    if (next >= slides.length) {
      next = 0;
    }
    showSlide(next);
  }
}

function startCarousel() {
  isPaused = false;
  carouselInterval = setInterval(nextSlide, 5000);
}

function stopCarousel() {
  isPaused = true;
  clearInterval(carouselInterval);
}

// Start the carousel initially
startCarousel();

// Set up click events for indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    showSlide(index);
  });
});

// Pause carousel on hover
const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", stopCarousel);
carousel.addEventListener("mouseleave", startCarousel);

// Also pause when hovering over indicators
const carouselIndicators = document.querySelector(".carousel-indicators");
carouselIndicators.addEventListener("mouseenter", stopCarousel);
carouselIndicators.addEventListener("mouseleave", startCarousel);

// Pause on touch for mobile devices
carousel.addEventListener("touchstart", stopCarousel);
carousel.addEventListener("touchend", startCarousel);

// Price Calculation Function
function calculatePrice(
  checkinElement,
  checkoutElement,
  apartmentTypeElement,
  nightlyRateElement,
  nightsCountElement,
  totalAmountElement,
  priceSummaryElement,
) {
  const checkin = new Date(checkinElement.value);
  const checkout = new Date(checkoutElement.value);
  const apartment = apartmentTypeElement.value;

  if (checkin && checkout && apartment) {
    // Calculate number of nights
    const timeDiff = checkout.getTime() - checkin.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights > 0) {
      // Set nightly rate based on apartment type
      let rate = 0;
      if (apartment === "1-bedroom") {
        rate = 40000;
      } else if (apartment === "2-bedroom") {
        rate = 80000;
      }

      // Update price summary
      nightlyRateElement.textContent = `₦${rate.toLocaleString()}`;
      nightsCountElement.textContent = nights;
      totalAmountElement.textContent = `₦${(rate * nights).toLocaleString()}`;

      // Show price summary
      priceSummaryElement.classList.add("active");
    } else {
      priceSummaryElement.classList.remove("active");
    }
  } else {
    priceSummaryElement.classList.remove("active");
  }
}

// Set minimum date to today
const today = new Date().toISOString().split("T")[0];
document.getElementById("mainCheckinDate").min = today;
document.getElementById("modalCheckinDate").min = today;

// Main booking form price calculation
const mainCheckinDate = document.getElementById("mainCheckinDate");
const mainCheckoutDate = document.getElementById("mainCheckoutDate");
const mainApartmentType = document.getElementById("mainApartmentType");
const mainPriceSummary = document.getElementById("mainPriceSummary");
const mainNightlyRate = document.getElementById("mainNightlyRate");
const mainNightsCount = document.getElementById("mainNightsCount");
const mainTotalAmount = document.getElementById("mainTotalAmount");

mainCheckinDate.addEventListener("change", () => {
  mainCheckoutDate.min = mainCheckinDate.value;
  calculatePrice(
    mainCheckinDate,
    mainCheckoutDate,
    mainApartmentType,
    mainNightlyRate,
    mainNightsCount,
    mainTotalAmount,
    mainPriceSummary,
  );
});

mainCheckoutDate.addEventListener("change", () => {
  calculatePrice(
    mainCheckinDate,
    mainCheckoutDate,
    mainApartmentType,
    mainNightlyRate,
    mainNightsCount,
    mainTotalAmount,
    mainPriceSummary,
  );
});

mainApartmentType.addEventListener("change", () => {
  calculatePrice(
    mainCheckinDate,
    mainCheckoutDate,
    mainApartmentType,
    mainNightlyRate,
    mainNightsCount,
    mainTotalAmount,
    mainPriceSummary,
  );
});

// Modal booking form price calculation
const modalCheckinDate = document.getElementById("modalCheckinDate");
const modalCheckoutDate = document.getElementById("modalCheckoutDate");
const modalApartmentType = document.getElementById("modalApartmentType");
const modalPriceSummary = document.getElementById("modalPriceSummary");
const modalNightlyRate = document.getElementById("modalNightlyRate");
const modalNightsCount = document.getElementById("modalNightsCount");
const modalTotalAmount = document.getElementById("modalTotalAmount");

modalCheckinDate.addEventListener("change", () => {
  modalCheckoutDate.min = modalCheckinDate.value;
  calculatePrice(
    modalCheckinDate,
    modalCheckoutDate,
    modalApartmentType,
    modalNightlyRate,
    modalNightsCount,
    modalTotalAmount,
    modalPriceSummary,
  );
});

modalCheckoutDate.addEventListener("change", () => {
  calculatePrice(
    modalCheckinDate,
    modalCheckoutDate,
    modalApartmentType,
    modalNightlyRate,
    modalNightsCount,
    modalTotalAmount,
    modalPriceSummary,
  );
});

modalApartmentType.addEventListener("change", () => {
  calculatePrice(
    modalCheckinDate,
    modalCheckoutDate,
    modalApartmentType,
    modalNightlyRate,
    modalNightsCount,
    modalTotalAmount,
    modalPriceSummary,
  );
});

// Quick View Modals
const viewDetailButtons = document.querySelectorAll(".view-details");
const quickViewModals = document.querySelectorAll(".quick-view-modal");
const closeModalButtons = document.querySelectorAll(".close-modal");
const bookingModal = document.getElementById("bookingModal");
const bookingModalTitle = document.getElementById("bookingModalTitle");

viewDetailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const roomType = button.getAttribute("data-room");
    const modal = document.getElementById(`${roomType}-modal`);
    modal.classList.add("active");
  });
});

// Quick View Book Now buttons
const quickViewBookButtons = document.querySelectorAll(".quick-view-book");
quickViewBookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const roomType = button.getAttribute("data-room-type");
    const roomName = button.getAttribute("data-room-name");

    // Close quick view modal
    quickViewModals.forEach((modal) => {
      modal.classList.remove("active");
    });

    // Set room type in booking modal
    modalApartmentType.value = roomType;
    bookingModalTitle.textContent = `Book ${roomName}`;

    // Show booking modal
    bookingModal.classList.add("active");

    // Trigger price calculation
    calculatePrice(
      modalCheckinDate,
      modalCheckoutDate,
      modalApartmentType,
      modalNightlyRate,
      modalNightsCount,
      modalTotalAmount,
      modalPriceSummary,
    );
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    quickViewModals.forEach((modal) => {
      modal.classList.remove("active");
    });
    bookingModal.classList.remove("active");
  });
});

// Close modals when clicking outside
quickViewModals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});

bookingModal.addEventListener("click", (e) => {
  if (e.target === bookingModal) {
    bookingModal.classList.remove("active");
  }
});

// Form Reset Function
function resetForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();

    // Also reset price summary
    const priceSummary = form.querySelector(".price-summary");
    if (priceSummary) {
      priceSummary.classList.remove("active");
    }
  }
}

// Booking Form Submissions
const mainBookingForm = document.getElementById("mainBookingForm");
const modalBookingForm = document.getElementById("modalBookingForm");
const bankModal = document.getElementById("bankModal");
const successModal = document.getElementById("successModal");
const cancelTransfer = document.getElementById("cancelTransfer");
const confirmTransfer = document.getElementById("confirmTransfer");
const closeModal = document.getElementById("closeModal");
const transferAmount = document.getElementById("transferAmount");

function handleBookingSubmission(e, totalAmountElement) {
  e.preventDefault();

  // Get form data
  const formData = {
    checkin: e.target.querySelector('input[type="date"]:first-of-type').value,
    checkout: e.target.querySelector('input[type="date"]:last-of-type').value,
    apartmentType: e.target.querySelector("select").value,
    guests: e.target.querySelectorAll("select")[1].value,
    fullName: e.target.querySelector('input[type="text"]').value,
    email: e.target.querySelector('input[type="email"]').value,
    phone: e.target.querySelector('input[type="tel"]').value,
    totalAmount: totalAmountElement.textContent,
  };

  // Save to localStorage
  localStorage.setItem("bookingData", JSON.stringify(formData));

  // Set transfer amount in bank modal
  transferAmount.textContent = totalAmountElement.textContent;

  // Close any open modals
  bookingModal.classList.remove("active");
  quickViewModals.forEach((modal) => {
    modal.classList.remove("active");
  });

  // Show bank transfer modal
  bankModal.classList.add("active");
}

mainBookingForm.addEventListener("submit", (e) => {
  handleBookingSubmission(e, mainTotalAmount);
});

modalBookingForm.addEventListener("submit", (e) => {
  handleBookingSubmission(e, modalTotalAmount);
});

cancelTransfer.addEventListener("click", () => {
  bankModal.classList.remove("active");
});

confirmTransfer.addEventListener("click", () => {
  // Hide bank modal and show success modal
  bankModal.classList.remove("active");
  successModal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  successModal.classList.remove("active");

  // Reset all forms
  resetForm("mainBookingForm");
  resetForm("modalBookingForm");
});

// Close modals when clicking outside
bankModal.addEventListener("click", (e) => {
  if (e.target === bankModal) {
    bankModal.classList.remove("active");
  }
});

successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.classList.remove("active");

    // Reset all forms
    resetForm("mainBookingForm");
    resetForm("modalBookingForm");
  }
});
