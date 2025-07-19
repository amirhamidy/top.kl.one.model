/* ==========================================================================
   INITIALIZE ALL COMPONENTS ON DOCUMENT READY
   ========================================================================== */


document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initMobileMenu();
    initMegaMenu();
    initHeroSlider();
    initProductCarousel();
    initThumbnailGalleries();
    initProductActions();
});


/* ==========================================================================
   1. SEARCH OVERLAY LOGIC
   ========================================================================== */

function initSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const searchInput = document.querySelector('.search-input');

    if (!searchOverlay || !searchToggleBtn || !searchCloseBtn || !searchInput) {
        return;
    }

    function openSearch() {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    }

    function closeSearch() {
        searchOverlay.classList.remove('active');
    }

    searchToggleBtn.addEventListener('click', openSearch);
    searchCloseBtn.addEventListener('click', closeSearch);

    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });
}


/* ==========================================================================
   2. MOBILE OFF-CANVAS MENU LOGIC
   ========================================================================== */

function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const submenuToggles = document.querySelectorAll('.mobile-menu .has-submenu > a');
    const submenuBackBtns = document.querySelectorAll('.mobile-menu .submenu-back-btn');

    if (!mobileMenu || !menuToggle || !overlay) {
        return;
    }

    function openMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        const activeSubmenu = mobileMenu.querySelector('.submenu.active');
        if (activeSubmenu) {
            activeSubmenu.classList.remove('active');
        }
    }

    menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    submenuToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.add('active');
            }
        });
    });

    submenuBackBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            this.closest('.submenu').classList.remove('active');
        });
    });
}


/* ==========================================================================
   3. MEGA MENU LOGIC
   ========================================================================== */

function initMegaMenu() {
    const categoryItems = document.querySelectorAll('.mega-menu-categories .category-item');

    categoryItems.forEach(function(item) {
        item.addEventListener('mouseover', function() {
            if (this.classList.contains('active')) {
                return;
            }

            const currentActiveItem = document.querySelector('.mega-menu-categories .category-item.active');
            if (currentActiveItem) {
                currentActiveItem.classList.remove('active');
            }
            this.classList.add('active');

            const currentActivePanel = document.querySelector('.subcategory-panel.active');
            if (currentActivePanel) {
                currentActivePanel.classList.remove('active');
            }

            const targetPanel = document.querySelector(this.dataset.target);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}


/* ==========================================================================
   4. HERO SLIDER LOGIC
   ========================================================================== */

function initHeroSlider() {
    if (typeof Swiper === 'undefined') return;

    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.hero-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.hero-button-next',
            prevEl: '.hero-button-prev',
        },
        on: {
            slideChangeTransitionStart: function () {
                const bullets = this.pagination.el.children;
                for (const bullet of bullets) {
                    bullet.classList.remove('progress-start');
                }
                const activeBullet = this.pagination.bullets[this.realIndex];
                if (activeBullet) {
                    void activeBullet.offsetWidth;
                    activeBullet.classList.add('progress-start');
                }
            }
        }
    });

    const firstActiveBullet = heroSwiper.pagination.bullets[heroSwiper.realIndex];
    if (firstActiveBullet) {
        firstActiveBullet.classList.add('progress-start');
    }
}


/* ==========================================================================
   5. PRODUCT CAROUSEL LOGIC (YOUR ORIGINAL)
   ========================================================================== */

function initProductCarousel() {
    if (typeof Swiper === 'undefined') return;

    new Swiper('.swiper-product-carousel', {
        loop: false,
        slidesPerView: 1.8,
        spaceBetween: 15,
        navigation: {
            nextEl: '.swiper-product-carousel .swiper-button-next',
            prevEl: '.swiper-product-carousel .swiper-button-prev',
        },
        breakpoints: {
            576: { slidesPerView: 2.5, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            992: { slidesPerView: 4, spaceBetween: 25 },
            1200: { slidesPerView: 5, spaceBetween: 25 }
        },
        grabCursor: true,
    });
}


/* ==========================================================================
   6. PRODUCT CARD THUMBNAIL GALLERY (YOUR ORIGINAL)
   ========================================================================== */

function initThumbnailGalleries() {
    document.querySelectorAll('.product-card').forEach(function(card) {
        const mainImageWrapper = card.querySelector('.main-image-wrapper');
        const thumbnails = card.querySelectorAll('.thumbnail-item');

        if (!mainImageWrapper || thumbnails.length === 0) {
            return;
        }

        thumbnails[0].classList.add('active');

        thumbnails.forEach(function(thumb) {
            thumb.addEventListener('mouseenter', function() {
                if (this.classList.contains('active')) {
                    return;
                }

                const activeThumb = card.querySelector('.thumbnail-item.active');
                if (activeThumb) {
                    activeThumb.classList.remove('active');
                }
                this.classList.add('active');

                const oldImage = mainImageWrapper.querySelector('.main-product-image');
                const newImage = document.createElement('img');
                newImage.src = this.dataset.largeSrc;
                newImage.alt = oldImage.alt;
                newImage.className = 'main-product-image';
                newImage.style.transform = 'translateX(100%)';

                mainImageWrapper.appendChild(newImage);
                void newImage.offsetWidth;

                oldImage.style.transform = 'translateX(-100%)';
                newImage.style.transform = 'translateX(0)';

                oldImage.addEventListener('transitionend', function() {
                    oldImage.remove();
                }, {
                    once: true
                });
            });
        });
    });
}


/* ==========================================================================
   7. PRODUCT ACTIONS & NOTIFICATIONS (YOUR ORIGINAL)
   ========================================================================== */

function initProductActions() {
    document.querySelectorAll('.btn-add-to-cart').forEach(function(button) {
        button.addEventListener('click', function() {
            showNotification('محصول به سبد خرید اضافه شد!', 'success');
        });
    });

    document.querySelectorAll('.btn-add-to-wishlist').forEach(function(button) {
        button.addEventListener('click', function() {
            showNotification('محصول به لیست علاقه‌مندی‌ها اضافه شد!', 'danger');
        });
    });
}

function showNotification(message, type) {
    if (typeof Toastify === 'undefined') return;

    let backgroundColor;
    if (type === 'success') {
        backgroundColor = "linear-gradient(to right, #00b09b, var(--success-color))";
    } else if (type === 'danger') {
        backgroundColor = "linear-gradient(to right, #e53935, var(--danger-color))";
    }

    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'left',
        stopOnFocus: true,
        style: {
            background: backgroundColor
        },
        offset: {
            x: -100,
            y: 20
        }
    }).showToast();
}