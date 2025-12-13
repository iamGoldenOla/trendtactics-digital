// Trendtactics Digital Chat Widget
// Extracted from growth-features.js for global use

(function () {
    'use strict';

    // ===== LIGHTWEIGHT CHATBOT/FAQ ASSISTANT =====
    function initChatbot() {
        // Prevent duplicate initialization
        if (document.getElementById('chatbot-toggle')) return;

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

    // Initialize logic
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();
