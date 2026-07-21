/* ============================================
   PROFESSIONAL JAVASCRIPT (FINAL)
   ============================================ */

// ============================================
// 1. DARK / LIGHT MODE TOGGLE
// ============================================

const themeToggle = () => {
    const body = document.body;
    const currentTheme = localStorage.getItem("theme") || "dark";

    if (currentTheme === "light") {
        body.classList.add("light-theme");
    }

    const toggleBtn = document.createElement("button");
    toggleBtn.id = "theme-toggle";
    toggleBtn.innerHTML = currentTheme === "dark" ? "☀️" : "🌙";
    toggleBtn.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--surface);
        color: var(--text);
        border: 2px solid var(--border);
        border-radius: 50%;
        width: 52px;
        height: 52px;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 999;
        box-shadow: var(--shadow);
        transition: var(--transition);
    `;

    toggleBtn.addEventListener("mouseenter", () => {
        toggleBtn.style.transform = "scale(1.1)";
    });

    toggleBtn.addEventListener("mouseleave", () => {
        toggleBtn.style.transform = "scale(1)";
    });

    toggleBtn.addEventListener("click", () => {
        const isDark = body.classList.toggle("light-theme");
        localStorage.setItem("theme", isDark ? "light" : "dark");
        toggleBtn.innerHTML = isDark ? "🌙" : "☀️";
    });

    document.body.appendChild(toggleBtn);
};

// ============================================
// 2. TYPING EFFECT
// ============================================

const typingEffect = () => {
    const heroParagraph = document.querySelector("#home p");
    if (!heroParagraph) return;

    const originalText = heroParagraph.textContent;
    heroParagraph.textContent = "";

    let charIndex = 0;
    const typeSpeed = 50;

    const type = () => {
        if (charIndex < originalText.length) {
            heroParagraph.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(type, typeSpeed);
        }
    };

    setTimeout(type, 1000);
};

// ============================================
// 3. FORM VALIDATION (FIXED - Using Classes)
// ============================================

const validateForm = () => {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        let isValid = true;
        const errors = [];

        // Reset all borders and remove error classes
        [name, email, message].forEach((el) => {
            el.classList.remove("error", "success");
        });

        // Name validation
        if (!name.value.trim() || name.value.trim().length < 2) {
            isValid = false;
            errors.push("• Name must be at least 2 characters.");
            name.classList.add("error");
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
            isValid = false;
            errors.push("• Please enter a valid email address.");
            email.classList.add("error");
        }

        // Message validation
        if (!message.value.trim() || message.value.trim().length < 10) {
            isValid = false;
            errors.push("• Message must be at least 10 characters.");
            message.classList.add("error");
        }

        if (isValid) {
            alert(
                "✅ Message sent successfully!\n\nI will get back to you soon.",
            );
            form.reset();
            [name, email, message].forEach((el) => {
                el.classList.remove("error", "success");
            });
        } else {
            alert(`❌ Please fix these errors:\n\n${errors.join("\n")}`);
        }
    });

    // Real-time validation - remove error class on input
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            if (input.value.trim().length > 0) {
                input.classList.remove("error");
                input.classList.add("success");
            } else {
                input.classList.remove("success", "error");
            }
        });
    });
};

// ============================================
// 4. SMOOTH SCROLL
// ============================================

const smoothScroll = () => {
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
};

// ============================================
// 5. INITIALIZE
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Portfolio website initialized successfully!");
    themeToggle();
    typingEffect();
    validateForm();
    smoothScroll();
});

// ============================================
// 6. LIGHT THEME STYLES
// ============================================

const lightThemeStyles = `
    body.light-theme {
        --background: #f8f9fa;
        --surface: #ffffff;
        --text: #1a1a2e;
        --text-muted: #4a4a6a;
        --border: #e0e0e8;
        --shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    }
    
    body.light-theme .project-card {
        background: #f8f9fa;
    }
    
    body.light-theme input,
    body.light-theme textarea {
        background: #f8f9fa;
        color: #1a1a2e;
    }
    
    body.light-theme #home {
        background: linear-gradient(135deg, #ffffff 0%, #f0f0ff 100%);
    }
`;

const styleTag = document.createElement("style");
styleTag.textContent = lightThemeStyles;
document.head.appendChild(styleTag);

// ============================================
// 7. CONSOLE WELCOME
// ============================================

console.log(
    "%c👨‍💻 Portfolio Website | Sargodha's Developer",
    "font-size: 20px; font-weight: bold; color: #6c63ff;",
);
console.log(
    "%cBuilt with ❤️ using HTML, CSS & JavaScript",
    "font-size: 14px; color: #a0a0b8;",
);
console.log(
    "%cCheck out the code on GitHub!",
    "font-size: 14px; color: #6c63ff;",
);
