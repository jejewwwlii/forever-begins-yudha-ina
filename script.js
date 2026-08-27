document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. DYNAMIC URL PARAMETER PARSING (?to=GuestName)
  // ==========================================================================

  function initGuestRecipient() {
    const urlParams = new URLSearchParams(window.location.search);

    const rawGuest =
      urlParams.get('to') ||
      urlParams.get('to_name') ||
      urlParams.get('n');

    const guestNameEl =
      document.getElementById('guest-name');

    const rsvpNameEl =
      document.getElementById('rsvp-name');

    if (rawGuest && rawGuest.trim() !== '') {

      const sanitizedGuest =
        escapeHTML(rawGuest.trim());

      if (guestNameEl) {
        guestNameEl.textContent =
          sanitizedGuest;
      }

      if (rsvpNameEl) {
        rsvpNameEl.value =
          sanitizedGuest;
      }

    } else {

      if (guestNameEl) {
        guestNameEl.textContent =
          'Tamu Undangan';
      }

    }
  }


  // ==========================================================================
  // SECURITY - ESCAPE HTML
  // ==========================================================================

  function escapeHTML(str) {

    const p =
      document.createElement('p');

    p.textContent =
      str == null ? '' : String(str);

    return p.innerHTML;
  }


  // ==========================================================================
  // INITIAL BODY STATE
  // ==========================================================================

  document.body.classList.add(
    'cover-locked'
  );

  initGuestRecipient();


  // ==========================================================================
  // 1B. AMBIENT BOTANICAL PARTICLES
  // ==========================================================================

  function initBotanicalParticles() {

    const layer =
      document.getElementById(
        'botanical-particles'
      );

    if (
      !layer ||
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    ) {
      return;
    }


    const total =
      window.innerWidth < 600
        ? 10
        : 18;


    for (
      let i = 0;
      i < total;
      i += 1
    ) {

      const petal =
        document.createElement('span');

      petal.className =
        'botanical-petal';

      petal.style.left =
        `${Math.random() * 100}%`;

      petal.style.top =
        `${-10 - Math.random() * 30}%`;

      petal.style.setProperty(
        '--drift-x',
        `${(Math.random() - 0.5) * 180}px`
      );

      petal.style.setProperty(
        '--spin',
        `${120 + Math.random() * 320}deg`
      );

      petal.style.animationDuration =
        `${10 + Math.random() * 13}s`;

      petal.style.animationDelay =
        `${Math.random() * 10}s`;

      petal.style.transform =
        `scale(${0.55 + Math.random() * 0.65}) rotate(${Math.random() * 90}deg)`;


      layer.appendChild(petal);
    }
  }


  initBotanicalParticles();


  // ==========================================================================
  // 2. AUDIO & SYNTHESIZER SOUND SYSTEM
  // ("CAN'T HELP FALLING IN LOVE")
  // ==========================================================================

  const bgMusic =
    document.getElementById(
      'bg-music'
    );

  const musicController =
    document.getElementById(
      'music-controller'
    );


  let isAudioPlaying =
    false;


  function playAudio() {

    if (!bgMusic) {

      console.error(
        'Element #bg-music tidak ditemukan.'
      );

      return;
    }


    bgMusic.volume =
      0.55;


    // Pastikan audio di-unlock
    // untuk browser mobile.

    const playPromise =
      bgMusic.play();


    if (
      playPromise !== undefined
    ) {

      playPromise
        .then(() => {

          isAudioPlaying =
            true;


          if (musicController) {

            musicController.classList.add(
              'playing'
            );

          }


          console.log(
            '✅ Musik berhasil diputar.'
          );

        })
        .catch((error) => {

          console.warn(
            '⚠️ Autoplay diblokir oleh browser HP atau file tidak ditemukan:',
            error
          );


          isAudioPlaying =
            false;


          if (musicController) {

            musicController.classList.remove(
              'playing'
            );

          }

        });

    }
  }


  function pauseAudio() {

    if (!bgMusic) {
      return;
    }


    bgMusic.pause();


    isAudioPlaying =
      false;


    if (musicController) {

      musicController.classList.remove(
        'playing'
      );

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

    musicController.addEventListener(
      'click',
      toggleAudio
    );

  }


  // ==========================================================================
  // 3. COVER SCREEN UNLOCK BUTTON
  // ==========================================================================

  const btnOpenInvitation =
    document.getElementById(
      'btn-open-invitation'
    );

  const coverScreen =
    document.getElementById(
      'cover-screen'
    );


  if (btnOpenInvitation) {

    const handleOpenInvitation =
      (e) => {

        e.preventDefault();


        if (coverScreen) {

          coverScreen.classList.add(
            'hide-cover'
          );

        }


        document.body.classList.remove(
          'cover-locked'
        );


        if (musicController) {

          musicController.classList.remove(
            'hidden'
          );

        }


        // Musik dipanggil langsung
        // dari event klik.

        playAudio();


        setTimeout(
          initScrollReveal,
          300
        );

      };


    btnOpenInvitation.addEventListener(
      'click',
      handleOpenInvitation
    );

  }


  // ==========================================================================
  // 4. LIVE COUNTDOWN TIMER
  // 3 SEPTEMBER 2026 16:00 WITA
  // ==========================================================================

  function initCountdown() {

    const targetDate =
      new Date(
        '2026-09-03T16:00:00+08:00'
      ).getTime();


    const daysEl =
      document.getElementById(
        'cd-days'
      );

    const hoursEl =
      document.getElementById(
        'cd-hours'
      );

    const minutesEl =
      document.getElementById(
        'cd-minutes'
      );

    const secondsEl =
      document.getElementById(
        'cd-seconds'
      );


    function updateTimer() {

      const now =
        new Date().getTime();


      const distance =
        targetDate - now;


      if (distance < 0) {

        if (daysEl) {
          daysEl.textContent =
            '00';
        }

        if (hoursEl) {
          hoursEl.textContent =
            '00';
        }

        if (minutesEl) {
          minutesEl.textContent =
            '00';
        }

        if (secondsEl) {
          secondsEl.textContent =
            '00';
        }

        return;
      }


      const days =
        Math.floor(
          distance /
          (1000 * 60 * 60 * 24)
        );


      const hours =
        Math.floor(
          (
            distance %
            (1000 * 60 * 60 * 24)
          ) /
          (1000 * 60 * 60)
        );


      const minutes =
        Math.floor(
          (
            distance %
            (1000 * 60 * 60)
          ) /
          (1000 * 60)
        );


      const seconds =
        Math.floor(
          (
            distance %
            (1000 * 60)
          ) /
          1000
        );


      if (daysEl) {

        daysEl.textContent =
          String(days).padStart(
            2,
            '0'
          );

      }


      if (hoursEl) {

        hoursEl.textContent =
          String(hours).padStart(
            2,
            '0'
          );

      }


      if (minutesEl) {

        minutesEl.textContent =
          String(minutes).padStart(
            2,
            '0'
          );

      }


      if (secondsEl) {

        secondsEl.textContent =
          String(seconds).padStart(
            2,
            '0'
          );

      }

    }


    updateTimer();


    setInterval(
      updateTimer,
      1000
    );

  }


  initCountdown();


  // ==========================================================================
  // 5. LIGHTBOX MODAL
  // PHOTO GALLERY & QRIS
  // ==========================================================================

  const lightboxModal =
    document.getElementById(
      'lightbox-modal'
    );

  const lightboxWrapper =
    document.getElementById(
      'lightbox-wrapper'
    );

  const lightboxClose =
    document.getElementById(
      'lightbox-close'
    );


  function openLightbox(
    elementContent
  ) {

    if (
      !lightboxModal ||
      !lightboxWrapper
    ) {
      return;
    }


    lightboxWrapper.innerHTML =
      '';


    lightboxWrapper.appendChild(
      elementContent
    );


    lightboxModal.classList.add(
      'active'
    );
  }


  function closeLightbox() {

    if (lightboxModal) {

      lightboxModal.classList.remove(
        'active'
      );

    }
  }


  // --------------------------------------------------------------------------
  // Gallery items trigger
  // --------------------------------------------------------------------------

  const galleryItems =
    document.querySelectorAll(
      '.gallery-item'
    );


  galleryItems.forEach(
    item => {

      item.addEventListener(
        'click',
        () => {

          const src =
            item.getAttribute(
              'data-src'
            );


          if (!src) {
            return;
          }


          const img =
            document.createElement(
              'img'
            );


          img.src =
            src;


          img.alt =
            'Galeri Foto Prewedding Yudha & Ina';


          openLightbox(
            img
          );

        }
      );

    }
  );


  // --------------------------------------------------------------------------
  // QRIS trigger
  // --------------------------------------------------------------------------

  const qrisTrigger =
    document.getElementById(
      'qris-trigger'
    );


  if (qrisTrigger) {

    qrisTrigger.addEventListener(
      'click',
      () => {

        const svg =
          qrisTrigger.querySelector(
            'svg'
          );


        if (!svg) {
          return;
        }


        const qrisSvg =
          svg.cloneNode(true);


        qrisSvg.style.maxWidth =
          '320px';


        qrisSvg.style.width =
          '100%';


        openLightbox(
          qrisSvg
        );

      }
    );

  }


  if (lightboxClose) {

    lightboxClose.addEventListener(
      'click',
      closeLightbox
    );

  }


  if (lightboxModal) {

    lightboxModal.addEventListener(
      'click',
      (e) => {

        if (
          e.target ===
          lightboxModal
        ) {

          closeLightbox();

        }

      }
    );

  }


  document.addEventListener(
    'keydown',
    (e) => {

      if (
        e.key === 'Escape'
      ) {

        closeLightbox();

      }

    }
  );


  // ==========================================================================
  // 6. UCAPAN & DOA RESTU
  // SUPABASE DATABASE
  // ==========================================================================

  /*
    ========================================================================
    SUPABASE CONFIGURATION
    ========================================================================

    GANTI 2 BARIS DI BAWAH INI.

    SUPABASE_URL:
    ambil dari project Supabase kamu.

    Contoh:
    https://xxxxxxxxxxxxxxxx.supabase.co

    SUPABASE_KEY:
    gunakan PUBLISHABLE KEY.

    Contoh:
    sb_publishable_xxxxxxxxxxxxxxxxx

    JANGAN gunakan:
    sb_secret_...

    ========================================================================
  */


  const SUPABASE_URL =
    "GANTI_DENGAN_PROJECT_URL_KAMU";


  const SUPABASE_KEY =
    "GANTI_DENGAN_PUBLISHABLE_KEY_KAMU";


  // --------------------------------------------------------------------------
  // CEK SUPABASE CLIENT
  // --------------------------------------------------------------------------

  let supabaseClient =
    null;


  if (
    window.supabase &&
    SUPABASE_URL !==
      "GANTI_DENGAN_PROJECT_URL_KAMU" &&
    SUPABASE_KEY !==
      "GANTI_DENGAN_PUBLISHABLE_KEY_KAMU"
  ) {

    supabaseClient =
      window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
      );

  } else {

    console.warn(
      '⚠️ Supabase belum dikonfigurasi. Periksa SUPABASE_URL dan SUPABASE_KEY.'
    );

  }


  // --------------------------------------------------------------------------
  // ELEMENT FORM
  // --------------------------------------------------------------------------

  const rsvpForm =
    document.getElementById(
      'rsvp-form'
    );


  const rsvpName =
    document.getElementById(
      'rsvp-name'
    );


  const rsvpMessage =
    document.getElementById(
      'rsvp-message'
    );


  const wishesList =
    document.getElementById(
      'wishes-list'
    );


  // ==========================================================================
  // FORMAT TANGGAL UCAPAN
  // ==========================================================================

  function formatWishDate(
    timestamp
  ) {

    if (!timestamp) {
      return '';
    }


    const date =
      new Date(
        timestamp
      );


    if (
      isNaN(
        date.getTime()
      )
    ) {
      return '';
    }


    return date.toLocaleDateString(
      'id-ID',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    );

  }


  // ==========================================================================
  // CREATE WISH CARD
  // ==========================================================================

  function createWishCard(
    wish
  ) {

    const card =
      document.createElement(
        'div'
      );


    /*
      Class ini mengikuti struktur
      desain Doa Restu yang sudah kamu punya.
    */

    card.className =
      'wish-item';


    const safeName =
      escapeHTML(
        wish.name ||
        'Tamu Undangan'
      );


    const safeMessage =
      escapeHTML(
        wish.message ||
        ''
      );


    const date =
      formatWishDate(
        wish.created_at
      );


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


  // ==========================================================================
  // RENDER WISHES
  // ==========================================================================

  function renderWishes(
    data
  ) {

    if (!wishesList) {
      return;
    }


    wishesList.innerHTML =
      '';


    // ------------------------------------------------------------------------
    // Tidak ada ucapan
    // ------------------------------------------------------------------------

    if (
      !data ||
      data.length === 0
    ) {

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


    // ------------------------------------------------------------------------
    // Tampilkan data
    // ------------------------------------------------------------------------

    data.forEach(
      wish => {

        const card =
          createWishCard(
            wish
          );


        wishesList.appendChild(
          card
        );

      }
    );

  }


  // ==========================================================================
  // LOAD WISHES FROM SUPABASE
  // ==========================================================================

  async function loadWishes() {

    if (!wishesList) {
      return;
    }


    // ------------------------------------------------------------------------
    // Supabase belum dikonfigurasi
    // ------------------------------------------------------------------------

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


      // ----------------------------------------------------------------------
      // AMBIL DATA DARI TABLE wishes
      // ----------------------------------------------------------------------

      const {
        data,
        error
      } = await supabaseClient

        .from('wishes')

        .select(
          'id, name, message, created_at'
        )

        .order(
          'created_at',
          {
            ascending: false
          }
        );


      if (error) {
        throw error;
      }


      renderWishes(
        data || []
      );


    } catch (error) {

      console.error(
        '❌ Gagal memuat ucapan dari Supabase:',
        error
      );


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


  // ==========================================================================
  // SUBMIT FORM UCAPAN KE SUPABASE
  // ==========================================================================

  if (rsvpForm) {

    rsvpForm.addEventListener(
      'submit',
      async (e) => {

        // ====================================================================
        // INI YANG MENCEGAH FORM KEMBALI KE COVER
        // ====================================================================

        e.preventDefault();
        e.stopPropagation();


        // --------------------------------------------------------------------
        // Ambil input
        // --------------------------------------------------------------------

        const name =
          rsvpName
            ? rsvpName.value.trim()
            : '';


        const message =
          rsvpMessage
            ? rsvpMessage.value.trim()
            : '';


        // --------------------------------------------------------------------
        // Validasi nama
        // --------------------------------------------------------------------

        if (!name) {

          showToast(
            'Silakan isi nama terlebih dahulu.'
          );


          if (rsvpName) {
            rsvpName.focus();
          }


          return;

        }


        // --------------------------------------------------------------------
        // Validasi pesan
        // --------------------------------------------------------------------

        if (!message) {

          showToast(
            'Silakan tuliskan ucapan & doa restu.'
          );


          if (rsvpMessage) {
            rsvpMessage.focus();
          }


          return;

        }


        // --------------------------------------------------------------------
        // Cek koneksi Supabase
        // --------------------------------------------------------------------

        if (!supabaseClient) {

          console.error(
            '❌ Supabase client belum tersedia.'
          );


          showToast(
            'Database belum terhubung. Periksa konfigurasi Supabase.'
          );


          return;

        }


        // --------------------------------------------------------------------
        // Tombol submit
        // --------------------------------------------------------------------

        const submitButton =
          rsvpForm.querySelector(
            '.btn-submit'
          );


        const originalButtonHTML =
          submitButton
            ? submitButton.innerHTML
            : '';


        try {

          // ------------------------------------------------------------------
          // Disable tombol sementara
          // ------------------------------------------------------------------

          if (submitButton) {

            submitButton.disabled =
              true;


            submitButton.innerHTML = `

              <i class="fa-solid fa-spinner fa-spin"></i>

              Mengirim...

            `;

          }


          showToast(
            'Mengirim ucapan...'
          );


          // ==================================================================
          // INSERT DATA KE SUPABASE
          // ==================================================================

          const {
            data,
            error
          } = await supabaseClient

            .from('wishes')

            .insert([
              {
                name: name,
                message: message
              }
            ])

            .select(
              'id, name, message, created_at'
            )

            .single();


          // ------------------------------------------------------------------
          // Kalau Supabase mengembalikan error
          // ------------------------------------------------------------------

          if (error) {

            throw error;

          }


          console.log(
            '✅ Ucapan berhasil disimpan ke Supabase:',
            data
          );


          // ------------------------------------------------------------------
          // Kosongkan form
          // ------------------------------------------------------------------

          rsvpForm.reset();


          // ------------------------------------------------------------------
          // Kalau sebelumnya ada pesan "Belum ada ucapan"
          // ------------------------------------------------------------------

          if (wishesList) {

            const emptyMessage =
              wishesList.querySelector(
                '.wish-empty'
              );


            if (emptyMessage) {

              wishesList.innerHTML =
                '';

            }

          }


          // ------------------------------------------------------------------
          // Tampilkan ucapan yang baru saja dikirim
          // di paling atas.
          // ------------------------------------------------------------------

          if (
            wishesList &&
            data
          ) {

            const newCard =
              createWishCard(
                data
              );


            wishesList.prepend(
              newCard
            );

          }


          // ------------------------------------------------------------------
          // SUCCESS
          // ------------------------------------------------------------------

          showToast(
            'Ucapan & Doa Restu Berhasil Dikirim! ❤️'
          );


        } catch (error) {

          // ==================================================================
          // ERROR
          // ==================================================================

          console.error(
            '❌ Gagal mengirim ucapan ke Supabase:',
            error
          );


          if (error) {

            console.error(
              'Supabase error message:',
              error.message
            );


            console.error(
              'Supabase error details:',
              error.details
            );


            console.error(
              'Supabase error hint:',
              error.hint
            );


            console.error(
              'Supabase error code:',
              error.code
            );

          }


          showToast(
            'Gagal mengirim ucapan. Coba lagi.'
          );


        } finally {

          // ------------------------------------------------------------------
          // Aktifkan kembali tombol
          // ------------------------------------------------------------------

          if (submitButton) {

            submitButton.disabled =
              false;


            submitButton.innerHTML =
              originalButtonHTML;

          }

        }

      }
    );

  } else {

    console.warn(
      '⚠️ Form #rsvp-form tidak ditemukan.'
    );

  }


  // ==========================================================================
  // LOAD UCAPAN SAAT WEBSITE DIBUKA
  // ==========================================================================

  loadWishes();


  // ==========================================================================
  // 7. COPY ACCOUNT NUMBER & TOAST FEEDBACK
  // ==========================================================================

  const toastEl =
    document.getElementById(
      'toast'
    );


  const toastMsgEl =
    document.getElementById(
      'toast-message'
    );


  let toastTimer =
    null;


  function showToast(
    message
  ) {

    if (!toastEl) {
      return;
    }


    if (toastMsgEl) {

      toastMsgEl.textContent =
        message;

    }


    toastEl.classList.remove(
      'hidden'
    );


    if (toastTimer) {

      clearTimeout(
        toastTimer
      );

    }


    toastTimer =
      setTimeout(
        () => {

          toastEl.classList.add(
            'hidden'
          );

        },
        3000
      );

  }


  // ==========================================================================
  // COPY REKENING
  // ==========================================================================

  const copyButtons =
    document.querySelectorAll(
      '.btn-copy'
    );


  copyButtons.forEach(
    btn => {

      btn.addEventListener(
        'click',
        () => {

          const textToCopy =
            btn.getAttribute(
              'data-clipboard'
            );


          if (!textToCopy) {
            return;
          }


          if (
            navigator.clipboard &&
            window.isSecureContext
          ) {

            navigator.clipboard
              .writeText(
                textToCopy
              )

              .then(() => {

                showToast(
                  'Nomor Rekening Berhasil Disalin!'
                );

              })

              .catch(() => {

                fallbackCopyText(
                  textToCopy
                );

              });

          } else {

            fallbackCopyText(
              textToCopy
            );

          }

        }
      );

    }
  );


  // ==========================================================================
  // FALLBACK COPY TEXT
  // ==========================================================================

  function fallbackCopyText(
    text
  ) {

    const textArea =
      document.createElement(
        'textarea'
      );


    textArea.value =
      text;


    textArea.style.position =
      'fixed';


    textArea.style.left =
      '-9999px';


    document.body.appendChild(
      textArea
    );


    textArea.focus();


    textArea.select();


    try {

      document.execCommand(
        'copy'
      );


      showToast(
        'Nomor Rekening Berhasil Disalin!'
      );


    } catch (err) {

      console.error(
        'Gagal menyalin:',
        err
      );


      showToast(
        'Gagal menyalin nomor rekening.'
      );

    }


    document.body.removeChild(
      textArea
    );

  }


  // ==========================================================================
  // 8. SCROLL REVEAL OBSERVER
  // ==========================================================================

  function initScrollReveal() {

    const revealElements =
      document.querySelectorAll(
        '.reveal'
      );


    if (
      !(
        'IntersectionObserver'
        in window
      )
    ) {

      revealElements.forEach(
        el => {

          el.classList.add(
            'active'
          );

        }
      );


      return;

    }


    const revealObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  'active'
                );


                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          root: null,

          threshold: 0.12,

          rootMargin:
            '0px 0px -40px 0px'
        }
      );


    revealElements.forEach(
      el => {

        revealObserver.observe(
          el
        );

      }
    );

  }


});