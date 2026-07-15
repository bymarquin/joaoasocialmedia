  (function () {
    document.documentElement.classList.remove('no-js');

    // ---- Contato: edite aqui em um único lugar ----
    var WHATSAPP_NUMBER = '5588992737269';
    var WHATSAPP_MESSAGE = 'Oi João, quero marcar uma reunião e dar o próximo passo no meu negócio';
    var waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
    document.querySelectorAll('[data-whatsapp]').forEach(function (el) {
      el.setAttribute('href', waUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });

    // ---- Nav scroll state ----
    var nav = document.getElementById('nav');
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Mobile nav toggle ----
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });

    // ---- Reveal on scroll ----
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
      document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
    }

    // ---- Tabs (Como funciona) ----
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelector('.tab-panel[data-panel="' + target + '"]').classList.add('active');
      });
    });

    // ---- Modal ----
    var modal = document.getElementById('modal');
    var openModal = function () {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    };
    var closeModal = function () {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
    };
    document.querySelectorAll('[data-open-modal]').forEach(function (el) { el.addEventListener('click', openModal); });
    document.querySelectorAll('[data-close-modal]').forEach(function (el) { el.addEventListener('click', closeModal); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

    // ---- Carrossel de depoimentos ----
    var testiCarousel = document.getElementById('testiCarousel');
    var testiTrack = document.getElementById('testiTrack');
    if (testiTrack) {
      var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        // duplica os slides pra criar um loop contínuo e infinito
        var originalSlides = Array.prototype.slice.call(testiTrack.children);
        originalSlides.forEach(function (slide) { testiTrack.appendChild(slide.cloneNode(true)); });
      }
      // pausa o carrossel enquanto um vídeo do carrossel estiver tocando
      testiTrack.addEventListener('play', function (e) {
        if (e.target.tagName === 'VIDEO') testiCarousel.classList.add('paused');
      }, true);
      testiTrack.addEventListener('pause', function (e) {
        if (e.target.tagName === 'VIDEO') testiCarousel.classList.remove('paused');
      }, true);
    }

    // ---- Lightbox de mídia (imagens e vídeos com zoom) ----
    var lightbox = document.getElementById('lightbox');
    var lightboxStage = document.getElementById('lightboxStage');
    var lightboxHint = document.getElementById('lightboxHint');
    var expandIconSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>';

    // injeta botão de expandir em cada mídia de case/depoimento
    document.querySelectorAll('.case-proof, .testi-ph').forEach(function (holder) {
      var media = holder.querySelector('.case-media, .testi-media');
      if (!media) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'media-expand-btn';
      btn.setAttribute('aria-label', 'Ampliar mídia');
      btn.innerHTML = expandIconSVG;
      holder.appendChild(btn);
      var trigger = function (e) { e.stopPropagation(); openLightbox(media); };
      btn.addEventListener('click', trigger);
      if (media.tagName === 'IMG') holder.addEventListener('click', trigger);
    });

    var activeVideoEl = null;

    function resetZoomState(img) {
      img.dataset.scale = '1';
      img.dataset.tx = '0';
      img.dataset.ty = '0';
      img.classList.remove('zoomed', 'dragging');
      img.style.transform = 'translate(0px, 0px) scale(1)';
    }

    function applyTransform(img) {
      img.style.transform = 'translate(' + img.dataset.tx + 'px, ' + img.dataset.ty + 'px) scale(' + img.dataset.scale + ')';
    }

    function setupImageZoom(img) {
      resetZoomState(img);
      var dragging = false, moved = false, suppressClick = false;
      var startX = 0, startY = 0, originTx = 0, originTy = 0;
      var DRAG_THRESHOLD = 4;

      img.addEventListener('click', function (e) {
        if (suppressClick) { suppressClick = false; return; }
        var scale = parseFloat(img.dataset.scale);
        if (scale > 1) {
          resetZoomState(img);
        } else {
          img.dataset.scale = '2.4';
          img.classList.add('zoomed');
          applyTransform(img);
        }
      });

      img.addEventListener('wheel', function (e) {
        e.preventDefault();
        var scale = parseFloat(img.dataset.scale);
        scale = Math.min(4, Math.max(1, scale - e.deltaY * 0.0018 * scale));
        img.dataset.scale = String(scale);
        img.classList.toggle('zoomed', scale > 1);
        if (scale === 1) { img.dataset.tx = '0'; img.dataset.ty = '0'; }
        applyTransform(img);
      }, { passive: false });

      var startDrag = function (x, y) {
        if (parseFloat(img.dataset.scale) <= 1) return;
        dragging = true;
        moved = false;
        startX = x; startY = y;
        originTx = parseFloat(img.dataset.tx);
        originTy = parseFloat(img.dataset.ty);
        img.classList.add('dragging');
      };
      var moveDrag = function (x, y) {
        if (!dragging) return;
        var dx = x - startX, dy = y - startY;
        if (!moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) moved = true;
        img.dataset.tx = String(originTx + dx);
        img.dataset.ty = String(originTy + dy);
        applyTransform(img);
      };
      var endDrag = function () {
        if (dragging && moved) suppressClick = true;
        dragging = false;
        img.classList.remove('dragging');
      };

      img.addEventListener('mousedown', function (e) { e.preventDefault(); startDrag(e.clientX, e.clientY); });
      window.addEventListener('mousemove', function (e) { moveDrag(e.clientX, e.clientY); });
      window.addEventListener('mouseup', endDrag);

      img.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      img.addEventListener('touchmove', function (e) {
        if (e.touches.length === 1) { moveDrag(e.touches[0].clientX, e.touches[0].clientY); }
      }, { passive: true });
      img.addEventListener('touchend', endDrag);
    }

    function openLightbox(media) {
      lightboxStage.querySelectorAll('img, video').forEach(function (el) { el.remove(); });
      activeVideoEl = null;

      if (media.tagName === 'IMG') {
        var img = document.createElement('img');
        img.src = media.currentSrc || media.src;
        img.alt = media.alt || '';
        lightboxStage.insertBefore(img, lightboxHint);
        setupImageZoom(img);
        lightboxHint.style.display = '';
        lightboxHint.textContent = 'Clique para dar zoom · arraste para mover';
      } else {
        var video = document.createElement('video');
        video.src = media.currentSrc || media.src;
        video.controls = true;
        video.playsInline = true;
        video.autoplay = true;
        lightboxStage.insertBefore(video, lightboxHint);
        activeVideoEl = video;
        lightboxHint.style.display = 'none';
      }

      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
      if (activeVideoEl) { activeVideoEl.pause(); }
      lightboxStage.querySelectorAll('img, video').forEach(function (el) { el.remove(); });
      activeVideoEl = null;
    }

    document.querySelectorAll('[data-close-lightbox]').forEach(function (el) { el.addEventListener('click', closeLightbox); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });

    // ---- Form → compõe mensagem no WhatsApp + tela de sucesso ----
    var form = document.getElementById('leadForm');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = document.getElementById('f-nome').value.trim();
      var email = document.getElementById('f-email').value.trim();
      var tipo = document.getElementById('f-tipo').value;
      var msg = document.getElementById('f-msg').value.trim();
      var texto = 'Olá! Meu nome é ' + nome + '.'
        + '%0A%0A*Tipo de projeto:* ' + tipo
        + '%0A*E-mail:* ' + email
        + (msg ? '%0A*Sobre o projeto:* ' + encodeURIComponent(msg) : '');
      var lead = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + texto;
      window.open(lead, '_blank', 'noopener');
      document.getElementById('modalForm').style.display = 'none';
      document.getElementById('modalSuccess').classList.add('show');
    });

    // ---- Footer year ----
    document.getElementById('year').textContent = new Date().getFullYear();
  })();
