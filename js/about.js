// About Carousel Functionality
class AboutCarousel {
  constructor() {
    this.slides = document.querySelectorAll(".about-slide");
    this.indicators = document.querySelectorAll(
      ".about-carousel-indicators .indicator",
    );
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.currentSlide = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    // Event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Indicator clicks
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    // Start autoplay
    this.startAutoPlay();

    // Pause on hover
    const carouselContainer = document.querySelector(
      ".about-carousel-container",
    );
    carouselContainer.addEventListener("mouseenter", () => this.stopAutoPlay());
    carouselContainer.addEventListener("mouseleave", () =>
      this.startAutoPlay(),
    );
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.indicators.forEach((indicator) =>
      indicator.classList.remove("active"),
    );

    // Show current slide
    this.currentSlide = index;
    this.slides[this.currentSlide].classList.add("active");
    this.indicators[this.currentSlide].classList.add("active");
  }

  nextSlide() {
    let next = this.currentSlide + 1;
    if (next >= this.slides.length) {
      next = 0;
    }
    this.showSlide(next);
  }

  prevSlide() {
    let prev = this.currentSlide - 1;
    if (prev < 0) {
      prev = this.slides.length - 1;
    }
    this.showSlide(prev);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AboutCarousel();
});
