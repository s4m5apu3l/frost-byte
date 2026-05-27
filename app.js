/* ===== GSAP REGISTER ===== */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ===== CONFIG =====
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxzwm-NuZULK_iXCx5AVHYYzG372HkOAK1uhUSUrcgsJIjU1-bjrJApxVQ9f7Luv3yV/exec';

const coreTemplates = [
	{
		id: "site",
		num: "01",
		category: "САЙТ ДЛЯ БИЗНЕСА",
		title: "Лендинг или корпоративный сайт",
		desc: "От кофейни до строительной компании. Быстрый, удобный на телефоне, с формой записи и картой. Грузится мгновенно.",
		tech: "Современные технологии под ваши задачи",
		baseVal: 5000,
		speed: "Мгновенная загрузка",
		architecture: "Высокая производительность",
	},
	{
		id: "tma",
		num: "02",
		category: "TELEGRAM MINI APP",
		title: "Приложение внутри Telegram",
		desc: "Магазин, личный кабинет или каталог - прямо в чате. Клиенту не нужно ничего скачивать, открывает из бота одним нажатием.",
		tech: "Работает внутри Telegram",
		baseVal: 5000,
		speed: "Мгновенный запуск",
		architecture: "Не требует установки",
	},
	{
		id: "crm",
		num: "03",
		category: "CRM-ИНТЕГРАЦИЯ",
		title: "Связь сайта с вашей CRM",
		desc: "Заявки с сайта автоматически попадают в AmoCRM или Битрикс24. Никакого ручного ввода - всё синхронизируется само.",
		tech: "Надёжная интеграция",
		baseVal: 5000,
		speed: "Мгновенная синхронизация",
		architecture: "Автоматический обмен данными",
	},
	{
		id: "bot",
		num: "04",
		category: "TELEGRAM-БОТ",
		title: "Бот-ассистент для бизнеса",
		desc: "Автоматическая запись, приём оплат, ответы на частые вопросы. Работает круглосуточно - клиенты довольны, вы не тратите время.",
		tech: "Автоматизация 24/7",
		baseVal: 5000,
		speed: "Мгновенный ответ",
		architecture: "Работает без перерыва",
	},
];

const calcFeatures = [
	{ id: "1c", title: "1С-Синхронизация ERP", desc: "Автообмен прайсами и базой." },
	{ id: "pay", title: "Приём оплат", desc: "СБП, эквайринг, чеки." },
	{ id: "fast", title: "CDN-ускорение", desc: "Кеширование по миру." },
];

function getSatiricalComment(value) {
	if (value < 1500) return {
		title: "Студенческий микро-донат",
		desc: "Хватит на порцию шаурмы и банку колы для программиста. Код будет собран с любовью, но, возможно, с якутским акцентом и парой смешных комментариев в исходниках.",
	};
	if (value < 5000) return {
		title: "Стейк-брифинг",
		desc: "Отличный классический донат! Наш архитектор сможет позволить себе стейк из оленины. Команда приступает к деплою с повышенным уровнем серотонина.",
	};
	if (value < 15000) return {
		title: "Настоящий бизнес-донат",
		desc: "Прагматичный вклад. Мы полностью упакуем систему под ваши требования, настроим интеграции и не будем спрашивать глупых вопросов про 'целевую аудиторию'.",
	};
	if (value < 35000) return {
		title: "Почти как у душного агентства",
		desc: "Вы платите цену, сопоставимую с рыночным шаблоном, но получаете чистейший код без агентского пафоса, бесконечных созвонов в Зуме и ТЗ на 100 страниц.",
	};
	return {
		title: "VIP меценат сатиры",
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
::::=#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%##################################################################
:::=#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%###################################################################
::+#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%####################################################################
:*#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#####################################################################
+##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#####################################################################
##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%######################################################################
#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#######################################################################
##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%######################################################################`;

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

// ===== PRELOADER =====
function initPreloader() {
	const preloader = document.getElementById("preloader");
	const suffix = document.getElementById("preloader-suffix");

	const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

// ===== ENTRANCE ANIMATIONS =====
function initEntranceAnimations() {
	gsap.to(".hero-badge", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.1 });
	gsap.to(".hero-title", { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 });
	gsap.to(".hero-desc", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 });
	gsap.to(".hero-actions", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.7 });

	gsap.to(".manifesto", {
		scrollTrigger: { trigger: ".manifesto", start: "top 80%", toggleActions: "play none none none" },
		y: 0, opacity: 1, duration: 1, ease: "power2.out",
	});

	gsap.to(".template-card", {
		scrollTrigger: { trigger: ".templates-grid", start: "top 75%" },
		y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power2.out",
	});

	gsap.to(".calculator", {
		scrollTrigger: { trigger: ".calculator", start: "top 80%" },
		y: 0, opacity: 1, duration: 1, ease: "power2.out",
	});

	gsap.to(".contact-info", {
		scrollTrigger: { trigger: ".contact", start: "top 80%" },
		x: 0, opacity: 1, duration: 0.9, ease: "power2.out",
	});
	gsap.to(".contact-form-wrap", {
		scrollTrigger: { trigger: ".contact", start: "top 80%" },
		x: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.2,
	});

	gsap.to(".footer", {
		scrollTrigger: { trigger: ".footer", start: "top 90%" },
		y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
	});

	gsap.to(".ambient-blob-1", {
		scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 },
		y: -120, ease: "none",
	});
	gsap.to(".ambient-blob-2", {
		scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 },
		y: 120, ease: "none",
	});
}

// ===== HEADER =====
function initHeader() {
	const weatherEl = document.getElementById("header-weather");
	const soundBtn = document.getElementById("sound-toggle");
	const soundOn = document.getElementById("sound-on");
	const soundOff = document.getElementById("sound-off");

	fetch("https://api.open-meteo.com/v1/forecast?latitude=62.0355&longitude=129.6755&current_weather=true")
		.then((r) => r.json())
		.then((d) => { if (d?.current_weather) weatherEl.textContent = `${Math.round(d.current_weather.temperature)}°C`; })
		.catch(() => { weatherEl.textContent = "-°C"; });

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

	grid.innerHTML = coreTemplates.map((t) => `
    <div class="template-card" data-id="${t.id}">
      <div class="template-card-body">
        <div class="template-card-header">
          <span class="template-card-label">${t.category}</span>
          <span class="template-card-badge">${t.speed}</span>
        </div>
        <h3 class="template-card-title">${t.title}</h3>
        <p class="template-card-desc">${t.desc}</p>
      </div>
      <div class="template-card-footer">
        <span class="template-card-tech">${t.tech}</span>
        <span class="template-card-action">
          ПОДРОБНЕЕ
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </span>
      </div>
    </div>
  `).join("");

	grid.querySelectorAll(".template-card").forEach((card) => {
		card.addEventListener("mouseenter", hoverSound);
		card.addEventListener("click", () => {
			clickSound();
			const t = coreTemplates.find((x) => x.id === card.dataset.id);
			if (t) openDrawer(t);
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
			gsap.to(window, { duration: 0.8, scrollTo: { y: "#calculator", offsetY: 80 }, ease: "power2.inOut" });
		};

		drawerOverlay.style.display = "flex";
		document.body.style.overflow = "hidden";
	}

	function closeDrawer() {
		drawerOverlay.style.display = "none";
		document.body.style.overflow = "";
	}

	drawerBackdrop.addEventListener("click", closeDrawer);
	drawerClose.addEventListener("click", () => { clickSound(); closeDrawer(); });
}

// ===== CALCULATOR =====
function initCalculator() {
	const presetsEl = document.getElementById("calc-presets");
	const featuresEl = document.getElementById("calc-features");
	const slider = document.getElementById("calc-slider");
	const amountEl = document.getElementById("calc-amount");
	const verdictEl = document.getElementById("calc-verdict");
	const injectBtn = document.getElementById("calc-inject");

	let selectedPreset = "site";
	let selectedFeatures = ["fast"];

	presetsEl.innerHTML = coreTemplates.map((t) => {
		const label = t.id === "site" ? "Сайт" : t.id === "tma" ? "Mini App" : t.id === "crm" ? "CRM мост" : "Телега Бот";
		return `<button class="calc-preset ${t.id === selectedPreset ? "active" : ""}" data-id="${t.id}">
      <span class="calc-preset-num">PRESET ${t.num}</span>${label}
    </button>`;
	}).join("");

	presetsEl.querySelectorAll(".calc-preset").forEach((btn) => {
		btn.addEventListener("click", () => {
			clickSound();
			selectedPreset = btn.dataset.id;
			presetsEl.querySelectorAll(".calc-preset").forEach((b) => b.classList.toggle("active", b.dataset.id === selectedPreset));
		});
	});

	const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
	featuresEl.innerHTML = calcFeatures.map((f) => `
    <div class="calc-feature ${selectedFeatures.includes(f.id) ? "active" : ""}" data-id="${f.id}">
      <div class="calc-check">${checkSvg}</div>
      <div>
        <span class="calc-feature-title">${f.title}</span>
        <span class="calc-feature-desc">${f.desc}</span>
      </div>
    </div>
  `).join("");

	featuresEl.querySelectorAll(".calc-feature").forEach((el) => {
		el.addEventListener("click", () => {
			hoverSound();
			const id = el.dataset.id;
			if (selectedFeatures.includes(id)) {
				selectedFeatures = selectedFeatures.filter((x) => x !== id);
			} else {
				selectedFeatures.push(id);
			}
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
		const feats = selectedFeatures.map((f) => {
			if (f === "1c") return "1С-Синхронизация";
			if (f === "pay") return "Приём оплат";
			if (f === "fast") return "CDN-ускорение";
			return f;
		}).join(", ");
		const msg = `Интересует: ${preset.title}. Опции: [${feats || "нет"}]. Донат: ${parseInt(slider.value).toLocaleString("ru-RU")} руб.`;
		const textarea = document.querySelector('textarea[name="msg"]');
		if (textarea) textarea.value = msg;
		showToast("Смета перенесена в бриф!");
		gsap.to(window, { duration: 0.8, scrollTo: { y: "#contact", offsetY: 80 }, ease: "power2.inOut" });
	});
}

// ===== CONTACT FORM (real GAS submission) =====
function initContact() {
	document.querySelectorAll(".contact-channel").forEach((btn) => {
		btn.addEventListener("click", () => {
			const text = btn.dataset.copy;
			navigator.clipboard.writeText(text).then(() => {
				showToast(`Скопировано: ${text}`);
			});
		});
	});

	const form = document.getElementById("contact-form");
	const submitBtn = document.getElementById("form-submit");
	const successEl = document.getElementById("form-success");
	const loadingEl = document.getElementById("form-loading");
	const errorEl = document.getElementById("form-error-global");
	const errorName = document.getElementById("form-error-name");
	const errorContact = document.getElementById("form-error-contact");

	function clearErrors() {
		[errorName, errorContact, errorEl].forEach((el) => {
			if (el) { el.style.display = "none"; el.textContent = ""; }
		});
	}

	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		clickSound();
		clearErrors();

		const name = document.getElementById("form-name").value.trim();
		const contact = document.getElementById("form-contact").value.trim();
		const msg = document.querySelector('textarea[name="msg"]').value.trim();

		let hasError = false;
		if (!name) {
			errorName.textContent = "Укажите имя или компанию";
			errorName.style.display = "block";
			hasError = true;
		}
		if (!contact) {
			errorContact.textContent = "Укажите Telegram или телефон";
			errorContact.style.display = "block";
			hasError = true;
		}
		if (hasError) return;

		submitBtn.disabled = true;
		submitBtn.textContent = "ОТПРАВКА...";
		loadingEl.style.display = "flex";
		successEl.style.display = "none";
		errorEl.style.display = "none";

		try {
			const response = await fetch(GAS_URL, {
				method: "POST",
				body: JSON.stringify({
					name: name,
					phone: contact,
					type: "сайт / бот / Mini App",
					message: msg,
				}),
			});

			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			const result = await response.json();

			if (result && result.success) {
				loadingEl.style.display = "none";
				successEl.style.display = "flex";
				showToast("Заявка отправлена!");
				form.reset();

				const presetBtns = document.querySelectorAll(".calc-preset");
				const firstPreset = presetBtns.length > 0 ? presetBtns[0] : null;
				if (firstPreset) {
					presetBtns.forEach((b) => b.classList.remove("active"));
					firstPreset.classList.add("active");
				}

				setTimeout(() => { successEl.style.display = "none"; }, 6000);
			} else {
				throw new Error(result?.error || "Unknown error");
			}
		} catch (err) {
			console.error("Form submission error:", err);
			loadingEl.style.display = "none";
			errorEl.style.display = "flex";
			showToast("Ошибка отправки. Попробуйте позже.");
		} finally {
			submitBtn.disabled = false;
			submitBtn.textContent = "ОТПРАВИТЬ ЗАЯВКУ";
		}
	});
}

// ===== PRIVACY MODAL =====
function initPrivacy() {
	const modal = document.getElementById("privacy");
	const backdrop = document.getElementById("privacy-backdrop");
	const closeBtn = document.getElementById("privacy-close");

	function openPrivacy(e) {
		e.preventDefault();
		modal.style.display = "flex";
		document.body.style.overflow = "hidden";
	}

	function closePrivacy() {
		modal.style.display = "none";
		document.body.style.overflow = "";
	}

	document.querySelectorAll('.footer-legal, a[href="#privacy"]').forEach((link) => {
		link.addEventListener("click", openPrivacy);
	});

	backdrop.addEventListener("click", closePrivacy);
	closeBtn.addEventListener("click", () => { clickSound(); closePrivacy(); });

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.style.display !== "none") {
			closePrivacy();
		}
	});
}

// ===== TERMINAL =====
function initTerminal() {
	const terminal = document.getElementById("terminal");
	const body = document.getElementById("terminal-body");
	const input = document.getElementById("terminal-input");
	const form = document.getElementById("terminal-form");
	const exitBtn = document.getElementById("terminal-exit");
	const modeSite = document.getElementById("mode-site");
	const modeCli = document.getElementById("mode-cli");
	const shortcuts = document.querySelectorAll(".terminal-shortcut");

	let booting = false;

	function setActiveMode(mode) {
		modeSite.classList.toggle("active", mode === "site");
		modeCli.classList.toggle("active", mode === "cli");
	}

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
			{ msg: "operator@iindev:~$ ./init", delay: 100 },
			{ msg: "[ ok ] connecting...", delay: 80 },
			{ msg: "----------------------------------------------------", delay: 40 },
			{ msg: "iindev. - CLI", delay: 50 },
			{ msg: "Команды: help, about, works, contact, sound, clear", delay: 50 },
			{ msg: "----------------------------------------------------", delay: 40 },
		];
		let total = 0;
		lines.forEach((l) => { total += l.delay; setTimeout(() => log(l.msg), total); });
		setTimeout(() => { booting = false; input.disabled = false; input.focus(); }, total + 50);
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
					log("Команды:");
					log("  help    - справка");
					log("  about   - о проекте iindev");
					log("  works   - решения");
					log("  contact - контакты");
					log("  sound [on/off] - аудио");
					log("  clear   - очистить консоль");
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
					log("iindev - сайты для малого бизнеса.");
					log("Сайт - как бейдж, нужен каждому.");
					log("Лендинг у контор от 50к, магазин от 150к - перебор.");
					log("Сначала покажем, потом разговор о цене.");
					break;
				case "works":
					log("Решения:");
					log("  · Сайт для бизнеса");
					log("  · Telegram Mini App");
					log("  · CRM-интеграция (AmoCRM, Битрикс24)");
					log("  · Telegram-бот");
					break;
				case "contact":
					log("Контакты:");
					log("  · Telegram: @iindev");
					log("  · Email: iindev@tuta.io");
					break;
				case "sound":
					if (args[1] === "on") {
						soundEnabled = true;
						document.getElementById("sound-toggle").classList.add("on");
						document.getElementById("sound-on").style.display = "block";
						document.getElementById("sound-off").style.display = "none";
						log("Звук включен.");
					} else if (args[1] === "off") {
						soundEnabled = false;
						document.getElementById("sound-toggle").classList.remove("on");
						document.getElementById("sound-on").style.display = "none";
						document.getElementById("sound-off").style.display = "block";
						log("Звук выключен.");
					} else {
						log(`Звук: ${soundEnabled ? "ВКЛ" : "ВЫКЛ"}. "sound on" или "sound off"`);
					}
					break;
				case "clear":
					body.innerHTML = "";
					break;
				default:
					log(`"${cmd}" - не распознана. Введите "help"`);
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

	modeCli.addEventListener("click", () => { powerSound(); openTerminal(); setActiveMode("cli"); });
	modeSite.addEventListener("click", () => { closeTerminal(); setActiveMode("site"); });
	exitBtn.addEventListener("click", () => { closeTerminal(); setActiveMode("site"); });

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		clickSound();
		handleCommand(input.value);
		input.value = "";
	});

	shortcuts.forEach((s) => {
		s.addEventListener("click", () => { hoverSound(); input.value = s.dataset.cmd; input.focus(); });
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && terminal.style.display !== "none") { clickSound(); closeTerminal(); setActiveMode("site"); }
	});
}

// ===== SMOOTH SCROLL =====
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

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
	initPreloader();
	initHeader();
	initTemplates();
	initCalculator();
	initContact();
	initPrivacy();
	initTerminal();
	initSmoothScroll();
});
