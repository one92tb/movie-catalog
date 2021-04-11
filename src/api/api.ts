import axios from 'axios';
import { YouTubeResponse, VimeoResponse, Video } from '../interfaces/video';
import { PlatformData } from '../interfaces/platformData';

interface VideoClient {
  getAll(data: PlatformData): Promise<Video[]>;
  getData(url: string): Promise<string>;
}

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
    Authorization: `bearer ${process.env.REACT_APP_VIMEO_ACCESS}`,
  },
});

const fetchYoutubeDataByUrl = async (url: string) => {
  const res = await youtubeInstance.get<{
    items: { id: { videoId: string } }[];
  }>('/search', {
    params: {
      q: url,
      maxResults: 1,
    },
  });
  const { videoId } = res.data.items[0].id;
  return videoId;
};

const fetchYoutubeDataAll = async (data: PlatformData) => {
  const res = await youtubeInstance.get<YouTubeResponse>('/videos', {
    params: {
      id: data.url,
      part: 'snippet, statistics',
    },
  });
  return res.data.items.map((video) => {
    const id: number = data.url.split(',').findIndex((url) => (video.id === url));
    return ({
      title: video.snippet.title,
      url: video.id,
      viewCounts: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      mediumThumbnail: video.snippet.thumbnails.high.url,
      date: data.dates[id],
      platform: data.platform,
      isFavorite: data.isFavorite[id],
    });
  });
};

const fetchVimeoDataByUrl = async (url: string) => {
  const res = await vimeoInstance.get<{ data: { link: string }[] }>('/', {
    params: {
      links: url,
    },
  });

  const { link } = res.data.data[0];
  return link;
};

const fetchVimeoDataAll = async (data: PlatformData) => {
  const res = await vimeoInstance.get<VimeoResponse>('/', {
    params: {
      links: data.url,
    },
  });
  return res.data.data.map((video) => {
    const id: number = data.url.split(',').findIndex((url) => (video.link === url));
    return ({
      title: video.name,
      viewCounts: video.stats.plays,
      mediumThumbnail: video.pictures.sizes[3].link,
      largeThumbnail: video.pictures.sizes[4].link,
      url: video.link,
      date: data.dates[id],
      platform: data.platform,
      isFavorite: data.isFavorite[id],
    });
  });
};

export const getApiClients: Record<string, VideoClient> = {
  youtube: {
    getData: fetchYoutubeDataByUrl,
    getAll: fetchYoutubeDataAll,
  },
  vimeo: {
    getData: fetchVimeoDataByUrl,
    getAll: fetchVimeoDataAll,
  },
};
