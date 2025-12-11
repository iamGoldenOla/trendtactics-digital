// Growth & Conversion Features for Trendtactics Digital
// Includes chatbot, exit-intent popups, push notifications, and referral system

(function() {
    'use strict';
    
    // ===== EXIT-INTENT POPUP =====
    function initExitIntentPopup() {
        let exitIntentShown = localStorage.getItem('exitIntentShown') === 'true';
        if (exitIntentShown) return;
        
        let mouseY = 0;
        document.addEventListener('mouseout', (e) => {
            if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
                showExitIntentPopup();
            }
        });
        
        function showExitIntentPopup() {
            const popup = document.createElement('div');
            popup.id = 'exit-intent-popup';
            popup.innerHTML = `
                <div class="exit-popup-overlay"></div>
                <div class="exit-popup-content">
                    <button class="exit-popup-close" aria-label="Close">&times;</button>
                    <div class="exit-popup-body">
                        <h3>Wait! Don't Miss Out</h3>
                        <p>Get our FREE Digital Marketing Guide and unlock the secrets to 3x your online growth!</p>
                        <form class="exit-popup-form" data-newsletter data-source="exit-intent">
                            <input type="email" placeholder="Enter your email" required>
                            <button type="submit">Get Free Guide</button>
                        </form>
                        <p class="exit-popup-note">Join 10,000+ marketers getting exclusive insights</p>
                    </div>
                </div>
            `;
            
            popup.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                .exit-popup-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(10, 30, 63, 0.9);
                    backdrop-filter: blur(5px);
                }
                .exit-popup-content {
                    position: relative;
                    background: white;
                    padding: 2rem;
                    border-radius: 16px;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    animation: slideUp 0.3s ease;
                }
                .exit-popup-close {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                    line-height: 1;
                }
                .exit-popup-body h3 {
                    margin-top: 0;
                    color: #0A1E3F;
                    font-size: 1.5rem;
                }
                .exit-popup-body p {
                    color: #666;
                    margin-bottom: 1.5rem;
                }
                .exit-popup-form {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 1rem;
                }
                .exit-popup-form input {
                    flex: 1;
                    padding: 12px;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                }
                .exit-popup-form button {
                    padding: 12px 24px;
                    background: #00FFFF;
                    color: #0A1E3F;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .exit-popup-note {
                    font-size: 0.85rem;
                    color: #999;
                    margin: 0;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(popup);
            
            popup.querySelector('.exit-popup-close').addEventListener('click', () => {
                popup.remove();
                localStorage.setItem('exitIntentShown', 'true');
            });
            
            popup.querySelector('.exit-popup-overlay').addEventListener('click', () => {
                popup.remove();
                localStorage.setItem('exitIntentShown', 'true');
            });
            
            localStorage.setItem('exitIntentShown', 'true');
        }
    }
    
    // ===== LIGHTWEIGHT CHATBOT/FAQ ASSISTANT =====
    function initChatbot() {
        const chatbotBtn = document.createElement('button');
        chatbotBtn.id = 'chatbot-toggle';
        chatbotBtn.innerHTML = '<i class="fas fa-comments"></i>';
        chatbotBtn.setAttribute('aria-label', 'Open chat');
        chatbotBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #00FFFF;
            color: #0A1E3F;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 9999;
            transition: transform 0.3s ease;
        `;
        
        chatbotBtn.addEventListener('mouseenter', () => {
            chatbotBtn.style.transform = 'scale(1.1)';
        });
        chatbotBtn.addEventListener('mouseleave', () => {
            chatbotBtn.style.transform = 'scale(1)';
        });
        
        const chatbotWindow = document.createElement('div');
        chatbotWindow.id = 'chatbot-window';
        chatbotWindow.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            max-height: 500px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            z-index: 9998;
            overflow: hidden;
        `;
        
        chatbotWindow.innerHTML = `
            <div style="background: #0A1E3F; color: white; padding: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin: 0;">How can we help?</h4>
                <button id="chatbot-close" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <div id="chatbot-messages" style="padding: 1rem; flex: 1; overflow-y: auto; max-height: 350px;">
                <div class="chat-message bot">
                    <p>Hi! I'm here to help. Ask me about our services, pricing, or how we can help grow your business.</p>
                </div>
            </div>
            <div style="padding: 1rem; border-top: 1px solid #eee;">
                <div style="display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap;">
                    <button class="quick-question" data-question="What services do you offer?">Services</button>
                    <button class="quick-question" data-question="How much does it cost?">Pricing</button>
                    <button class="quick-question" data-question="How do I get started?">Get Started</button>
                </div>
                <form id="chatbot-form" style="display: flex; gap: 10px;">
                    <input type="text" placeholder="Type your question..." style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 8px;">
                    <button type="submit" style="padding: 8px 16px; background: #00FFFF; color: #0A1E3F; border: none; border-radius: 8px; cursor: pointer;">Send</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(chatbotBtn);
        document.body.appendChild(chatbotWindow);
        
        const faqAnswers = {
            'services': 'We offer Web Development, App Development, Digital Marketing, Email Marketing, Social Media Marketing, Content Creation, and Facebook Ads. Visit our services page to learn more!',
            'pricing': 'Our pricing varies by service. Web Development starts at $2,500, Digital Marketing from $1,500, and we offer custom packages. Contact us for a personalized quote!',
            'get started': 'Getting started is easy! Click "Get Started" in the navigation, choose between Client Dashboard or Academy, and we\'ll guide you through the process.',
            'contact': 'You can reach us through our contact page, email us directly, or schedule a free consultation. We\'re here to help!'
        };
        
        chatbotBtn.addEventListener('click', () => {
            const isVisible = chatbotWindow.style.display === 'flex';
            chatbotWindow.style.display = isVisible ? 'none' : 'flex';
        });
        
        document.getElementById('chatbot-close').addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
        });
        
        document.querySelectorAll('.quick-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                handleChatbotQuestion(question);
            });
        });
        
        document.getElementById('chatbot-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const input = e.target.querySelector('input[type="text"]');
            const question = input.value.trim();
            if (question) {
                handleChatbotQuestion(question);
                input.value = '';
            }
        });
        
        function handleChatbotQuestion(question) {
            const messagesDiv = document.getElementById('chatbot-messages');
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user';
            userMsg.innerHTML = `<p><strong>You:</strong> ${question}</p>`;
            userMsg.style.cssText = 'text-align: right; margin-bottom: 10px;';
            messagesDiv.appendChild(userMsg);
            
            // Simple keyword matching for responses
            const lowerQuestion = question.toLowerCase();
            let answer = 'Thanks for your question! Our team will get back to you soon. In the meantime, feel free to explore our website or contact us directly.';
            
            if (lowerQuestion.includes('service')) {
                answer = faqAnswers.services;
            } else if (lowerQuestion.includes('price') || lowerQuestion.includes('cost')) {
                answer = faqAnswers.pricing;
            } else if (lowerQuestion.includes('start') || lowerQuestion.includes('begin')) {
                answer = faqAnswers['get started'];
            } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach')) {
                answer = faqAnswers.contact;
            }
            
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot';
                botMsg.innerHTML = `<p><strong>Assistant:</strong> ${answer}</p>`;
                botMsg.style.cssText = 'margin-bottom: 10px;';
                messagesDiv.appendChild(botMsg);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }, 500);
        }
    }
    
    // ===== PUSH NOTIFICATIONS (Browser API) =====
    function initPushNotifications() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            // Request permission
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Push notifications enabled');
                }
            });
        }
    }
    
    // ===== REFERRAL SYSTEM =====
    function initReferralSystem() {
        // Generate referral link
        function generateReferralLink(userId) {
            const baseUrl = window.location.origin;
            return `${baseUrl}/?ref=${userId}`;
        }
        
        // Track referrals
        function trackReferral() {
            const urlParams = new URLSearchParams(window.location.search);
            const refId = urlParams.get('ref');
            if (refId) {
                localStorage.setItem('referral_source', refId);
                localStorage.setItem('referral_date', new Date().toISOString());
                
                // Track in analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'referral', {
                        'event_category': 'acquisition',
                        'event_label': refId
                    });
                }
            }
        }
        
        trackReferral();
        
        // Export referral functions
        window.ReferralSystem = {
            generateLink: generateReferralLink,
            track: trackReferral
        };
    }
    
    // Initialize all features
    function init() {
        // Only show exit intent on homepage and blog pages
        if (window.location.pathname === '/' || 
            window.location.pathname.includes('/blog')) {
            setTimeout(initExitIntentPopup, 3000); // Show after 3 seconds
        }
        
        initChatbot();
        initPushNotifications();
        initReferralSystem();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

