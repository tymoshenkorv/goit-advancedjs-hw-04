// У файлі pixabay-api.js зберігай функції для виконання HTTP-запитів:

// getImagesByQuery(query, page). Ця функція повинна приймати два параметри query (пошукове слово, яке є рядком) та page (номер сторінки, яка є числом), здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (searchQuery, page) => {
  // const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '56787016-99e31dc5b616b930e3b2ced26';

  const requestParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 15,
  });
  const response = await axios.get(``, { params: requestParams });
  return response.data;
};
