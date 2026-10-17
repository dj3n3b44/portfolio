// Script commun à fr.html et en.html (la langue est lue dans <html lang="...">)
const lang = document.documentElement.lang === "en" ? "en" : "fr";

const messages = {
  fr: { success: "✔️ Message envoyé avec succès !", error: "❌ Erreur, veuillez réessayer." },
  en: { success: "✔️ Message sent successfully!", error: "❌ Error, please try again." }
};

emailjs.init({ publicKey: "tiZ7Bjr5dRrHuvgAz" });

// Navigation
function showSection(id) {
  document.querySelectorAll("section").forEach(s => {
    if (s.id !== "avatar-section") {
      s.classList.add("hidden");
    }
  });
  document.getElementById(id).classList.remove("hidden");
}

// Affiche la section Projets puis défile jusqu'à la carte demandée
function allerVersCarte(idCarte) {
  showSection("projets");
  setTimeout(function() {
    document.getElementById(idCarte).scrollIntoView({ behavior: "smooth", block: "start" });
  }, 150);
}

// Section "À propos" affichée par défaut
showSection("intro");

// Envoi du formulaire de contact via EmailJS
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const status = document.getElementById("message-status");

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
