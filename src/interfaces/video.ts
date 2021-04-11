interface YouTubeItem {
    id: string,
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
  id: string;
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
