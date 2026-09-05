/* Progressive enhancement: scroll reveals + top progress hairline.
   The `js` class is added inline in <head>; without JS everything
   stays fully visible and static. */
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("in-view"); });
  }

  var bar = document.querySelector(".progress");
  if (bar) {
    var update = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? doc.scrollTop / max : 0) + ")";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }
})();
