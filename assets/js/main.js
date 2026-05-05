// Nav activo
(function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href.endsWith(path)) a.classList.add("active");
  });
})();

// AOS
window.addEventListener("load", () => {
  if (window.AOS) {
    AOS.init({
      duration: 850,
      easing: "ease-out-cubic",
      once: true,
      offset: 90
    });
  }
});

// Slider simple (sin dependencias)
(function slider(){
  const root = document.querySelector("[data-slider]");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll(".slide"));
  const dots = Array.from(root.querySelectorAll(".dot"));
  const btnPrev = root.querySelector("[data-prev]");
  const btnNext = root.querySelector("[data-next]");
  const intervalMs = Number(root.getAttribute("data-interval") || 6500);

  let i = 0;
  let timer = null;

  const set = (idx) => {
    i = (idx + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("active", k === i));
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
  };

  const next = () => set(i + 1);
  const prev = () => set(i - 1);

  const start = () => {
    stop();
    timer = setInterval(next, intervalMs);
  };
  const stop = () => timer && clearInterval(timer);

  btnNext && btnNext.addEventListener("click", () => { next(); start(); });
  btnPrev && btnPrev.addEventListener("click", () => { prev(); start(); });
  dots.forEach((d, k) => d.addEventListener("click", () => { set(k); start(); }));

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);

  // touch swipe básico
  let x0 = null;
  root.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, {passive:true});
  root.addEventListener("touchend", (e) => {
    if (x0 == null) return;
    const x1 = e.changedTouches[0].clientX;
    const dx = x1 - x0;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    start();
    x0 = null;
  }, {passive:true});

  set(0);
  start();
})();

// Count-up de números (para stats)
(function countUp(){
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;

  const animate = (el) => {
    const target = Number(el.getAttribute("data-count"));
    const dur = Number(el.getAttribute("data-count-duration") || 900);
    const start = performance.now();
    const from = 0;

    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = Math.round(from + (target - from) * ease);
      el.textContent = String(val);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, {threshold: .6});

  els.forEach(el => io.observe(el));
})();