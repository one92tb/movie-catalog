import axios from 'axios';

const youtubeInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.REACT_APP_YOUTUBE_ACCESS,
    part: 'snippet',
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
}).catch(() => 'something goes wrong - check your path');

const fetchYoutubeDataAll = (data) => youtubeInstance.get('/videos', {
  params: {
    id: data.url,
    part: 'snippet, statistics',
  },
}).then((res) => {
  const resTable = [];
  res.data.items.forEach((video, id) => {
    const videoDetails = {
      title: video.snippet.title,
      viewCounts: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      mediumThumbnail: video.snippet.thumbnails.high.url,
      largeThumbnail: video.snippet.thumbnails.maxres.url,
      date: data.dates[id],
    };

    resTable.push(videoDetails);
  });
  return resTable;
});

const fetchVimeoDataByUrl = (url) => vimeoInstance.get('/', {
  params: {
    links: url,
  },
}).then((res) => {
  const { link } = res.data.data[0];
  return link;
}).catch(() => 'something goes wrong - check your path');

const fetchVimeoDataAll = (data) => vimeoInstance.get('/', {
  params: {
    links: data.url,
  },
}).then((res) => {
  const resTable = [];
  res.data.data.forEach((video, id) => {
    const videoDetails = {
      title: video.name,
      viewCounts: video.stats.plays,
      date: data.dates[id],
      mediumThumbnail: video.pictures.sizes[3].link,
      largeThumbnail: video.pictures.sizes[4].link,
    };
    resTable.push(videoDetails);
  });
  return resTable;
});

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
