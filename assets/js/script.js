document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initMegaMenu();
    initProductCarousel();
    initThumbnailGalleries();
    initProductActions();

    function initSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchToggleBtn = document.getElementById('search-toggle-btn');
        const searchCloseBtn = document.getElementById('search-close-btn');
        const searchInput = document.querySelector('.search-input');

        function closeSearch() {
            searchOverlay.classList.remove('active');
        }

        searchToggleBtn.addEventListener('click', function() {
            searchOverlay.classList.add('active');
            setTimeout(function() {
                searchInput.focus();
            }, 300);
        });

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

    function initProductCarousel() {
        new Swiper('.swiper-product-carousel', {
            loop: false,
            slidesPerView: 1.8,
            spaceBetween: 15,
            navigation: {
                nextEl: '.swiper-product-carousel .swiper-button-next',
                prevEl: '.swiper-product-carousel .swiper-button-prev',
            },
            breakpoints: {
                576: {
                    slidesPerView: 2.5,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 25
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 25
                }
            },
            grabCursor: true,
        });
    }

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
});