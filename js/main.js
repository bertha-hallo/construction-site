// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const headerNav = document.getElementById('headerNav');

if (mobileMenuToggle && headerNav) {
  mobileMenuToggle.addEventListener('click', () => {
    headerNav.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (headerNav.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (headerNav) {
      headerNav.classList.remove('active');
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
});

// Form Submission Handling
async function submitForm(form, formType = 'quote') {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Add form type and page info
  data.formType = formType;
  data.page = window.location.pathname;
  
  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('Thank you for your inquiry! We will get back to you within 24 hours.');
      form.reset();
      
      // Close modal if it's a pricing form
      const modal = document.getElementById('pricingModal');
      if (modal) {
        modal.style.display = 'none';
      }
    } else {
      alert('Error submitting form. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Error submitting form. Please try again.');
  }
}

const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm(quoteForm, 'quote');
  });
}

// Handle pricing forms in project pages
const pricingForm = document.getElementById('pricingForm');
if (pricingForm) {
  pricingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm(pricingForm, 'pricing');
  });
}

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// Learn More Toggle
function toggleLearnMore() {
  const content = document.getElementById('learnMoreContent');
  if (content.style.display === 'none') {
    content.style.display = 'block';
  } else {
    content.style.display = 'none';
  }
}