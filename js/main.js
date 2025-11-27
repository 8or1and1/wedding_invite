class WeddingSite {
    constructor() {
        this.images = [
            'static/img/groom-bride-hands-with-rings-closeup-no-face_251840-1061.jpg.avif',
            'static/img/images.jpeg',
            'static/img/images2.jpeg'
        ];
        this.currentImageIndex = 0;
        this.init();
    }

    init() {
        this.initMusic();
        this.initGallery();
        this.initLightbox();
    }

    initMusic() {
        const audio = document.getElementById('wedding-music');
        const musicToggle = document.getElementById('music-toggle');
        let isPlaying = false;

        const playMusic = () => {
            audio.volume = 0.3;
            audio.play().catch(error => {
                console.log('Автовоспроизведение заблокировано браузером');
            });
            isPlaying = true;
            musicToggle.innerHTML = '<span class="music-icon">🔊</span>';
        };

        const pauseMusic = () => {
            audio.pause();
            isPlaying = false;
            musicToggle.innerHTML = '<span class="music-icon">🔇</span>';
        };

        playMusic();

        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });

        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            audio.play();
        });
    }

    initGallery() {
        const gallery = document.getElementById('gallery');
        
        this.images.forEach((imagePath, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Свадебное фото ${index + 1}`;
            img.loading = 'lazy';
            
            galleryItem.appendChild(img);
            galleryItem.addEventListener('click', () => this.openLightbox(index));
            gallery.appendChild(galleryItem);
        });
    }

    initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');

        closeBtn.addEventListener('click', () => this.closeLightbox());
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showPreviousImage();
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showNextImage();
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    this.closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    this.showPreviousImage();
                } else if (e.key === 'ArrowRight') {
                    this.showNextImage();
                }
            }
        });
    }

    openLightbox(index) {
        this.currentImageIndex = index;
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        
        lightboxImage.src = this.images[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    showPreviousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        document.getElementById('lightbox-image').src = this.images[this.currentImageIndex];
    }

    showNextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        document.getElementById('lightbox-image').src = this.images[this.currentImageIndex];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WeddingSite();
});

