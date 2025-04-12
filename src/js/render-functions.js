// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { refs } from './pixabay-api';

// let lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// export function createGallery(images) {
//   const markup = images
//     .map(img => {
//       const {
//         largeImageURL,
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       } = img;
//       return `<li class="gallery-item">
//               <a class="gallery-link" href="${largeImageURL}">
//                 <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
//               </a>
//               <div class="info">
//                 <p>Likes: <span class="likes">${likes}</span></p>
//                 <p>Views: <span class="views">${views}</span></p>
//                 <p>Comments: <span class="comments">${comments}</span></p>
//                 <p>Downloads: <span class="downloads">${downloads}</span></p>
//               </div>
//             </li>`;
//     })
//     .join('');

//   refs.gallery.innerHTML = markup;
//   lightbox.refresh();
// }

// export function clearGallery() {
//   refs.gallery.innerHTML = '';
// }

// export function showLoader() {
//   const loader = document.querySelector('.loader');
//   if (loader) loader.style.display = 'block';
// }

// export function hideLoader() {
//   const loader = document.querySelector('.loader');
//   if (loader) loader.style.display = 'none';
// }

// export function smoothScroll() {
//   const galleryItem = document.querySelector('.gallery-item');
//   if (galleryItem) {
//     const { height } = galleryItem.getBoundingClientRect();
//     window.scrollBy({
//       left: 0,
//       top: height * 2,
//       behavior: 'smooth',
//     });
//   }
// }
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
