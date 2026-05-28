/* Hallmark · Marquee Hero + Long Document · minimal JS
 * Form · Privacy · Toast · Smooth scroll
 */

const GAS_URL = 'https://script.google.com/macros/s/AKfycbxzwm-NuZULK_iXCx5AVHYYzG372HkOAK1uhUSUrcgsJIjU1-bjrJApxVQ9f7Luv3yV/exec';

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

// ===== CONTACT FORM =====
function initContact() {
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
		submitBtn.textContent = "Отправка...";
		loadingEl.style.display = "flex";
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
			submitBtn.textContent = "Отправить";
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
		target.scrollIntoView({ behavior: "smooth", block: "start" });
	});
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
	initContact();
	initPrivacy();
	initSmoothScroll();
});
