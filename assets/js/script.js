document.addEventListener('DOMContentLoaded', () => {
    'use strict'; // Enable strict mode for better code quality

    // =========================================================================
    // SWIPER INITIALIZATION
    // Initializes all Swiper carousels used throughout the site.
    // =========================================================================
    function initSwipers() {
        // Hero Swiper (Main banner carousel)
        const heroSwiperContainer = document.querySelector('.hero-swiper');
        if (heroSwiperContainer) {
            new Swiper(heroSwiperContainer, {
                loop: true, // Enable infinite loop
                effect: 'fade', // Fade transition effect
                fadeEffect: {
                    crossFade: true
                },
                autoplay: {
                    delay: 5000, // Autoplay every 5 seconds
                    disableOnInteraction: false // Autoplay continues even after user interaction
                },
                pagination: {
                    el: '.hero-swiper .swiper-pagination', // Pagination bullets element
                    clickable: true // Make pagination bullets clickable
                },
                navigation: {
                    nextEl: '.hero-swiper .hero-button-next', // Next button element
                    prevEl: '.hero-swiper .hero-button-prev' // Previous button element
                },
                on: {
                    // Custom initialization logic for pagination animation
                    init: (swiper) => {
                        if (swiper.pagination.bullets[swiper.realIndex]) {
                            swiper.pagination.bullets[swiper.realIndex].classList.add('progress-start');
                        }
                        updateSwiperNavButtons(swiper); // Update navigation button states
                    },
                    // Logic for pagination animation and button states on slide change
                    slideChange: (swiper) => {
                        swiper.pagination.bullets.forEach(bullet => bullet.classList.remove('progress-start'));
                        const activeBullet = swiper.pagination.bullets[swiper.realIndex];
                        if (activeBullet) {
                            void activeBullet.offsetWidth; // Trigger reflow to restart CSS animation
                            activeBullet.classList.add('progress-start');
                        }
                        updateSwiperNavButtons(swiper); // Update navigation button states
                    }
                }
            });
        }

        // Flash Deal Swiper (Single slide carousel)
        const flashDealSwiperContainer = document.querySelector('.flash-deal-swiper');
        if (flashDealSwiperContainer) {
            new Swiper(flashDealSwiperContainer, {
                slidesPerView: 1, // Show one slide at a time
                spaceBetween: 24, // Space between slides
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

        // Golden Offers Swiper (Multi-slide product carousel)
        const goldenOffersSwiperContainer = document.querySelector('.golden-offers-swiper');
        if (goldenOffersSwiperContainer) {
            new Swiper(goldenOffersSwiperContainer, {
                slidesPerView: 1,
                spaceBetween: 16,
                navigation: {
                    nextEl: '.golden-offer-next',
                    prevEl: '.golden-offer-prev'
                },
                breakpoints: { // Responsive breakpoints for different number of slides
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

        // Special Offers Swiper (Matches Golden Offers breakpoints as requested)
        const specialOffersSwiperContainer = document.querySelector('.special-offers-swiper');
        if (specialOffersSwiperContainer) {
            new Swiper(specialOffersSwiperContainer, {
                slidesPerView: 1,
                spaceBetween: 16,
                navigation: {
                    nextEl: '.special-offer-next',
                    prevEl: '.special-offer-prev'
                },
                breakpoints: { // Identical breakpoints to Golden Offers Swiper
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

        // Helper function to update aria-disabled attribute for Swiper navigation buttons
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

    // =========================================================================
    // THEME TOGGLE (DARK/LIGHT MODE)
    // Handles switching between dark and light themes with a smooth transition.
    // =========================================================================
    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const transitionCircle = document.getElementById('theme-transition-circle');

        if (!themeToggle || !transitionCircle) return;

        // Apply theme from localStorage or default to 'light'
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', currentTheme === 'dark');

        themeToggle.addEventListener('click', (e) => {
            const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';

            // Position transition circle at click coordinates
            transitionCircle.style.left = `${e.clientX}px`;
            transitionCircle.style.top = `${e.clientY}px`;
            transitionCircle.classList.add('is-active');

            // Toggle theme class after a short delay for animation
            setTimeout(() => {
                document.body.classList.toggle('dark-theme');
                localStorage.setItem('theme', newTheme);
            }, 350); // Matches CSS transition duration

            // Remove active class after transition ends
            transitionCircle.addEventListener('transitionend', () => {
                transitionCircle.classList.remove('is-active');
            }, {
                once: true
            });
        });
    }

    // =========================================================================
    // MENU HANDLING (MEGA MENU, MOBILE MENU)
    // Manages interactions for desktop mega menus and mobile slide-out menus.
    // =========================================================================
    function initMenus() {
        // Mega Menu Logic (Desktop hover/focus for category panels)
        document.querySelectorAll('.mega-menu-categories .category-item').forEach(item => {
            const activateCategory = () => {
                // Deactivate currently active category and panel
                document.querySelector('.mega-menu-categories .category-item.active')?.classList.remove('active');
                document.querySelector('.subcategory-panel.active')?.classList.remove('active');

                // Activate the hovered/focused category and its target panel
                item.classList.add('active');
                document.querySelector(item.dataset.target)?.classList.add('active');
            };
            item.addEventListener('mouseenter', activateCategory); // For mouse hover
            item.addEventListener('focus', activateCategory); // For keyboard navigation (accessibility)
        });

        // Mobile Menu Logic (Toggle sidebar menu)
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenuClose = document.getElementById('mobile-menu-close');

        if (!mobileMenu || !mobileMenuOverlay || !mobileMenuToggle || !mobileMenuClose) return;

        const openMobileMenu = () => {
            mobileMenu.style.display = 'flex'; // Make menu visible
            mobileMenuOverlay.style.display = 'block'; // Show overlay
            setTimeout(() => {
                mobileMenu.classList.add('active'); // Animate menu in
                mobileMenuOverlay.classList.add('active'); // Animate overlay in
            }, 10); // Small delay for CSS display property to register
        };

        const closeMobileMenu = () => {
            mobileMenu.classList.remove('active'); // Animate menu out
            mobileMenuOverlay.classList.remove('active'); // Animate overlay out
            setTimeout(() => {
                mobileMenu.style.display = 'none'; // Hide menu after transition
                mobileMenuOverlay.style.display = 'none'; // Hide overlay after transition
            }, 400); // Matches CSS transition duration
        };

        mobileMenuToggle.addEventListener('click', openMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu); // Close on overlay click
    }

    // =========================================================================
    // SEARCH OVERLAY
    // Manages the visibility and functionality of the fullscreen search overlay.
    // =========================================================================
    function initSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = searchOverlay?.querySelector('.search-input');
        const searchToggleBtn = document.getElementById('search-toggle-btn');
        const searchCloseBtn = document.getElementById('search-close-btn');

        if (!searchOverlay || !searchToggleBtn || !searchCloseBtn) return;

        const openSearch = () => {
            searchOverlay.style.display = 'flex'; // Make overlay visible
            setTimeout(() => {
                searchOverlay.classList.add('active'); // Animate overlay in
                searchInput?.focus(); // Focus on input field
            }, 10);
        };

        const closeSearch = () => {
            searchOverlay.classList.remove('active'); // Animate overlay out
            setTimeout(() => {
                searchOverlay.style.display = 'none'; // Hide overlay after transition
            }, 400); // Matches CSS transition duration
        };

        searchToggleBtn.addEventListener('click', openSearch);
        searchCloseBtn.addEventListener('click', closeSearch);

        // Close search when clicking outside the search box (on the overlay itself)
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });

        // Close search on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });
    }

    // =========================================================================
    // PRODUCT CARD GALLERIES
    // Handles image switching on product cards.
    // =========================================================================

    // Old style product gallery (with bottom thumbnails)
    function initProductGallery() {
        // Selects product cards that are NOT the new special-card type
        document.querySelectorAll('.product-card:not(.special-card)').forEach(card => {
            const mainImage = card.querySelector('.main-product-image');
            const thumbnails = card.querySelectorAll('.thumbnail-item');

            if (mainImage && thumbnails.length > 0) {
                thumbnails.forEach(thumb => {
                    thumb.addEventListener('mouseenter', () => {
                        const largeSrc = thumb.dataset.largeSrc;
                        // Prevent image re-load if it's already the main image
                        if (largeSrc && mainImage.src !== largeSrc) {
                            mainImage.src = largeSrc;

                            // Update active thumbnail
                            card.querySelector('.thumbnail-item.active')?.classList.remove('active');
                            thumb.classList.add('active');
                        }
                    });
                });
            }
        });
    }

    // Special Product Card Gallery (new style, with interactive zones and no action icons)
    function initSpecialProductGallery() {
        document.querySelectorAll('.product-card.special-card').forEach(card => {
            const mainImage = card.querySelector('.main-product-image');
            const interactiveZones = card.querySelectorAll('.interactive-zones .zone');
            // Store the initial image source to revert when mouse leaves the card
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

                // IMPORTANT: Mouseleave on the entire .product-card.special-card to reset the image
                // This covers all interactive elements within the card (image, zones, etc.)
                card.addEventListener('mouseleave', () => {
                    if (mainImage.src !== initialSrc) {
                        mainImage.src = initialSrc;
                    }
                });
            }
        });
    }

    // =========================================================================
    // MISCELLANEOUS FUNCTIONALITY
    // Contains various other site-wide functionalities like toast, animations, countdown.
    // =========================================================================
    function initMisc() {
        // Add to Cart Toast Notification (uses Toastify.js library)
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                Toastify({
                    text: "محصول به سبد خرید اضافه شد!", // Persian message
                    duration: 3000, // Show for 3 seconds
                    gravity: "bottom", // Position at bottom
                    position: "left", // Position at left (RTL consideration)
                    style: {
                        background: "var(--success-color)", // Background color from CSS variable
                        fontFamily: "Vazirmatn" // Custom font for Toastify
                    }
                }).showToast();
            });
        });

        // Intersection Observer for Animations (e.g., fade-in sections)
        // Adds 'is-visible' class when section enters viewport.
        const animatedSections = document.querySelectorAll('.hero-slider-section, .golden-offers, .special-offers');
        if (animatedSections.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Stop observing once visible
                    }
                });
            }, {
                threshold: 0.1 // Trigger when 10% of the element is visible
            });

            animatedSections.forEach(section => observer.observe(section));
        }

        // Flash Deal Countdown Timer (Displays remaining time for a deal)
        const countdownElement = document.getElementById('flash-deal-countdown');
        if (countdownElement) {
            let timeInSeconds = 24 * 60 * 60; // Example: 24 hours in seconds. Replace with dynamic value if needed.

            const timerInterval = setInterval(() => {
                if (timeInSeconds <= 0) {
                    clearInterval(timerInterval);
                    countdownElement.textContent = "00:00:00"; // Ensure it shows 00:00:00 at end
                    return;
                }
                timeInSeconds--;

                // Calculate hours, minutes, seconds and format with leading zeros
                const h = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
                const m = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
                const s = String(timeInSeconds % 60).padStart(2, '0');

                countdownElement.textContent = `${h}:${m}:${s}`;
            }, 1000); // Update every second
        }
    }

    // =========================================================================
    // INITIALIZATION CALLS
    // Fires all main initialization functions once the DOM is fully loaded.
    // =========================================================================
    initSwipers();
    initTheme();
    initMenus();
    initSearch();
    initProductGallery();
    initSpecialProductGallery();
    initMisc();
});