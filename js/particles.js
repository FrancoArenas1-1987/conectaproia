(function () {
  const canvas = document.querySelector(".demo-particles");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 900;
  if (prefersReducedMotion || isMobile) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let animationId;

  const points = Array.from({ length: 32 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0006,
    vy: (Math.random() - 0.5) * 0.0006
  }));

  function resize() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(27,77,122,0.14)";
    ctx.strokeStyle = "rgba(27,77,122,0.12)";

    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;

      if (point.x < 0 || point.x > 1) point.vx *= -1;
      if (point.y < 0 || point.y > 1) point.vy *= -1;

      const px = point.x * width;
      const py = point.y * height;
      ctx.beginPath();
      ctx.arc(px, py, 2.6, 0, Math.PI * 2);
      ctx.fill();

      points.forEach((other) => {
        const dx = px - other.x * width;
        const dy = py - other.y * height;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 140) {
          ctx.globalAlpha = 1 - distance / 140;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(other.x * width, other.y * height);
          ctx.stroke();
        }
      });
    });

    ctx.globalAlpha = 1;
    animationId = window.requestAnimationFrame(draw);
  }

  resize();
  draw();

  window.addEventListener("resize", () => {
    resize();
  });

  window.addEventListener("beforeunload", () => {
    window.cancelAnimationFrame(animationId);
  });
})();
