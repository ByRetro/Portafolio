const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const navIndicator = document.querySelector(".nav-indicator");
const navLinksContainer = document.querySelector(".nav-links");


function moveIndicator(link) {

    const linkRect = link.getBoundingClientRect();
    const navRect = navLinksContainer.getBoundingClientRect();

    const linkCenter =
        linkRect.left - navRect.left + (linkRect.width / 2);

    navIndicator.style.left = `${linkCenter - 3}px`;
}


function setActiveLink(link) {

    navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
    });

    link.classList.add("active");

    moveIndicator(link);
}


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const activeLink = document.querySelector(
                    `.nav-links a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    setActiveLink(activeLink);
                }
            }

        });

    },
    {
        threshold: 0.45
    }
);


sections.forEach((section) => {
    observer.observe(section);
});


window.addEventListener("load", () => {

    const activeLink =
        document.querySelector(".nav-links a.active");

    if (activeLink) {
        moveIndicator(activeLink);
    }

});


window.addEventListener("resize", () => {

    const activeLink =
        document.querySelector(".nav-links a.active");

    if (activeLink) {
        moveIndicator(activeLink);
    }

});

const projectToggles = document.querySelectorAll(".project-toggle");

projectToggles.forEach((button) => {

    button.addEventListener("click", () => {

        const projectCard = button.closest(".project-card");
        const arrow = button.querySelector("span");

        projectCard.classList.toggle("open");

        if (projectCard.classList.contains("open")) {

            button.firstChild.textContent = "Cerrar proyecto ";
            arrow.textContent = "↑";

        } else {

            button.firstChild.textContent = "Ver proyecto ";
            arrow.textContent = "↓";

        }

    });

});


/* =========================
   FORMULARIO DE CONTACTO
========================= */

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".contact-submit");

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    formStatus.textContent = "";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            formStatus.textContent = "¡Mensaje enviado correctamente! Te responderé pronto.";
            formStatus.className = "form-status success";
            contactForm.reset();
        } else {
            throw new Error("Error al enviar el formulario");
        }

    } catch (error) {
        formStatus.textContent = "No se pudo enviar el mensaje. Inténtalo nuevamente.";
        formStatus.className = "form-status error";
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Enviar mensaje <i class="bi bi-arrow-up-right"></i>';
    }
});


/* =========================
   MODO OSCURO
========================= */

const themeToggle = document.querySelector(".theme-toggle");

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    themeToggle.innerHTML = isDark
        ? '<i class="bi bi-sun"></i>'
        : '<i class="bi bi-moon-stars"></i>';

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Activar modo claro" : "Activar modo oscuro"
    );

    themeToggle.setAttribute("aria-pressed", String(isDark));
}

const savedTheme = localStorage.getItem("sepuldev-theme");

applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-mode")
        ? "light"
        : "dark";

    applyTheme(nextTheme);
    localStorage.setItem("sepuldev-theme", nextTheme);
});

/* =========================
   MENÚ MÓVIL
========================= */

const menuToggle = document.querySelector(".menu-toggle");

function closeMobileMenu() {
    navLinksContainer.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");

    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
}

menuToggle.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});