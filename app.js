/* Hallmark · Bento Grid · austere minimalism
 * GSAP register + config + interactions
 */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
			suffix.style.color = "var(--color-accent)";
			gsap.set(suffix, { y: 40, opacity: 0 });
		})
		.to("#preloader-suffix", { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" })
		.to({}, { duration: 0.5 });
}

// ===== ENTRANCE ANIMATIONS =====
function initEntranceAnimations() {
	gsap.to(".hero-title", { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 });
	gsap.to(".hero-desc", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 });
	gsap.to(".hero-actions", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.7 });

	gsap.utils.toArray(".bento-cell").forEach((cell, i) => {
		gsap.to(cell, {
			scrollTrigger: { trigger: cell, start: "top 85%", toggleActions: "play none none none" },
			y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: i * 0.05,
		});
	});

	gsap.to(".footer", {
		scrollTrigger: { trigger: ".footer", start: "top 90%" },
		y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
	});
}

// ===== HEADER =====
function initHeader() {
	// Mode toggle: site / cli
	const modeToggle = document.getElementById("mode-toggle");
	const modeSite = document.getElementById("mode-site");
	const modeCli = document.getElementById("mode-cli");

	if (modeToggle) {
		modeToggle.addEventListener("click", (e) => {
			const btn = e.target.closest(".mode-btn");
			if (!btn) return;
			const mode = btn.dataset.mode;
			if (mode === "cli") {
				document.getElementById("terminal").style.display = "flex";
				document.body.style.overflow = "hidden";
				if (typeof initTerminal === "function") initTerminal();
			}
			modeSite.classList.toggle("active", mode === "site");
			modeCli.classList.toggle("active", mode === "cli");
		});
	}
}

// ===== TEMPLATES / BENTO CELLS =====
function initTemplates() {
	const drawerOverlay = document.getElementById("drawer-overlay");
	const drawerBackdrop = document.getElementById("drawer-backdrop");
	const drawerClose = document.getElementById("drawer-close");
	const drawerGoto = document.getElementById("drawer-goto");

	document.querySelectorAll(".bento-cell-template").forEach((cell) => {
		cell.addEventListener("click", () => {
			const t = coreTemplates.find((x) => x.id === cell.dataset.id);
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
			closeDrawer();
			gsap.to(window, { duration: 0.8, scrollTo: { y: "#contact", offsetY: 80 }, ease: "power2.inOut" });
		};

		drawerOverlay.style.display = "flex";
		document.body.style.overflow = "hidden";
	}

	function closeDrawer() {
		drawerOverlay.style.display = "none";
		document.body.style.overflow = "";
	}

	drawerBackdrop.addEventListener("click", closeDrawer);
	drawerClose.addEventListener("click", closeDrawer);
}

// ===== CONTACT FORM =====
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
			submitBtn.textContent = "Отправить заявку";
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
	closeBtn.addEventListener("click", closePrivacy);

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.style.display !== "none") {
			closePrivacy();
		}
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
		gsap.to(window, { duration: 0.8, scrollTo: { y: target, offsetY: 80 }, ease: "power2.inOut" });
	});
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
	initPreloader();
	initHeader();
	initTemplates();
	initContact();
	initPrivacy();
	initSmoothScroll();
});
