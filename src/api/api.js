import axios from 'axios';

const youtubeInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.REACT_APP_YOUTUBE_ACCESS,
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

const fetchYoutubeDataByUrl = (url) => youtubeInstance.get('/search', {
  params: {
    q: url,
    maxResults: 1,
  },
}).then((res) => {
  const { videoId } = res.data.items[0].id;
  return videoId;
}).catch(() => 'something goes wrong');

const fetchYoutubeDataAll = (urls) => youtubeInstance.get('/videos', {
  params: {
    id: urls,
  },
}).then((res) => {
  console.log(res);
  return res;
});

const fetchVimeoDataByUrl = (url) => vimeoInstance.get('/', {
  params: {
    links: url,
  },
}).then((res) => {
  const { link } = res.data.data[0];
  return link;
}).catch(() => 'something goes wrong');

const fetchVimeoDataAll = (urls) => vimeoInstance.get('/', {
  params: {
    links: urls,
  },
}).then((res) => res);

const getApiClient = (api) => {
  const platforms = {
    youtube: () => ({
      getData: fetchYoutubeDataByUrl,
      getAll: fetchYoutubeDataAll,
    }),
    vimeo: () => ({
      getData: fetchVimeoDataByUrl,
      getAll: fetchVimeoDataAll,
    }),
  };

  return platforms[api]();
};

export default getApiClient;
