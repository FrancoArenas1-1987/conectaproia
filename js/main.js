(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Configura links de WhatsApp desde los atributos del <body>.
  const body = document.body;
  const number = body?.getAttribute("data-whatsapp-number");
  const message = body?.getAttribute("data-whatsapp-message") || "";
  if (number) {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    document.querySelectorAll(".js-whatsapp-link").forEach((link) => {
      link.setAttribute("href", url);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobileNav");
  if (!toggle || !mobileNav) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    mobileNav.hidden = !open;
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  mobileNav.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.tagName === "A") setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
})();
