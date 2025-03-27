document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        'English': {
            signIn: 'Sign In',
            seek: 'Seek',
            announcement: 'ANA[LOGE] ĐOGE will be live shortly! Follow us on X for immediate updates!',
            title: 'What would you like to know?',
            subtitle: 'Access trusted knowledge and real-time information instantly',
            placeholder: 'Ask anything...',
            feature1Title: 'Smart Queries',
            feature1Desc: 'Real-time accurate answers',
            feature2Title: 'Visual AI',
            feature2Desc: 'Advanced image analysis',
            feature3Title: '8 Languages',
            feature3Desc: 'Global accessibility',
            feature4Title: 'Privacy First',
            feature4Desc: 'Secure & private',
            privacy: 'Privacy',
            terms: 'Terms',
            cookies: 'Cookies',
            footerText: 'ANA[LOGE] ĐOGE is a revolutionary AI platform. All rights are reserved. API requests please contact api@analoge.ai'
        },
        'French': {
            signIn: 'Connexion',
            seek: 'Rechercher',
            announcement: 'ANA[LOGE] ĐOGE sera bientôt en ligne ! Suivez-nous sur X pour des mises à jour immédiates !',
            title: 'Que voulez-vous savoir ?',
            subtitle: 'Accédez instantanément à des connaissances fiables',
            placeholder: 'Posez votre question...',
            feature1Title: 'Requêtes Intelligentes',
            feature1Desc: 'Réponses précises en temps réel',
            feature2Title: 'IA Visuelle',
            feature2Desc: 'Analyse d\'images avancée',
            feature3Title: '8 Langues',
            feature3Desc: 'Accessibilité mondiale',
            feature4Title: 'Confidentialité',
            feature4Desc: 'Sécurisé et privé',
            privacy: 'Confidentialité',
            terms: 'Conditions',
            cookies: 'Cookies',
            footerText: 'ANA[LOGE] ĐOGE est une plateforme IA révolutionnaire. Tous droits réservés. Pour les demandes d\'API, contactez api@analoge.ai'
        },
        'German': {
            signIn: 'Anmelden',
            seek: 'Suchen',
            announcement: 'ANA[LOGE] ĐOGE wird in Kürze live gehen! Folgen Sie uns auf X für sofortige Updates!',
            title: 'Was möchten Sie wissen?',
            subtitle: 'Greifen Sie sofort auf vertrauenswürdiges Wissen zu',
            placeholder: 'Fragen Sie alles...',
            feature1Title: 'Intelligente Abfragen',
            feature1Desc: 'Echtzeitgenaue Antworten',
            feature2Title: 'Visuelle KI',
            feature2Desc: 'Fortgeschrittene Bildanalyse',
            feature3Title: '8 Sprachen',
            feature3Desc: 'Globale Zugänglichkeit',
            feature4Title: 'Datenschutz',
            feature4Desc: 'Sicher und privat',
            privacy: 'Datenschutz',
            terms: 'Bedingungen',
            cookies: 'Cookies',
            footerText: 'ANA[LOGE] ĐOGE ist eine revolutionäre KI-Plattform. Alle Rechte vorbehalten. API-Anfragen bitte an api@analoge.ai'
        }
    };

    const languageButtons = document.querySelectorAll('.language-btn');
    
    function updateLanguage(language) {
        if (!translations[language]) return;
        
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[language][key]) {
                if (element.tagName === 'INPUT') {
                    element.placeholder = translations[language][key];
                } else {
                    element.textContent = translations[language][key];
                }
            }
        });
    }

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateLanguage(button.textContent);
        });
    });

    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});

// AI Chat Logic for main input field
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const responseBox = document.getElementById("chat-response");

  searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const message = searchInput.value.trim();
      if (!message) return;

      responseBox.textContent = "Thinking...";
      searchInput.disabled = true;

      try {
        const res = await fetch("https://your-backend-url.com/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });

        const data = await res.json();
        responseBox.textContent = data.reply || "No response from AI.";
      } catch (err) {
        responseBox.textContent = "Error talking to AI.";
      } finally {
        searchInput.disabled = false;
      }
    }
  });
});
