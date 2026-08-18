// Smooth scrolling
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// Start Free Button
function startFree() {
    scrollToSection("contact");
}

// Demo Button
function showDemo() {
    alert("Demo video will be available here.");
}

// Pricing Plan
function choosePlan(plan) {
    alert("You selected the " + plan + " plan.");
}

// FAQ
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const allItems =
        document.querySelectorAll(".faq-item");
    allItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove("active");
        }
    });
    faqItem.classList.toggle("active");
}

// Chatbot Demo
function sendMessage() {
    const input =
        document.getElementById("chatInput");
    const text = input.value.trim();
    if (text === "") {
        return;
    }
    const chatBody =
        document.querySelector(".chat-body");
    // User message
    const userMessage =
        document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = text;
    chatBody.insertBefore(
        userMessage,
        document.querySelector(".chat-input")
    );
    // Bot response
    setTimeout(function () {
        const botMessage =
            document.createElement("div");
        botMessage.className = "message bot";
        botMessage.textContent =
            "Thanks for your message! Our AI assistant can help you with that.";
        chatBody.insertBefore(
            botMessage,
            document.querySelector(".chat-input")
        );
    }, 600);
    input.value = "";
}

// Hamburger Menu Toggle (mobile navigation)
function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const hamburger = document.getElementById("hamburger");
    nav.classList.toggle("active");
    hamburger.classList.toggle("active");
}

// Close mobile menu after clicking a nav link
function closeMenu() {
    const nav = document.getElementById("mainNav");
    const hamburger = document.getElementById("hamburger");
    nav.classList.remove("active");
    hamburger.classList.remove("active");
}

// Contact Form Submission (real email via PHP + Gmail SMTP)
function submitContactForm(event) {
    event.preventDefault();

    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const phone = document.getElementById("cPhone").value.trim();
    const message = document.getElementById("cMessage").value.trim();
    const submitBtn = event.target.querySelector("button[type='submit']");

  if (name === "" || email === "" || phone === "" || message === "") {
        alert("Please fill out all fields before sending.");
        return;
    }

    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    fetch("send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message })
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                alert("Thanks, " + name + "! Your message has been sent. We'll get back to you soon.");
                document.getElementById("contactForm").reset();
            } else {
                alert("Sorry, something went wrong: " + data.message);
            }
        })
        .catch(function (error) {
            console.error("Contact form error:", error);
            alert("Sorry, something went wrong sending your message. Please try again.");
        })
        .finally(function () {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
}
// ============ CHAT CAROUSEL AUTO-SLIDE ============
let currentSlide = 0;
const totalSlides = 8;

function goToSlide(index) {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");

    slides.forEach(function (slide, i) {
        if (i === index) {
            slide.classList.remove("prev");
            slide.classList.add("active");
        } else if (i === currentSlide) {
            slide.classList.remove("active");
            slide.classList.add("prev");

            // After the slide-out animation finishes, snap it back
            // to the right side instantly (no animation) so it's
            // ready to slide in correctly next time.
            setTimeout(function () {
                slide.style.transition = "none";
                slide.classList.remove("prev");
                void slide.offsetWidth; // force reflow
                slide.style.transition = "";
            }, 700);
        }
    });

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });
    dots[index].classList.add("active");

    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);
// ============ NAVBAR SCROLL + ACTIVE LINK ============
const navbarEl = document.querySelector(".navbar");
const navLinks = document.querySelectorAll("#mainNav a");
const sectionsWithId = document.querySelectorAll("section[id]");

function handleNavbarScroll() {
    if (window.scrollY > 30) {
        navbarEl.classList.add("scrolled");
    } else {
        navbarEl.classList.remove("scrolled");
    }
}

function handleActiveLink() {
    let current = "";
    sectionsWithId.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active-link");
        }
    });
}

window.addEventListener("scroll", function () {
    handleNavbarScroll();
    handleActiveLink();
});


// ============ STATS COUNT-UP ============
function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count"));
    const suffix = el.getAttribute("data-suffix") || "";
    const noDecimal = el.hasAttribute("data-no-decimal");
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;

        el.textContent = (noDecimal ? Math.round(value) : value.toFixed(target % 1 !== 0 ? 1 : 0)) + suffix;

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = (noDecimal ? target : (target % 1 !== 0 ? target.toFixed(1) : target)) + suffix;
        }
    }

    requestAnimationFrame(tick);
}

const statEls = document.querySelectorAll(".stats strong[data-count]");
const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statEls.forEach(function (el) {
    statsObserver.observe(el);
});


// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(function (el) {
    revealObserver.observe(el);
});


// ============ BACK TO TOP ============
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
// ============ PRELOADER ============
window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    setTimeout(function () {
        preloader.classList.add("hide");
    }, 400);
});


// ============ CURSOR GLOW (hero section only) ============
const cursorGlow = document.getElementById("cursorGlow");
const heroSection = document.querySelector(".hero");

if (heroSection && cursorGlow) {
    heroSection.addEventListener("mousemove", function (e) {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
        cursorGlow.classList.add("show");
    });
    heroSection.addEventListener("mouseleave", function () {
        cursorGlow.classList.remove("show");
    });
}


// ============ MOBILE MENU OVERLAY (extends existing toggleMenu/closeMenu) ============
const navOverlayEl = document.getElementById("navOverlay");

const _originalToggleMenu = toggleMenu;
toggleMenu = function () {
    _originalToggleMenu();
    if (navOverlayEl) navOverlayEl.classList.toggle("show");
};

const _originalCloseMenu = closeMenu;
closeMenu = function () {
    _originalCloseMenu();
    if (navOverlayEl) navOverlayEl.classList.remove("show");
};


// ============ PRIORITY CHAIN — CLICK TO EXPAND ============
function toggleChainDetail(card) {
    const wasExpanded = card.classList.contains("expanded");
    document.querySelectorAll(".chain-card").forEach(function (c) {
        c.classList.remove("expanded");
    });
    if (!wasExpanded) {
        card.classList.add("expanded");
    }
}


// ============ PRICING — MONTHLY / YEARLY TOGGLE ============
function toggleBilling() {
    const sw = document.getElementById("billingSwitch");
    const monthlyLabel = document.getElementById("monthlyLabel");
    const yearlyLabel = document.getElementById("yearlyLabel");
    const isYearly = sw.classList.toggle("on");

    monthlyLabel.classList.toggle("active", !isYearly);
    yearlyLabel.classList.toggle("active", isYearly);

    document.querySelectorAll(".price-amount").forEach(function (el) {
        const value = isYearly ? el.getAttribute("data-yearly") : el.getAttribute("data-monthly");
        el.textContent = value;
    });
}


// ============ CONTACT FORM — TOAST (overrides alert-based success) ============
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    toastMessage.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 3500);
}


// ============ VIDEO MODAL (overrides showDemo alert) ============
function showDemo() {
    document.getElementById("videoModal").classList.add("show");
}

function closeDemo() {
    document.getElementById("videoModal").classList.remove("show");
}


// ============ DARK MODE TOGGLE ============
function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    document.getElementById("darkToggle").textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("chatplug-dark-mode", isDark ? "1" : "0");
}

(function initDarkMode() {
    if (localStorage.getItem("chatplug-dark-mode") === "1") {
        document.body.classList.add("dark-mode");
        window.addEventListener("DOMContentLoaded", function () {
            const btn = document.getElementById("darkToggle");
            if (btn) btn.textContent = "☀️";
        });
    }
})();


// ============ CONTACT FORM — override to use toast instead of alert on success ============
function submitContactForm(event) {
    event.preventDefault();

    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const phone = document.getElementById("cPhone").value.trim();
    const message = document.getElementById("cMessage").value.trim();
    const submitBtn = event.target.querySelector("button[type='submit']");

    if (name === "" || email === "" || phone === "" || message === "") {
        alert("Please fill out all fields before sending.");
        return;
    }

    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    fetch("send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message })
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data.success) {
                showToast("Thanks, " + name + "! Your message has been sent.");
                document.getElementById("contactForm").reset();
            } else {
                alert("Sorry, something went wrong: " + data.message);
            }
        })
        .catch(function (error) {
            console.error("Contact form error:", error);
            alert("Sorry, something went wrong sending your message. Please try again.");
        })
        .finally(function () {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
}
// ============ BENEFITS — ANIMATED DASHBOARD (live counters + bars) ============
(function () {
    let chats = 12845;
    let leads = 3284;
    const barIds = ["dashBar1", "dashBar2", "dashBar3", "dashBar4", "dashBar5", "dashBar6", "dashBar7"];

    function flash(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.add("flash-active");
        setTimeout(function () {
            el.classList.remove("flash-active");
        }, 400);
    }

    const dashChatsEl = document.getElementById("dashChats");
    if (!dashChatsEl) return; // Benefits dashboard not on this page, skip

    setInterval(function () {
        chats += Math.floor(Math.random() * 4) + 1;
        leads += Math.random() < 0.4 ? 1 : 0;

        document.getElementById("dashChats").textContent = chats.toLocaleString();
        document.getElementById("dashLeads").textContent = leads.toLocaleString();
        flash("dashChats");

        const randomBar = barIds[Math.floor(Math.random() * barIds.length)];
        const barEl = document.getElementById(randomBar);
        if (barEl) {
            barEl.style.height = (35 + Math.random() * 65).toFixed(0) + "%";
        }
    }, 2200);
})();
