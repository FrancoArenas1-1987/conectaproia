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

  let step = 0;

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


  function addBotMessage(text, delay = 400) {
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

  function addSelect(options, id, label) {
    const wrapper = document.createElement("div");
    wrapper.className = "demo-form";
    const select = document.createElement("select");
    select.className = "demo-select";
    select.id = id;
    select.innerHTML = `<option value="">${label}</option>` +
      options.map((option) => `<option value="${option}">${option}</option>`).join("");
    wrapper.appendChild(select);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return select;
  }

  function addCheckboxes(items, name) {
    const wrapper = document.createElement("div");
    wrapper.className = "demo-form";
    const list = document.createElement("div");
    list.className = "demo-checkboxes";

    items.forEach((item) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = name;
      checkbox.value = item;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(item));
      list.appendChild(label);
    });

    wrapper.appendChild(list);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return list;
  }

  function addButton(label, className = "btn btn--primary") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    messagesEl.appendChild(button);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return button;
  }

  function startDemo() {
    step = 1;
    clearMessages();

    addMessage("Hola, necesito un kinesiólogo\nEs para mi hijo, tiene bronquitis", "user");
    addBotMessage("Hola 👋\nGracias por escribir a ConectaProIA.\n\nEntiendo tu preocupación 💙\nPara ayudarte mejor, primero necesito saber tu ubicación.");

    setTimeout(() => {
      addBotMessage("👉 Selecciona tu región:");
      const select = addSelect(regions, "demoRegion", "Selecciona tu región");
      select.addEventListener("change", () => {
        if (!select.value || step !== 1) return;
        addMessage(select.value, "user");
        step = 2;
        addBotMessage("Gracias 👍\n👉 Ahora selecciona tu comuna:");
        const comunaSelect = addSelect(comunasBiobio, "demoComuna", "Selecciona tu comuna (Biobío)");
        comunaSelect.addEventListener("change", () => {
          if (!comunaSelect.value || step !== 2) return;
          addMessage(comunaSelect.value, "user");
          step = 3;
          addBotMessage("Perfecto, gracias por la información 😊\n\nPor lo que me comentas, podría ser necesaria la atención de un kinesiólogo respiratorio pediátrico, quien podrá evaluar a tu hijo y definir el tratamiento adecuado.");
          addBotMessage("Estoy revisando profesionales que:\n• Atiendan kinesiología respiratoria pediátrica\n• Tengan experiencia con niños\n• Atiendan en San Pedro de la Paz o alrededores\n\n⏳ Un momento, por favor…");

          setTimeout(() => {
            addBotMessage("Listo ✅\nEstos son profesionales que podrían ayudarte, según disponibilidad y experiencia en la zona:\n\n🫁 1. Kinesiólogo respiratorio pediátrico\n⭐ 4.8 / 5\nExperiencia en bronquitis y cuadros respiratorios infantiles\nAtención domiciliaria\nProfesional verificado\n\n🫁 2. Kinesióloga respiratoria\n⭐ 4.6 / 5\nAtención pediátrica\nExperiencia en manejo respiratorio infantil\nAtención particular\n\n🫁 3. Kine respiratorio integral (Kine 3)\n⭐ 4.4 / 5\nAtención a niños y adultos\nEvaluación respiratoria en domicilio\nExperiencia en cuadros agudos y seguimiento");

            addBotMessage("👉 Selecciona uno o más profesionales con los que te gustaría ser contactado:");
            const professionals = addCheckboxes(
              [
                "Kinesiólogo respiratorio pediátrico",
                "Kinesióloga respiratoria",
                "Kine respiratorio integral (Kine 3)"
              ],
              "demoPros"
            );

            addBotMessage("Antes de continuar, es importante que confirmes lo siguiente:\n\n🔹 Consentimiento de contacto\n(checkbox obligatorio)\n☐ Autorizo a ConectaProIA a compartir mis datos de contacto exclusivamente con los profesionales seleccionados, para que puedan comunicarse conmigo y coordinar la atención.");
            const consentList = addCheckboxes(
              [
                "Autorizo a ConectaProIA a compartir mis datos de contacto exclusivamente con los profesionales seleccionados."
              ],
              "demoConsent"
            );

            const confirmButton = addButton("Confirmar selección", "btn btn--primary");
            confirmButton.addEventListener("click", () => {
              if (step !== 3) return;
              const selectedPros = professionals.querySelectorAll("input:checked");
              const consent = consentList.querySelector("input:checked");
              if (selectedPros.length === 0 || !consent) {
                addMessage("Selecciona al menos un profesional y autoriza el contacto para continuar.", "system");
                return;
              }

              addMessage("☑ " + Array.from(selectedPros).map((el) => el.value).join("\n☑ ") + "\n☑ Autorizo el contacto", "user");
              step = 4;
              addBotMessage("Perfecto 👍\nGracias por tu confirmación.\n\n📨 Tu contacto ha sido entregado a los profesionales que seleccionaste, quienes podrán comunicarse contigo directamente para evaluar el caso y coordinar la atención.");
              addBotMessage("🔹 Recuerda:\nConectaProIA actúa como intermediario.\nLa evaluación clínica, indicaciones y tratamiento son responsabilidad exclusiva del profesional tratante.\nLos valores, horarios y modalidad de atención se acuerdan directamente con el kinesiólogo/a.");
              addBotMessage("Gracias por confiar en ConectaProIA 🤝\nSi necesitas apoyo con otro servicio en el futuro, puedes escribirnos cuando quieras.\n💙 Estaremos atentos por si necesitas algo más.");
            });
          }, 900);
        });
      });
    }, 600);
  }

  function resetDemo() {
    step = 0;
    clearMessages();
    addMessage("DEMO — Conversación ConectaProIA (kinesiología respiratoria pediátrica).", "system");
  }

  runButton.addEventListener("click", () => {
    if (step === 0) startDemo();
  });

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
