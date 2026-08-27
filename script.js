document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. DYNAMIC URL PARAMETER PARSING (?to=GuestName)
  // ==========================================================================
  
  function initGuestRecipient() {
    const urlParams = new URLSearchParams(window.location.search);
    const rawGuest = urlParams.get('to') || urlParams.get('to_name') || urlParams.get('n');
    
    const guestNameEl = document.getElementById('guest-name');
    const rsvpNameEl = document.getElementById('rsvp-name');
    
    if (rawGuest && rawGuest.trim() !== '') {
      const sanitizedGuest = escapeHTML(rawGuest.trim());
      if (guestNameEl) guestNameEl.textContent = sanitizedGuest;
      if (rsvpNameEl) rsvpNameEl.value = sanitizedGuest;
    } else {
      if (guestNameEl) guestNameEl.textContent = 'Tamu Undangan';
    }
  }

  function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }

  document.body.classList.add('cover-locked');
  initGuestRecipient();

  // ==========================================================================
  // 1B. AMBIENT BOTANICAL PARTICLES
  // ==========================================================================
  function initBotanicalParticles() {
    const layer = document.getElementById('botanical-particles');
    if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const total = window.innerWidth < 600 ? 10 : 18;
    for (let i = 0; i < total; i += 1) {
      const petal = document.createElement('span');
      petal.className = 'botanical-petal';
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.top = `${-10 - Math.random() * 30}%`;
      petal.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 180}px`);
      petal.style.setProperty('--spin', `${120 + Math.random() * 320}deg`);
      petal.style.animationDuration = `${10 + Math.random() * 13}s`;
      petal.style.animationDelay = `${Math.random() * 10}s`;
      petal.style.transform = `scale(${0.55 + Math.random() * 0.65}) rotate(${Math.random() * 90}deg)`;
      layer.appendChild(petal);
    }
  }

  initBotanicalParticles();

    // ==========================================================================
  // 2. AUDIO & SYNTHESIZER SOUND SYSTEM ("CAN'T HELP FALLING IN LOVE")
  // ==========================================================================

  const bgMusic = document.getElementById('bg-music');
  const musicController = document.getElementById('music-controller');

  let isAudioPlaying = false;

  function playAudio() {
    if (!bgMusic) {
      console.error('Element #bg-music tidak ditemukan.');
      return;
    }

    bgMusic.volume = 0.55;

    // Pastikan audio di-unlock untuk browser mobile (iOS / Android)
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isAudioPlaying = true;

          if (musicController) {
            musicController.classList.add('playing');
          }

          console.log('✅ Musik berhasil diputar.');
        })
        .catch((error) => {
          console.warn('⚠️ Autoplay diblokir oleh browser HP atau file tidak ditemukan:', error);
          isAudioPlaying = false;
          if (musicController) {
            musicController.classList.remove('playing');
          }
        });
    }
  }

  function pauseAudio() {
    if (!bgMusic) return;

    bgMusic.pause();
    isAudioPlaying = false;

    if (musicController) {
      musicController.classList.remove('playing');
    }
  }

  function toggleAudio() {
    if (isAudioPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  if (musicController) {
    musicController.addEventListener('click', toggleAudio);
  }

  // ==========================================================================
  // 3. COVER SCREEN UNLOCK BUTTON
  // ==========================================================================

  const btnOpenInvitation = document.getElementById('btn-open-invitation');
  const coverScreen = document.getElementById('cover-screen');

  if (btnOpenInvitation) {
    // Gunakan click & touchend agar responsif di HP
    const handleOpenInvitation = (e) => {
      e.preventDefault();

      coverScreen.classList.add('hide-cover');
      document.body.classList.remove('cover-locked');

      if (musicController) {
        musicController.classList.remove('hidden');
      }

      // Pemanggilan playAudio() persis di dalam event klik tombol
      playAudio();

      setTimeout(initScrollReveal, 300);
    };

    btnOpenInvitation.addEventListener('click', handleOpenInvitation);
  }

  // ==========================================================================
  // 4. LIVE COUNTDOWN TIMER (3 SEPTEMBER 2026 16:00 WITA)
  // ==========================================================================

  function initCountdown() {
    // Wedding Date: 3 September 2026 16:00:00 WITA (+08:00)
    const targetDate = new Date('2026-09-03T16:00:00+08:00').getTime();

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    function updateTimer() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  initCountdown();

  // ==========================================================================
  // 5. LIGHTBOX MODAL (PHOTO GALLERY & QRIS)
  // ==========================================================================

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxWrapper = document.getElementById('lightbox-wrapper');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(elementContent) {
    if (!lightboxModal || !lightboxWrapper) return;
    lightboxWrapper.innerHTML = '';
    lightboxWrapper.appendChild(elementContent);
    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove('active');
  }

  // Gallery items trigger
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Galeri Foto Prewedding Yudha & Ina';
      openLightbox(img);
    });
  });

  // QRIS trigger
  const qrisTrigger = document.getElementById('qris-trigger');
  if (qrisTrigger) {
    qrisTrigger.addEventListener('click', () => {
      const qrisSvg = qrisTrigger.querySelector('svg').cloneNode(true);
      qrisSvg.style.maxWidth = '320px';
      qrisSvg.style.width = '100%';
      openLightbox(qrisSvg);
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ==========================================================================
  // 6. UCAPAN & DOA (RSVP & WISHES FEED WITH NO DUMMY DATA)
  // ==========================================================================

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx__YnfECQJEpHy0jHYCRt1nV2cAnryGJV6F0V0-1IPhqf29zJjZiZD4m-U_rg3xOmkew/exec";

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('rsvp-name').value.trim();
      const message = document.getElementById('rsvp-message').value.trim();

      if (!name || !message) return;

      try {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, message })
        });

        rsvpForm.reset();
        showToast('Ucapan & Doa Restu Berhasil Dikirim!');
      } catch (error) {
        console.error("Gagal mengirim ucapan:", error);
        showToast('Gagal mengirim ucapan. Coba lagi.');
      }
    });
  }
  
  // ==========================================================================
  // 7. COPY ACCOUNT NUMBER & TOAST FEEDBACK
  // ==========================================================================

  const toastEl = document.getElementById('toast');
  const toastMsgEl = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    if (toastMsgEl) toastMsgEl.textContent = message;
    
    toastEl.classList.remove('hidden');
    
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 3000);
  }

  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-clipboard');
      if (!textToCopy) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Nomor Rekening Berhasil Disalin!');
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      showToast('Nomor Rekening Berhasil Disalin!');
    } catch (err) {
      showToast('Gagal menyalin nomor rekening.');
    }
    document.body.removeChild(textArea);
  }

  // ==========================================================================
  // 8. SCROLL REVEAL OBSERVER
  // ==========================================================================

  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('active'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

});
