document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // =========================================================================
    // INITIALIZE ALL SWIPER INSTANCES
    // =========================================================================
    function initSwipers() {
        // Hero Swiper
        const heroSwiperContainer = document.querySelector('.hero-swiper');
        if (heroSwiperContainer) {
            new Swiper(heroSwiperContainer, {
                loop: true,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.hero-swiper .swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.hero-swiper .hero-button-next',
                    prevEl: '.hero-swiper .hero-button-prev'
                },
                on: {
                    init: (swiper) => {
                        if (swiper.pagination.bullets[swiper.realIndex]) {
                            swiper.pagination.bullets[swiper.realIndex].classList.add('progress-start');
                        }
                        updateSwiperNavButtons(swiper);
                    },
                    slideChange: (swiper) => {
                        swiper.pagination.bullets.forEach(bullet => bullet.classList.remove('progress-start'));
                        const activeBullet = swiper.pagination.bullets[swiper.realIndex];
                        if (activeBullet) {
                            void activeBullet.offsetWidth; // Trigger reflow for animation restart
                            activeBullet.classList.add('progress-start');
                        }
                        updateSwiperNavButtons(swiper);
                    }
                }
            });
        }

        // Flash Deal Swiper
        const flashDealSwiperContainer = document.querySelector('.flash-deal-swiper');
        if (flashDealSwiperContainer) {
            new Swiper(flashDealSwiperContainer, {
                slidesPerView: 1,
                spaceBetween: 24,
                navigation: {
                    nextEl: '.flash-deal-next',
                    prevEl: '.flash-deal-prev'
                },
                on: {
                    init: (swiper) => updateSwiperNavButtons(swiper),
                    slideChange: (swiper) => updateSwiperNavButtons(swiper)
                }
            });
        }

        // Golden Offers Swiper
        const goldenOffersSwiperContainer = document.querySelector('.golden-offers-swiper');
        if (goldenOffersSwiperContainer) {
            new Swiper(goldenOffersSwiperContainer, {
                slidesPerView: 1,
                spaceBetween: 16,
                navigation: {
                    nextEl: '.golden-offer-next',
                    prevEl: '.golden-offer-prev'
                },
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 16
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 24
                    }
                },
                on: {
                    init: (swiper) => updateSwiperNavButtons(swiper),
                    slideChange: (swiper) => updateSwiperNavButtons(swiper)
                }
            });
        }

        // Special Offers Swiper (NEW)
        const specialOffersSwiperContainer = document.querySelector('.special-offers-swiper');
        if (specialOffersSwiperContainer) {
            new Swiper(specialOffersSwiperContainer, {
                slidesPerView: 1,
                spaceBetween: 16,
                navigation: {
                    nextEl: '.special-offer-next',
                    prevEl: '.special-offer-prev'
                },
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 16
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 24
                    }
                },
                on: {
                    init: (swiper) => updateSwiperNavButtons(swiper),
                    slideChange: (swiper) => updateSwiperNavButtons(swiper)
                }
            });
        }


        // Helper function to update aria-disabled for Swiper navigation buttons
        function updateSwiperNavButtons(swiperInstance) {
            const prevButton = swiperInstance.navigation.prevEl;
            const nextButton = swiperInstance.navigation.nextEl;

            if (prevButton) {
                if (swiperInstance.isBeginning && !swiperInstance.params.loop) {
                    prevButton.setAttribute('aria-disabled', 'true');
                } else {
                    prevButton.setAttribute('aria-disabled', 'false');
                }
            }
            if (nextButton) {
                if (swiperInstance.isEnd && !swiperInstance.params.loop) {
                    nextButton.setAttribute('aria-disabled', 'true');
                } else {
                    nextButton.setAttribute('aria-disabled', 'false');
                }
            }
        }
    }

    // =========================================================================
    // THEME TOGGLE (DARK/LIGHT MODE)
    // =========================================================================
    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const transitionCircle = document.getElementById('theme-transition-circle');

        if (!themeToggle || !transitionCircle) return;

        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', currentTheme === 'dark');

        themeToggle.addEventListener('click', (e) => {
            const isDark = document.body.classList.contains('dark-theme');
            const newTheme = isDark ? 'light' : 'dark';

            // Position and activate the transition circle
            transitionCircle.style.left = `${e.clientX}px`;
            transitionCircle.style.top = `${e.clientY}px`;
            transitionCircle.classList.add('is-active');

            // Apply theme change after a short delay to allow circle expansion
            setTimeout(() => {
                document.body.classList.toggle('dark-theme');
                localStorage.setItem('theme', newTheme);
            }, 350); // Matches transition duration

            // Remove active class after transition ends
            transitionCircle.addEventListener('transitionend', () => {
                transitionCircle.classList.remove('is-active');
            }, {
                once: true
            });
        });
    }

    // =========================================================================
    // ALL MENUS (MEGA, MOBILE, SUBMENUS)
    // =========================================================================
    function initMenus() {
        // Mega Menu Logic
        document.querySelectorAll('.mega-menu-categories .category-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                document.querySelector('.mega-menu-categories .category-item.active')?.classList.remove('active');
                document.querySelector('.subcategory-panel.active')?.classList.remove('active');

                item.classList.add('active');
                const targetPanel = document.querySelector(item.dataset.target);
                targetPanel?.classList.add('active');
            });

            item.addEventListener('focus', () => {
                document.querySelector('.mega-menu-categories .category-item.active')?.classList.remove('active');
                document.querySelector('.subcategory-panel.active')?.classList.remove('active');

                item.classList.add('active');
                const targetPanel = document.querySelector(item.dataset.target);
                targetPanel?.classList.add('active');
            });
        });


        // Mobile Menu Logic
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenuClose = document.getElementById('mobile-menu-close');

        if (!mobileMenu || !mobileMenuOverlay || !mobileMenuToggle || !mobileMenuClose) return;

        const openMobileMenu = () => {
            mobileMenu.style.display = 'flex';
            mobileMenuOverlay.style.display = 'block';
            setTimeout(() => {
                mobileMenu.classList.add('active');
                mobileMenuOverlay.classList.add('active');
            }, 10);
        };

        const closeMobileMenu = () => {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
                mobileMenuOverlay.style.display = 'none';
            }, 400);
        };

        mobileMenuToggle.addEventListener('click', openMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    // =========================================================================
    // SEARCH OVERLAY
    // =========================================================================
    function initSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = searchOverlay?.querySelector('.search-input');
        const searchToggleBtn = document.getElementById('search-toggle-btn');
        const searchCloseBtn = document.getElementById('search-close-btn');

        if (!searchOverlay || !searchToggleBtn || !searchCloseBtn) return;

        const openSearch = () => {
            searchOverlay.style.display = 'flex';
            setTimeout(() => {
                searchOverlay.classList.add('active');
                searchInput?.focus();
            }, 10);
        };

        const closeSearch = () => {
            searchOverlay.classList.remove('active');
            setTimeout(() => {
                searchOverlay.style.display = 'none';
            }, 400);
        };

        searchToggleBtn.addEventListener('click', openSearch);
        searchCloseBtn.addEventListener('click', closeSearch);

        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });
    }

    // =========================================================================
    // PRODUCT CARD GALLERY LOGIC (OLD)
    // =========================================================================
    function initProductGallery() {
        document.querySelectorAll('.product-card:not(.special-card)').forEach(card => { // Exclude new special cards
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

    // =========================================================================
    // SPECIAL PRODUCT CARD GALLERY LOGIC (NEW)
    // =========================================================================
    function initSpecialProductGallery() {
        document.querySelectorAll('.product-card.special-card').forEach(card => {
            const mainImage = card.querySelector('.main-product-image');
            const interactiveZones = card.querySelectorAll('.interactive-zones .zone');
            const initialSrc = mainImage.src; // Store the initial image source

            if (mainImage && interactiveZones.length > 0) {
                interactiveZones.forEach(zone => {
                    zone.addEventListener('mouseenter', () => {
                        const newSrc = zone.dataset.image;
                        if (newSrc && mainImage.src !== newSrc) {
                            mainImage.src = newSrc;
                            // Optionally, add a class for CSS transition on image change
                            // mainImage.classList.add('is-transitioning');
                        }
                    });
                });

                // Reset image when mouse leaves the entire interactive area
                // Using mouseleave on the main image wrapper to cover all zones
                const mainImageWrapper = card.querySelector('.main-image-wrapper');
                if (mainImageWrapper) {
                    mainImageWrapper.addEventListener('mouseleave', () => {
                        if (mainImage.src !== initialSrc) {
                            mainImage.src = initialSrc;
                        }
                    });
                }
            }
        });
    }

    // =========================================================================
    // MISCELLANEOUS FUNCTIONALITY (Toast, Intersection Observer, Countdown)
    // =========================================================================
    function initMisc() {
        // Add to Cart Toast Notification
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                Toastify({
                    text: "محصول به سبد خرید اضافه شد!",
                    duration: 3000,
                    gravity: "bottom",
                    position: "left",
                    style: {
                        background: "var(--success-color)",
                        fontFamily: "Vazirmatn"
                    }
                }).showToast();
            });
        });

        // Intersection Observer for Animations
        const animatedSections = document.querySelectorAll('.hero-slider-section, .golden-offers, .special-offers'); // Added .special-offers
        if (animatedSections.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            animatedSections.forEach(section => observer.observe(section));
        }

        // Flash Deal Countdown Timer
        const countdownElement = document.getElementById('flash-deal-countdown');
        if (countdownElement) {
            let timeInSeconds = 24 * 60 * 60;

            const timerInterval = setInterval(() => {
                if (timeInSeconds <= 0) {
                    clearInterval(timerInterval);
                    countdownElement.textContent = "00:00:00";
                    return;
                }
                timeInSeconds--;

                const h = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
                const m = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
                const s = String(timeInSeconds % 60).padStart(2, '0');

                countdownElement.textContent = `${h}:${m}:${s}`;
            }, 1000);
        }
    }

    // =========================================================================
    // FIRE ALL INITIALIZATION FUNCTIONS ON DOM LOAD
    // =========================================================================
    initSwipers();
    initTheme();
    initMenus();
    initSearch();
    initProductGallery(); // For old product cards
    initSpecialProductGallery(); // For new special product cards
    initMisc();
});