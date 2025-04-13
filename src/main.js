import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  getBoundingClientRect,
} from './js/render-functions';

const form = document.querySelector('.form');
const searchInput = document.querySelector('.input');
const loadMore = document.querySelector('.js-load-more');

let page = 1;
let enteredInput = '';

form.addEventListener('submit', handleSubmit);
loadMore.addEventListener('click', onLoadMore);
loadMore.classList.replace('js-load-more', 'load-more-hidden');

async function handleSubmit(event) {
  event.preventDefault();
  enteredInput = searchInput.value.trim();
  page = 1;

  if (!enteredInput) {
    iziToast.warning({
      position: 'topRight',
      title: 'Warning',
      message: 'Please enter a search query',
    });
    searchInput.focus();
    return;
  }

  showLoader();
  clearGallery();
  loadMore.classList.add('load-more-hidden');

  try {
    const data = await getImagesByQuery(enteredInput, page);

    if (!data.hits || data.hits.length === 0) {
      iziToast.warning({
        position: 'topRight',
        title: 'Warning',
        message: 'Sorry, no images found. Please try another query!',
      });
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / 15);
    if (page < totalPages) {
      loadMore.classList.remove('load-more-hidden');
      loadMore.classList.add('js-load-more');
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
    });
    console.error('Error:', error);
  } finally {
    hideLoader();
    searchInput.value = '';
  }
}

async function onLoadMore() {
  page++;
  loadMore.disabled = true;
  loadMore.classList.add('load-more-hidden');
  showLoader();

  try {
    const data = await getImagesByQuery(enteredInput, page);
    const totalPages = Math.ceil(data.totalHits / 15);

    if (page > totalPages) {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    createGallery(data.hits);
    getBoundingClientRect();

    if (page < totalPages) {
      loadMore.classList.remove('load-more-hidden');
      loadMore.classList.add('js-load-more');
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: error.message,
    });
  } finally {
    hideLoader();
    loadMore.disabled = false;
  }
}
