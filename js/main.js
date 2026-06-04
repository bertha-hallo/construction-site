// ================= HAMBURGER MENU TOGGLE =================
const hamburger = document.querySelector(".hamburger");
const headerNav = document.querySelector(".header-nav");
const navLinks = document.querySelectorAll(".nav-list a");

if (hamburger && headerNav) {
  // Toggle menu open/close
  hamburger.addEventListener("click", () => {
    headerNav.classList.toggle("active");   // slide nav in/out
    hamburger.classList.toggle("open");     // animate spans into X
  });

  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault(); // stop default jump

      // Get target section ID from href
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }

      // Close menu after navigation
      headerNav.classList.remove("active");
      hamburger.classList.remove("open");
    });
  });
}


// ================= FORM SUBMISSION HANDLING =================
async function submitForm(form, formType = "quote") {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Add form type and page info
  data.formType = formType;
  data.page = window.location.pathname;

  try {
    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      alert("Thank you for your inquiry! We will get back to you within 24 hours.");
      form.reset();

      // Close modal if it's a pricing form
      const modal = document.getElementById("pricingModal");
      if (modal) modal.style.display = "none";
    } else {
      alert("Error submitting form. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Error submitting form. Please try again.");
  }
}

// Quote form
const quoteForm = document.getElementById("quoteForm");
if (quoteForm) {
  quoteForm.addEventListener("submit", e => {
    e.preventDefault();
    submitForm(quoteForm, "quote");
  });
}

// Pricing form (project pages)
const pricingForm = document.getElementById("pricingForm");
if (pricingForm) {
  pricingForm.addEventListener("submit", e => {
    e.preventDefault();
    submitForm(pricingForm, "pricing");
  });
}

// ================= FAQ ACCORDION =================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const button = item.querySelector(".faq-question");
  button.addEventListener("click", () => {
    // Close other items if you want accordion behavior
    faqItems.forEach(i => {
      if (i !== item) i.classList.remove("active");
    });
    // Toggle current item
    item.classList.toggle("active");

    // Toggle plus/minus icon
    const icon = button.querySelector(".faq-icon");
    if (item.classList.contains("active")) {
      icon.textContent = "−";
    } else {
      icon.textContent = "+";
    }
  });
});

// ================= LEARN MORE TOGGLE =================
function toggleLearnMore() {
  const content = document.getElementById("learnMoreContent");
  if (content) {
    content.style.display = (content.style.display === "none" || !content.style.display)
      ? "block"
      : "none";
  }
}

