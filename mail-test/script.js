// Smooth scrolling
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// Start Free Button
function startFree() {
    alert("Welcome to ChatPlug AI! Your free trial is starting.");
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

            setTimeout(function () {
                slide.style.transition = "none";
                slide.classList.remove("prev");
                void slide.offsetWidth;
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
