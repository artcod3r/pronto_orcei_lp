/**
 * ProntoOrcei - Scripts Principais da Aplicação
 * Gerenciamento de ícones Lucide, consentimento LGPD e telemetria (GA4/GTM).
 */

// Inicialização imediata de ícones Lucide se o script já estiver disponível
if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', function () {
  // Re-executa Lucide para garantir que todos os elementos do DOM sejam processados
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // 1. Gerenciamento do Banner de Consentimento LGPD
  var consentBanner = document.getElementById('cookie-consent-banner');
  var acceptBtn = document.getElementById('accept-cookies-btn');
  var consentKey = 'prontoorcei_cookie_consent_v1';

  if (!localStorage.getItem(consentKey)) {
    if (consentBanner) {
      consentBanner.classList.remove('hidden');
    }
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem(consentKey, 'granted');
      if (consentBanner) {
        consentBanner.classList.add('hidden');
      }
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      }
    });
  }

  // Função utilitária para envio de eventos para GTM e GA4
  function sendGoogleEvent(eventName, params) {
    // Envio para DataLayer do Google Tag Manager (GTM)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: eventName }, params));

    // Envio direto para o Google Analytics 4 (gtag.js)
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  // 2. Rastreamento de CTAs e Botões de Download do Aplicativo
  document.addEventListener('click', function (e) {
    var trackEl = e.target.closest('[data-track-event]');
    if (trackEl) {
      var eventName = trackEl.getAttribute('data-track-event') || 'cta_click';
      var location = trackEl.getAttribute('data-track-location') || 'unknown';
      var destination = trackEl.getAttribute('href') || '';

      sendGoogleEvent(eventName, {
        event_category: 'engagement',
        button_location: location,
        destination_url: destination
      });
    }
  });

  // 3. Rastreamento de Interações com o Acordeão do FAQ
  var faqDetails = document.querySelectorAll('#faq details');
  if (faqDetails.length > 0) {
    faqDetails.forEach(function (detailEl) {
      detailEl.addEventListener('toggle', function () {
        if (detailEl.open) {
          var questionEl = detailEl.querySelector('summary span');
          var question = questionEl ? questionEl.innerText.trim() : 'FAQ';
          sendGoogleEvent('faq_interaction', {
            event_category: 'faq',
            question_title: question
          });
        }
      });
    });
  }

  // 4. Rastreamento de Profundidade de Rolagem (Scroll Depth: 25%, 50%, 75%, 90%)
  var scrollMarks = { 25: false, 50: false, 75: false, 90: false };
  window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight <= 0) return;
    var scrollPercent = Math.round((scrollTop / docHeight) * 100);

    [25, 50, 75, 90].forEach(function (mark) {
      if (scrollPercent >= mark && !scrollMarks[mark]) {
        scrollMarks[mark] = true;
        sendGoogleEvent('scroll_depth', {
          depth_percentage: mark
        });
      }
    });
  }, { passive: true });
});
