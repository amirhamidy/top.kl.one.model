/* ==========================================================================
   MAIN INITIALIZATION
========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    const swiperExists = typeof Swiper !== 'undefined';
    const toastifyExists = typeof Toastify !== 'undefined';

    initCoreUI();

    if (swiperExists) {
        initSliders();
    }

    initInteractions(toastifyExists);

    console.log("فروشگاه با موفقیت بارگذاری شد. نسخه نهایی! 🚀");
});

/* ==========================================================================
   1. CORE UI COMPONENTS
========================================================================== */
function initCoreUI() {
    initSearch();
    initMobileMenu();
    initMegaMenu();
}

function initSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const searchInput = document.querySelector('.search-input');
    if (!searchOverlay || !searchToggleBtn || !searchCloseBtn || !searchInput) return;

    searchToggleBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });

    const closeSearch = () => searchOverlay.classList.remove('active');

    searchCloseBtn.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', e => (e.target === searchOverlay) && closeSearch());
    document.addEventListener('keydown', e => (e.key === 'Escape' && searchOverlay.classList.contains('active')) && closeSearch());
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (!mobileMenu || !menuToggle || !overlay) return;

    const openMenu = () => {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenu.querySelector('.submenu.active')?.classList.remove('active');
    };

    menuToggle.addEventListener('click', openMenu);
    menuClose?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => (e.key === 'Escape' && mobileMenu.classList.contains('active')) && closeMenu());

    document.querySelectorAll('.mobile-menu .has-submenu > a').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.nextElementSibling?.classList.add('active');
        });
    });

    document.querySelectorAll('.mobile-menu .submenu-back-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.submenu')?.classList.remove('active');
        });
    });
}

function initMegaMenu() {
    document.querySelectorAll('.mega-menu-categories .category-item').forEach(item => {
        item.addEventListener('mouseover', function() {
            if (this.classList.contains('active')) return;
            const container = this.closest('.mega-menu');
            container.querySelector('.category-item.active')?.classList.remove('active');
            container.querySelector('.subcategory-panel.active')?.classList.remove('active');
            this.classList.add('active');
            document.querySelector(this.dataset.target)?.classList.add('active');
        });
    });
}

/* ==========================================================================
   2. SWIPER SLIDERS
========================================================================== */
function initSliders() {
    initHeroSlider();
    initGoldenOffersSlider();
    initFlashDealSlider();
}

function initHeroSlider() {
    new Swiper('.hero-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.hero-swiper .swiper-pagination', clickable: true },
        navigation: { nextEl: '.hero-button-next', prevEl: '.hero-button-prev' },
        on: {
            init: function () {
                const activeBullet = this.pagination.el.querySelector('.swiper-pagination-bullet-active');
                if(activeBullet) activeBullet.classList.add('progress-start');
            },
            slideChangeTransitionStart: function () {
                const allBullets = this.pagination.el.querySelectorAll('.swiper-pagination-bullet');
                allBullets.forEach(b => b.classList.remove('progress-start'));
                const activeBullet = this.pagination.el.querySelector('.swiper-pagination-bullet-active');
                if(activeBullet) {
                    void activeBullet.offsetWidth; // Force reflow
                    activeBullet.classList.add('progress-start');
                }
            }
        }
    });
}

function initGoldenOffersSlider() {
    new Swiper('.golden-offers-swiper', {
        loop: false,
        slidesPerView: 1.5,
        spaceBetween: 15,
        navigation: { nextEl: '.golden-offer-next', prevEl: '.golden-offer-prev' },
        breakpoints: { 576: { slidesPerView: 2, spaceBetween: 20 }, 768: { slidesPerView: 2.5, spaceBetween: 20 }, 1200: { slidesPerView: 3, spaceBetween: 25 } },
        grabCursor: true,
    });
}

function initFlashDealSlider() {
    new Swiper('.flash-deal-swiper', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 15,
        navigation: { nextEl: '.flash-deal-next', prevEl: '.flash-deal-prev' },
        grabCursor: true,
    });
}

/* ==========================================================================
   3. INTERACTIONS & ANIMATIONS
========================================================================== */
function initInteractions(toastifyLoaded) {
    initThumbnailGalleries();
    initProductActions(toastifyLoaded);
    initScrollAnimations();
}

function initThumbnailGalleries() {
    document.querySelectorAll('.product-card').forEach(card => {
        const mainImage = card.querySelector('.main-product-image');
        const thumbnails = card.querySelectorAll('.thumbnail-item');
        if (!mainImage || thumbnails.length === 0) return;

        thumbnails.forEach(thumb => {
            thumb.addEventListener('mouseenter', function() {
                if (this.classList.contains('active')) return;
                card.querySelector('.thumbnail-item.active')?.classList.remove('active');
                this.classList.add('active');
                mainImage.src = this.dataset.largeSrc;
            });
        });
    });
}

function initProductActions(toastifyLoaded) {
    document.addEventListener('click', function(e) {
        const wishlistBtn = e.target.closest('.wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.classList.toggle('is-wishlisted');
            const isWishlisted = wishlistBtn.classList.contains('is-wishlisted');
            const message = isWishlisted ? 'به علاقه‌مندی‌ها اضافه شد!' : 'از علاقه‌مندی‌ها حذف شد.';
            showNotification(message, isWishlisted ? 'danger' : 'default', toastifyLoaded);
        }

        const addToCartBtn = e.target.closest('.btn-add-to-cart');
        if (addToCartBtn) {
            showNotification('محصول به سبد خرید اضافه شد!', 'success', toastifyLoaded);
        }
    });
}

function initScrollAnimations() {
    const sections = document.querySelectorAll('.hero-slider-section, .golden-offers');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

function showNotification(message, type, isLoaded) {
    if (!isLoaded) {
        console.warn('Toastify library is not loaded. Notification:', message);
        return;
    }

    const colors = {
        success: "linear-gradient(to right, #10b981, #10b981)",
        danger: "linear-gradient(to right, #ef4444, #ef4444)",
        default: "linear-gradient(to right, #6c757d, #212529)"
    };

    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: 'bottom',
        position: 'left',
        stopOnFocus: true,
        style: {
            background: colors[type] || colors['default'],
            borderRadius: "var(--border-radius-sm)",
            fontFamily: "Vazirmatn",
        },
    }).showToast();
}