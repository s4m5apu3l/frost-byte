document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const inputDisplay = document.getElementById('inputDisplay');
    const normalContainer = document.getElementById('normalContainer');
    const terminalContainer = document.getElementById('terminalContainer');
    const modeToggle = document.getElementById('modeToggle');
    const toggleNormal = document.getElementById('toggleNormal');
    const toggleTerminal = document.getElementById('toggleTerminal');
    const weatherBadge = document.getElementById('weatherBadge');
    const copyToast = document.getElementById('copyToast');
    const detailModal = document.getElementById('detailModal');
    const modalLabel = document.getElementById('modalLabel');
    const modalTitle = document.getElementById('modalTitle');
    const modalLead = document.getElementById('modalLead');
    const modalList = document.getElementById('modalList');
    const modalCloseButton = document.getElementById('modalCloseButton');

    const capabilityInfo = {
        websites: {
            name: 'websites',
            label: 'Сайты',
            title: 'Веб-разработка',
            description: 'Собираем сайты под ключ: от дизайна до запуска и поддержки.',
            bullets: [
                'WordPress — блоги, корпоративные сайты, магазины на WooCommerce.',
                'Bitrix — корпоративные порталы, интернет-магазины, интеграции с 1C.',
                '1C-Битрикс — каталоги, CRM-формы, сложная бизнес-логика.',
                'Tilda — быстрые лендинги и сайты с нуля, без программирования.'
            ],
            terminal: 'WordPress / Bitrix / 1C / Tilda'
        },
        telegram: {
            name: 'telegram',
            label: 'Telegram',
            title: 'Telegram-боты',
            description: 'Автоматизируем коммуникацию и продажи через Telegram.',
            bullets: [
                'Боты для продаж, записи, доставки, опросов и поддержки.',
                'Интеграция с CRM, платёжными системами, Google-таблицами.',
                'Рассылки, сегментация аудитории, аналитика открытий и кликов.'
            ],
            terminal: 'bots / sales / support / delivery'
        },
        miniapps: {
            name: 'miniapps',
            label: 'Mini Apps',
            title: 'Telegram Mini Apps',
            description: 'Веб-приложения внутри Telegram — без установки и регистрации.',
            bullets: [
                'Каталоги товаров и услуг с корзиной и оплатой.',
                'Личные кабинеты, бронирование, доставка.',
                'Нативный UX: push-уведомления, геолокация, платёжки в один тап.'
            ],
            terminal: 'TMA / catalogs / booking / delivery'
        },
        automation: {
            name: 'automation',
            label: 'Автоматизация',
            title: 'Автоматизация и интеграции',
            description: 'Связываем сайт, CRM, Telegram и таблицы в единый контур.',
            bullets: [
                'Интеграция Bitrix, 1C, Google Sheets, AmoCRM, Telegram.',
                'Автоматические уведомления, напоминания, отчёты.',
                'Убираем дублирование данных и ручной перенос между системами.'
            ],
            terminal: 'integrations / CRM / workflows / sync'
        }
    };

    const capabilityAliases = {
        ai: 'automation',
        agents: 'automation',
        bot: 'telegram',
        bots: 'telegram',
        tma: 'miniapps',
        miniapp: 'miniapps',
        miniapps: 'miniapps',
        website: 'websites',
        websites: 'websites',
        web: 'websites',
        wordpress: 'websites',
        wp: 'websites',
        bitrix: 'websites',
        tilda: 'websites',
        platform: 'automation',
        platforms: 'automation',
        crm: 'automation',
        integration: 'automation',
        integrations: 'automation'
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let commandHistory = [];
    let historyIndex = -1;
    let isAnimating = false;
    let bootScrollLock = true;
    let scrollRaf = false;
    let cachedWeather = null;
    let weatherTimestamp = 0;
    const WEATHER_TTL = 30 * 60 * 1000;
    let normalAnimationsInitialized = false;
    let bootSequenceId = 0;
    let lastFocusedElement = null;
    let currentMode = localStorage.getItem('iindev-mode') || 'normal';
    let toastTimeoutId = null;

    function escapeHtml(value) {
        return String(value).replace(/[<>&"']/g, (char) => ({
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
    }

    function setModeClass(mode) {
        body.classList.remove('mode-normal', 'mode-terminal');
        body.classList.add(`mode-${mode}`);
        toggleNormal.setAttribute('aria-pressed', String(mode === 'normal'));
        toggleTerminal.setAttribute('aria-pressed', String(mode === 'terminal'));
        modeToggle.setAttribute('data-active-mode', mode);
    }

    setModeClass(currentMode);

    function resolveCapabilityKey(input) {
        if (!input) return null;
        const normalized = input.toLowerCase();
        return capabilityInfo[normalized] ? normalized : capabilityAliases[normalized] || null;
    }

    function showToast(text) {
        copyToast.textContent = text;
        copyToast.classList.add('show');
        window.clearTimeout(toastTimeoutId);
        toastTimeoutId = window.setTimeout(() => {
            copyToast.classList.remove('show');
        }, 2000);
    }

    async function copyText(text) {
        if (!navigator.clipboard?.writeText) return false;
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            return false;
        }
    }

    async function fetchWeather() {
        if (cachedWeather && (Date.now() - weatherTimestamp) < WEATHER_TTL) return cachedWeather;
        try {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=62.0355&longitude=129.6755&current_weather=true');
            const data = await response.json();
            cachedWeather = `${Math.round(data.current_weather.temperature)}°C`;
            weatherTimestamp = Date.now();
            return cachedWeather;
        } catch {
            cachedWeather = '—°C';
            weatherTimestamp = Date.now();
            return cachedWeather;
        }
    }

    fetchWeather().then((temp) => {
        weatherBadge.textContent = `Yakutsk ${temp}`;
    });

    document.querySelectorAll('.contact-value[data-copy]').forEach((element) => {
        element.addEventListener('click', async () => {
            const copied = await copyText(element.dataset.copy);
            if (copied) {
                showToast(`скопировано: ${element.dataset.copy}`);
            }
        });
    });

    document.querySelectorAll('.capability-card[data-capability]').forEach((card) => {
        card.addEventListener('click', () => {
            openCapabilityModal(card.dataset.capability);
        });
    });

    bindSpotlightEffect('.capability-card, .pressure-item');

    function bindSpotlightEffect(selector) {
        document.querySelectorAll(selector).forEach((element) => {
            const updateSpotlight = (event) => {
                const rect = element.getBoundingClientRect();
                element.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`);
                element.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`);
            };

            element.addEventListener('pointerenter', updateSpotlight);
            element.addEventListener('pointermove', updateSpotlight);
        });
    }

    function openCapabilityModal(key) {
        const capabilityKey = resolveCapabilityKey(key);
        if (!capabilityKey) return;

        const info = capabilityInfo[capabilityKey];
        lastFocusedElement = document.activeElement;
        modalLabel.textContent = `./${info.name}`;
        modalTitle.textContent = info.title;
        modalLead.textContent = info.description;
        modalList.innerHTML = info.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
        detailModal.classList.add('visible');
        modalCloseButton.focus();
    }

    function closeCapabilityModal() {
        if (!detailModal.classList.contains('visible')) return;
        detailModal.classList.remove('visible');
        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    modalCloseButton.addEventListener('click', closeCapabilityModal);

    detailModal.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab' || !detailModal.classList.contains('visible')) return;

        const focusable = detailModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeCapabilityModal();
        }
    });

    detailModal.addEventListener('click', (event) => {
        if (event.target === detailModal) {
            closeCapabilityModal();
        }
    });

    /* --- Contact Form --- */
    const contactForm = document.getElementById('contactForm');
    const projectTypeTags = document.getElementById('projectTypeTags');
    const projectTypeInput = document.getElementById('projectType');

    if (projectTypeTags) {
        projectTypeTags.querySelectorAll('.form-tag').forEach((tag) => {
            tag.addEventListener('click', () => {
                projectTypeTags.querySelectorAll('.form-tag').forEach((t) => t.classList.remove('active'));
                tag.classList.add('active');
                projectTypeInput.value = tag.dataset.value;
            });
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const type = projectTypeInput.value || 'не выбрано';
            const message = document.getElementById('contactMessage').value.trim();

            let text = `Заявка с сайта iindev\n\n`;
            text += `Имя: ${name}\n`;
            text += `Контакт: ${phone}\n`;
            text += `Тип проекта: ${type}\n`;
            if (message) {
                text += `\nО задаче:\n${message}`;
            }

            const tgUrl = `https://t.me/iindev?text=${encodeURIComponent(text)}`;
            window.open(tgUrl, '_blank');
            showToast('Откройте Telegram и отправьте сообщение');
        });
    }

    function resetTerminal() {
        terminalOutput.innerHTML = '';
        terminalInput.value = '';
        inputDisplay.textContent = '';
        terminalInput.disabled = false;
        commandHistory = [];
        historyIndex = -1;
        isAnimating = false;
        bootScrollLock = true;
    }

    function switchMode(mode) {
        if (mode === currentMode) return;

        bootSequenceId += 1;
        const outgoing = mode === 'normal' ? terminalContainer : normalContainer;
        const incoming = mode === 'normal' ? normalContainer : terminalContainer;

        const completeSwitch = () => {
            currentMode = mode;
            setModeClass(mode);
            localStorage.setItem('iindev-mode', mode);
            window.scrollTo(0, 0);

            outgoing.style.opacity = '';
            incoming.style.opacity = '';

            if (window.gsap && !prefersReducedMotion) {
                incoming.style.opacity = '0';
                gsap.fromTo(incoming, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power3.out' });
            }

            if (mode === 'normal') {
                initNormalAnimations();
                if (window.ScrollTrigger) {
                    window.setTimeout(() => ScrollTrigger.refresh(), 60);
                }
            } else {
                resetTerminal();
                bootSequence();
            }
        };

        if (window.gsap && !prefersReducedMotion) {
            gsap.to(outgoing, {
                opacity: 0,
                duration: 0.25,
                ease: 'power2.out',
                onComplete: completeSwitch
            });
        } else {
            outgoing.style.opacity = '';
            completeSwitch();
        }
    }

    toggleNormal.addEventListener('click', () => switchMode('normal'));
    toggleTerminal.addEventListener('click', () => switchMode('terminal'));

    function initNormalAnimations() {
        if (!window.gsap || prefersReducedMotion) {
            normalAnimationsInitialized = true;
            return;
        }
        if (window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }

        if (normalAnimationsInitialized) {
            return;
        }

        normalAnimationsInitialized = true;

        const heroTimeline = gsap.timeline();
        heroTimeline
            .from('.eyebrow', {
                y: 20,
                opacity: 0,
                filter: 'blur(6px)',
                duration: 0.7,
                ease: 'power3.out'
            })
            .from('.hero-title', {
                y: 50,
                opacity: 0,
                filter: 'blur(10px)',
                duration: 1.1,
                ease: 'power3.out'
            }, '-=0.45')
            .from('.hero-desc', {
                y: 24,
                opacity: 0,
                filter: 'blur(4px)',
                duration: 0.7,
                ease: 'power3.out'
            }, '-=0.6')
            .from('.hero-actions', {
                y: 26,
                opacity: 0,
                filter: 'blur(4px)',
                duration: 0.7,
                ease: 'power3.out'
            }, '-=0.5')
            .from('.hero-tags li', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out'
            }, '-=0.35')
            .from('.hero-panel', {
                y: 44,
                opacity: 0,
                filter: 'blur(8px)',
                duration: 0.95,
                ease: 'power3.out'
            }, '-=0.6');

        if (!window.ScrollTrigger) return;

        gsap.utils.toArray('.section-heading').forEach((section) => {
            gsap.from(section, {
                y: 30,
                opacity: 0,
                filter: 'blur(6px)',
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 84%',
                    once: true
                }
            });
        });

        gsap.from('.capability-card', {
            y: 36,
            opacity: 0,
            filter: 'blur(4px)',
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.capability-grid',
                start: 'top 82%',
                once: true
            }
        });

        gsap.from('.pressure-item', {
            y: 30,
            opacity: 0,
            filter: 'blur(4px)',
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.pressure-list',
                start: 'top 84%',
                once: true
            }
        });

        gsap.from('.workflow-manifesto', {
            y: 30,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.workflow-layout',
                start: 'top 82%',
                once: true
            }
        });

        gsap.from('.workflow-step', {
            y: 26,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.workflow-steps',
                start: 'top 82%',
                once: true
            }
        });

        gsap.from('.contact-form', {
            y: 30,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contact-layout',
                start: 'top 84%',
                once: true
            }
        });
    }

    terminalInput.addEventListener('input', () => {
        inputDisplay.textContent = terminalInput.value;
    });

    function addLine(content, className = '') {
        const line = document.createElement('div');
        line.className = className ? `terminal-line ${className}` : 'terminal-line';
        line.innerHTML = content;
        terminalOutput.appendChild(line);
        scrollToBottom();
        return line;
    }

    function scrollToBottom() {
        if (currentMode !== 'terminal' || bootScrollLock) return;
        if (scrollRaf) return;

        scrollRaf = true;
        requestAnimationFrame(() => {
            try {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            } finally {
                scrollRaf = false;
            }
        });
    }

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function isActiveBoot(sequenceId) {
        return sequenceId === bootSequenceId && currentMode === 'terminal';
    }

    async function typeCommand(command, speed = 32, sequenceId = bootSequenceId) {
        if (!isActiveBoot(sequenceId)) return;

        isAnimating = true;
        terminalInput.disabled = true;

        for (const char of command) {
            if (!isActiveBoot(sequenceId)) {
                terminalInput.disabled = false;
                isAnimating = false;
                return;
            }
            terminalInput.value += char;
            inputDisplay.textContent = terminalInput.value;
            await sleep(speed);
        }

        await sleep(180);
        if (!isActiveBoot(sequenceId)) {
            terminalInput.disabled = false;
            isAnimating = false;
            return;
        }

        await executeCommand(command, true);
        terminalInput.value = '';
        inputDisplay.textContent = '';
        terminalInput.disabled = false;
        isAnimating = false;
    }

    function renderCapabilitiesOutput() {
        addLine('<span class="output-muted">iindev:~/capabilities$ ls -la</span>');
        addLine('');

        Object.entries(capabilityInfo).forEach(([key, info]) => {
            const line = addLine(`<span class="service-item" data-capability="${key}"><span class="arrow">→</span> <span class="service-name">${key}/</span> <span class="output-muted">${escapeHtml(info.terminal)}</span></span>`);
            line.querySelector('.service-item')?.addEventListener('click', () => {
                openCapabilityModal(key);
            });
        });

        addLine('');
        addLine('<span class="output-muted">Type "open &lt;name&gt;" for details</span>');
    }

    function renderWhenOutput() {
        addLine('<span class="output-muted">Common entry points</span>');
        addLine('');
        addLine('<span class="output">01 → site is outdated or missing</span>');
        addLine('<span class="output">02 → leads get lost in chats</span>');
        addLine('<span class="output">03 → manual work eats team time</span>');
        addLine('<span class="output">04 → systems do not talk to each other</span>');
        addLine('<span class="output">05 → want a bot or Mini App but do not know where to start</span>');
    }

    const commands = {
        help: () => {
            addLine('<span class="output">Available commands:</span>');
            addLine('');
            addLine('<span class="help-line"><span class="help-cmd">help</span><span class="help-desc">show this help</span></span>');
            addLine('<span class="help-line"><span class="help-cmd">about</span><span class="help-desc">about iindev</span></span>');
            addLine('<span class="help-line"><span class="help-cmd">capabilities</span><span class="help-desc">list expertise areas</span></span>');
            addLine('<span class="help-line"><span class="help-cmd">open &lt;name&gt;</span><span class="help-desc">open capability details</span></span>');
            addLine('<span class="help-line"><span class="help-cmd">stack</span><span class="help-desc">show build stack</span></span>');
            addLine('<span class="help-line"><span class="help-cmd">process</span><span class="help-desc">show delivery model</span></span>');
            addLine('<span class="help-line"><span class="help-cmd">when</span><span class="help-desc">show common entry points</span></span>');
            addLine('<span class="help-line"><span class="help-cmd">contact</span><span class="help-desc">show contact info</span></span>');
            addLine('<span class="help-line"><span class="help-cmd">metrics</span><span class="help-desc">show studio profile</span></span>');
            addLine('<span class="help-line"><span class="help-cmd">weather</span><span class="help-desc">current Yakutsk weather</span></span>');
            addLine('<span class="help-line"><span class="help-cmd">clear</span><span class="help-desc">clear terminal</span></span>');
        },
        about: () => {
            addLine('<span class="brand-inline"><span style="color: #5eead4;">iind</span>ev.</span>');
            addLine('<span class="output-muted">Web development & automation studio</span>');
            addLine('');
            addLine('<span class="output">Веб-разработка: WordPress, Bitrix, 1C, Tilda.</span>');
            addLine('<span class="output">Telegram-боты, Mini Apps, CRM-интеграции.</span>');
            addLine('<span class="output">Автоматизация процессов и связка систем.</span>');
            addLine('<span class="output">Берём задачу целиком: от аудита до запуска.</span>');
        },
        capabilities: () => {
            renderCapabilitiesOutput();
        },
        expertise: () => {
            renderCapabilitiesOutput();
        },
        services: () => {
            addLine('<span class="output-muted">legacy alias → capabilities</span>');
            renderCapabilitiesOutput();
        },
        open: (args) => {
            const capabilityKey = resolveCapabilityKey(args[0]);
            if (capabilityKey) {
                openCapabilityModal(capabilityKey);
                addLine(`<span class="output-success">→ opened: ${escapeHtml(capabilityKey)}</span>`);
                return;
            }

            addLine(`<span class="output-error">capability not found: ${escapeHtml(args[0] || '(none)')}</span>`);
            addLine(`<span class="output-muted">Available: ${Object.keys(capabilityInfo).join(', ')}</span>`);
        },
        stack: () => {
            addLine('<span class="output-muted">iindev:~/stack$ cat profile.txt</span>');
            addLine('');
            addLine('<span class="output">web        :: WordPress / Bitrix / 1C / Tilda</span>');
            addLine('<span class="output">bots       :: Python / Node.js / Aiogram / Telegraf</span>');
            addLine('<span class="output">mini apps  :: React / Vue / Vanilla JS + TMA SDK</span>');
            addLine('<span class="output">automation :: Zapier / Make / custom API / webhooks</span>');
            addLine('<span class="output">crm        :: Bitrix24 / AmoCRM / Google Sheets</span>');
        },
        process: () => {
            addLine('<span class="output-muted">iindev:~/process$ ./delivery-model</span>');
            addLine('');
            addLine('<span class="output">01 → audit current processes and bottlenecks</span>');
            addLine('<span class="output">02 → design architecture and pick the stack</span>');
            addLine('<span class="output">03 → develop, integrate, test</span>');
            addLine('<span class="output">04 → launch, train, maintain</span>');
        },
        when: () => {
            renderWhenOutput();
        },
        pain: () => {
            renderWhenOutput();
        },
        contact: () => {
            addLine('<span class="output-muted">iindev:~/contact$ cat info.txt</span>');
            addLine('');
            const telegramLine = addLine('<span class="contact-item" data-copy="@iindev"><span class="contact-label-terminal">telegram:</span> <span class="contact-value-terminal">@iindev</span></span>');
            const emailLine = addLine('<span class="contact-item" data-copy="iindev@tuta.io"><span class="contact-label-terminal">email:</span> <span class="contact-value-terminal">iindev@tuta.io</span></span>');
            addLine('');
            addLine('<span class="output-muted">Telegram responds fastest.</span>');

            [telegramLine, emailLine].forEach((line) => {
                const item = line.querySelector('.contact-item');
                if (!item) return;

                item.addEventListener('click', async () => {
                    const text = item.dataset.copy;
                    const copied = await copyText(text);
                    if (copied) {
                        addLine(`<span class="output-success">→ copied: ${escapeHtml(text)}</span>`);
                    } else {
                        addLine('<span class="output-error">→ copy failed</span>');
                    }
                });
            });
        },
        metrics: () => {
            addLine('<span class="output-muted">Studio profile</span>');
            addLine('');
            addLine('<span class="metric-line"><span class="metric-label">mode</span><span class="metric-bar-text">audit → design → build → launch</span></span>');
            addLine('<span class="metric-line"><span class="metric-label">focus</span><span class="metric-bar-text">websites / bots / mini apps / automation</span></span>');
            addLine('<span class="metric-line"><span class="metric-label">stack</span><span class="metric-bar-text">WordPress / Bitrix / Telegram / TMA</span></span>');
            addLine('<span class="metric-line"><span class="metric-label">style</span><span class="metric-bar-text">clean code / working systems / no fluff</span></span>');
        },
        weather: async () => {
            addLine('<span class="output-muted">Fetching Yakutsk weather...</span>');
            const temp = await fetchWeather();
            addLine(`<span class="output">→ YAKUTSK ${escapeHtml(temp)}</span>`);
        },
        clear: () => {
            terminalOutput.innerHTML = '';
        }
    };

    async function executeCommand(input, isAuto = false) {
        const raw = input.trim();
        const parts = raw.split(/\s+/);
        const cmd = (parts[0] || '').toLowerCase();
        const args = parts.slice(1);

        if (!isAuto && raw) {
            addLine(`<span class="prompt">operator@iindev:~$</span> <span class="command">${escapeHtml(raw)}</span>`);
            commandHistory.push(raw);
            historyIndex = commandHistory.length;
        }

        if (!cmd) return;

        const handler = commands[cmd];
        if (handler) {
            await handler(args);
        } else {
            addLine(`<span class="output-error">command not found: ${escapeHtml(cmd)}</span>`);
            addLine('<span class="output-muted">Type "help" for available commands</span>');
        }

        scrollToBottom();
    }

    terminalInput.addEventListener('keydown', async (event) => {
        if (isAnimating) {
            event.preventDefault();
            return;
        }

        if (event.key === 'Enter') {
            const value = terminalInput.value.trim();
            terminalInput.value = '';
            inputDisplay.textContent = '';
            if (value) {
                await executeCommand(value);
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (historyIndex > 0) {
                historyIndex -= 1;
                terminalInput.value = commandHistory[historyIndex];
                inputDisplay.textContent = terminalInput.value;
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex += 1;
                terminalInput.value = commandHistory[historyIndex];
                inputDisplay.textContent = terminalInput.value;
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
                inputDisplay.textContent = '';
            }
        }
    });

    document.addEventListener('click', (event) => {
        if (
            currentMode === 'terminal' &&
            !event.target.closest('.detail-modal') &&
            !event.target.closest('.nav-toggle') &&
            !event.target.closest('.toggle-option') &&
            !isAnimating
        ) {
            terminalInput.focus();
        }
    });

    async function bootSequence() {
        const sequenceId = ++bootSequenceId;
        bootScrollLock = true;
        window.scrollTo(0, 0);

        const typeSpeed = prefersReducedMotion ? 0 : 28;
        const shortDelay = prefersReducedMotion ? 0 : 220;
        const medDelay = prefersReducedMotion ? 0 : 280;
        const longDelay = prefersReducedMotion ? 0 : 620;
        const cmdDelay = prefersReducedMotion ? 0 : 360;
        const cmdSpeed = prefersReducedMotion ? 0 : 24;

        await sleep(shortDelay);
        if (!isActiveBoot(sequenceId)) return;

        addLine('<span class="output-muted">iindev:~$ ./boot --studio</span>');
        await sleep(medDelay);
        if (!isActiveBoot(sequenceId)) return;

        const weatherLine = addLine('<span class="output">→ YAKUTSK <span class="temp-loader"><span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span></span></span>');
        fetchWeather().then((temp) => {
            if (isActiveBoot(sequenceId)) {
                weatherLine.innerHTML = `<span class="output">→ YAKUTSK ${escapeHtml(temp)}</span>`;
            }
        });

        await sleep(longDelay);
        if (!isActiveBoot(sequenceId)) return;

        addLine('<span class="output-success">→ system ready</span>');
        addLine('');
        await sleep(prefersReducedMotion ? 0 : 240);
        if (!isActiveBoot(sequenceId)) return;

        await typeCommand('about', typeSpeed, sequenceId);
        if (!isActiveBoot(sequenceId)) return;

        await sleep(cmdDelay);
        addLine('');
        await typeCommand('capabilities', cmdSpeed, sequenceId);
        if (!isActiveBoot(sequenceId)) return;

        await sleep(cmdDelay);
        addLine('');
        await typeCommand('contact', cmdSpeed, sequenceId);
        if (!isActiveBoot(sequenceId)) return;

        await sleep(shortDelay);
        addLine('');
        addLine('<span class="output-muted">Type "help" for available commands</span>');
        addLine('');

        bootScrollLock = false;
        terminalInput.focus();
        scrollToBottom();
    }

    if (currentMode === 'normal') {
        initNormalAnimations();
    } else {
        resetTerminal();
        bootSequence();
    }
});
