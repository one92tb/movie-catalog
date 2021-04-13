/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';
import MovieList from './MovieList';

describe('movieList component', () => {
  test('it should render movies component', () => {
    const props = {
      setVideosData: jest.fn(),
      getModalData: jest.fn(),
      setMovies: jest.fn(),
      movies: [{
        date: 1617974782332,
        isFavorite: false,
        likeCount: '1220094',
        mediumThumbnail: 'https://i.ytimg.com/vi/Jk7rliZpuSs/hqdefault.jpg',
        platform: 'youtube',
        title: 'Urban Freeride Lives 3 - Fabio Wibmer',
        url: 'Jk7rliZpuSs',
        viewCounts: '66959908',
      }],
      videosData: [
        {
          path: 'Jk7rliZpuSs', date: 1617974782332, platform: 'youtube', isFavorite: false,
        },
      ],
      panelData: { display: 'vertical', favorite: 'all', order: 'newest' },
    };

    render(<MovieList {...props} />);
  });
});
