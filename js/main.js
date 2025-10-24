// Icon element (anchor or button)
let icon = document.getElementsByClassName("icon")[0];

// Safety guard: run only if icon exists
if (icon) {
  // Prevent jump/focus to top when clicking a.icon
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    responsive_control();
  });

  // Keyboard accessibility: toggle with Enter/Space
  icon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      responsive_control();
    }
  });
}

// Nav toggle function
function responsive_control() {
  const nav = document.getElementById("myTopnav");
  if (!nav) return;

  const isOpen = nav.className.includes("responsive");
  if (isOpen) {
    nav.className = "topnav";
    // Reflect accessibility state
    icon && icon.setAttribute("aria-expanded", "false");
  } else {
    nav.className = "topnav responsive";
    icon && icon.setAttribute("aria-expanded", "true");
  }
}

// On small screens, collapse menu after clicking a link
(function collapseOnLinkClick() {
  const nav = document.getElementById("myTopnav");
  if (!nav) return;
  nav.addEventListener("click", (e) => {
    // Exclude clicks on the icon itself
    if (!(e.target instanceof Element)) return;
    const link = e.target.closest("a");
    if (!link || link.classList.contains("icon")) return;

    // In responsive state, collapse when a normal link is clicked
    if (nav.className.includes("responsive")) {
      nav.className = "topnav";
      icon && icon.setAttribute("aria-expanded", "false");
    }
  });
})();

// Accordion
(function initAccordion() {
  document.querySelectorAll(".accordion").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      const panel = btn.nextElementSibling;
      if (panel) panel.style.display = expanded ? "none" : "block";
    });
  });
})();

// Back-to-top
(function initBackToTop() {
    function ready(fn){ 
      if (document.readyState !== "loading") fn();
      else document.addEventListener("DOMContentLoaded", fn);
    }
  
    ready(() => {
      const btt = document.getElementById("backToTop");
      if (!btt) return;
  
      const threshold = () => window.innerHeight * 0.3;
  
      const toggle = () => {
        const show = (window.scrollY || document.documentElement.scrollTop) > threshold();
        btt.style.display = show ? "inline-block" : "none";
      };
  
      window.addEventListener("scroll", toggle, { passive: true });
      window.addEventListener("resize", toggle);
      toggle();
  
      btt.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  })();

//  Slideshow
let slideIndex = 1;
let slideTimer = null;
const AUTOPLAY_MS = 4500;

function showSlides(n){
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  if (!slides.length) return;

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (let i=0; i<slides.length; i++) slides[i].style.display = "none";
  for (let i=0; i<dots.length; i++) dots[i].classList.remove("active");

  slides[slideIndex-1].style.display = "block";
  if (dots[slideIndex-1]) dots[slideIndex-1].classList.add("active");
  for (let i=0; i<dots.length; i++) dots[i].setAttribute("aria-selected", i === (slideIndex-1) ? "true" : "false");
}

function plusSlides(n){ showSlides(slideIndex += n); }
function currentSlide(n){ showSlides(slideIndex = n); }

function startAuto(){
  stopAuto();
  slideTimer = setInterval(()=>{ plusSlides(1); }, AUTOPLAY_MS);
}
function stopAuto(){
  if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
}

document.addEventListener("DOMContentLoaded", ()=>{
  showSlides(slideIndex);
  startAuto();

  const slider = document.getElementById("pomSlider");
  if (slider){
    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);
  }
});
