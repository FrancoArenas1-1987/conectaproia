(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const messagesEl = document.getElementById("demoChatMessages");
  const inputEl = document.getElementById("demoInput");
  const runButton = document.querySelector(".demo-run");
  const chips = document.querySelectorAll(".demo-chip");
  const intentEl = document.getElementById("demoIntent");
  const confidenceFill = document.getElementById("demoConfidenceFill");
  const confidenceLabel = document.getElementById("demoConfidenceLabel");
  const cardsEl = document.getElementById("demoCards");
  const revealEl = document.querySelector(".reveal");

  if (!messagesEl || !inputEl || !runButton || !intentEl || !confidenceFill || !confidenceLabel || !cardsEl) {
    return;
  }

  const examples = [
    "Se me cortó la luz, necesito electricista hoy.",
    "Necesito un kinesiólogo a domicilio para mi mamá.",
    "Busco técnico para revisar mi notebook."
  ];

  const intents = [
    {
      keywords: ["luz", "electricista", "cortó", "corte", "enchufe"],
      label: "Electricidad domiciliaria (probable)",
      confidence: 78,
      cards: ["Profesional verificado", "Disponible hoy", "Zona Biobío"]
    },
    {
      keywords: ["kines", "kinesiologo", "salud", "terapia", "medico"],
      label: "Salud y bienestar (probable)",
      confidence: 72,
      cards: ["Profesional verificado", "Atención domiciliaria", "Agenda disponible"]
    },
    {
      keywords: ["notebook", "pc", "computador", "técnico", "tecnico"],
      label: "Soporte técnico (probable)",
      confidence: 68,
      cards: ["Diagnóstico inicial", "Soporte en terreno", "Zona Biobío"]
    },
    {
      keywords: ["abogado", "legal", "contrato", "demanda"],
      label: "Orientación legal (probable)",
      confidence: 64,
      cards: ["Orientación inicial", "Profesional verificado", "Atención agendada"]
    },
    {
      keywords: ["gasfiter", "agua", "fuga", "llave"],
      label: "Gasfitería (probable)",
      confidence: 70,
      cards: ["Profesional verificado", "Disponible hoy", "Zona Biobío"]
    }
  ];

  function detectIntent(text) {
    const lower = text.toLowerCase();
    const match = intents.find((intent) => intent.keywords.some((word) => lower.includes(word)));
    return (
      match || {
        label: "Servicios generales (probable)",
        confidence: 55,
        cards: ["Profesional verificado", "Respuesta en horario de piloto", "Zona Biobío"]
      }
    );
  }

  function renderResults(result) {
    intentEl.textContent = result.label;
    confidenceFill.style.width = `${result.confidence}%`;
    confidenceLabel.textContent = `Coincidencia probable: ${result.confidence}%`;

    cardsEl.innerHTML = "";
    result.cards.forEach((card) => {
      const div = document.createElement("div");
      div.className = "mini-card";
      div.textContent = card;
      cardsEl.appendChild(div);
    });
  }

  function addMessage(text, type) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble chat-bubble--${type}`;
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function simulateBotReply(text) {
    const response = "Gracias, recibimos tu solicitud. Te compartiremos opciones confiables.";
    if (prefersReducedMotion) {
      addMessage(response, "bot");
      return;
    }

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble chat-bubble--bot";
    bubble.textContent = "";
    messagesEl.appendChild(bubble);

    let index = 0;
    const interval = window.setInterval(() => {
      bubble.textContent += response[index];
      index += 1;
      messagesEl.scrollTop = messagesEl.scrollHeight;
      if (index >= response.length) {
        window.clearInterval(interval);
      }
    }, 18);
  }

  function runDemo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    messagesEl.innerHTML = "";
    addMessage(trimmed, "user");
    simulateBotReply(trimmed);

    const result = detectIntent(trimmed);
    renderResults(result);
  }

  chips.forEach((chip, index) => {
    chip.addEventListener("click", () => {
      const text = chip.getAttribute("data-demo-text") || examples[index];
      runDemo(text);
    });
  });

  runButton.addEventListener("click", () => {
    runDemo(inputEl.value);
  });

  inputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runDemo(inputEl.value);
    }
  });

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
