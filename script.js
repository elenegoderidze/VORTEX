/**
 * VORTEX // Dynamic Engine Client Logic
 * Modern, dependency-free JavaScript providing interactive canvas,
 * 3D card tilt, live sandbox emulator, stat counters, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initDynamicHeadline();
  initHeroSandbox();
  initCardSpotlights();
  initTiltEffects();
  initStatCounters();
  initWorkflowStepper();
  initAccordion();
  initScrollSpy();
  initConnectForm();
  initModal();
  initChannelClicks();
  setCurrentYear();
});

/* =========================================================
   1. HERO INTERACTIVE PARTICLE CANVAS
   ========================================================= */
function initParticleCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let mouse = { x: null, y: null, radius: 140 };

  const particles = [];
  const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 85;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
      this.alpha = this.baseAlpha;
      this.color = Math.random() > 0.6 ? '#00f0ff' : (Math.random() > 0.5 ? '#8b5cf6' : '#38bdf8');
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction (repel gently)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * force * 3;
          this.y += Math.sin(angle) * force * 3;
          this.alpha = Math.min(1, this.baseAlpha + 0.4);
        } else {
          this.alpha = this.baseAlpha;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const lineAlpha = (1 - dist / 120) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#00f0ff';
          ctx.globalAlpha = lineAlpha;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationFrameId = requestAnimationFrame(render);
  }

  render();
}

/* =========================================================
   2. DYNAMIC HEADLINE CYCLER
   ========================================================= */
function initDynamicHeadline() {
  const headlineEl = document.getElementById('dynamic-headline');
  if (!headlineEl) return;

  const phrases = [
    'Autonomous Intelligence',
    'Multi-Agent Swarms',
    'Self-Healing Pipelines',
    'Real-Time Cognitive Meshes'
  ];

  let currentIndex = 0;

  setInterval(() => {
    headlineEl.style.opacity = '0';
    headlineEl.style.transform = 'translateY(8px)';
    headlineEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      headlineEl.textContent = phrases[currentIndex];
      headlineEl.style.opacity = '1';
      headlineEl.style.transform = 'translateY(0)';
    }, 380);
  }, 3600);
}

/* =========================================================
   3. HERO LIVE INTERACTIVE ENGINE / SANDBOX
   ========================================================= */
const sandboxModes = {
  agents: {
    title: 'vortex-core // swarm-session-9804.active',
    latency: '6.82',
    concurrency: '1,480',
    model: 'VORTEX-Quantum-MoE-8x22B',
    nodes: [
      { name: 'Architect_Prime', role: 'Task Planner & Decoupler', active: true },
      { name: 'Synapse_Synthesizer', role: 'Rust & WebAssembly Core', active: true },
      { name: 'Sentinel_Auditor', role: 'Self-Verification & Security', active: true }
    ],
    logs: [
      { time: '14:20:01.004', tag: 'INIT', color: 'cyan', text: 'Spawning DAG swarm topology with 3 autonomous agents...' },
      { time: '14:20:01.012', tag: 'PLAN', color: 'purple', text: '<span class="token-highlight">Architect_Prime</span> decomposed objective into 4 parallel work trees.' },
      { time: '14:20:01.034', tag: 'EXEC', color: 'cyan', text: 'Synapse_Synthesizer generating zero-copy vector index in compiled Rust.' },
      { time: '14:20:01.058', tag: 'AUDIT', color: 'green', text: 'Sentinel_Auditor verified AST integrity: 0 vulnerabilities found.' },
      { time: '14:20:01.072', tag: 'SYNC', color: 'green', text: 'Multi-agent consensus achieved in 68ms. Ready for dispatch.' }
    ]
  },
  streaming: {
    title: 'vortex-core // neural-stream-ultra.p99',
    latency: '3.41',
    concurrency: '4,920',
    model: 'VORTEX-Flash-Edge-v4',
    nodes: [
      { name: 'Edge_Router_Tokyo', role: 'Anycast Ingestion Gateway', active: true },
      { name: 'Quant_Worker_01', role: '4-bit Tensor Kernel Engine', active: true },
      { name: 'Packet_Streamer', role: 'QUIC Framer & Diff Transmitter', active: true }
    ],
    logs: [
      { time: '14:20:15.110', tag: 'QUIC', color: 'cyan', text: 'Established Zero-RTT handshake via TLS 1.3 Anycast Edge.' },
      { time: '14:20:15.113', tag: 'STREAM', color: 'purple', text: 'First token emitted at <span class="token-highlight">3.41ms</span> (Sub-frame baseline).' },
      { time: '14:20:15.122', tag: 'THROUGH', color: 'green', text: 'Sustained throughput: 382 tokens/sec across HTTP/3 frame.' },
      { time: '14:20:15.138', tag: 'JITTER', color: 'cyan', text: 'Network packet jitter measured: 0.12ms. Buffer nominal.' }
    ]
  },
  multimodal: {
    title: 'vortex-core // spatial-fusion-runtime',
    latency: '8.19',
    concurrency: '890',
    model: 'VORTEX-Omni-Unified-v2',
    nodes: [
      { name: 'Vision_Encoder', role: 'Spatial Embedding Extractor', active: true },
      { name: 'AST_Parser', role: 'Component Layout Vectorizer', active: true },
      { name: 'Audio_Synthesizer', role: 'Real-time Phoneme Processor', active: true }
    ],
    logs: [
      { time: '14:20:30.402', tag: 'INGEST', color: 'purple', text: 'Receiving simultaneous Figma vector frames + spoken audio stream.' },
      { time: '14:20:30.428', tag: 'FUSION', color: 'cyan', text: 'Multimodal cross-attention matrix unified in 4096-dim latent space.' },
      { time: '14:20:30.461', tag: 'RENDER', color: 'green', text: 'Synthesized accessible HTML/CSS components with zero visual deviation.' },
      { time: '14:20:30.480', tag: 'SUCCESS', color: 'green', text: 'Interactive code bundle ready: 100% test coverage.' }
    ]
  }
};

function initHeroSandbox() {
  const tabs = document.querySelectorAll('.sandbox-tab');
  const feed = document.getElementById('terminal-feed');
  const latencyEl = document.getElementById('tele-latency');
  const concurrencyEl = document.getElementById('tele-concurrency');
  const nodeList = document.getElementById('sandbox-node-list');
  const customInput = document.getElementById('sandbox-custom-input');
  const runBtn = document.getElementById('sandbox-run-btn');
  const sparkBars = document.querySelectorAll('.spark-bar');

  if (!feed) return;

  function loadMode(modeKey) {
    const data = sandboxModes[modeKey];
    if (!data) return;

    // Render Nodes
    if (nodeList) {
      nodeList.innerHTML = data.nodes.map(n => `
        <li class="node-item ${n.active ? 'active' : ''}">
          <span class="node-status-dot"></span>
          <div class="node-info">
            <span class="node-name">${n.name}</span>
            <span class="node-role">${n.role}</span>
          </div>
        </li>
      `).join('');
    }

    // Render Stats
    if (latencyEl) latencyEl.innerHTML = `${data.latency} <span class="unit">ms</span>`;
    if (concurrencyEl) concurrencyEl.innerHTML = `${data.concurrency} <span class="unit">req/s</span>`;

    // Randomize sparkline bars for vitality
    sparkBars.forEach(bar => {
      const randomH = Math.floor(Math.random() * 65 + 25);
      bar.style.height = `${randomH}%`;
    });

    // Render Terminal logs
    feed.innerHTML = '';
    data.logs.forEach((log, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `
          <span class="term-time">[${log.time}]</span>
          <span class="term-tag ${log.color}">${log.tag}</span>
          <span class="term-text">${log.text}</span>
        `;
        feed.appendChild(line);
        feed.scrollTop = feed.scrollHeight;
      }, index * 80);
    });
  }

  // Handle Tab Switch
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const mode = tab.dataset.mode;
      loadMode(mode);
    });
  });

  // Handle Interactive User Execution
  function executeCustomPrompt() {
    const promptText = customInput.value.trim();
    if (!promptText) return;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

    // Add User prompt line
    const userLine = document.createElement('div');
    userLine.className = 'terminal-line';
    userLine.innerHTML = `
      <span class="term-time">[${timeStr}]</span>
      <span class="term-tag cyan">USER</span>
      <span class="term-text"><em>&gt; ${escapeHtml(promptText)}</em></span>
    `;
    feed.appendChild(userLine);
    customInput.value = '';
    feed.scrollTop = feed.scrollHeight;

    // Simulate Agent Swarm Response
    setTimeout(() => {
      const resp1 = document.createElement('div');
      resp1.className = 'terminal-line';
      resp1.innerHTML = `
        <span class="term-time">[${timeStr}]</span>
        <span class="term-tag purple">COGNITIVE</span>
        <span class="term-text">Synthesizing execution plan for <strong>"${escapeHtml(promptText.slice(0, 32))}..."</strong></span>
      `;
      feed.appendChild(resp1);
      feed.scrollTop = feed.scrollHeight;
    }, 280);

    setTimeout(() => {
      const resp2 = document.createElement('div');
      resp2.className = 'terminal-line';
      resp2.innerHTML = `
        <span class="term-time">[${timeStr}]</span>
        <span class="term-tag green">SUCCESS</span>
        <span class="term-text">Autonomous pipeline deployed across 320 Anycast edge nodes in <span class="token-highlight">4.8ms</span>.</span>
      `;
      feed.appendChild(resp2);
      feed.scrollTop = feed.scrollHeight;
      showToast('⚡ Instruction successfully compiled & verified!');
    }, 700);
  }

  if (runBtn) {
    runBtn.addEventListener('click', executeCustomPrompt);
  }

  if (customInput) {
    customInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeCustomPrompt();
      }
    });
  }

  // Initial load
  loadMode('agents');
}

/* =========================================================
   4. SPOTLIGHT GLOW ON HOVER (BENTO & CARDS)
   ========================================================= */
function initCardSpotlights() {
  const cards = document.querySelectorAll('[data-glow]');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* =========================================================
   5. 3D TILT EFFECT ON CARDS
   ========================================================= */
function initTiltEffects() {
  const tiltContainer = document.querySelector('[data-tilt-container]');
  const tiltCard = document.getElementById('interactive-card');

  if (!tiltContainer || !tiltCard || window.innerWidth < 1024) return;

  tiltContainer.addEventListener('mousemove', (e) => {
    const rect = tiltContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    tiltCard.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  tiltContainer.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

/* =========================================================
   6. STAT COUNTERS (INTERSECTION OBSERVER)
   ========================================================= */
function initStatCounters() {
  const counters = document.querySelectorAll('.telemetry-value');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.dataset.target);
          const suffix = counter.dataset.suffix || '';
          const isDecimal = target % 1 !== 0;
          const duration = 1800;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            if (isDecimal) {
              counter.textContent = currentVal.toFixed(target > 10 ? 2 : 1) + suffix;
            } else {
              counter.textContent = Math.floor(currentVal) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const container = document.querySelector('.hero-telemetry-row');
  if (container) observer.observe(container);
}

/* =========================================================
   7. WORKFLOW STEPPER INTERACTIVITY
   ========================================================= */
function initWorkflowStepper() {
  const stepCards = document.querySelectorAll('.step-card');
  stepCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* =========================================================
   8. FAQ ACCORDION
   ========================================================= */
function initAccordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items for clean accordion behavior
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.accordion-content').style.maxHeight = null;
        }
      });

      if (isExpanded) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* =========================================================
   9. SCROLL SPY & STICKY NAVBAR
   ========================================================= */
function initScrollSpy() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll listener
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header styling
    if (scrollPos > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy active class
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* =========================================================
   10. CONNECT FORM VALIDATION & INTERACTIVE SUBMISSION
   ========================================================= */
function initConnectForm() {
  const form = document.getElementById('connect-form');
  if (!form) return;

  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const submitBtn = document.getElementById('submit-btn');
  const feedback = document.getElementById('form-feedback');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      nameInput.closest('.form-group').classList.remove('has-error');
    }

    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
      emailInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      emailInput.closest('.form-group').classList.remove('has-error');
    }

    if (!isValid) return;

    // Simulated Loading State
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
      <span>Deploying Priority Link...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
      form.reset();

      feedback.className = 'form-feedback success';
      feedback.textContent = `🚀 Priority access confirmed! An engineering key and onboarding bundle have been queued for ${emailInput.value || 'your team'}.`;

      showToast('🎉 Connection request received! Check your inbox.');
    }, 1200);
  });
}

/* =========================================================
   11. INTERACTIVE MODAL DEMO
   ========================================================= */
function initModal() {
  const modal = document.getElementById('demo-modal');
  const openBtn = document.querySelector('.hero-demo-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  function openModal() {
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });
}

/* =========================================================
   12. CHANNEL CLICK HANDLERS & TOAST NOTIFICATION
   ========================================================= */
function initChannelClicks() {
  const discordBtn = document.getElementById('btn-discord-hub');
  const githubBtn = document.getElementById('btn-github-hub');

  if (discordBtn) {
    discordBtn.addEventListener('click', () => {
      showToast('💬 Redirecting to VORTEX Developer Discord (4,820 online)...');
    });
  }

  if (githubBtn) {
    githubBtn.addEventListener('click', () => {
      showToast('⭐ Opening VORTEX Rust Open Core repo (18.4k stars)...');
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="live-dot"></span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.35s ease';
    setTimeout(() => toast.remove(), 350);
  }, 3800);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

function setCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
