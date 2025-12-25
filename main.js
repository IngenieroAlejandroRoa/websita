// LANGUAGE SWITCH
function switchLang(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
}

// SIMPLE CAROUSEL LOGIC
function moveSlide(step, carouselId) {
  const carousel = document.getElementById(carouselId);
  const inner = carousel.querySelector(".carousel-inner");
  const items = inner.children;
  const total = items.length;

  let currentIndex;
  for (let i = 0; i < total; i++) {
    if (items[i].classList.contains("active")) {
      currentIndex = i;
      break;
    }
  }

  items[currentIndex].classList.remove("active");
  let nextIndex = (currentIndex + step + total) % total;
  items[nextIndex].classList.add("active");
  inner.style.transform = `translateX(-${nextIndex * 100}%)`;
}

