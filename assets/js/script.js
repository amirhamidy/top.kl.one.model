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
                        576: { slidesPerView: 3, spaceBetween: 16 },
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
    initWhyUsAnimation();
});
document.addEventListener('DOMContentLoaded', () => {
    const storiesWrapper = document.querySelector('.story-module-stories-wrapper');
    const storyItems = document.querySelectorAll('.story-module-story-item');
    const modal = document.querySelector('.story-module-story-modal');
    const modalContent = modal.querySelector('.story-module-modal-content');
    const modalHeaderAvatar = modal.querySelector('.story-module-story-header-avatar');
    const modalHeaderUsername = modal.querySelector('.story-module-story-header-username');
    const modalHeaderTime = modal.querySelector('.story-module-story-header-time');
    // const closeModalBtn = modal.querySelector('.story-module-modal-close'); // این خط حذف شد
    const modalProgressBarContainer = modal.querySelector('.story-module-modal-progress-bar-container');
    const modalMediaContainer = modal.querySelector('.story-module-modal-story-media');
    const modalNavPrevBtn = modalContent.querySelector('.story-module-nav-button-prev');
    const modalNavNextBtn = modalContent.querySelector('.story-module-nav-button-next');

    const externalCaptionElement = modalContent.querySelector('#story-module-external-caption');
    const captionTextElement = externalCaptionElement.querySelector('#story-module-caption-text');


    let currentStoryUserIndex = 0;
    let currentStoryMediaIndex = 0;
    let storyInterval;
    let progressBarElements = [];
    let currentMediaElement = null;
    let loaderElement = null;
    let videoPlayer = null;

    let isMobile = window.matchMedia("(max-width: 768px)").matches;

    let isDragging = false;
    let startPos = 0;
    let scrollLeft = 0;
    let hasDragged = false;

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function showLoader() {
        if (!loaderElement) {
            loaderElement = document.createElement('div');
            loaderElement.classList.add('story-module-loader');
            modalMediaContainer.appendChild(loaderElement);
        }
        loaderElement.style.display = 'block';
    }

    function hideLoader() {
        if (loaderElement) {
            loaderElement.style.display = 'none';
        }
    }

    function pauseCurrentMedia() {
        clearInterval(storyInterval);
        if (videoPlayer) {
            videoPlayer.pause();
        }
        pauseProgressBar();
    }

    function resumeCurrentMedia() {
        resumeProgressBar();
        if (currentMediaElement && currentMediaElement.tagName === 'IMG') {
            const mediaDuration = parseInt(currentMediaElement.getAttribute('data-duration'));
            const currentProgressBar = progressBarElements[currentStoryMediaIndex];
            const innerBar = currentProgressBar.querySelector('.story-module-progress-inner');
            let remainingDuration;

            if (innerBar) {
                const currentWidthPx = parseFloat(window.getComputedStyle(innerBar).width);
                const totalWidthPx = parseFloat(window.getComputedStyle(currentProgressBar).width);
                const progressRatio = currentWidthPx / totalWidthPx;
                remainingDuration = mediaDuration * (1 - progressRatio);
                if (remainingDuration < 0) remainingDuration = 0;
            } else {
                remainingDuration = mediaDuration;
            }
            storyInterval = setTimeout(nextStory, remainingDuration);
        } else if (videoPlayer) {
            videoPlayer.play().catch(error => console.warn("Autoplay resume prevented:", error));
        }
    }

    function openStoryModal(userIndex, mediaIndex = 0) {
        currentStoryUserIndex = userIndex;
        currentStoryMediaIndex = mediaIndex;

        modal.classList.add('story-module-active');

        modalContent.style.transform = isMobile ? 'translateY(100vh)' : 'scale(0.9)';
        modal.style.opacity = '0';

        void modalContent.offsetWidth;

        requestAnimationFrame(() => {
            modalContent.style.transform = 'translateY(0) scale(1)';
            modal.style.opacity = '1';
        });

        renderStory();

        const currentUserItem = storyItems[currentStoryUserIndex];
        const userStoryItemBorder = currentUserItem.querySelector('.story-module-story-gradient-border');
        if (userStoryItemBorder) {
            userStoryItemBorder.classList.add('story-module-story-seen');
        }
    }

    function closeStoryModal() {
        clearInterval(storyInterval);
        if (videoPlayer) {
            videoPlayer.dispose();
            videoPlayer = null;
        }
        hideLoader();

        modalContent.style.transition = 'transform 0.3s ease-in, opacity 0.3s ease-in';
        modal.style.transition = 'opacity 0.3s ease-in';

        if (isMobile) {
            modalContent.style.transform = `translateY(${window.innerHeight}px)`;
            modal.style.opacity = '0';
        } else {
            modalContent.style.transform = 'scale(0.9)';
            modal.style.opacity = '0';
        }

        setTimeout(() => {
            modal.classList.remove('story-module-active');
            modalContent.style.transform = '';
            modalContent.style.transition = '';
            modal.style.opacity = '';
            modal.style.transition = '';
            modalMediaContainer.style.transform = '';
            resetProgressBars();
            currentMediaElement = null;
            if (captionTextElement) {
                captionTextElement.textContent = '';
            }
            externalCaptionElement.classList.add('story-module-d-none');

        }, 300);
    }

    function resetProgressBars() {
        modalProgressBarContainer.innerHTML = '';
        progressBarElements = [];
    }

    async function renderStory() {
        clearInterval(storyInterval);
        if (videoPlayer) {
            videoPlayer.dispose();
            videoPlayer = null;
        }
        hideLoader();

        const currentUserItem = storyItems[currentStoryUserIndex];
        if (!currentUserItem) {
            closeStoryModal();
            return;
        }

        const mediaListContainer = currentUserItem.querySelector('.story-module-media-list');
        const mediaElements = Array.from(mediaListContainer.children);

        if (mediaElements.length === 0 || currentStoryMediaIndex >= mediaElements.length || currentStoryMediaIndex < 0) {
            nextStory();
            return;
        }

        const currentMediaOriginal = mediaElements[currentStoryMediaIndex];

        modalHeaderAvatar.src = currentUserItem.getAttribute('data-avatar');
        modalHeaderUsername.textContent = currentUserItem.getAttribute('data-username');
        modalHeaderTime.textContent = '';

        const captionText = currentMediaOriginal.getAttribute('data-caption');
        if (captionTextElement) {
            captionTextElement.textContent = captionText || '';
            externalCaptionElement.classList.remove('story-module-d-none');
        } else {
            externalCaptionElement.classList.add('story-module-d-none');
        }


        modalMediaContainer.innerHTML = '';
        modalMediaContainer.style.transition = 'none';
        modalMediaContainer.style.transform = 'translateX(0)';

        const clonedMedia = currentMediaOriginal.cloneNode(true);
        clonedMedia.classList.remove('story-module-d-none');
        clonedMedia.classList.add('story-module-fade-in');

        if (clonedMedia.tagName === 'VIDEO') {
            clonedMedia.classList.add('video-js');
            clonedMedia.classList.add('vjs-default-skin');
        }

        modalMediaContainer.appendChild(clonedMedia);
        currentMediaElement = clonedMedia;

        const mediaDuration = parseInt(clonedMedia.getAttribute('data-duration'));

        setupProgressBars(mediaElements.length);

        if (clonedMedia.tagName === 'VIDEO') {
            showLoader();
            videoPlayer = videojs(clonedMedia, {
                autoplay: true,
                muted: false,
                controls: true,
                preload: 'auto',
                playsinline: true,
                liveui: true,
                fullscreen: {
                    exitFullScreenOnEnd: false,
                    enterFullScreenOnPlay: false
                },
                controlBar: {
                    fullscreenToggle: false,
                    pictureInPictureToggle: false,
                    children: [
                        'playToggle',
                        'volumePanel',
                        'currentTimeDisplay',
                        'timeDivider',
                        'durationDisplay',
                        'progressControl',
                        'spacer',
                        'chaptersButton',
                        'fullscreenToggle'
                    ]
                },
                userActions: {
                    doubleClick: false,
                    hotkeys: false,
                }
            }, function() {
                this.on('loadedmetadata', function() {
                    hideLoader();
                    startProgressBar(this.duration() * 1000);
                    modalHeaderTime.textContent = formatTime(this.duration());
                });

                this.on('timeupdate', function() {
                    const progress = (this.currentTime() / this.duration());
                    const innerBar = progressBarElements[currentStoryMediaIndex].querySelector('.story-module-progress-inner');
                    if (innerBar) {
                        innerBar.style.width = `${progress * 100}%`;
                        innerBar.style.transition = 'none';
                    }
                });

                this.on('ended', function() {
                    nextStory();
                });

                this.on('error', function(e) {
                    console.error("Video.js Error:", e);
                    hideLoader();
                    nextStory();
                });

                this.play().catch(error => {
                    console.warn("Autoplay was prevented:", error);
                });
            });

        } else if (clonedMedia.tagName === 'IMG') {
            showLoader();
            try {
                await new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = clonedMedia.src;
                    img.onload = () => { hideLoader(); resolve(); };
                    img.onerror = (e) => { hideLoader(); reject(new Error(`Image load error for: ${img.src}`)); };
                });
                startProgressBar(mediaDuration);
                storyInterval = setTimeout(nextStory, mediaDuration);

                let remainingTime = mediaDuration;
                const updateHeaderTime = () => {
                    modalHeaderTime.textContent = formatTime(remainingTime / 1000);
                    if (remainingTime > 0 && storyInterval) {
                        remainingTime -= 1000;
                        setTimeout(updateHeaderTime, 1000);
                    }
                };
                updateHeaderTime();

            } catch (error) {
                hideLoader();
                nextStory();
            }
        }
    }

    function setupProgressBars(count) {
        modalProgressBarContainer.innerHTML = '';
        progressBarElements = [];
        for (let i = 0; i < count; i++) {
            const bar = document.createElement('div');
            bar.classList.add('story-module-modal-progress-bar');
            modalProgressBarContainer.appendChild(bar);
            progressBarElements.push(bar);
        }
        for (let i = 0; i < currentStoryMediaIndex; i++) {
            if (progressBarElements[i]) {
                progressBarElements[i].classList.add('story-module-completed');
            }
        }
    }

    function startProgressBar(duration) {
        if (progressBarElements[currentStoryMediaIndex]) {
            const currentProgressBar = progressBarElements[currentStoryMediaIndex];
            const innerBar = document.createElement('span');
            innerBar.classList.add('story-module-progress-inner');
            currentProgressBar.innerHTML = '';
            currentProgressBar.appendChild(innerBar);

            innerBar.style.transition = 'none';
            innerBar.style.width = '0%';
            void innerBar.offsetWidth;

            innerBar.style.transition = `width ${duration / 1000}s linear`;
            innerBar.style.width = '100%';
        }
    }

    function pauseProgressBar() {
        if (progressBarElements[currentStoryMediaIndex]) {
            const currentProgressBar = progressBarElements[currentStoryMediaIndex];
            const innerBar = currentProgressBar.querySelector('.story-module-progress-inner');
            if (innerBar) {
                const currentWidth = window.getComputedStyle(innerBar).width;
                innerBar.style.transition = 'none';
                innerBar.style.width = currentWidth;
            }
        }
    }

    function resumeProgressBar() {
        if (progressBarElements[currentStoryMediaIndex]) {
            const currentProgressBar = progressBarElements[currentStoryMediaIndex];
            const innerBar = currentProgressBar.querySelector('.story-module-progress-inner');
            if (innerBar) {
                let totalDuration;
                if (currentMediaElement.tagName === 'VIDEO' && videoPlayer && videoPlayer.duration()) {
                    totalDuration = videoPlayer.duration() * 1000;
                    const elapsedRatio = videoPlayer.currentTime() / videoPlayer.duration();
                    innerBar.style.transition = 'none';
                    innerBar.style.width = `${elapsedRatio * 100}%`;
                    void innerBar.offsetWidth;

                    let remainingTimeInSeconds = videoPlayer.duration() - videoPlayer.currentTime();
                    if (remainingTimeInSeconds < 0) remainingTimeInSeconds = 0;

                    innerBar.style.transition = `width ${remainingTimeInSeconds}s linear`;
                    innerBar.style.width = '100%';

                } else {
                    totalDuration = parseInt(currentMediaElement.getAttribute('data-duration'));
                    const currentWidthPx = parseFloat(window.getComputedStyle(innerBar).width);
                    const totalWidthPx = parseFloat(window.getComputedStyle(currentProgressBar).width);
                    const progressRatio = currentWidthPx / totalWidthPx;
                    let remainingDuration = totalDuration * (1 - progressRatio);
                    if (remainingDuration < 0) remainingDuration = 0;

                    innerBar.style.transition = `width ${remainingDuration / 1000}s linear`;
                    innerBar.style.width = '100%';
                }
            }
        }
    }

    function nextStory() {
        pauseCurrentMedia();

        if (currentStoryUserIndex < storyItems.length && progressBarElements[currentStoryMediaIndex]) {
            progressBarElements[currentStoryMediaIndex].classList.add('story-module-completed');
            const innerBar = progressBarElements[currentStoryMediaIndex].querySelector('.story-module-progress-inner');
            if (innerBar) {
                innerBar.style.transition = 'none';
                innerBar.style.width = '100%';
            }
        }

        currentStoryMediaIndex++;

        const currentUserItem = storyItems[currentStoryUserIndex];
        let mediaElements = [];
        if (currentUserItem) {
            const mediaListContainer = currentUserItem.querySelector('.story-module-media-list');
            if (mediaListContainer) {
                mediaElements = Array.from(mediaListContainer.children);
            }
        }

        if (currentStoryMediaIndex < mediaElements.length) {
            renderStory();
        } else {
            currentStoryUserIndex++;
            currentStoryMediaIndex = 0;

            if (currentStoryUserIndex < storyItems.length) {
                openStoryModal(currentStoryUserIndex);
            } else {
                closeStoryModal();
            }
        }
    }

    function prevStory() {
        pauseCurrentMedia();

        if (currentStoryUserIndex < storyItems.length && progressBarElements[currentStoryMediaIndex]) {
            progressBarElements[currentStoryMediaIndex].classList.remove('story-module-completed');
            const innerBar = progressBarElements[currentStoryMediaIndex].querySelector('.story-module-progress-inner');
            if (innerBar) {
                innerBar.style.transition = 'none';
                innerBar.style.width = '0%';
            }
        }

        currentStoryMediaIndex--;

        const currentUserItem = storyItems[currentStoryUserIndex];
        let mediaElements = [];
        if (currentUserItem) {
            const mediaListContainer = currentUserItem.querySelector('.story-module-media-list');
            if (mediaListContainer) {
                mediaElements = Array.from(mediaListContainer.children);
            }
        }

        if (currentStoryMediaIndex >= 0) {
            if (currentStoryUserIndex < storyItems.length && progressBarElements[currentStoryMediaIndex]) {
                progressBarElements[currentStoryMediaIndex].classList.remove('story-module-completed');
                const innerBar = progressBarElements[currentStoryMediaIndex].querySelector('.story-module-progress-inner');
                if (innerBar) {
                    innerBar.style.transition = 'none';
                    innerBar.style.width = '0%';
                }
            }
            renderStory();
        } else {
            currentStoryUserIndex--;
            if (currentStoryUserIndex >= 0) {
                const prevUserItem = storyItems[currentStoryUserIndex];
                const prevMediaListContainer = prevUserItem.querySelector('.story-module-media-list');
                const prevMediaElements = Array.from(prevMediaListContainer.children);
                currentStoryMediaIndex = prevMediaElements.length - 1;

                const userStoryItemBorder = prevUserItem.querySelector('.story-module-story-gradient-border');
                if (userStoryItemBorder && userStoryItemBorder.classList.contains('story-module-story-seen')) {
                    userStoryItemBorder.classList.remove('story-module-story-seen');
                }

                openStoryModal(currentStoryUserIndex, currentStoryMediaIndex);
            } else {
                closeStoryModal();
            }
        }
    }

    storyItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            if (hasDragged) {
                hasDragged = false;
                return;
            }
            openStoryModal(index);
        });
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeStoryModal();
        }
    });
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('story-module-active')) {
            closeStoryModal();
        }
        if (e.key === 'ArrowRight' && modal.classList.contains('story-module-active')) {
            prevStory();
        }
        if (e.key === 'ArrowLeft' && modal.classList.contains('story-module-active')) {
            nextStory();
        }
    });

    if (modalNavPrevBtn) {
        modalNavPrevBtn.addEventListener('click', () => {
            prevStory();
        });
    }

    if (modalNavNextBtn) {
        modalNavNextBtn.addEventListener('click', () => {
            nextStory();
        });
    }

    window.addEventListener('resize', () => {
        isMobile = window.matchMedia("(max-width: 768px)").matches;
    });

    storiesWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        hasDragged = false;
        startPos = e.pageX - storiesWrapper.offsetLeft;
        scrollLeft = storiesWrapper.scrollLeft;
        storiesWrapper.classList.add('is-dragging');
    });

    storiesWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - storiesWrapper.offsetLeft;
        const walk = (x - startPos) * 1.5;

        if (Math.abs(walk) > 5) {
            hasDragged = true;
        }

        storiesWrapper.scrollLeft = scrollLeft - walk;
    });

    storiesWrapper.addEventListener('mouseup', () => {
        isDragging = false;
        storiesWrapper.classList.remove('is-dragging');
    });

    storiesWrapper.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            storiesWrapper.classList.remove('is-dragging');
        }
    });

    storiesWrapper.addEventListener('touchstart', (e) => {
        isDragging = true;
        hasDragged = false;
        startPos = e.touches[0].pageX - storiesWrapper.offsetLeft;
        scrollLeft = storiesWrapper.scrollLeft;
    });

    storiesWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - storiesWrapper.offsetLeft;
        const walk = (x - startPos) * 1.5;

        if (Math.abs(walk) > 5) {
            hasDragged = true;
        }

        storiesWrapper.scrollLeft = scrollLeft - walk;
    }, { passive: false });

    storiesWrapper.addEventListener('touchend', () => {
        isDragging = false;
    });

    function scrollStories(direction) {
        const itemWidth = storyItems[0].offsetWidth + 20;
        let currentScroll = storiesWrapper.scrollLeft;
        let targetScroll;

        if (direction === 'left') {
            targetScroll = currentScroll + itemWidth * 3;
        } else if (direction === 'right') {
            targetScroll = currentScroll - itemWidth * 3;
        }

        targetScroll = Math.max(0, targetScroll);
        targetScroll = Math.min(storiesWrapper.scrollWidth - storiesWrapper.clientWidth, targetScroll);

        storiesWrapper.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }
});

const hrefSlides = document.querySelectorAll('.href-slide');

hrefSlides.forEach(link => {
    link.setAttribute('target', '_blank');
});

const blogTagsList = document.getElementById('blog-tags-list-marquee');

if (blogTagsList) {
    const initialTagsContent = blogTagsList.innerHTML;
    blogTagsList.innerHTML += initialTagsContent + initialTagsContent + initialTagsContent + initialTagsContent;

    let currentScrollAmount = 0;
    const scrollSpeedPerFrame = 0.4;
    let animationFrameIdForTags;

    function animateBlogTagsScroll() {
        currentScrollAmount += scrollSpeedPerFrame;
        if (currentScrollAmount >= blogTagsList.scrollWidth / 4) {
            currentScrollAmount = 0;
        }
        blogTagsList.style.transform = `translateX(-${currentScrollAmount}px)`;
        animationFrameIdForTags = requestAnimationFrame(animateBlogTagsScroll);
    }

    blogTagsList.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationFrameIdForTags);
    });

    blogTagsList.addEventListener('mouseleave', () => {
        animateBlogTagsScroll();
    });

    animateBlogTagsScroll();
}

document.addEventListener('DOMContentLoaded', () => {
    'use strict';


    if (document.getElementById('blogSwiper')) {
        const blogSwiper = new Swiper('#blogSwiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            grabCursor: true,

            breakpoints: {
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                0: {
                    slidesPerView: 1.1,
                    spaceBetween: 15,
                    centeredSlides: true,
                    initialSlide: 0,
                }
            },

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

        });
    }

});
function initWhyUsAnimation() {
    const animatedSection = document.querySelector('.why-t-k-section');
    if (animatedSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(animatedSection);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const whyUsSwiper = new Swiper('.why-us-swiper-container', {
        direction: 'horizontal',
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 20,
        freeMode: true,
        grabCursor: true,
        pagination: {
            el: '.why-us-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 'auto',
                spaceBetween: 15,
            },
            480: {
                slidesPerView: 'auto',
                spaceBetween: 10,
            },
        },
    });

    const whyUsCombinedSection = document.querySelector('.why-us-combined-section');
    if (whyUsCombinedSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(whyUsCombinedSection);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Hero Swiper
    if (document.getElementById('heroSwiper')) {
        const heroSwiper = new Swiper('#heroSwiper', {
            direction: 'horizontal',
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // You can add a more creative JS effect for side banners here if needed.
    // For now, the CSS hover effect is enough.
});

document.addEventListener('scroll', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const scrolled = window.pageYOffset;
    parallaxBg.style.transform = `translateZ(-1px) scale(2) translateY(${scrolled * 0.5}px)`;
});
function initFlashDealAccordionUX() {
    const dataContainer = document.getElementById('flash-deal-data');
    const accordionList = document.querySelector('.flash-deal-accordion-list');

    // Main Display Elements
    const mainImage = document.getElementById('main-product-image');
    const mainTitle = document.getElementById('main-product-title');
    const mainPriceOld = document.getElementById('main-price-old');
    const mainPriceNew = document.getElementById('main-price-new');
    const mainTimer = document.getElementById('main-countdown-timer');
    const mainPurchaseBtn = document.querySelector('.btn-purchase');

    if (!dataContainer || !accordionList || !mainImage) return;

    const productsData = Array.from(dataContainer.children).map(item => ({
        id: item.dataset.id,
        imageUrl: item.dataset.imageUrl,
        priceOld: item.dataset.priceOld,
        priceNew: item.dataset.priceNew,
        title: item.dataset.title
    }));

    let activeProductIndex = 0;
    let countdownInterval;

    function renderAccordionButtons() {
        accordionList.innerHTML = '';
        productsData.forEach((product, index) => {
            const button = document.createElement('div');
            button.classList.add('accordion-item-btn');
            if (index === activeProductIndex) {
                button.classList.add('active');
            }
            button.dataset.index = index;
            button.innerHTML = `<h4 class="accordion-title">${product.title}</h4>`;
            accordionList.appendChild(button);
        });
    }

    function updateMainDisplay(product) {
        // Animation: fade out old content
        mainImage.style.opacity = 0;
        mainTitle.style.opacity = 0;

        setTimeout(() => {
            // Update content after fade out
            mainImage.src = product.imageUrl;
            mainTitle.textContent = product.title;
            mainPriceOld.textContent = `${parseInt(product.priceOld).toLocaleString()} تومان`;
            mainPriceNew.textContent = `${parseInt(product.priceNew).toLocaleString()} تومان`;
            mainPurchaseBtn.href = `#${product.id}`; // Update link

            // Animation: fade in new content
            mainImage.style.opacity = 1;
            mainTitle.style.opacity = 1;
        }, 300); // Wait for CSS transition
    }

    function startCountdownTimer() {
        if (countdownInterval) clearInterval(countdownInterval);

        // This can be different for each product
        let timeInSeconds = 24 * 60 * 60;

        countdownInterval = setInterval(() => {
            if (timeInSeconds <= 0) {
                clearInterval(countdownInterval);
                mainTimer.textContent = "00:00:00";
                return;
            }
            timeInSeconds--;
            const h = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
            const m = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
            const s = String(timeInSeconds % 60).padStart(2, '0');
            mainTimer.textContent = `${h}:${m}:${s}`;
        }, 1000);
    }

    accordionList.addEventListener('click', (e) => {
        const button = e.target.closest('.accordion-item-btn');
        if (!button) return;

        const newIndex = parseInt(button.dataset.index);
        if (newIndex === activeProductIndex) return;

        // Update active classes
        accordionList.querySelector('.accordion-item-btn.active').classList.remove('active');
        button.classList.add('active');
        activeProductIndex = newIndex;

        // Update display with animation
        updateMainDisplay(productsData[activeProductIndex]);

        // Restart timer
        startCountdownTimer();
    });

    // Initial setup on page load
    renderAccordionButtons();
    updateMainDisplay(productsData[activeProductIndex]);
    startCountdownTimer();
}

document.addEventListener('DOMContentLoaded', () => {
    initFlashDealAccordionUX();
});
