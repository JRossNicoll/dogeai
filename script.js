// Consolidated script.js with Botpress integration
document.addEventListener('DOMContentLoaded', () => {
    // Translations configuration
    const translations = {
        'English': {
            signIn: 'Sign In',
            seek: 'Seek',
            announcement: 'OFFICIAL API LINKED VIA API.DOGE.GOV/DOCS',
            title: 'The FIRST and ONLY Autonomous Ai DOGE Agent.',
            subtitle: 'DOGE Agent is integrated with the official DOGE.GOV api (api.doge.gov/docs) and is currently in BETA.',
            placeholder: 'Ask anything...',
            feature1Title: 'Clone anything.',
            feature1Desc: 'Clone any website or BOT.',
            feature2Title: 'Complex Solutions',
            feature2Desc: 'Literally no question or task is too complex',
            feature3Title: 'No backends',
            feature3Desc: 'We have internal API\'s for backend creations',
            feature4Title: 'No Restrictions',
            feature4Desc: 'This means NONE. NSFW, Tornado Cash clones. All open',
            privacy: 'Twitter',
            terms: 'DOGE',
            cookies: 'Cookies',
            footerText: 'DOGE Agent has no restrictions, however anyone affiliated with this website is in no way apart of what it\'s individuals users generate via their chat interactions.'
        },
        'French': {
            signIn: 'Connexion',
            seek: 'Rechercher',
            announcement: 'API OFFICIELLE LIÉE VIA API.DOGE.GOV/DOCS',
            title: 'Le PREMIER et UNIQUE Agent Ai DOGE Autonome.',
            subtitle: 'DOGE Agent est intégré à l\'API officielle DOGE.GOV (api.doge.gov/docs) et est actuellement en BETA.',
            placeholder: 'Posez votre question...',
            feature1Title: 'Clonez tout.',
            feature1Desc: 'Clonez n\'importe quel site Web ou BOT.',
            feature2Title: 'Solutions Complexes',
            feature2Desc: 'Littéralement aucune question ou tâche n\'est trop complexe',
            feature3Title: 'Aucun backend',
            feature3Desc: 'Nous avons des API internes pour les créations backend',
            feature4Title: 'Aucune Restriction',
            feature4Desc: 'Cela signifie AUCUNE. NSFW, clones Tornado Cash. Tout est ouvert',
            privacy: 'Twitter',
            terms: 'DOGE',
            cookies: 'Cookies',
            footerText: 'DOGE Agent n\'a aucune restriction, cependant toute personne affiliée à ce site Web n\'est en aucun cas responsable de ce que ses utilisateurs individuels génèrent via leurs interactions de chat.'
        },
        'German': {
            signIn: 'Anmelden',
            seek: 'Suchen',
            announcement: 'OFFIZIELLE API VERKNÜPFT ÜBER API.DOGE.GOV/DOCS',
            title: 'Der ERSTE und EINZIGE autonome Ai DOGE Agent.',
            subtitle: 'DOGE Agent ist mit der offiziellen DOGE.GOV API (api.doge.gov/docs) integriert und befindet sich derzeit in der BETA-Phase.',
            placeholder: 'Fragen Sie alles...',
            feature1Title: 'Klonen Sie alles.',
            feature1Desc: 'Klonen Sie jede Website oder BOT.',
            feature2Title: 'Komplexe Lösungen',
            feature2Desc: 'Buchstäblich keine Frage oder Aufgabe ist zu komplex',
            feature3Title: 'Keine Backends',
            feature3Desc: 'Wir haben interne APIs für Backend-Erstellungen',
            feature4Title: 'Keine Einschränkungen',
            feature4Desc: 'Das bedeutet KEINE. NSFW, Tornado Cash-Klone. Alles offen',
            privacy: 'Twitter',
            terms: 'DOGE',
            cookies: 'Cookies',
            footerText: 'DOGE Agent hat keine Einschränkungen, jedoch ist niemand, der mit dieser Website verbunden ist, in irgendeiner Weise Teil dessen, was seine einzelnen Benutzer über ihre Chat-Interaktionen generieren.'
        }
    };

    // Check for modal elements
    const modal = document.getElementById("manifestoModal");
    const btn = document.getElementById("manifestoBtn");
    const span = document.getElementsByClassName("close")[0];
    
    // Set up modal functionality if elements exist
    if (btn && modal) {
        btn.onclick = function() {
            modal.style.display = "block";
        }
    }
    
    if (span && modal) {
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // Language switcher functionality
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
        
        // Update Botpress chat language if available
        if (window.botpress && typeof window.botpress.setLanguage === 'function') {
            // Map your language names to Botpress language codes
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
    
    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateLanguage(button.textContent);
        });
    });

    // Handle search form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get search input
            const searchInput = searchForm.querySelector('.search-input');
            if (searchInput && searchInput.value.trim()) {
                // If Botpress is available, send message there
                if (window.botpress && typeof window.botpress.sendMessage === 'function') {
                    window.botpress.sendMessage(searchInput.value.trim());
                    searchInput.value = ''; // Clear the input after sending
                } 
                // Otherwise use your custom API
                else {
                    const message = searchInput.value.trim();
                    const responseBox = document.getElementById("chat-response");
                    
                    if (responseBox) {
                        responseBox.textContent = "Thinking...";
                        searchInput.disabled = true;
                        
                        fetch("https://dogeapi-backend-git-main-ross-projects-7c9ae996.vercel.app/api/chat", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ message }),
                        })
                        .then(res => res.json())
                        .then(data => {
                            responseBox.textContent = data.reply || "No response from AI.";
                        })
                        .catch(err => {
                            responseBox.textContent = "Error talking to AI.";
                        })
                        .finally(() => {
                            searchInput.disabled = false;
                        });
                    }
                }
            }
        });
    }

    // Initialize Botpress if available
    console.log("Checking for Botpress...");
    if (window.botpress) {
        console.log("Botpress found, initializing...");
        
        // Listen for Botpress events
        window.botpress.on('webchat:ready', () => {
            console.log('Botpress webchat is ready');
            window.botpress.open();
        });
        
        window.botpress.on('message:received', (event) => {
            console.log('Message received from bot:', event);
        });
        
        window.botpress.on('message:sent', (event) => {
            console.log('Message sent to bot:', event);
        });
        
        // Initialize Botpress with your configuration
        try {
            window.botpress.init({
                "botId": "0264c17b-ec9d-4d6a-abb2-7f0e4ed972b4",
                "configuration": {
                    "botName": "DOGE AGENT",
                    "botDescription": "The First ever DOGE AGENT.",
                    "website": {},
                    "email": {},
                    "phone": {},
                    "termsOfService": {},
                    "privacyPolicy": {},
                    "color": "#ffc53d",
                    "variant": "soft",
                    "themeMode": "dark",
                    "fontFamily": "fira",
                    "radius": 0.5,
                    "showPoweredBy": false,
                    "additionalStylesheetUrl": "https://files.bpcontent.cloud/2025/03/27/21/20250327211843-O4T2Z507.css",
                    "allowFileUpload": true
                },
                "clientId": "68733f00-c04c-47b8-a853-318c249b8931",
                "selector": "#webchat"
            });
            console.log("Botpress initialization complete");
        } catch (e) {
            console.error("Error initializing Botpress:", e);
        }
    } else {
        console.warn("Botpress is not available");
    }
});
