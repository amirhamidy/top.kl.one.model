document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    function initSwipers() {
        const heroSwiperContainer = document.querySelector('.hero-swiper');
        if (heroSwiperContainer) {
            new Swiper(heroSwiperContainer, {
                loop: true,
                effect: 'fade',
                autoplay: { delay: 5000, disableOnInteraction: false },
                pagination: { el: '.hero-swiper .swiper-pagination', clickable: true },
                navigation: { nextEl: '.hero-swiper .hero-button-next', prevEl: '.hero-swiper .hero-button-prev' },
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
                            void activeBullet.offsetWidth;
                            activeBullet.classList.add('progress-start');
                        }
                        updateSwiperNavButtons(swiper);
                    }
                }
            });
        }

        const flashDealSwiperContainer = document.querySelector('.flash-deal-swiper');
        if (flashDealSwiperContainer) {
            new Swiper(flashDealSwiperContainer, {
                slidesPerView: 1,
                spaceBetween: 24,
                navigation: { nextEl: '.flash-deal-next', prevEl: '.flash-deal-prev' },
                on: { init: (swiper) => updateSwiperNavButtons(swiper), slideChange: (swiper) => updateSwiperNavButtons(swiper) }
            });
        }

        [document.querySelector('.golden-offers-swiper'), document.querySelector('.special-offers-swiper')]
            .filter(Boolean)
            .forEach(container => {
                const nextButton = container.parentNode.querySelector('.swiper-button-next') || document.querySelector('.golden-offer-next, .special-offer-next');
                const prevButton = container.parentNode.querySelector('.swiper-button-prev') || document.querySelector('.golden-offer-prev, .special-offer-prev');

                new Swiper(container, {
                    slidesPerView: 1,
                    spaceBetween: 16,
                    navigation: {
                        nextEl: nextButton,
                        prevEl: prevButton
                    },
                    breakpoints: {
                        576: { slidesPerView: 2, spaceBetween: 16 },
                        768: { slidesPerView: 2, spaceBetween: 20 },
                        992: { slidesPerView: 3, spaceBetween: 24 },
                        1200: { slidesPerView: 4, spaceBetween: 24 }
                    },
                    on: { init: (swiper) => updateSwiperNavButtons(swiper), slideChange: (swiper) => updateSwiperNavButtons(swiper) }
                });
            });

        function updateSwiperNavButtons(swiperInstance) {
            const prevButton = swiperInstance.navigation.prevEl;
            const nextButton = swiperInstance.navigation.nextEl;

            if (prevButton) {
                prevButton.setAttribute('aria-disabled', (swiperInstance.isBeginning && !swiperInstance.params.loop).toString());
            }
            if (nextButton) {
                nextButton.setAttribute('aria-disabled', (swiperInstance.isEnd && !swiperInstance.params.loop).toString());
            }
        }
    }

    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const transitionCircle = document.getElementById('theme-transition-circle');

        if (!themeToggle || !transitionCircle) return;

        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', currentTheme === 'dark');

        themeToggle.addEventListener('click', (e) => {
            const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            transitionCircle.style.left = `${e.clientX}px`;
            transitionCircle.style.top = `${e.clientY}px`;
            transitionCircle.classList.add('is-active');

            setTimeout(() => {
                document.body.classList.toggle('dark-theme');
                localStorage.setItem('theme', newTheme);
            }, 350);

            transitionCircle.addEventListener('transitionend', () => {
                transitionCircle.classList.remove('is-active');
            }, { once: true });
        });
    }

    function initMenus() {
        document.querySelectorAll('.mega-menu-categories .category-item').forEach(item => {
            const activateCategory = () => {
                document.querySelector('.mega-menu-categories .category-item.active')?.classList.remove('active');
                document.querySelector('.subcategory-panel.active')?.classList.remove('active');
                item.classList.add('active');
                document.querySelector(item.dataset.target)?.classList.add('active');
            };
            item.addEventListener('mouseenter', activateCategory);
            item.addEventListener('focus', activateCategory);
        });

        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenuClose = document.getElementById('mobile-menu-close');

        if (!mobileMenu || !mobileMenuOverlay || !mobileMenuToggle || !mobileMenuClose) return;

        const openMobileMenu = () => {
            mobileMenu.style.display = 'flex';
            mobileMenuOverlay.style.display = 'block';
            setTimeout(() => { mobileMenu.classList.add('active'); mobileMenuOverlay.classList.add('active'); }, 10);
        };

        const closeMobileMenu = () => {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            setTimeout(() => { mobileMenu.style.display = 'none'; mobileMenuOverlay.style.display = 'none'; }, 400);
        };

        mobileMenuToggle.addEventListener('click', openMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    function initSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = searchOverlay?.querySelector('.search-input');
        const searchToggleBtn = document.getElementById('search-toggle-btn');
        const searchCloseBtn = document.getElementById('search-close-btn');

        if (!searchOverlay || !searchToggleBtn || !searchCloseBtn) return;

        const openSearch = () => {
            searchOverlay.style.display = 'flex';
            setTimeout(() => { searchOverlay.classList.add('active'); searchInput?.focus(); }, 10);
        };

        const closeSearch = () => {
            searchOverlay.classList.remove('active');
            setTimeout(() => { searchOverlay.style.display = 'none'; }, 400);
        };

        searchToggleBtn.addEventListener('click', openSearch);
        searchCloseBtn.addEventListener('click', closeSearch);
        searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) { closeSearch(); } });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && searchOverlay.classList.contains('active')) { closeSearch(); } });
    }

    function initProductGallery() {
        document.querySelectorAll('.product-card:not(.special-card)').forEach(card => {
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

    function initSpecialProductGallery() {
        document.querySelectorAll('.product-card.special-card').forEach(card => {
            const mainImage = card.querySelector('.main-product-image');
            const interactiveZones = card.querySelectorAll('.interactive-zones .zone');
            const initialSrc = mainImage.src;

            if (mainImage && interactiveZones.length > 0) {
                interactiveZones.forEach(zone => {
                    zone.addEventListener('mouseenter', () => {
                        const newSrc = zone.dataset.image;
                        if (newSrc && mainImage.src !== newSrc) {
                            mainImage.src = newSrc;
                        }
                    });
                });
                card.addEventListener('mouseleave', () => {
                    if (mainImage.src !== initialSrc) {
                        mainImage.src = initialSrc;
                    }
                });
            }
        });
    }

    function initSearchSuggestionsDragScroll() {
        const suggestionsContainer = document.querySelector('.suggestions-list-container');

        if (!suggestionsContainer) return;

        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;

        suggestionsContainer.addEventListener('contextmenu', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        });

        suggestionsContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            suggestionsContainer.classList.add('active-dragging');
            startX = e.pageX - suggestionsContainer.offsetLeft;
            scrollLeft = suggestionsContainer.scrollLeft;
            e.preventDefault();
        });

        suggestionsContainer.addEventListener('mouseleave', () => {
            isDown = false;
            suggestionsContainer.classList.remove('active-dragging');
        });

        suggestionsContainer.addEventListener('mouseup', (e) => {
            isDown = false;
            suggestionsContainer.classList.remove('active-dragging');
            if (isDragging) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });

        suggestionsContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - suggestionsContainer.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 5) {
                isDragging = true;
            }
            suggestionsContainer.scrollLeft = scrollLeft - walk;
        });

        suggestionsContainer.addEventListener('touchstart', (e) => {
            isDown = true;
            isDragging = false;
            startX = e.touches[0].pageX - suggestionsContainer.offsetLeft;
            scrollLeft = suggestionsContainer.scrollLeft;
        }, { passive: true });

        suggestionsContainer.addEventListener('touchend', (e) => {
            isDown = false;
            if (isDragging) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
            isDragging = false;
        });

        suggestionsContainer.addEventListener('touchcancel', () => {
            isDown = false;
        });

        suggestionsContainer.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - suggestionsContainer.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 5) {
                isDragging = true;
            }
            suggestionsContainer.scrollLeft = scrollLeft - walk;
        }, { passive: false });
    }

    function initMisc() {
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                Toastify({
                    text: "محصول به سبد خرید اضافه شد!",
                    duration: 3000,
                    gravity: "bottom",
                    position: "left",
                    style: { background: "var(--success-color)", fontFamily: "Vazirmatn" }
                }).showToast();
            });
        });

        const animatedSections = document.querySelectorAll('.hero-slider-section, .golden-offers, .special-offers');
        if (animatedSections.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            animatedSections.forEach(section => observer.observe(section));
        }

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

    initSwipers();
    initTheme();
    initMenus();
    initSearch();
    initProductGallery();
    initSpecialProductGallery();
    initSearchSuggestionsDragScroll();
    initMisc();
});