// Script commun à fr.html et en.html (la langue est lue dans <html lang="...">)
const lang = document.documentElement.lang === "en" ? "en" : "fr";

const messages = {
  fr: { success: "✔️ Message envoyé avec succès !", error: "❌ Erreur, veuillez réessayer." },
  en: { success: "✔️ Message sent successfully!", error: "❌ Error, please try again." }
};

// Apparition des blocs au défilement
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach(function(item) { revealObserver.observe(item); });
} else {
  revealItems.forEach(function(item) { item.classList.add("visible"); });
}

// Met en surbrillance le lien du menu correspondant à la section affichée
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach(function(section) {
    sectionObserver.observe(section);
  });
}

// Envoi du formulaire de contact via EmailJS
if (window.emailjs) {
  emailjs.init({ publicKey: "tiZ7Bjr5dRrHuvgAz" });
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const status = document.getElementById("message-status");

  if (!window.emailjs) {
    status.textContent = messages[lang].error;
    status.className = "status-error";
    return;
  }

  emailjs.sendForm("service_aofsma8", "template_gntcfms", this).then(
    function() {
      status.textContent = messages[lang].success;
      status.className = "status-success";
    },
    function(error) {
      status.textContent = messages[lang].error;
      status.className = "status-error";
      console.error(error);
    }
  );
});
