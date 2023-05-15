import axios from 'axios';

const API_KEY = '34489847-fb4ace76cb0b4d30e99228503';

export const fetchImg = async (query, page, perPage) => {
  const response = await axios.get(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}&safesearch=true`
  );
  return response.data;
};
