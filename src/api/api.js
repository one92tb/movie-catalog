import axios from 'axios';

const youtubeInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.REACT_APP_API_KEY,
    part: 'snippet',
    q: 'https://www.youtube.com/watch?v=mSi5ra_YeHc',
  },
});

const vimeoInstance = axios.create({
  baseURL: 'https://api.vimeo.com/videos/',
  headers: {
    Authorization: 'bearer acbea73f0c90012b8336b3127480efbd',
  },
});

const fetchYoutubeDataById = (url) => youtubeInstance.get('/search', {
  params: {
    q: url,
  },
}).then((res) => {
  console.log(res);
});

const fetchYoutubeDataAll = (urls) => youtubeInstance.get('/videos', {
  params: {
    id: urls,
  },
}).then((res) => {
  console.log(res);
});

const fetchVimeoData = (url) => vimeoInstance.get('/', {
  params: {
    links: url,
  },
}).then((res) => {
  console.log(res);
});

const getApiClient = (api) => {
  const platforms = {
    youtube: () => ({
      getById: fetchYoutubeDataById,
      getData: fetchYoutubeDataAll,
    }),
    vimeo: () => ({
      getData: fetchVimeoData,
    }),
  };

  return platforms[api]();
};

export default getApiClient;
