import axios from 'axios';

const API_KEY = '49636460-73c540aa8750c0befabaf1348';

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні зображень:', error.message);
    throw error;
  }
}
