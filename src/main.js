// У файлі main.js напиши всю логіку роботи додатка. Виклики нотифікацій iziToast, усі перевірки на довжину масиву в отриманій відповіді робимо саме в цьому файлі. Імпортуй в нього функції із файлів pixabay-api.js та render-functions.js та викликай їх у відповідний момент.

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// import axios, { Axios } from 'axios';
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, refs, clearGallery, hideLoader, showLoader } from './js/render-functions';

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

const onSearchFormSubmit = event => {
  event.preventDefault();

  const { target: searchFormEl } = event;
  console.log('searchFormEl.elements:', searchFormEl.elements);
  const searchedQuery = searchFormEl.elements['search-text'].value.trim();

  if (!searchedQuery) {
    alert('Поле для введення не має бути порожнім!');

    return;
  }
  // refs.galleryList.innerHTML = '';
  clearGallery();
  showLoader();

  getImagesByQuery(searchedQuery)
    .then(data => {
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
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      // refs.preloader.classList.remove('is-active');
      hideLoader();
    });
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
