// У файлі main.js напиши всю логіку роботи додатка. Виклики нотифікацій iziToast, усі перевірки на довжину масиву в отриманій відповіді та логіку прокручування сторінки (scroll) робимо саме в цьому файлі. Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// import axios, { Axios } from 'axios';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  refs,
  clearGallery,
  hideLoader,
  showLoader,
  createGalleryCardTemplate,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

let page = 1;
let searchedQuery;
let totalPages;
// getImagesByQuery('yellow+flower')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   })
//   .finally(() => {
//     console.log('Axios request completed from pixabay-api.js');
//   });

const onLoadMoreBtnClick = async event => {
  try {
    hideLoadMoreButton();
    refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
    page++;
    const data = await getImagesByQuery(searchedQuery, page);
    showLoader();

    if (page === totalPages) {
      // refs.loadMoreBtn.classList.add('is-hidden');
      // refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      // alert('Зображень не знайдено!');
    }

    createGallery(data.hits);
    scrollPage();
    // const galleryCardsTemplate = data.hits.map(img => createGalleryCardTemplate(img)).join('');
    // console.log('data.hits from onLoadMoreBtnClick function:', data);
    // // console.log('galleryCardsTemplate from main.js:', galleryCardsTemplate);
    // refs.galleryList.insertAdjacentHTML('beforeend', galleryCardsTemplate);
    // lightbox.refresh();
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
    showLoadMoreButton();
    refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
  }
};

const scrollPage = () => {
  const card = refs.galleryList.firstElementChild;

  if (!card) return;

  const { height } = card.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
};
const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    console.log('onSearchFormSubmit function called');

    const { target: searchFormEl } = event;
    console.log('searchFormEl.elements:', searchFormEl.elements);
    searchedQuery = searchFormEl.elements['search-text'].value.trim();
    console.log('searchedQuery from main.js:', searchedQuery);
    if (!searchedQuery) {
      alert('Поле для введення не має бути порожнім!');

      return;
    }
    // refs.galleryList.innerHTML = '';
    clearGallery();
    showLoader();
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);

    page = 1;

    const data = await getImagesByQuery(searchedQuery, page);
    if (data.total === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      // alert('Зображень не знайдено!');
    }
    console.log('data.total from main.js:', data.total);
    console.log('data from main.js:', data);
    console.log('data.hits from main.js:', data.hits);
    //   const galleryCardsTemplate = data.hits.map;
    createGallery(data.hits);

    totalPages = Math.ceil(data.totalHits / 15);
    console.log('totalPages from main.js:', totalPages);
    if (totalPages > 1) {
      showLoadMoreButton();
      refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

// const response = await axios.get(
//   'https://jsonplaceholder.typicode.com/posts/20'
// );

// console.log(response.data);

// axios
//   .get('https://jsonplaceholder.typicode.com/posts', {
//     params: {
//       postId: 5,
//     },
//   })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   })
//   .finally(() => {
//     console.log('Request completed');
//   });

// axios
//   .get('https://pixabay.com/api/', {
//     params: {
//       key: '56787016-99e31dc5b616b930e3b2ced26',
//       q: 'yellow+flower',
//       image_type: 'all',
//       orientation: 'all',
//       safesearch: 'false',
//     },
//   })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   })
//   .finally(() => {
//     console.log('Axios request completed');
//   });
