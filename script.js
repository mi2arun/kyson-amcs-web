// AMCS demo site — small progressive-enhancement helpers only.
(function () {
  "use strict";

  // Current year in footer
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Sticky nav shadow/condense on scroll
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    if (nav) nav.classList.toggle("is-stuck", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Reveal-on-scroll for sections
  var revealables = document.querySelectorAll(
    ".section__head, .card, .step, .counter, .impact__feature, .about__media, .about__copy, .cta__panel"
  );
  revealables.forEach(function (el) { el.classList.add("in-view"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          if (e.target.dataset.counter !== undefined) runCounter(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el) { io.observe(el); });

    // Animated counters
    document.querySelectorAll(".counter__num").forEach(function (num) {
      num.parentElement.dataset.counter = "";
      countObserver.observe(num);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
    document.querySelectorAll(".counter__num").forEach(setFinal);
  }

  // dedicated observer so each number animates once when seen
  function makeCountObserver() {
    if (!("IntersectionObserver" in window)) return null;
    return new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateNumber(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
  }
  var countObserver = makeCountObserver();

  function setFinal(num) {
    var to = num.getAttribute("data-to");
    num.textContent = format(to) + (num.getAttribute("data-suffix") || "");
  }

  function animateNumber(num) {
    var to = parseFloat(num.getAttribute("data-to"));
    var suffix = num.getAttribute("data-suffix") || "";
    var decimals = (num.getAttribute("data-to").split(".")[1] || "").length;
    var start = null, dur = 1400;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = to * eased;
      num.textContent = format(val.toFixed(decimals)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else num.textContent = format(to) + suffix;
    }
    requestAnimationFrame(tick);
  }

  function format(n) {
    var parts = String(n).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  // runCounter referenced above kept as no-op for older path
  function runCounter() {}
})();
