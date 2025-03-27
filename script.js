// Add this after your existing code
const modal = document.getElementById("manifestoModal");
const btn = document.getElementById("manifestoBtn");
const span = document.getElementsByClassName("close")[0];
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

    // Check if modal elements exist before trying to use them
    if (btn) {
        btn.onclick = function() {
            if (modal) modal.style.display = "block";
        }
    }
    
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
        
        // Update Botpress chat language if the widget is initialized
        if (window.botpress && typeof window.botpress.setLanguage === 'function') {
            // Map your language names to Botpress language codes if needed
            const botpressLangMap = {
                'English': 'en',
                'French': 'fr',
                'German': 'de',
                'Spanish': 'es',
                'Japanese': 'ja',
                'Korean': 'ko',
                'Simplified Chinese': 'zh',
                'Hindi': 'hi'
            };
            
            const bpLang = botpressLangMap[language] || 'en';
            window.botpress.setLanguage(bpLang);
        }
    }

    if (span) {
        span.onclick = function() {
            if (modal) modal.style.display = "none";
        }
    }
    
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateLanguage(button.textContent);
        });
    });

    if (modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get the search input value
            const searchInput = searchForm.querySelector('.search-input');
            if (searchInput && searchInput.value.trim()) {
                // Send the search query to Botpress chat
                if (window.botpress && typeof window.botpress.sendMessage === 'function') {
                    window.botpress.sendMessage(searchInput.value.trim());
                    searchInput.value = ''; // Clear the input after sending
                }
            }
        });
    }
    
    // Listen for Botpress chat events
    if (window.botpress) {
        window.botpress.on('message:received', (event) => {
            console.log('Message received from bot:', event);
        });
        
        window.botpress.on('message:sent', (event) => {
            console.log('Message sent to bot:', event);
        });
    }
});
