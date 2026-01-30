(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const messagesEl = document.getElementById("demoChatMessages");
  const runButton = document.querySelector(".demo-run");
  const resetButton = document.querySelector(".demo-reset");
  const revealEl = document.querySelector(".reveal");

  if (!messagesEl || !runButton || !resetButton) return;

  const regions = [
    "Región de Arica y Parinacota",
    "Región de Tarapacá",
    "Región de Antofagasta",
    "Región de Atacama",
    "Región de Coquimbo",
    "Región de Valparaíso",
    "Región Metropolitana",
    "Región del Biobío",
    "Región de La Araucanía",
    "Región de Los Ríos",
    "Región de Los Lagos",
    "Región de Aysén",
    "Región de Magallanes"
  ];

  const comunasBiobio = [
    "Concepción",
    "Talcahuano",
    "San Pedro de la Paz",
    "Hualpén",
    "Chiguayante",
    "Coronel",
    "Tomé",
    "Penco",
    "Los Ángeles",
    "Otra comuna"
  ];

  let isRunning = false;

  function clearMessages() {
    messagesEl.innerHTML = "";
  }

  function addMessage(text, type) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble chat-bubble--${type}`;
    bubble.innerHTML = text.replace(/\n/g, "<br>");
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addBotMessage(text) {
    if (prefersReducedMotion) {
      addMessage(text, "bot");
      return;
    }
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble chat-bubble--bot";
    bubble.textContent = "";
    messagesEl.appendChild(bubble);

    let index = 0;
    const interval = window.setInterval(() => {
      bubble.textContent += text[index] || "";
      index += 1;
      messagesEl.scrollTop = messagesEl.scrollHeight;
      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, 16);
  }

  function addSelect(options, selected, label) {
    const wrapper = document.createElement("div");
    wrapper.className = "demo-form";
    const select = document.createElement("select");
    select.className = "demo-select";
    select.disabled = true;
    select.innerHTML = `<option value="">${label}</option>` +
      options.map((option) => `<option value="${option}">${option}</option>`).join("");
    select.value = selected;
    wrapper.appendChild(select);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addCheckboxes(items, checkedItems = []) {
    const wrapper = document.createElement("div");
    wrapper.className = "demo-form";
    const list = document.createElement("div");
    list.className = "demo-checkboxes";

    items.forEach((item) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.disabled = true;
      checkbox.checked = checkedItems.includes(item);
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(item));
      list.appendChild(label);
    });

    wrapper.appendChild(list);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function sleep(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  async function startDemo() {
    if (isRunning) return;
    isRunning = true;
    runButton.disabled = true;

    clearMessages();

    addMessage("Hola, necesito un kinesiólogo\nEs para mi hijo, tiene bronquitis", "user");
    await sleep(prefersReducedMotion ? 0 : 500);
    addBotMessage("Hola 👋\nGracias por escribir a ConectaProIA.");
    await sleep(prefersReducedMotion ? 0 : 600);
    addBotMessage("Entiendo tu preocupación 💙\nPara ayudarte mejor, primero necesito saber tu ubicación.");

    await sleep(prefersReducedMotion ? 0 : 700);
    addBotMessage("👉 Selecciona tu región:");
    addSelect(regions, "Región del Biobío", "Selecciona tu región");
    await sleep(prefersReducedMotion ? 0 : 600);
    addMessage("Región del Biobío", "user");

    await sleep(prefersReducedMotion ? 0 : 600);
    addBotMessage("Gracias 👍\n👉 Ahora selecciona tu comuna:");
    addSelect(comunasBiobio, "San Pedro de la Paz", "Selecciona tu comuna (Biobío)");
    await sleep(prefersReducedMotion ? 0 : 600);
    addMessage("San Pedro de la Paz", "user");

    await sleep(prefersReducedMotion ? 0 : 600);
    addBotMessage("Perfecto, gracias por la información 😊");
    await sleep(prefersReducedMotion ? 0 : 400);
    addBotMessage("Por lo que me comentas, podría ser necesaria la atención de un kinesiólogo respiratorio pediátrico, quien podrá evaluar a tu hijo y definir el tratamiento adecuado.");

    await sleep(prefersReducedMotion ? 0 : 600);
    addBotMessage("Estoy revisando profesionales que:\n• Atiendan kinesiología respiratoria pediátrica\n• Tengan experiencia con niños\n• Atiendan en San Pedro de la Paz o alrededores");
    await sleep(prefersReducedMotion ? 0 : 500);
    addBotMessage("⏳ Un momento, por favor…");

    await sleep(prefersReducedMotion ? 0 : 800);
    addBotMessage("Listo ✅\nEstos son profesionales que podrían ayudarte, según disponibilidad y experiencia en la zona:");
    await sleep(prefersReducedMotion ? 0 : 500);
    addBotMessage("🫁 1. Kinesiólogo respiratorio pediátrico\n⭐ 4.8 / 5\nExperiencia en bronquitis y cuadros respiratorios infantiles\nAtención domiciliaria\nProfesional verificado");
    await sleep(prefersReducedMotion ? 0 : 400);
    addBotMessage("🫁 2. Kinesióloga respiratoria\n⭐ 4.6 / 5\nAtención pediátrica\nExperiencia en manejo respiratorio infantil\nAtención particular");
    await sleep(prefersReducedMotion ? 0 : 400);
    addBotMessage("🫁 3. Kine respiratorio integral (Kine 3)\n⭐ 4.4 / 5\nAtención a niños y adultos\nEvaluación respiratoria en domicilio\nExperiencia en cuadros agudos y seguimiento");

    await sleep(prefersReducedMotion ? 0 : 600);
    addBotMessage("👉 Selecciona uno o más profesionales con los que te gustaría ser contactado:");
    addCheckboxes(
      [
        "Kinesiólogo respiratorio pediátrico",
        "Kinesióloga respiratoria",
        "Kine respiratorio integral (Kine 3)"
      ],
      [
        "Kinesiólogo respiratorio pediátrico",
        "Kinesióloga respiratoria"
      ]
    );

    await sleep(prefersReducedMotion ? 0 : 600);
    addBotMessage("Antes de continuar, es importante que confirmes lo siguiente:\n\n🔹 Consentimiento de contacto\n(checkbox obligatorio)\n☐ Autorizo a ConectaProIA a compartir mis datos de contacto exclusivamente con los profesionales seleccionados, para que puedan comunicarse conmigo y coordinar la atención.");
    addCheckboxes(
      [
        "Autorizo a ConectaProIA a compartir mis datos de contacto exclusivamente con los profesionales seleccionados."
      ],
      [
        "Autorizo a ConectaProIA a compartir mis datos de contacto exclusivamente con los profesionales seleccionados."
      ]
    );

    await sleep(prefersReducedMotion ? 0 : 600);
    addMessage("☑ Kinesiólogo respiratorio pediátrico\n☑ Kinesióloga respiratoria\n☑ Autorizo el contacto", "user");
    await sleep(prefersReducedMotion ? 0 : 600);
    addBotMessage("Perfecto 👍\nGracias por tu confirmación.");
    await sleep(prefersReducedMotion ? 0 : 500);
    addBotMessage("📨 Tu contacto ha sido entregado a los profesionales que seleccionaste, quienes podrán comunicarse contigo directamente para evaluar el caso y coordinar la atención.");
    await sleep(prefersReducedMotion ? 0 : 500);
    addBotMessage("🔹 Recuerda:\nConectaProIA actúa como intermediario.\nLa evaluación clínica, indicaciones y tratamiento son responsabilidad exclusiva del profesional tratante.\nLos valores, horarios y modalidad de atención se acuerdan directamente con el kinesiólogo/a.");
    await sleep(prefersReducedMotion ? 0 : 500);
    addBotMessage("Gracias por confiar en ConectaProIA 🤝\nSi necesitas apoyo con otro servicio en el futuro, puedes escribirnos cuando quieras.\n💙 Estaremos atentos por si necesitas algo más.");

    isRunning = false;
    runButton.disabled = false;
  }

  function resetDemo() {
    isRunning = false;
    runButton.disabled = false;
    clearMessages();
    addMessage("DEMO — Conversación ConectaProIA (kinesiología respiratoria pediátrica).", "system");
  }

  runButton.addEventListener("click", startDemo);
  resetButton.addEventListener("click", resetDemo);

  if (!prefersReducedMotion && revealEl && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(revealEl);
  } else if (revealEl) {
    revealEl.classList.add("is-visible");
  }
})();
