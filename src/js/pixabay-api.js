// getImagesByQuery(query). Ця функція повинна приймати один параметр query (пошукове слово, яке є рядком), здійснювати HTTP-запит і повертати значення властивості data з отриманої відповіді.

import axios from 'axios';

export const getImagesByQuery = searchQuery => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '56787016-99e31dc5b616b930e3b2ced26';

  const requestParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  return axios.get(BASE_URL, { params: requestParams }).then(response => {
    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    console.log('response from pixabay-api.js:', response);
    console.log('response.data from pixabay-api.js:', response.data);
    return response.data;
  });
};
