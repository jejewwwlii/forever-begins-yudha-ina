document.addEventListener('DOMContentLoaded', () => {

  // 1 PERSONALIZED GUEST LINK
  function getGuestSlugFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const rawSlug = urlParams.get('to');
    if (!rawSlug) return null;
    const slug = rawSlug.trim().toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
    return slug;
  }

  // SECURITY - ESCAPE HTML
  function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str == null ? '' : String(str);
    return p.innerHTML;
  }

  // INITIAL BODY STATE
  document.body.classList.add('cover-locked');

  function initBotanicalParticles() {
    const layer = document.getElementById('botanical-particles');
    if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
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

  // 2 AUDIO & SYNTHESIZER SOUND SYSTEM
  const bgMusic = document.getElementById('bg-music');
  const musicController = document.getElementById('music-controller');
  let isAudioPlaying = false;

  function playAudio() {
    if (!bgMusic) {
      console.error('Element #bg-music tidak ditemukan.');
      return;
    }
    bgMusic.volume = 0.55;
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isAudioPlaying = true;
        if (musicController) {
          musicController.classList.add('playing');
        }
        console.log('✅ Musik berhasil diputar.');
      }).catch((error) => {
        console.warn('⚠️ Autoplay diblokir oleh browser HP atau file tidak ditemukan:', error);
        isAudioPlaying = false;
        if (musicController) {
          musicController.classList.remove('playing');
        }
      });
    }
  }

  function pauseAudio() {
    if (!bgMusic) {
      return;
    }
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

  // 3 COVER SCREEN UNLOCK BUTTON
  const btnOpenInvitation = document.getElementById('btn-open-invitation');
  const coverScreen = document.getElementById('cover-screen');

  if (btnOpenInvitation) {
    const handleOpenInvitation = (e) => {
      e.preventDefault();

      if (!invitationAccessGranted) {
        console.warn('❌ Akses ditolak. Link undangan tidak valid.');
        return;
      }

      if (coverScreen) {
        coverScreen.classList.add('hide-cover');
      }

      document.body.classList.remove('cover-locked');

      if (musicController) {
        musicController.classList.remove('hidden');
      }

      playAudio();
      setTimeout(initScrollReveal, 300);
    };
    btnOpenInvitation.addEventListener('click', handleOpenInvitation);
  }

  // 4 LIVE COUNTDOWN TIMER
  function initCountdown() {
    const targetDate = new Date('2026-10-16T16:00:00+08:00').getTime();
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

      if (daysEl) {
        daysEl.textContent = String(days).padStart(2, '0');
      }
      if (hoursEl) {
        hoursEl.textContent = String(hours).padStart(2, '0');
      }
      if (minutesEl) {
        minutesEl.textContent = String(minutes).padStart(2, '0');
      }
      if (secondsEl) {
        secondsEl.textContent = String(seconds).padStart(2, '0');
      }
    }
    updateTimer();
    setInterval(updateTimer, 1000);
  }
  initCountdown();

  // 5 LIGHTBOX MODAL
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxWrapper = document.getElementById('lightbox-wrapper');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(elementContent) {
    if (!lightboxModal || !lightboxWrapper) {
      return;
    }
    lightboxWrapper.innerHTML = '';
    lightboxWrapper.appendChild(elementContent);
    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
    }
  }

  // Gallery items trigger
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      if (!src) {
        return;
      }
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
      const svg = qrisTrigger.querySelector('svg');
      if (!svg) {
        return;
      }
      const qrisSvg = svg.cloneNode(true);
      qrisSvg.style.maxWidth = '320px';
      qrisSvg.style.width = '100%';
      openLightbox(qrisSvg);
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // 6 UCAPAN & DOA RESTU
  const SUPABASE_URL = "https://pnjwxobwxkuebwckhcmt.supabase.co";
  const SUPABASE_KEY = "sb_publishable_QbAqTbjpmUTCEoge5v5tEw_RMk92QBx";
  let supabaseClient = null;
  let currentGuestName = '';
  let currentGuestSlug = '';
  let currentGuestLoaded = false;
  let invitationAccessGranted = false;

  function showInvalidLinkScreen() {
    const invalidScreen = document.getElementById('invalid-link-screen');

    if (invalidScreen) {
      invalidScreen.style.display = 'flex';
    }

    document.body.classList.add('invalid-link-active');
  }

  function hideInvalidLinkScreen() {
    const invalidScreen = document.getElementById('invalid-link-screen');

    if (invalidScreen) {
      invalidScreen.style.display = 'none';
    }

    document.body.classList.remove('invalid-link-active');
  }

  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpName = document.getElementById('rsvp-name');
  const rsvpMessage = document.getElementById('rsvp-message');
  const wishesList = document.getElementById('wishes-list');

  // Load nama database dan validasi akses undangan
  async function loadGuestFromSupabase() {
    const guestSlug = getGuestSlugFromURL();
    const guestNameEl = document.getElementById('guest-name');

    invitationAccessGranted = false;

    if (!guestSlug) {
      currentGuestName = '';
      currentGuestSlug = '';
      currentGuestLoaded = false;

      showInvalidLinkScreen();

      console.warn('❌ Link undangan tidak memiliki ?to=slug yang valid.');
      return;
    }

    if (!supabaseClient) {
      currentGuestName = '';
      currentGuestSlug = '';
      currentGuestLoaded = false;

      showInvalidLinkScreen();

      console.error('❌ Supabase client belum tersedia.');
      return;
    }

    if (guestNameEl) {
      guestNameEl.textContent = 'Memuat nama...';
    }

    try {
      console.log('🔎 Memeriksa akses dengan slug:', guestSlug);

      const { data, error } = await supabaseClient
        .from('guests')
        .select('name, slug')
        .eq('slug', guestSlug)
        .maybeSingle();

      if (error) {
        throw error;
      }

      // SLUG TIDAK DITEMUKAN
      if (!data) {
        currentGuestName = '';
        currentGuestSlug = '';
        currentGuestLoaded = false;
        invitationAccessGranted = false;

        console.warn('❌ Slug tidak ditemukan di database:', guestSlug);

        showInvalidLinkScreen();

        return;
      }

      // DATA DITEMUKAN, TAPI NAMA KOSONG
      const guestName = String(data.name || '').trim();

      if (!guestName) {
        currentGuestName = '';
        currentGuestSlug = '';
        currentGuestLoaded = false;
        invitationAccessGranted = false;

        console.warn('❌ Data tamu ditemukan tetapi nama kosong.');

        showInvalidLinkScreen();

        return;
      }

      // DATA VALID
      currentGuestName = guestName;
      currentGuestSlug = String(data.slug || guestSlug).trim();
      currentGuestLoaded = true;
      invitationAccessGranted = true;

      if (guestNameEl) {
        guestNameEl.textContent = currentGuestName;
      }

      if (rsvpName) {
        rsvpName.value = currentGuestName;
        rsvpName.readOnly = true;
      }

      hideInvalidLinkScreen();

      console.log('✅ Akses undangan diberikan.');
      console.log('✅ Nama tamu:', currentGuestName);
      console.log('✅ Slug:', currentGuestSlug);

    } catch (error) {
      currentGuestName = '';
      currentGuestSlug = '';
      currentGuestLoaded = false;
      invitationAccessGranted = false;

      console.error('❌ Gagal memvalidasi tamu:', error);

      showInvalidLinkScreen();
    }
  }

  // CONNECT TO SUPABASE
  if (window.supabase && SUPABASE_URL && SUPABASE_KEY) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ Supabase berhasil terhubung.');
    loadGuestFromSupabase();
  } else {
    console.error('❌ Supabase belum tersedia. Periksa CDN, URL, dan Publishable Key.');
  }

  // FORMAT TANGGAL UCAPAN
  function formatWishDate(timestamp) {
    if (!timestamp) {
      return '';
    }
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return '';
    }
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  // CREATE WISH CARD
  function createWishCard(wish) {
    const card = document.createElement('div');
    card.className = 'wish-item';
    const safeName = escapeHTML(wish.name || 'Tamu Undangan');
    const safeMessage = escapeHTML(wish.message || '');
    const date = formatWishDate(wish.created_at);

    card.innerHTML = `
      <div class="wish-content">
        <div class="wish-header">
          <div class="wish-avatar">
            <i class="fa-regular fa-user"></i>
          </div>
          <div class="wish-author">
            <div class="wish-name">
              ${safeName}
            </div>
            ${
              date
                ? `
                  <div class="wish-date">
                    ${date}
                  </div>
                `
                : ''
            }
          </div>
        </div>
        <div class="wish-message">
          ${safeMessage}
        </div>
      </div>
    `;
    return card;
  }

  // RENDER WISHES
  function renderWishes(data) {
    if (!wishesList) {
      return;
    }
    wishesList.innerHTML = '';
    if (!data || data.length === 0) {
      wishesList.innerHTML = `
        <div class="wish-empty">
          <i class="fa-regular fa-heart"></i>
          <p>
            Belum ada ucapan.
          </p>
          <span>
            Jadilah yang pertama memberikan doa restu.
          </span>
        </div>
      `;
      return;
    }
    data.forEach(wish => {
      const card = createWishCard(wish);
      wishesList.appendChild(card);
    });
  }

  // LOAD WISHES FROM SUPABASE
  async function loadWishes() {
    if (!wishesList) {
      return;
    }
    if (!supabaseClient) {
      wishesList.innerHTML = `
        <div class="wish-empty">
          <i class="fa-regular fa-circle-exclamation"></i>
          <p>
            Database belum terhubung.
          </p>
          <span>
            Periksa konfigurasi Supabase.
          </span>
        </div>
      `;
      return;
    }

    try {
      wishesList.innerHTML = `
        <div class="wish-loading">
          <i class="fa-solid fa-spinner fa-spin"></i>
          <span>
            Memuat doa restu...
          </span>
        </div>
      `;
      const { data, error } = await supabaseClient
        .from('wishes')
        .select('id, name, message, created_at')
        .order('created_at', {
          ascending: false
        });

      if (error) {
        throw error;
      }
      renderWishes(data || []);
    } catch (error) {
      console.error('❌ Gagal memuat ucapan dari Supabase:', error);
      wishesList.innerHTML = `
        <div class="wish-empty">
          <i class="fa-regular fa-circle-exclamation"></i>
          <p>
            Ucapan belum dapat dimuat.
          </p>
          <span>
            Silakan coba refresh halaman.
          </span>
        </div>
      `;
    }
  }

  // 7 FORM UCAPAN & DOA RESTU
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const name = currentGuestLoaded ? currentGuestName : '';
      const message = rsvpMessage ? rsvpMessage.value.trim() : '';

      if (!currentGuestLoaded || !name) {
        showToast('Link tamu tidak valid. Silakan gunakan link undangan yang diberikan.');
        return;
      }

      if (!message) {
        showToast('Silakan tuliskan ucapan & doa restu.');
        if (rsvpMessage) {
          rsvpMessage.focus();
        }
        return;
      }

      if (!supabaseClient) {
        console.error('❌ Supabase client belum tersedia.');
        showToast('Database belum terhubung. Periksa konfigurasi Supabase.');
        return;
      }

      const submitButton = rsvpForm.querySelector('.btn-submit');
      const originalButtonHTML = submitButton ? submitButton.innerHTML : '';

      try {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Mengirim...
          `;
        }
        showToast('Mengirim ucapan...');

        const { data, error } = await supabaseClient
          .from('wishes')
          .insert([
            {
              name: name,
              message: message
            }
          ])
          .select('id, name, message, created_at')
          .single();

        if (error) {
          throw error;
        }

        console.log('Ucapan berhasil disimpan ke Supabase:', data);
        rsvpForm.reset();

        if (rsvpName) {
          rsvpName.value = currentGuestName;
          rsvpName.readOnly = true;
        }

        if (wishesList) {
          const emptyMessage = wishesList.querySelector('.wish-empty');
          if (emptyMessage) {
            wishesList.innerHTML = '';
          }
        }

        if (wishesList && data) {
          const newCard = createWishCard(data);
          wishesList.prepend(newCard);
        }

        showToast('Ucapan & Doa Restu Berhasil Dikirim! ❤️');
      } catch (error) {
        console.error('❌ Gagal mengirim ucapan ke Supabase:', error);
        if (error) {
          console.error('Supabase error message:', error.message);
          console.error('Supabase error details:', error.details);
          console.error('Supabase error hint:', error.hint);
          console.error('Supabase error code:', error.code);
        }
        showToast('Gagal mengirim ucapan. Coba lagi.');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonHTML;
        }
      }
    });
  } else {
    console.warn('⚠️ Form #rsvp-form tidak ditemukan.');
  }
  loadWishes();

  // 8 COPY ACCOUNT NUMBER & TOAST FEEDBACK
  const toastEl = document.getElementById('toast');
  const toastMsgEl = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) {
      return;
    }
    if (toastMsgEl) {
      toastMsgEl.textContent = message;
    }
    toastEl.classList.remove('hidden');
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toastTimer = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 3000);
  }

  // COPY REKENING
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-clipboard');
      if (!textToCopy) {
        return;
      }
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

  // 9 FALLBACK COPY TEXT
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
      console.error('Gagal menyalin:', err);
      showToast('Gagal menyalin nomor rekening.');
    }
    document.body.removeChild(textArea);
  }

  // 10 SCROLL REVEAL OBSERVER
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => {
        el.classList.add('active');
      });
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

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

});