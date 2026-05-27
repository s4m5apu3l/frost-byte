/* ===== GSAP REGISTER ===== */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ===== CONFIG =====
const coreTemplates = [
	{
		id: "bitrix",
		num: "01",
		category: "WEBSITES & B2B",
		title: "Корпоративные порталы и веб-системы",
		desc: "Высокопроизводительные сайты на Next.js или кастомизированные платформы на 1С-Битрикс. Чистый, индексируемый, быстрый код.",
		tech: "Next.js 15 / 1С-Битрикс / Tailwind",
		baseVal: 85000,
		speed: "0.3s",
		architecture: "ISR (Incremental Static Regeneration)",
	},
	{
		id: "tma",
		num: "02",
		category: "TELEGRAM MINI APPS",
		title: "Нативные приложения внутри Telegram",
		desc: "Запуск крипто-игр, личных кабинетов или полноценных магазинов прямо в чате без установки внешних приложений.",
		tech: "Telegram TMA SDK / React / Tailwind",
		baseVal: 55000,
		speed: "0.1s",
		architecture: "Single Page App Hosted on CDN",
	},
	{
		id: "sync",
		num: "03",
		category: "INTEGRATIONS & CRM",
		title: "Синхронизация баз данных и CRM-систем",
		desc: "Надежные и безопасные интеграционные мосты между AmoCRM, Битрикс24, базой 1С (ERP) и вашим сайтом в реальном времени.",
		tech: "REST API / Webhooks / Node ERP",
		baseVal: 40000,
		speed: "Real-time",
		architecture: "Event-driven Webhook Consumer",
	},
	{
		id: "bot",
		num: "04",
		category: "AUTOMATION & BOTS",
		title: "Автоматические боты-ассистенты",
		desc: "Исключают ручной труд: автоприем оплат (СБП/фискализация), распределение заявок менеджерам, инлайн-поддержка 24/7.",
		tech: "Python / Node.js / Serverless",
		baseVal: 30000,
		speed: "0.05s",
		architecture: "Websocket & Webhook Polling",
	},
];

const calcFeatures = [
	{
		id: "1c",
		title: "1С-Синхронизация ERP",
		desc: "Автообмен прайсами и базой.",
	},
	{
		id: "pay",
		title: "Фискализация и Оплата",
		desc: "Авто-чеки, СПБ, Сбер эквайринг.",
	},
	{
		id: "fast",
		title: "Next.js Ultra CDN Speed",
		desc: "Кеширование за 0.1с по миру.",
	},
];

function getSatiricalComment(value) {
	if (value < 1500)
		return {
			title: "Студенческий микро-донат",
			desc: "Хватит на порцию шаурмы и банку колы для программиста. Код будет собран с любовью, но возможно, с якутским акцентом и парой смешных комментариев в исходниках.",
		};
	if (value < 5000)
		return {
			title: "Стейк-брифинг",
			desc: "Отличный классический донат! Наш архитектор сможет позволить себе стейк из оленины. Команда приступает к деплою с повышенным уровнем серотонина.",
		};
	if (value < 15000)
		return {
			title: "Настоящий Бизнес-Донат",
			desc: "Прагматичный вклад. Мы полностью упакуем систему под ваши требования, настроим интеграции и не будем спрашивать глупых вопросов про 'целевую аудиторию'.",
		};
	if (value < 35000)
		return {
			title: "'Почти как у душного агентства'",
			desc: "Вы платите цену, сопоставимую с рыночным шаблоном, но получаете чистейший реактивный Next.js 15 без агентского пафоса, бесконечных созвонов в Зуме и ТЗ на 100 страниц.",
		};
	return {
		title: "VIP Меценат Сатиры",
		desc: "Вы официально спонсируете борьбу с оверпрайс-айтишниками! Мы добавим ваше имя в секретный футер манифеста, сделаем вам идеальный продукт и предоставим вечную пожизненную благодарность.",
	};
}

const ASCII_ART = `::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::++=*%%%%###**+*###***+--:::::::-+%%%%%%=:::::::::::::::::::::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::---===+=****%##%%%%%%%%%%%%%%%%%%%#**+-:::-::#%%%%%%#-:::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-+###*%%#*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#+=::::-::%%%%%%%=::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::=**%%%%%%##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%**=-::::++#%%%%%%+::::::::::-::::::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::+###%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#**+-:::::%%%%%%%%+----::::----::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::=*##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%**==::::=*%%%%%%%%=-:::::-::::::::
%%##*+=::::::::::::::::::::::::::::::::::::::::::::::-=+*##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#*+=-::::::-%%%%%%%+------:::-:---:
++*###%%%%*=:::::::::::::::::::::::::::::::::::::::::==+*##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#*=--::::::::%%%%%%+------::------:
-----=+*%%%%%#+-::::::::::::::::::::::::::::::::::::-=++*##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#*+::::::::::+%%%%%=-----------::::
::::::::-==*#%%%%%%%%%%=::::::::::::::::::::::::::::-=+*#####%#%%%%%%%##%%##%#%%%%%%%%%%%%%%%%%%%%%%%##+-:::::::+%%%%%*-----------:-:::
:::::::::::---+#%%%%%%%%%+:::::::::::::::::::::::::-=++****##*#**%%%%%#%%%%#%%%%%%##%##%%%%%%%%%%%%%%%%#+-:::::::=*%%+-------------:--:
::::::::::-::::::=#%%%%%%%=::::::::::::::::::::::::-+*#*########**%%%%%%%%%%%#%%%#%%%####%%%%%%%%%%%%%%%*+::::::::-#-=-::--:--------:::
:::::::::::::::::::-=*****=::::::::::::::::::::::::=*%#***=+*######%%%%%%%%%########%%%%%%%%%%%%%%%%%%%%%#+=-::::-=-==::---:--------:::
::::::::::::::::::::::--++=:::::::::::::::::::::::-++++++==++**#***#%%%%%%%%%%#*##%%%%%%%%%%%%%%%%%%%%%%%%#*+-:::::=*=-----------------
::::::::::::::::::-:::--:-===-::::::::::::::::::::=***+++++*++++++**##%%#%######%%%%%%%%%%%%%%%%%%%%%%%%%%%%#+-::::::::-:--------------
:::::::::::::::::::-----:::-===-:::::::::::::::::-+*****+*####*++==++*###%#####%%%%%%%%%%%%%%%%##%%%%%%%%%%%%#=-::::::-----------------
:::::::::::::::::::::::-::::--=+==--:::::::::::::=++###%%%%%%%%%#+=-=+*#%###########%%%%%%%%%%%%%%%%%%%%%%%%%#+=::::-----=------:::::::
::::::::::::::::::::::::::::::::=++*+-::::::::::==*++*%%%%%%%%%%%%+=-+*%%%%%##**++++++***##%%%%%%%%%%%%%%%%%%%#*-:-=%%#-----:::::::::::
::::::::::::::::::::::::::::::::::-==-:-::::::::==+=+*#%%%%%%%%%%%#+++#%%%%%%%++=-::::::::::-**%%%%%%%%%%%%%%%%%#=##+%%-:::::::::::::::
:::::::::::::::::::::::::::::::::::-=+==::::::::+===-++*#*##+==++*#%%*#%%%%%%%%#=---=::-=*%%%%%%%%%%%%%%%%%%%%%%%%%++*%+:::::---=======
:::::::::::::::::::::::::::::::::::::-===-:::::-+**+-==-::::::::--%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#%###%#+==============
:::::::::::::::::::::::::::::::::::::::-=++=:::-*#%#--:::--+*#%%%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#++++++++++++===
:::::::::::::::::::::::::::::::::::::::::--=-::=*%%#%*#%%%%%%%%%%%%#%%%%%%%%%%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%####%%%%*+***++++++=+++
:::::::::::::::::::::::::::::::::::::::::::----=#%#%%%#%%%%%%%%%%%*#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%***#%%%%%*+++***++++++++
::::::::::::::::::::::::::::::::::::::::::::::--**#%%%%%%%=%%%%%%%%#%%%%%%%%%%%%%%%%%%%#%%%%%%%%%%%%%%%%%%%%%%%#+*#%%%%#*+*+++*++++++++
:::::::::::::::::::::::::::::::::::::::::::::::+***#%%%%%%%%%%%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%##%%%%%#*+++++**++++===
:::::::::::::::::::::::::::::::::::::::::::::::=*####%%%%%%%%%%%#**%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*++++++++==---==
:::::::::::::::::::::::::::::::::::::::::::::::-=**##%%%%%%%%%%*=**%%%%%%%%%%%%%%#*###%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%++++++++++++++++
::::::::::::::::::::::::::::::::::::::::::::::::=+*##%%%%%%%%%*+%*#%%%%%%%%%%%%%%#+-=+#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*******#####****
::::::::::::::::::::::::::::::::::::::::::::::::-+*###%%%%%%#+-##+##%#%%%%#%%%%%%**--==*#*##%%%%%%%%%%%%%%%%%%%%%%%%%%#%#########******
:::::::::::::::::::::::::::::::::::::::+-::::-----+*##%###*+=--++-=*****##******++=#=--=+*#####%%%%%%%%%%%%%%%%%%%%%%###########*##****
::::::::::::::::::::::::::::::::::::::-+:-:-----::++**#*#*+===%--:--+-=-===:::::--%%%+--==+**##%#%%%%%%%%%%%%%%%%%%%##%%#%#%%#%%##*****
::::::::::::::::::::::::::::::::::::-:::-:----:::--=++*****+=%#--:::::-:::::---%%%%%%%%--=++***#%%%%%%%%%%%%%%%%%%%#%%####*+=*****#****
:::::::::::::::::::::::::::::::::::::::::::--===----=++++*++%%#--::::::::--%%%%#%%%%%%%%#=++*####%%%%%%%%%%%%%%%*++******+*####****####
:::::::::::::::::::::::::::::::::::::-------=====---=+++++*#*%%#=--::----*#%%%%%%%%*%%%%%#***%%%%%%%%%%%%%%%%%%%##********##########*#*
::::::::::::::::::::::::::::-----::-----=----===--+++*+*###########*#%%%%%%%%%%%%%%%%%%%%###%%%%%%%%%%%%%%%%%%%%%*******###############
:::::::::::::::::::::::::::::::::-------=--=====--+***%%%%##*##%#+++++=+#++*#*++=*#%%##*#%%%%%%%%%%%%%%%%%%%%%%%%###*#########%%#######
:::::::::::::::::::::::::::::---------------------=*#%%%%%****+------=---==--=====-==++=#%%%%%%%%%%%%%%%%%%%%%%############%%%%%%%%%%##
:::::::::::::::::::::::::::::-:--------:::::------=+*#%%%%#**+--::::::::::::-:::::--#%%#**#%%%%%%%%%%%%%%%%%%%%#########%%%%%%%%%%%%%##
::::::::::::::::::::::::::::::::::::::::-::------:-=**%%%%#*+*#+*##%####*##%%%%%%*#%%%%%%*#%%%%%%%%%%%%%%%%%%%########%%%%%%%%%%%%%#%#%
::::::::::::::::::::::::::::::::::::::::::::::--:---+**%%%#+++++=*#*+*#%%%%%%##+*%%%%%%%%#*+*##%%%%%%%%%%%%%%%%####**##%%%%%%%%%%%%%%%%
:::::::::::::::::::::::::::::::::::::----::::::-:----=**##++**=-+++++++****#%###%%%%%%%%%%%+*%%##%*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::::::::::::::::::::::::::::::::::::::-::-=****+++=---====-===-+*+++*##%%%%%%%%%%%%%*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::::::::::::::::::::::::::::::::::::::::-=-=*#*++==+-----------+#%%%%%%%%%%%%%%%%%%#%%%%%%%%%%%%%%%%#%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::::::::::::::::::::::::::::::::::--======--=*##+=**#**#%%%%%%%%%%%%%%%%%%%%%%%%%*%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::::::::::::::::::::::::::::::::::-----::::::------=---+++***####%#%%%%%%%%%%%%%%%%%%%%%*%%%%+%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::::::::::::::::::::::::::::::::::-::::::::-----:---=-==--=++++#*#%%%%%%%%%%%%%%%%%#*#+%%%%+%%*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::::::::::::::::::::::::::::::::::::::::::--:--::---=---*-:-===+*+**######*####*#*+#+%%%%*%%#%%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::::::::::::::::::::::::::::::::::::::::----===--====-::--=-:---==+*++===+==++++=+=%%%%%%%%%%%%%#*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::::::::::::::::::::::::::::::---:-===----::::::-----::-----------===-=%%%%#%%%%#%%%%#+%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::::::::::::::::::::::::::::::::::::::::::::--:::::::::::---------::::::::--#%%%%#%%#%#*%%%#+*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::-------=====+*%%#%#**++#***=**##*+%%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::::::::::::::::::::::::::-:-------++=:::::::::::-:::--=--=========++++++++**-*%%%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::::::::::::::::::-:--+***#######%%%##+--=+==--::----::::----========++=--*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::::::::::::::::=*#%%%%%%%%%%%%%%%%%#########%#*+---=++--------------=#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::::::::::::::::::::--=#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%##*+++##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::::::::::::::::::-=##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#####%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::::::-=#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::::-+##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::::::-+#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::::::::::=##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::::::::-*#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::::+#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::::::=*#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::::*#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::::-*#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::::=#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:::+#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
::+#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:*#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
+##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%`;

// ===== AUDIO =====
let soundEnabled = false;

function beep(freq, duration, vol = 0.02) {
	if (!soundEnabled) return;
	try {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return;
		const ctx = new AC();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.frequency.setValueAtTime(freq, ctx.currentTime);
		gain.gain.setValueAtTime(vol, ctx.currentTime);
		gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
		osc.start();
		osc.stop(ctx.currentTime + duration);
	} catch {}
}

const hoverSound = () => beep(850, 0.05, 0.008);
const clickSound = () => beep(440, 0.08, 0.025);
const powerSound = () => beep(1200, 0.25, 0.03);

// ===== TOAST =====
function showToast(msg) {
	const toast = document.getElementById("toast");
	const text = document.getElementById("toast-text");
	text.textContent = msg;
	toast.classList.remove("hide");
	toast.classList.add("show");
	setTimeout(() => {
		toast.classList.remove("show");
		toast.classList.add("hide");
		setTimeout(() => toast.classList.remove("hide"), 300);
	}, 2500);
}

// ===== PRELOADER GSAP TIMELINE =====
function initPreloader() {
	const preloader = document.getElementById("preloader");
	const suffix = document.getElementById("preloader-suffix");

	const prefersReduced = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	if (prefersReduced) {
		preloader.style.display = "none";
		initEntranceAnimations();
		return;
	}

	const tl = gsap.timeline({
		defaults: { ease: "power2.out" },
		onComplete: () => {
			gsap.to(preloader, {
				opacity: 0,
				duration: 0.6,
				onComplete: () => {
					preloader.style.display = "none";
					initEntranceAnimations();
				},
			});
		},
	});

	tl
		.from(".preloader-word", {
			scale: 0.6,
			opacity: 0,
			duration: 0.7,
			ease: "elastic.out(1, 0.4)",
		})
		.to({}, { duration: 0.5 })
		.to("#preloader-suffix", { y: -30, opacity: 0, duration: 0.3, ease: "power2.in" })
		.add(() => {
			suffix.textContent = "ev.";
			suffix.style.color = "var(--brand)";
			gsap.set(suffix, { y: 40, opacity: 0 });
			if (soundEnabled) {
				beep(600, 0.15);
				setTimeout(() => beep(900, 0.2), 100);
			}
		})
		.to("#preloader-suffix", { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" })
		.to({}, { duration: 0.5 });
}

// ===== ENTRANCE ANIMATIONS (called after preloader) =====
// CSS sets initial hidden state (opacity:0 + transform). GSAP animates TO visible.
// This prevents the flash: no "visible → hidden → animate" stutter.
function initEntranceAnimations() {
	// Hero stagger — animate TO visible
	gsap.to(".hero-badge", {
		y: 0,
		opacity: 1,
		duration: 0.8,
		ease: "power2.out",
		delay: 0.1,
	});
	gsap.to(".hero-title", {
		y: 0,
		opacity: 1,
		duration: 1,
		ease: "power3.out",
		delay: 0.3,
	});
	gsap.to(".hero-desc", {
		y: 0,
		opacity: 1,
		duration: 0.8,
		ease: "power2.out",
		delay: 0.5,
	});
	gsap.to(".hero-actions", {
		y: 0,
		opacity: 1,
		duration: 0.8,
		ease: "power2.out",
		delay: 0.7,
	});

	// Manifesto
	gsap.to(".manifesto", {
		scrollTrigger: {
			trigger: ".manifesto",
			start: "top 80%",
			toggleActions: "play none none none",
		},
		y: 0,
		opacity: 1,
		duration: 1,
		ease: "power2.out",
	});

	// Template cards stagger
	gsap.to(".template-card", {
		scrollTrigger: { trigger: ".templates-grid", start: "top 75%" },
		y: 0,
		opacity: 1,
		duration: 0.9,
		stagger: 0.15,
		ease: "power2.out",
	});

	// Calculator
	gsap.to(".calculator", {
		scrollTrigger: { trigger: ".calculator", start: "top 80%" },
		y: 0,
		opacity: 1,
		duration: 1,
		ease: "power2.out",
	});

	// Contact
	gsap.to(".contact-info", {
		scrollTrigger: { trigger: ".contact", start: "top 80%" },
		x: 0,
		opacity: 1,
		duration: 0.9,
		ease: "power2.out",
	});
	gsap.to(".contact-form-wrap", {
		scrollTrigger: { trigger: ".contact", start: "top 80%" },
		x: 0,
		opacity: 1,
		duration: 0.9,
		ease: "power2.out",
		delay: 0.2,
	});

	// Terminal trigger
	gsap.to(".terminal-trigger", {
		scrollTrigger: { trigger: ".terminal-trigger", start: "top 85%" },
		y: 0,
		opacity: 1,
		duration: 0.8,
		ease: "power2.out",
	});

	// Footer
	gsap.to(".footer", {
		scrollTrigger: { trigger: ".footer", start: "top 90%" },
		y: 0,
		opacity: 1,
		duration: 0.6,
		ease: "power2.out",
	});

	// Ambient blob parallax
	gsap.to(".ambient-blob-1", {
		scrollTrigger: {
			trigger: "body",
			start: "top top",
			end: "bottom bottom",
			scrub: 1,
		},
		y: -120,
		ease: "none",
	});
	gsap.to(".ambient-blob-2", {
		scrollTrigger: {
			trigger: "body",
			start: "top top",
			end: "bottom bottom",
			scrub: 1,
		},
		y: 120,
		ease: "none",
	});
}

// ===== HEADER =====
function initHeader() {
	const timeEl = document.getElementById("header-time");
	const weatherEl = document.getElementById("header-weather");
	const soundBtn = document.getElementById("sound-toggle");
	const soundOn = document.getElementById("sound-on");
	const soundOff = document.getElementById("sound-off");

	function updateTime() {
		const now = new Date();
		const offsetMin = 9 * 60;
		const utc = now.getTime() + now.getTimezoneOffset() * 60000;
		const ykt = new Date(utc + offsetMin * 60000);
		const h = String(ykt.getHours()).padStart(2, "0");
		const m = String(ykt.getMinutes()).padStart(2, "0");
		const s = String(ykt.getSeconds()).padStart(2, "0");
		timeEl.textContent = `YAKUTSK GMT+9 // ${h}:${m}:${s}`;
	}
	updateTime();
	setInterval(updateTime, 1000);

	fetch(
		"https://api.open-meteo.com/v1/forecast?latitude=62.0355&longitude=129.6755&current_weather=true",
	)
		.then((r) => r.json())
		.then((d) => {
			if (d?.current_weather)
				weatherEl.textContent = `${Math.round(d.current_weather.temperature)}°C`;
		})
		.catch(() => { weatherEl.textContent = "—°C"; });

	soundBtn.addEventListener("click", () => {
		soundEnabled = !soundEnabled;
		soundBtn.classList.toggle("on", soundEnabled);
		soundOn.style.display = soundEnabled ? "block" : "none";
		soundOff.style.display = soundEnabled ? "none" : "block";
		if (soundEnabled) beep(750, 0.12, 0.015);
	});
}

// ===== TEMPLATES =====
function initTemplates() {
	const grid = document.getElementById("templates-grid");
	const drawerOverlay = document.getElementById("drawer-overlay");
	const drawerBackdrop = document.getElementById("drawer-backdrop");
	const drawerClose = document.getElementById("drawer-close");
	const drawerGoto = document.getElementById("drawer-goto");

	grid.innerHTML = coreTemplates
		.map(
			(t) => `
    <div class="template-card" data-id="${t.id}">
      <div class="template-card-body">
        <div class="template-card-header">
          <span class="template-card-label">CODE ASSEMBLY ${t.num}</span>
          <span class="template-card-badge">${t.speed}</span>
        </div>
        <h3 class="template-card-title">${t.title}</h3>
        <p class="template-card-desc">${t.desc}</p>
      </div>
      <div class="template-card-footer">
        <span class="template-card-tech">${t.tech}</span>
        <span class="template-card-action">
          ТЕХ.СПЕКА
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </span>
      </div>
    </div>
  `,
		)
		.join("");

	grid.querySelectorAll(".template-card").forEach((card) => {
		card.addEventListener("mouseenter", hoverSound);
		card.addEventListener("click", () => {
			clickSound();
			const id = card.dataset.id;
			const t = coreTemplates.find((x) => x.id === id);
			if (!t) return;
			openDrawer(t);
		});
	});

	function openDrawer(t) {
		document.getElementById("drawer-num").textContent = t.num;
		document.getElementById("drawer-category").textContent = t.category;
		document.getElementById("drawer-title").textContent = t.title;
		document.getElementById("drawer-speed").textContent = t.speed;
		document.getElementById("drawer-arch").textContent = t.architecture;
		document.getElementById("drawer-tech").textContent = t.tech;

		drawerGoto.onclick = () => {
			clickSound();
			closeDrawer();
			gsap.to(window, {
				duration: 0.8,
				scrollTo: { y: "#calculator", offsetY: 80 },
				ease: "power2.inOut",
			});
		};

		drawerOverlay.style.display = "flex";
		document.body.style.overflow = "hidden";
	}

	function closeDrawer() {
		drawerOverlay.style.display = "none";
		document.body.style.overflow = "";
	}

	drawerBackdrop.addEventListener("click", closeDrawer);
	drawerClose.addEventListener("click", () => {
		clickSound();
		closeDrawer();
	});
}

// ===== CALCULATOR =====
function initCalculator() {
	const presetsEl = document.getElementById("calc-presets");
	const featuresEl = document.getElementById("calc-features");
	const slider = document.getElementById("calc-slider");
	const amountEl = document.getElementById("calc-amount");
	const verdictEl = document.getElementById("calc-verdict");
	const injectBtn = document.getElementById("calc-inject");

	let selectedPreset = "bitrix";
	let selectedFeatures = ["fast"];

	presetsEl.innerHTML = coreTemplates
		.map((t) => {
			const label =
				t.id === "bitrix"
					? "Битрикс/SPA"
					: t.id === "tma"
						? "Mini App"
						: t.id === "sync"
							? "CRM мост"
							: "Телега Бот";
			return `<button class="calc-preset ${t.id === selectedPreset ? "active" : ""}" data-id="${t.id}">
      <span class="calc-preset-num">PRESET ${t.num}</span>${label}
    </button>`;
		})
		.join("");

	presetsEl.querySelectorAll(".calc-preset").forEach((btn) => {
		btn.addEventListener("click", () => {
			clickSound();
			selectedPreset = btn.dataset.id;
			presetsEl
				.querySelectorAll(".calc-preset")
				.forEach((b) =>
					b.classList.toggle("active", b.dataset.id === selectedPreset),
				);
		});
	});

	const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
	featuresEl.innerHTML = calcFeatures
		.map(
			(f) => `
    <div class="calc-feature ${selectedFeatures.includes(f.id) ? "active" : ""}" data-id="${f.id}">
      <div class="calc-check">${checkSvg}</div>
      <div>
        <span class="calc-feature-title">${f.title}</span>
        <span class="calc-feature-desc">${f.desc}</span>
      </div>
    </div>
  `,
		)
		.join("");

	featuresEl.querySelectorAll(".calc-feature").forEach((el) => {
		el.addEventListener("click", () => {
			hoverSound();
			const id = el.dataset.id;
			selectedFeatures = selectedFeatures.includes(id)
				? selectedFeatures.filter((x) => x !== id)
				: [...selectedFeatures, id];
			el.classList.toggle("active", selectedFeatures.includes(id));
		});
	});

	function updateSatire() {
		const val = parseInt(slider.value, 10);
		amountEl.textContent = val.toLocaleString("ru-RU") + " ₽";
		const s = getSatiricalComment(val);
		verdictEl.innerHTML = `
      <div class="calc-verdict-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"></path><path d="M12 8V12"></path><path d="M12 16H12.01"></path></svg>
        <span>${s.title}</span>
      </div>
      <p class="calc-verdict-desc">${s.desc}</p>
    `;
	}

	slider.addEventListener("input", () => {
		hoverSound();
		updateSatire();
	});
	updateSatire();

	injectBtn.addEventListener("click", () => {
		clickSound();
		const preset = coreTemplates.find((t) => t.id === selectedPreset);
		if (!preset) return;
		const features = selectedFeatures
			.map((f) => {
				if (f === "1c") return "1С-Синхронизация";
				if (f === "pay") return "Прием платежей";
				if (f === "fast") return "Next.js Скорость x10";
				return f;
			})
			.join(", ");
		const msg = `Интересует платформа: ${preset.title}. Выбранные опции: [${features || "нет"}]. Ожидаемый донат за сборку: ${parseInt(slider.value).toLocaleString("ru-RU")} руб. Мы платим за домен и хостинг.`;
		const textarea = document.querySelector('textarea[name="msg"]');
		if (textarea) textarea.value = msg;
		showToast("Спецификации и донат перенесены в анкету!");
		gsap.to(window, {
			duration: 0.8,
			scrollTo: { y: "#contact", offsetY: 80 },
			ease: "power2.inOut",
		});
	});
}

// ===== CONTACT =====
function initContact() {
	document.querySelectorAll(".contact-channel").forEach((btn) => {
		btn.addEventListener("click", () => {
			const text = btn.dataset.copy;
			navigator.clipboard.writeText(text);
			showToast(`Скопировано: ${text}`);
		});
	});

	const form = document.getElementById("contact-form");
	const submitBtn = document.getElementById("form-submit");
	const successEl = document.getElementById("form-success");

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		clickSound();
		const name = form.querySelector('[name="name"]').value.trim();
		const contact = form.querySelector('[name="contact"]').value.trim();
		if (!name || !contact) {
			showToast("Заполните обязательные поля.");
			return;
		}
		submitBtn.textContent = "ПЕРЕДАЧА ДАННЫХ В БУФЕР...";
		submitBtn.disabled = true;
		setTimeout(() => {
			submitBtn.textContent = "ОТПРАВИТЬ СМЕТУ НА ОДОБРЕНИЕ";
			submitBtn.disabled = false;
			successEl.style.display = "flex";
			showToast("Заявка успешно зафиксирована!");
			form.reset();
			setTimeout(() => {
				successEl.style.display = "none";
			}, 6000);
		}, 1100);
	});
}

// ===== TERMINAL =====
function initTerminal() {
	const terminal = document.getElementById("terminal");
	const body = document.getElementById("terminal-body");
	const input = document.getElementById("terminal-input");
	const form = document.getElementById("terminal-form");
	const exitBtn = document.getElementById("terminal-exit");
	const triggerBtn = document.getElementById("btn-terminal");
	const shortcuts = document.querySelectorAll(".terminal-shortcut");

	let booting = false;

	function log(msg) {
		const line = document.createElement("div");
		line.className = "terminal-line";
		line.textContent = msg;
		body.appendChild(line);
		body.scrollTop = body.scrollHeight;
	}

	function logPrompt(msg) {
		const line = document.createElement("div");
		line.className = "terminal-line";
		line.innerHTML = `<span class="terminal-line-prompt">operator@iindev:~$</span> ${msg}`;
		body.appendChild(line);
		body.scrollTop = body.scrollHeight;
	}

	function boot() {
		booting = true;
		input.disabled = true;
		body.innerHTML = "";
		const lines = [
			{ msg: "operator@iindev:~$ ./init_runtime", delay: 100 },
			{ msg: "[ ok ] connecting to sub-zero server yakutsk...", delay: 80 },
			{ msg: "[ ok ] checking integrity keys...", delay: 80 },
			{
				msg: "----------------------------------------------------",
				delay: 40,
			},
			{ msg: "iindev. — MINIMALIST DEVELOPMENTS CLI v2.1.0", delay: 50 },
			{
				msg:
					"Локальное время: " +
					document.getElementById("header-time").textContent,
				delay: 50,
			},
			{
				msg: "Доступные директивы: help, about, works, estimate, sound, contact, clear",
				delay: 50,
			},
			{
				msg: "----------------------------------------------------",
				delay: 40,
			},
		];
		let total = 0;
		lines.forEach((l) => {
			total += l.delay;
			setTimeout(() => log(l.msg), total);
		});
		setTimeout(() => {
			booting = false;
			input.disabled = false;
			input.focus();
		}, total + 50);
	}

	function handleCommand(raw) {
		const inp = raw.trim();
		if (!inp) return;
		logPrompt(inp);
		const args = inp.toLowerCase().split(" ");
		const cmd = args[0];
		setTimeout(() => {
			switch (cmd) {
				case "help":
					log("Команды системы:");
					log("  help        - вызов справки");
					log("  about       - о студии iindev");
					log("  works       - список текущих разработок");
					log("  estimate    - вывести ценовую сетку архитектуры");
					log("  sound [on/off] - включить / выключить аудио-отклик");
					log("  contact     - каналы прямой связи");
					log("  clear       - очистить консоль");
					break;
				case "abas": {
					const pre = document.createElement("pre");
					pre.className = "easter-ascii";
					pre.textContent = ASCII_ART;
					const el = document.createElement("div");
					el.className = "terminal-line";
					el.appendChild(pre);
					body.appendChild(el);
					body.scrollTop = body.scrollHeight;
					break;
				}
				case "about":
					log("iindev. — независимый проект иронии и деплоя готового софта.");
					log(
						"Мы отдаем веб-шаблоны Next.js 15, умные боты и TMA за любой донат.",
					);
					log(
						"Наш подход — жесткий детерминированный минимализм и математическая точность кода.",
					);
					break;
				case "works":
					log("Доступные нативные сборки:");
					log("  • Next.js B2B Platform / 1С [Optimized Static]");
					log("  • Telegram Mini App Store [SPA Cloud]");
					log("  • CRM Integrated Webhook Bridge [API Node]");
					log("  • Automated Telegram Assistant Bot [Serverless]");
					break;
				case "estimate":
					log("Базовая архитектурная сетка (в донатах):");
					log("  • Бот / Telegram Mini App : свободный донат от 500 ₽");
					log("  • Веб-Платформа / 1С-Битрикс/SPA : свободный донат от 1500 ₽");
					log(
						"Для точной подбора параметров и донат-симулятора используйте калькулятор на сайте.",
					);
					break;
				case "sound":
					if (args[1] === "on") {
						soundEnabled = true;
						document.getElementById("sound-toggle").classList.add("on");
						document.getElementById("sound-on").style.display = "block";
						document.getElementById("sound-off").style.display = "none";
						log("Звук включен [sound enabled].");
					} else if (args[1] === "off") {
						soundEnabled = false;
						document.getElementById("sound-toggle").classList.remove("on");
						document.getElementById("sound-on").style.display = "none";
						document.getElementById("sound-off").style.display = "block";
						log("Звук выключен [sound muted].");
					} else {
						log(
							`Текущий статус звука: ${soundEnabled ? "ВКЛ" : "ВЫКЛ"}. Используйте "sound on" или "sound off"`,
						);
					}
					break;
				case "contact":
					log("Контакты основателя iindev:");
					log("  • Telegram: @iindev");
					log("  • Email: iindev@tuta.io");
					break;
				case "clear":
					body.innerHTML = "";
					break;
				default:
					log(`Команда "${cmd}" не распознана. Введите "help" для справки`);
			}
		}, 50);
	}

	function openTerminal() {
		terminal.style.display = "flex";
		document.body.style.overflow = "hidden";
		boot();
	}

	function closeTerminal() {
		terminal.style.display = "none";
		document.body.style.overflow = "";
	}

	triggerBtn.addEventListener("click", () => {
		powerSound();
		openTerminal();
	});
	exitBtn.addEventListener("click", closeTerminal);

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		clickSound();
		handleCommand(input.value);
		input.value = "";
	});

	shortcuts.forEach((s) => {
		s.addEventListener("click", () => {
			hoverSound();
			input.value = s.dataset.cmd;
			input.focus();
		});
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && terminal.style.display !== "none") {
			clickSound();
			closeTerminal();
		}
	});
}

// ===== INIT =====
function initSmoothScroll() {
	document.addEventListener("click", (e) => {
		const link = e.target.closest('a[href^="#"]');
		if (!link) return;
		const href = link.getAttribute("href");
		if (href === "#" || !href) return;
		const target = document.querySelector(href);
		if (!target) return;
		e.preventDefault();
		hoverSound();
		gsap.to(window, { duration: 0.8, scrollTo: { y: target, offsetY: 80 }, ease: "power2.inOut" });
	});
}

document.addEventListener("DOMContentLoaded", () => {
	initPreloader();
	initHeader();
	initTemplates();
	initCalculator();
	initContact();
	initTerminal();
	initSmoothScroll();
});
