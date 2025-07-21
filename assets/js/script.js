document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // =========================================================================
    // INITIALIZE ALL SWIPER INSTANCES
    // =========================================================================
    function initSwipers() {
        const heroSwiperContainer = document.querySelector('.hero-swiper');
        if (heroSwiperContainer) {
            new Swiper(heroSwiperContainer, { /* ... Swiper config ... */ });
        }
        // ... Other swipers ...
    }

    // =========================================================================
    // PRODUCT CARD GALLERY LOGIC (THE MISSING PIECE)
    // =========================================================================
    function initProductGallery() {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const mainImage = card.querySelector('.main-product-image');
            const thumbnails = card.querySelectorAll('.thumbnail-item');

            if (mainImage && thumbnails.length > 0) {
                thumbnails.forEach(thumb => {
                    thumb.addEventListener('mouseenter', () => {
                        // Get the new image source from data attribute
                        const largeSrc = thumb.dataset.largeSrc;
                        if (largeSrc) {
                            // Update the main image source
                            mainImage.src = largeSrc;

                            // Update the active thumbnail
                            card.querySelector('.thumbnail-item.active')?.classList.remove('active');
                            thumb.classList.add('active');
                        }
                    });
                });
            }
        });
    }

    // ... The rest of your JS functions (initTheme, initMenus, etc.) remain the same ...
    // Make sure they are here.

    // =========================================================================
    // THEME TOGGLE (DARK/LIGHT MODE)
    // =========================================================================
    function initTheme() {
        // ... The full function from the previous correct code ...
    }

    // =========================================================================
    // ALL MENUS (MEGA, MOBILE, SUBMENUS)
    // =========================================================================
    function initMenus() {
        // ... The full function from the previous correct code ...
    }

    // =========================================================================
    // SEARCH OVERLAY
    // =========================================================================
    function initSearch() {
        // ... The full function from the previous correct code ...
    }

    // =========================================================================
    // MISCELLANEOUS FUNCTIONALITY
    // =========================================================================
    function initMisc() {
        // ... The full function from the previous correct code ...
        // (Toast, Intersection Observer, Countdown)
    }

    // --- FIRE ALL INITIALIZATION FUNCTIONS ---
    initSwipers();
    initTheme();
    initMenus();
    initSearch();
    initMisc();
    initProductGallery(); // <-- ADD THIS NEW FUNCTION CALL
});

// To be safe, here is the complete, final, absolutely correct script.js file one more time.

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    function initSwipers() {
        const heroSwiperContainer = document.querySelector('.hero-swiper');
        if (heroSwiperContainer) { new Swiper(heroSwiperContainer, { loop: true, effect: 'fade', fadeEffect: { crossFade: true }, autoplay: { delay: 5000, disableOnInteraction: false }, pagination: { el: '.hero-swiper .swiper-pagination', clickable: true }, navigation: { nextEl: '.hero-swiper .hero-button-next', prevEl: '.hero-swiper .hero-button-prev' }, on: { init: (swiper) => { swiper.pagination.bullets[swiper.realIndex]?.classList.add('progress-start'); }, slideChange: (swiper) => { swiper.pagination.bullets.forEach(bullet => bullet.classList.remove('progress-start')); const activeBullet = swiper.pagination.bullets[swiper.realIndex]; if (activeBullet) { void activeBullet.offsetWidth; activeBullet.classList.add('progress-start'); } } } }); }
        const flashDealSwiperContainer = document.querySelector('.flash-deal-swiper');
        if (flashDealSwiperContainer) { new Swiper(flashDealSwiperContainer, { slidesPerView: 1, spaceBetween: 24, navigation: { nextEl: '.flash-deal-next', prevEl: '.flash-deal-prev' } }); }
        const goldenOffersSwiperContainer = document.querySelector('.golden-offers-swiper');
        if (goldenOffersSwiperContainer) { new Swiper(goldenOffersSwiperContainer, { slidesPerView: 1, spaceBetween: 16, navigation: { nextEl: '.golden-offer-next', prevEl: '.golden-offer-prev' }, breakpoints: { 576: { slidesPerView: 2, spaceBetween: 16 }, 768: { slidesPerView: 2, spaceBetween: 20 }, 992: { slidesPerView: 3, spaceBetween: 24 }, 1200: { slidesPerView: 4, spaceBetween: 24 } } }); }
    }

    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const transitionCircle = document.getElementById('theme-transition-circle');
        if (!themeToggle || !transitionCircle) return;
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', currentTheme === 'dark');
        themeToggle.addEventListener('click', (e) => {
            const isDark = document.body.classList.contains('dark-theme');
            const newTheme = isDark ? 'light' : 'dark';
            transitionCircle.style.left = `${e.clientX}px`;
            transitionCircle.style.top = `${e.clientY}px`;
            transitionCircle.classList.add('is-active');
            setTimeout(() => { document.body.classList.toggle('dark-theme'); localStorage.setItem('theme', newTheme); }, 350);
            transitionCircle.addEventListener('transitionend', () => { transitionCircle.classList.remove('is-active'); }, { once: true });
        });
    }

    function initMenus() {
        document.querySelectorAll('.mega-menu-categories .category-item').forEach(item => { item.addEventListener('mouseenter', () => { document.querySelector('.mega-menu-categories .category-item.active')?.classList.remove('active'); document.querySelector('.subcategory-panel.active')?.classList.remove('active'); item.classList.add('active'); const targetPanel = document.querySelector(item.dataset.target); targetPanel?.classList.add('active'); }); });
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        if (!mobileMenu || !mobileMenuOverlay) return;
        const openMobileMenu = () => { mobileMenu.style.display = 'flex'; mobileMenuOverlay.style.display = 'block'; setTimeout(() => { mobileMenu.classList.add('active'); mobileMenuOverlay.classList.add('active'); }, 10); };
        const closeMobileMenu = () => { mobileMenu.classList.remove('active'); mobileMenuOverlay.classList.remove('active'); setTimeout(() => { mobileMenu.style.display = 'none'; mobileMenuOverlay.style.display = 'none'; }, 400); };
        document.querySelector('.mobile-menu-toggle')?.addEventListener('click', openMobileMenu);
        document.getElementById('mobile-menu-close')?.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    function initSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = searchOverlay?.querySelector('.search-input');
        if (!searchOverlay) return;
        const openSearch = () => { searchOverlay.style.display = 'flex'; setTimeout(() => { searchOverlay.classList.add('active'); searchInput?.focus(); }, 10); };
        const closeSearch = () => { searchOverlay.classList.remove('active'); setTimeout(() => { searchOverlay.style.display = 'none'; }, 400); };
        document.getElementById('search-toggle-btn')?.addEventListener('click', openSearch);
        document.getElementById('search-close-btn')?.addEventListener('click', closeSearch);
        searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) closeSearch(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && searchOverlay.classList.contains('active')) closeSearch(); });
    }

    function initProductGallery() {
        document.querySelectorAll('.product-card').forEach(card => {
            const mainImage = card.querySelector('.main-product-image');
            const thumbnails = card.querySelectorAll('.thumbnail-item');
            if (mainImage && thumbnails.length > 0) {
                thumbnails.forEach(thumb => {
                    thumb.addEventListener('mouseenter', () => {
                        const largeSrc = thumb.dataset.largeSrc;
                        if (largeSrc && mainImage.src !== largeSrc) {
                            mainImage.src = largeSrc;
                            card.querySelector('.thumbnail-item.active')?.classList.remove('active');
                            thumb.classList.add('active');
                        }
                    });
                });
            }
        });
    }

    function initMisc() {
        document.querySelectorAll('.btn-add-to-cart').forEach(button => { button.addEventListener('click', () => { Toastify({ text: "محصول به سبد خرید اضافه شد!", duration: 3000, gravity: "bottom", position: "left", style: { background: "var(--success-color)", fontFamily: "Vazirmatn" } }).showToast(); }); });
        const animatedSections = document.querySelectorAll('.hero-slider-section, .golden-offers');
        if (animatedSections.length > 0) { const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.1 }); animatedSections.forEach(section => observer.observe(section)); }
        const countdownElement = document.getElementById('flash-deal-countdown');
        if (countdownElement) { let timeInSeconds = 24 * 60 * 60; const timerInterval = setInterval(() => { if (timeInSeconds <= 0) { clearInterval(timerInterval); return; } timeInSeconds--; const h = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0'); const m = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0'); const s = String(timeInSeconds % 60).padStart(2, '0'); countdownElement.textContent = `${h}:${m}:${s}`; }, 1000); }
    }

    initSwipers();
    initTheme();
    initMenus();
    initSearch();
    initMisc();
    initProductGallery(); // ACTIVATE THE GALLERY LOGIC
});