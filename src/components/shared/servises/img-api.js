import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '31894288-d396035e6b984cce02ff6ba47',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getImj = async (search, page = 1) => {
  const { data } = await instance.get(`/`, {
    params: {
      q: search,
      page,
    },
  });
  return data;
};
