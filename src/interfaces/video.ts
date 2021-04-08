interface YouTubeItem {
    id: {
      videoId: string,
    }
    snippet: {
      title: string;
      thumbnails: {
        high: {
          url: string;
        };
        maxres: {
          url: string;
        };
      };
    };
    statistics: {
      likeCount: number;
      viewCount: number;
    };
}

interface VimeoItem {
  name: string;
  stats: {
    plays: number;
  };
  pictures: {
    sizes: {
      link: string;
    }[];
  };
  date: {
    dates: number[];
  };
  link: string;
}

export interface Video {
  title: string;
  viewCounts: number;
  date: number;
  mediumThumbnail: string;
  largeThumbnail: string;
  url: string;
  platform: string;
  isFavorite: boolean;
}

export interface VimeoResponse {
  data: VimeoItem[];
}

export interface YouTubeResponse {
    items: YouTubeItem[];
}
