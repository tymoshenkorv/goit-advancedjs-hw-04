// У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:

// createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
// clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
// showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
// hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
// showLoadMoreButton(). Ця функція нічого не приймає, повинна додавати клас для відображення кнопки Load more. Нічого не повертає.
// hideLoadMoreButton(). Ця функція нічого не приймає, повинна прибирати клас для відображення кнопки Load more. Нічого не повертає.

import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
export const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryList: document.querySelector('.js-gallery'),
  preloader: document.querySelector('.js-loader'),
  loadMoreBtn: document.querySelector('.js-load-more-btn'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export const createGalleryCardTemplate = imgData => {
  return `
    <li class="gallery-card">
        <a class="gallery-link" href="${imgData.largeImageURL}">
          <img class="gallery-img" src="${imgData.webformatURL}" alt="${imgData.tags}" />
        </a>
        <div class="gallery-stats">
          <div class="gallery-stat">
            <div class="gallery-stat-title">Likes</div>
            <div class="gallery-stat-value">${imgData.likes}</div>
          </div>
          <div class="gallery-stat">
            <div class="gallery-stat-title">Views</div>
            <div class="gallery-stat-value">${imgData.views}</div>
          </div>
          <div class="gallery-stat">
            <div class="gallery-stat-title">Comments</div>
            <div class="gallery-stat-value">${imgData.comments}</div>
          </div>
          <div class="gallery-stat">
            <div class="gallery-stat-title">Downloads</div>
            <div class="gallery-stat-value">${imgData.downloads}</div>
          </div>
        </div>
    </li>
 `;
};

export function createGallery(images) {
  //   console.log('images from render-functions.js:', images);
  const galleryCardsTemplate = images.map(img => createGalleryCardTemplate(img)).join('');
  // refs.galleryList.innerHTML = galleryCardsTemplate;
  refs.galleryList.insertAdjacentHTML('beforeend', galleryCardsTemplate);
  lightbox.refresh();
}
export function clearGallery() {
  refs.galleryList.innerHTML = '';
}

export function showLoader() {
  refs.preloader.classList.add('is-active');
}

export function hideLoader() {
  refs.preloader.classList.remove('is-active');
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
export function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
