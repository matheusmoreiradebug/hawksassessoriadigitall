/* ============================================================
   HAWKS ASSESSORIA DIGITAL — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- CONFIG (edite aqui) ----------
     Número de WhatsApp no formato internacional, somente dígitos.
     Ex.: 55 (Brasil) + DDD + número. Troque pelo número real da Hawks. */
  var WHATSAPP_NUMBER = '5511962766060';
  var WHATSAPP_MSG = 'Olá! Vim pela landing page da Hawks e quero meu diagnóstico gratuito.';

  function waLink(extra) {
    var msg = extra ? WHATSAPP_MSG + ' ' + extra : WHATSAPP_MSG;
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  /* ---------- Year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- WhatsApp links ---------- */
  ['whatsFloat', 'formWhats', 'footerWhats'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.href = waLink();
      el.target = '_blank';
      el.rel = 'noopener';
    }
  });

  /* ---------- Nav: scrolled state ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('navBurger');
  var mobile = document.getElementById('navMobile');
  if (burger && mobile) {
    var toggleMenu = function (force) {
      var open = force !== undefined ? force : !mobile.classList.contains('open');
      mobile.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      mobile.setAttribute('aria-hidden', String(!open));
    };
    burger.addEventListener('click', function () { toggleMenu(); });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { toggleMenu(false); });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el, i) {
      // stagger siblings within the same grid for a nicer cascade
      var parent = el.parentElement;
      if (parent) {
        var idx = Array.prototype.indexOf.call(parent.children, el);
        var mod = idx % 3;
        if (mod === 1) el.classList.add('in-delay-1');
        else if (mod === 2) el.classList.add('in-delay-2');
      }
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Count-up animation ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var dur = 1400, start = null;
    var ease = function (t) { return 1 - Math.pow(1 - t, 3); };
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var val = target * ease(p);
      el.textContent = target >= 100 ? Math.floor(val).toLocaleString('pt-BR') : Math.floor(val);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target >= 100 ? target.toLocaleString('pt-BR') : target;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Phone mask ---------- */
  var tel = document.getElementById('telefone');
  if (tel) {
    tel.addEventListener('input', function () {
      var v = tel.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
      else if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length > 0) v = '(' + v;
      tel.value = v;
    });
  }

  /* ---------- Lead form ---------- */
  var form = document.getElementById('leadForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome, email = form.email, telefone = form.telefone;
      var valid = true;
      [nome, email, telefone].forEach(function (f) {
        var ok = f.value.trim() !== '' && (f.type !== 'email' || /\S+@\S+\.\S+/.test(f.value));
        f.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        status.textContent = 'Por favor, preencha nome, e-mail e WhatsApp válidos.';
        status.className = 'lead-form__status err';
        return;
      }

      status.textContent = 'Tudo certo! Abrindo o WhatsApp para concluir seu diagnóstico…';
      status.className = 'lead-form__status ok';

      // Encaminha o lead para o WhatsApp com os dados preenchidos.
      var resumo = 'Nome: ' + nome.value +
        ' | E-mail: ' + email.value +
        ' | WhatsApp: ' + telefone.value +
        (form.empresa.value ? ' | Empresa: ' + form.empresa.value : '') +
        (form.faturamento.value ? ' | Faturamento: ' + form.faturamento.value : '');

      // Hook de tracking (Google/Meta Ads) — descomente quando configurar:
      // if (window.gtag) gtag('event', 'generate_lead');
      // if (window.fbq) fbq('track', 'Lead');

      setTimeout(function () {
        window.open(waLink('Meus dados — ' + resumo), '_blank', 'noopener');
        form.reset();
      }, 700);
    });
  }

  /* ---------- CTA tracking hooks ---------- */
  document.querySelectorAll('[data-cta]').forEach(function (el) {
    el.addEventListener('click', function () {
      var label = el.getAttribute('data-cta');
      if (window.gtag) window.gtag('event', 'cta_click', { cta_location: label });
      if (window.fbq) window.fbq('trackCustom', 'CTAClick', { location: label });
    });
  });
})();
