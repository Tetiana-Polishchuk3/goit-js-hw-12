import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const imageList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox = null;

function createImageCard(image) {
  const shortAlt = image.tags.split(',').slice(0, 3).join(', ');
  return `
    <li class="gallery-item">
        <a href="${image.largeImageURL}" class="gallery-link">
            <img
                class="gallery-image"
                src="${image.webformatURL}"
                alt="${shortAlt}"
            />
            <div class="info">
                <div class="info-item">
                    <p class="info-label">Likes</p>
                    <span class="info-value">${image.likes}</span>
                </div>
                <div class="info-item">
                    <p class="info-label">Views</p>
                    <span class="info-value">${image.views}</span>
                </div>
                <div class="info-item">
                    <p class="info-label">Comments</p>
                    <span class="info-value">${image.comments}</span>
                </div>
                <div class="info-item">
                    <p class="info-label">Downloads</p>
                    <span class="info-value">${image.downloads}</span>
                </div>
            </div>
        </a>
    </li>
    `;
}

export function createGallery(images) {
  const createMurkup = images.map(createImageCard).join('');
  imageList.insertAdjacentHTML('beforeend', createMurkup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function clearGallery() {
  imageList.innerHTML = '';
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function getBoundingClientRect() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      left: 0,
      top: height * 3,
      behavior: 'smooth',
    });
  }
}
