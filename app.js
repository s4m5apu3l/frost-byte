window.addEventListener("pageshow", (e) => {
	if (e.persisted) {
		document.querySelectorAll(".page-transition").forEach((el) => el.remove());
		const transitionOverlay = document.getElementById("transitionOverlay");
		if (transitionOverlay) transitionOverlay.style.display = "none";
		document.documentElement.classList.remove("skip-loader");
		sessionStorage.removeItem("iindev-transition");
		document.body.classList.remove("is-loading", "is-transitioning", "menu-open");
		document.body.style.overflow = "";
		const loader = document.getElementById("loader");
		if (loader) { loader.style.visibility = "hidden"; loader.style.display = "none"; }
	}
});

document.addEventListener("DOMContentLoaded", () => {
	history.scrollRestoration = "manual";
	window.scrollTo(0, 0);

	document.querySelectorAll(".year").forEach((el) => {
		el.textContent = new Date().getFullYear();
	});

	initCursor();
	initContact();

	const isTransition = sessionStorage.getItem("iindev-transition");
	if (isTransition) {
		sessionStorage.removeItem("iindev-transition");
		const loader = document.getElementById("loader");
		if (loader) {
			loader.style.visibility = "hidden";
			loader.style.display = "none";
		}
		document.body.removeAttribute("aria-busy");
		document.body.classList.remove("is-loading");

		const transitionOverlay = document.getElementById("transitionOverlay");

		gsap.fromTo(transitionOverlay,
			{ yPercent: 0 },
			{ yPercent: -100, duration: 0.7, ease: "power3.inOut", onComplete: function() {
				transitionOverlay.style.display = "none";
				document.documentElement.classList.remove("skip-loader");
			}}
		);

		showHero();
		initAmbient();
		initWork();
		initAbout();
		initServices();
		initProcess();
		initCta();
		initSlideover();
		return;
	}

	const loader = document.getElementById("loader");
	if (!loader) {
		initBurger();
		initHeaderScroll();
		initSlideover();
		return;
	}

	const prefersReduced = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	if (prefersReduced) {
		loader.style.visibility = "hidden";
		loader.style.display = "none";
		document.body.removeAttribute("aria-busy");
		document.body.classList.remove("is-loading");
		showHero();
		return;
	}

	document.body.style.overflow = "hidden";
	gsap.set("#header", { opacity: 0, y: -80 });

	const tl = gsap.timeline({
		onComplete: () => {
			gsap.set(loader, {
				visibility: "hidden",
				display: "none",
				pointerEvents: "none",
			});
			loader.style.willChange = "auto";
			document.getElementById("loaderWord").style.willChange = "auto";
			document.body.style.overflow = "";
			document.body.removeAttribute("aria-busy");
			document.body.classList.remove("is-loading");
			showHero();
		},
	});

	tl.to(".lc", {
		opacity: 1,
		y: 0,
		duration: 0.4,
		stagger: 0.08,
		ease: "power3.out",
	})
		.to(
			".lw",
			{
				opacity: 1,
				y: 0,
				duration: 0.4,
				stagger: 0.08,
				ease: "power3.out",
			},
			"-=0.35",
		)
		.to(
			".loader-bar-fill",
			{
				width: "35%",
				duration: 0.6,
				ease: "power1.inOut",
			},
			"-=0.6",
		)
		.to({}, { duration: 0.6 })
		.to(".lw", {
			opacity: 0,
			y: -15,
			scale: 0.5,
			duration: 0.35,
			stagger: 0.04,
			ease: "power2.in",
		})
		.set(".lw", { display: "none" })
		.set(".lv", { display: "inline-block" })
		.fromTo(
			".lv",
			{
				opacity: 0,
				y: 80,
			},
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.06,
				ease: "back.out(1.4)",
			},
		)
		.to(
			".loader-bar-fill",
			{
				width: "70%",
				duration: 0.4,
				ease: "power1.inOut",
			},
			"-=0.4",
		)
		.to({}, { duration: 0.4 })
		.to("#loaderWord", {
			rotation: 90,
			scale: 2.5,
			duration: 0.7,
			ease: "power2.inOut",
		})
		.to(
			".loader-bar-fill",
			{
				width: "100%",
				duration: 0.5,
				ease: "power2.inOut",
			},
			"-=0.5",
		)
		.to("#loader", {
			borderBottomLeftRadius: "50px",
			borderBottomRightRadius: "50px",
			duration: 0.3,
			ease: "power2.inOut",
		})
		.to(
			"#loader",
			{
				yPercent: -100,
				duration: 0.7,
				ease: "power3.inOut",
			},
			"-=0.1",
		);
});

gsap.registerPlugin(ScrollTrigger);

gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
	gsap.defaults({ duration: 0.01 });
	ScrollTrigger.getAll().forEach((st) => st.kill());
});

const suffixes = [
	"iinda",
	"igidon",
	"iiana djons",
	"ustria spesodejdy",
	"iebit baay da",
	"igistan",
];
let suffixIndex = 0;
let cycling = false;
let menuOpen = false;
let menuTl = null;

function showHero() {
	const header = document.getElementById("header");

	gsap.set(header, { y: -80, opacity: 0 });
	gsap.set(".hero-pre", { opacity: 0, y: 10 });
	gsap.set(".hero-line", { opacity: 0, y: "100%" });
	gsap.set(".hero-desc", { opacity: 0, y: 20 });
	gsap.set(".hero .btn-primary", { opacity: 0, y: 20 });

	const heroTl = gsap.timeline({ delay: 0.2 });

	heroTl
		.fromTo(
			header,
			{
				y: -80,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.6,
				ease: "power3.out",
			},
		)
		.to(
			".hero-pre",
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				ease: "power3.out",
			},
			"-=0.3",
		)
		.to(
			".hero-line",
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				stagger: 0.12,
				ease: "power3.out",
			},
			"-=0.3",
		)
		.to(
			".hero-desc",
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: "power3.out",
			},
			"-=0.5",
		)
		.to(
			".hero .btn-primary",
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: "power3.out",
			},
			"-=0.4",
		)
		.to(
			".hero-orb",
			{
				opacity: 1,
				duration: 2.5,
				stagger: 0.4,
				ease: "power2.out",
			},
			"-=0.4",
		)
		.call(
			() => {
				cycling = true;
				cycleSuffix();
			},
			null,
			"+=0.5",
		)
		.call(() => {
			gsap.set(".hero-line", { willChange: "auto" });
		});

	initBurger();
	initHeaderScroll();
	initAmbient();
	initWork();
	initAbout();
	initServices();
	initProcess();
	initCta();
	initSlideover();
}

function initAbout() {
	gsap.utils.toArray(".about-line").forEach((line) => {
		const textNodes = [];
		line.childNodes.forEach((node) => {
			if (node.nodeType === 3 && node.textContent.trim()) {
				const chars = node.textContent.split("");
				const frag = document.createDocumentFragment();
				chars.forEach((char) => {
					const span = document.createElement("span");
					span.className = "about-char";
					span.textContent = char === " " ? "\u00A0" : char;
					frag.appendChild(span);
				});
				textNodes.push({ node, frag });
			} else if (node.nodeType === 1 && node.classList.contains("about-accent")) {
				const chars = node.textContent.split("");
				const frag = document.createDocumentFragment();
				chars.forEach((char) => {
					const span = document.createElement("span");
					span.className = "about-char about-char--accent";
					span.textContent = char === " " ? "\u00A0" : char;
					frag.appendChild(span);
				});
				textNodes.push({ node, frag });
			}
		});
		textNodes.forEach(({ node, frag }) => {
			node.parentNode.replaceChild(frag, node);
		});

		const chars = line.querySelectorAll(".about-char");
		const normalChars = line.querySelectorAll(".about-char:not(.about-char--accent)");
		const accentChars = line.querySelectorAll(".about-char--accent");
		const allChars = line.querySelectorAll(".about-char");

		gsap.fromTo(
			allChars,
			{ opacity: 0.3, y: 20 },
			{
				opacity: 1,
				y: 0,
				duration: 0.4,
				stagger: 0.03,
				ease: "power3.out",
				scrollTrigger: {
					trigger: line,
					start: "top 80%",
					end: "top 40%",
					scrub: 1,
				},
			},
		);
		gsap.to(normalChars, {
			color: "var(--text)",
			scrollTrigger: {
				trigger: line,
				start: "top 80%",
				end: "top 40%",
				scrub: 1,
			},
			stagger: 0.03,
		});
		gsap.to(accentChars, {
			color: "var(--accent)",
			scrollTrigger: {
				trigger: line,
				start: "top 80%",
				end: "top 40%",
				scrub: 1,
			},
			stagger: 0.03,
		});
	});

	gsap.fromTo(
		".about-stat",
		{
			opacity: 0,
			y: 40,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.7,
			stagger: 0.15,
			ease: "power3.out",
			scrollTrigger: { trigger: ".about-grid", start: "top 80%" },
		},
	);
}

function initAmbient() {
	gsap.utils.toArray(".hero-orb").forEach((orb, i) => {
		const tween = gsap.to(orb, {
			x: gsap.utils.random(-60, 60),
			y: gsap.utils.random(-40, 40),
			duration: gsap.utils.random(18, 28),
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			delay: i * 3,
		});

		ScrollTrigger.create({
			trigger: ".hero",
			start: "top bottom",
			end: "bottom top",
			onEnter: () => tween.play(),
			onLeave: () => tween.pause(),
			onEnterBack: () => tween.play(),
			onLeaveBack: () => tween.pause(),
		});
	});
}

function cycleSuffix() {
	if (!cycling) return;

	const el = document.getElementById("heroPreSuffix");
	suffixIndex = (suffixIndex + 1) % suffixes.length;

	const tl = gsap.timeline({
		onComplete: () => {
			if (cycling) {
				gsap.delayedCall(1.8, cycleSuffix);
			}
		},
	});

	tl.to(el, {
		opacity: 0,
		duration: 0.2,
		ease: "power2.in",
	})
		.call(() => {
			el.textContent = suffixes[suffixIndex];
		})
		.to(el, {
			opacity: 1,
			duration: 0.25,
			ease: "power3.out",
		});
}

function initBurger() {
	const burger = document.getElementById("burger");
	const overlay = document.getElementById("menuOverlay");
	const leftPanel = overlay.querySelector(".menu-panel-left");
	const rightPanel = overlay.querySelector(".menu-panel-right");
	const links = overlay.querySelectorAll(".menu-link");
	const socialsLabel = overlay.querySelector(".menu-socials-label");
	const socialLinks = overlay.querySelectorAll(".menu-social-link");
	const footer = overlay.querySelector(".menu-footer");

	const mm = gsap.matchMedia();

	mm.add("(min-width: 769px)", () => {
		gsap.set(leftPanel, { xPercent: -100 });
		gsap.set(rightPanel, { xPercent: 100 });

		menuTl = gsap.timeline({ paused: true });

		menuTl
			.set(overlay, { visibility: "visible" })
			.to(leftPanel, { xPercent: 0, duration: 0.7, ease: "power3.inOut" }, 0)
			.to(rightPanel, { xPercent: 0, duration: 0.7, ease: "power3.inOut" }, 0)
			.fromTo(links, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.4")
			.fromTo(socialsLabel, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.4")
			.fromTo(socialLinks, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" }, "-=0.3");

		if (footer) {
			menuTl.fromTo(footer, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.2");
		}

		return () => {
			if (menuTl) menuTl.kill();
			gsap.set([leftPanel, rightPanel, links, socialsLabel, socialLinks, footer], { clearProps: "all" });
		};
	});

	mm.add("(max-width: 768px)", () => {
		gsap.set(rightPanel, { xPercent: 100 });
		gsap.set(links, { opacity: 0, y: 30 });

		menuTl = gsap.timeline({ paused: true });

		menuTl
			.set(overlay, { visibility: "visible" })
			.to(rightPanel, { xPercent: 0, duration: 0.6, ease: "power3.inOut" })
			.fromTo(links, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.3");

		if (footer) {
			gsap.set(footer, { opacity: 0, y: 10 });
			menuTl.fromTo(footer, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.2");
		}

		return () => {
			if (menuTl) menuTl.kill();
			gsap.set([rightPanel, links, footer], { clearProps: "all" });
		};
	});

	burger.addEventListener("click", () => {
		menuOpen = !menuOpen;
		burger.classList.toggle("active", menuOpen);
		burger.setAttribute("aria-expanded", menuOpen);
		document.body.classList.toggle("menu-open", menuOpen);

		if (menuOpen) {
			menuTl.play();
		} else {
			menuTl.reverse();
		}
	});

	links.forEach((link) => {
		link.addEventListener("click", () => {
			menuOpen = false;
			burger.classList.remove("active");
			burger.setAttribute("aria-expanded", "false");
		document.body.classList.remove("menu-open");
			menuTl.reverse();
		});
	});
}

function initWork() {
	gsap.fromTo(
		".work-title",
		{
			opacity: 0,
			y: 40,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power3.out",
			scrollTrigger: { trigger: ".work", start: "top 80%" },
		},
	);

	gsap.fromTo(
		".work-card",
		{
			opacity: 0,
			y: 60,
			scale: 0.95,
		},
		{
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 0.8,
			stagger: 0.12,
			ease: "power3.out",
			scrollTrigger: { trigger: ".work-bento", start: "top 80%" },
		},
	);

	initTilt();
}

function initTilt() {
	const cards = document.querySelectorAll("[data-tilt]:not([data-project])");
	const rectCache = new WeakMap();

	function getRect(card) {
		return rectCache.get(card);
	}

	function updateRects() {
		cards.forEach((card) => rectCache.set(card, card.getBoundingClientRect()));
	}

	updateRects();
	window.addEventListener("resize", updateRects);

	cards.forEach((card) => {
		const rxTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" });
		const ryTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" });
		gsap.set(card, { transformPerspective: 1000 });

		card.addEventListener("mousemove", (e) => {
			const rect = getRect(card);
			if (!rect) return;
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			rxTo(((y - centerY) / centerY) * -8);
			ryTo(((x - centerX) / centerX) * 8);
		});

		card.addEventListener("mouseleave", () => {
			rxTo(0);
			ryTo(0);
		});
	});
}

function initServices() {
	const track = document.querySelector(".services-track");
	const wrapper = document.querySelector(".services-track-wrapper");
	if (!track || !wrapper) return;

	gsap.fromTo(
		".services-label",
		{
			opacity: 0,
			y: 20,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			ease: "power3.out",
			scrollTrigger: { trigger: ".services", start: "top 80%" },
		},
	);

	gsap.fromTo(
		".services-line",
		{
			opacity: 0,
			y: 30,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.7,
			stagger: 0.1,
			ease: "power3.out",
			scrollTrigger: { trigger: ".services", start: "top 75%" },
		},
	);

	const mm = gsap.matchMedia();

	mm.add("(min-width: 769px)", () => {
		const inner = document.querySelector(".services-inner");
		if (!inner) return;

		const getScrollAmount = () => {
			return -(inner.scrollWidth - window.innerWidth);
		};

		gsap.to(inner, {
			x: getScrollAmount,
			ease: "none",
			scrollTrigger: {
				trigger: ".services",
				start: "top top",
				end: () => "+=" + Math.abs(getScrollAmount()),
				pin: true,
				scrub: 1,
				invalidateOnRefresh: true,
			},
		});
	});
}

function initProcess() {
	gsap.fromTo(
		".process-label",
		{
			opacity: 0,
			y: 20,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			ease: "power3.out",
			scrollTrigger: { trigger: ".process", start: "top 80%" },
		},
	);

	gsap.fromTo(
		".process-title",
		{
			opacity: 0,
			y: 30,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.7,
			ease: "power3.out",
			scrollTrigger: { trigger: ".process", start: "top 75%" },
			delay: 0.1,
		},
	);

	gsap.fromTo(
		".process-step",
		{
			opacity: 0,
			y: 40,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			stagger: 0.1,
			ease: "power3.out",
			scrollTrigger: { trigger: ".process-track", start: "top 80%" },
		},
	);
}

function initCta() {
	gsap.fromTo(
		".cta-label",
		{
			opacity: 0,
			y: 20,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			ease: "power3.out",
			scrollTrigger: { trigger: ".cta", start: "top 80%" },
		},
	);

	gsap.fromTo(
		".cta-line",
		{
			opacity: 0,
			y: 40,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			stagger: 0.1,
			ease: "power3.out",
			scrollTrigger: { trigger: ".cta", start: "top 75%" },
		},
	);

	gsap.fromTo(
		".cta-desc",
		{
			opacity: 0,
			y: 20,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			ease: "power3.out",
			scrollTrigger: { trigger: ".cta", start: "top 70%" },
			delay: 0.2,
		},
	);

	gsap.fromTo(
		".cta-form",
		{
			opacity: 0,
			y: 30,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.7,
			ease: "power3.out",
			scrollTrigger: { trigger: ".cta", start: "top 65%" },
		},
	);

	gsap.fromTo(
		".footer-card",
		{
			opacity: 0,
			y: 60,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power3.out",
			scrollTrigger: { trigger: ".footer", start: "top 85%" },
		},
	);

	gsap.fromTo(
		".footer-links-col",
		{
			opacity: 0,
			y: 20,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			stagger: 0.1,
			ease: "power3.out",
			scrollTrigger: { trigger: ".footer-main", start: "top 85%" },
		},
	);
}

function initHeaderScroll() {
	const header = document.getElementById("header");
	let lastScroll = 0;
	let ticking = false;

	window.addEventListener(
		"scroll",
		() => {
			if (menuOpen || ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				const current = window.scrollY;
				if (current > lastScroll && current > 100) {
					header.classList.add("hidden");
				} else {
					header.classList.remove("hidden");
				}
				lastScroll = current;
				ticking = false;
			});
		},
		{ passive: true },
	);
}

function initCursor() {
	const cursor = document.getElementById("cursor");
	const trail = document.getElementById("cursorTrail");
	if (!cursor || !trail) return;

	const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
	const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });
	const txTo = gsap.quickTo(trail, "x", { duration: 0.35, ease: "power3" });
	const tyTo = gsap.quickTo(trail, "y", { duration: 0.35, ease: "power3" });

	document.addEventListener("mousemove", (e) => {
		xTo(e.clientX - 3);
		yTo(e.clientY - 3);
		txTo(e.clientX - 12);
		tyTo(e.clientY - 12);
	});

	const hoverSelector = "a, button, [role=\"button\"], input, textarea, select, .work-card, .services-card, .menu-link, .form-submit, .slideover-close, .slideover-cta, .slideover-works";

	document.addEventListener("mouseover", (e) => {
		if (e.target.closest(hoverSelector)) {
			cursor.classList.add("hover");
			trail.classList.add("hover");
		}
	});

	document.addEventListener("mouseout", (e) => {
		if (e.target.closest(hoverSelector)) {
			cursor.classList.remove("hover");
			trail.classList.remove("hover");
		}
	});
}

const projects = {
	lendos: {
		tag: "Live",
		title: "iindev lendos",
		desc: "От 30К за лендинг - норма рынка. Мы сломали формат. Делаем сайт из ваших данных, даём демо, вы сами называете цену. Никаких обязательств до результата.",
		philosophy: [
			"Студии берут предоплату за обещание. Мы берём оплату за результат.",
			"Сначала делаем. Потом вы решаете, сколько это стоит. Если не стоит - не платите.",
			"Это не щедрость. Это стандарт, до которого рынок ещё не дошёл.",
		],
		list: [
			["Данные", "Из ваших соцсетей и карт"],
			["Демо", "Временно размещаем бесплатно"],
			["Оплата", "Любая сумма"],
			["Домен", "Вы покупаете"],
			["Код", "Полностью ваш"],
		],
		worksUrl: "works/lendos.html",
		worksText: "Смотреть работы",
		cta: "https://t.me/iindev",
		ctaText: "Хочу такой сайт",
	},
};

function initSlideover() {
	const slideover = document.getElementById("slideover");
	const backdrop = document.getElementById("slideoverBackdrop");
	const closeBtn = document.getElementById("slideoverClose");
	const content = document.getElementById("slideoverContent");

	function open(projectId) {
		const p = projects[projectId];
		if (!p) return;

		let listHtml = "";
		p.list.forEach(([key, value]) => {
			listHtml += `<div class="slideover-list-item"><span class="slideover-list-key">${key}</span><span class="slideover-list-value">${value}</span></div>`;
		});

		const worksHtml = p.worksUrl
			? `<a href="${p.worksUrl}" class="slideover-works" data-transition>${p.worksText} <span>\u2192</span></a>`
			: '';

		const philosophyHtml = p.philosophy
			? `<div class="slideover-philosophy">${p.philosophy.map(line => `<p>${line}</p>`).join('')}</div>`
			: '';

		content.innerHTML = `
			<span class="slideover-tag">${p.tag}</span>
			<h3 class="slideover-title">${p.title}</h3>
			<p class="slideover-desc">${p.desc}</p>
			<div class="slideover-list">${listHtml}</div>
			${philosophyHtml}
			${worksHtml}
			<a href="${p.cta}" class="slideover-cta" target="_blank">${p.ctaText} <span>\u2197</span></a>
		`;

		slideover.classList.add("active");
		document.body.classList.add("menu-open");
	}

	function close() {
		slideover.classList.remove("active");
		document.body.classList.remove("menu-open");
	}

	backdrop.addEventListener("click", close);
	closeBtn.addEventListener("click", close);

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && slideover.classList.contains("active")) close();
	});

	document.querySelectorAll("[data-project]").forEach((card) => {
		card.style.cursor = "pointer";
		card.addEventListener("click", () => open(card.dataset.project));
	});
}

const GAS_URL = "https://script.google.com/macros/s/AKfycbxzwm-NuZULK_iXCx5AVHYYzG372HkOAK1uhUSUrcgsJIjU1-bjrJApxVQ9f7Luv3yV/exec";

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

function initContact() {
	const form = document.getElementById("contact-form");
	if (!form) return;

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
		submitBtn.textContent = "Отправка...";
		loadingEl.style.display = "block";
		successEl.style.display = "none";
		errorEl.style.display = "none";

		try {
			const response = await fetch(GAS_URL, {
				method: "POST",
				body: JSON.stringify({
					name: name,
					phone: contact,
					type: "AI / сайт / SEO / настройка",
					message: msg,
				}),
			});

			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			const result = await response.json();

			if (result && result.success) {
				loadingEl.style.display = "none";
				successEl.style.display = "block";
				showToast("Заявка отправлена!");
				form.reset();
				setTimeout(() => { successEl.style.display = "none"; }, 6000);
			} else {
				throw new Error(result?.error || "Unknown error");
			}
		} catch (err) {
			console.error("Form submission error:", err);
			loadingEl.style.display = "none";
			errorEl.style.display = "block";
			showToast("Ошибка отправки. Попробуйте позже.");
		} finally {
			submitBtn.disabled = false;
			submitBtn.textContent = "Отправить";
		}
	});
}

function navigateWithTransition(url) {
	const overlay = document.createElement("div");
	overlay.className = "page-transition";
	overlay.innerHTML = '<span class="page-transition-logo">iind<span class="ev">ev</span></span>';
	document.body.appendChild(overlay);

	sessionStorage.setItem("iindev-transition", "1");

	gsap.fromTo(
		overlay,
		{ yPercent: 100 },
		{
			yPercent: 0,
			duration: 0.6,
			ease: "power3.inOut",
			onComplete: () => {
				window.location = url;
			},
		},
	);
}

document.addEventListener("click", (e) => {
	const link = e.target.closest("[data-transition]");
	if (link) {
		e.preventDefault();
		navigateWithTransition(link.getAttribute("href"));
	}
});
