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
        path: 'Jk7rliZpuSs', date: 1617974782332, platform: 'youtube', isFavorite: false,
      }, {
        path: 'TdJriJftSNc', date: 1617974903221, platform: 'youtube', isFavorite: false,
      }, {
        path: 'https://vimeo.com/431444293', date: 1617974916287, platform: 'vimeo', isFavorite: false,
      }, {
        path: 'https://vimeo.com/271064161', date: 1617974927483, platform: 'vimeo', isFavorite: false,
      }],
      videosData: [
        {
          path: 'Jk7rliZpuSs', date: 1617974782332, platform: 'youtube', isFavorite: false,
        },
        {
          path: 'TdJriJftSNc', date: 1617974903221, platform: 'youtube', isFavorite: false,
        },
        {
          path: 'https://vimeo.com/431444293', date: 1617974916287, platform: 'vimeo', isFavorite: false,
        }, {
          path: 'https://vimeo.com/271064161', date: 1617974927483, platform: 'vimeo', isFavorite: false,
        },
      ],
      panelData: { display: 'vertical', favorite: 'all', order: 'newest' },
    };

    render(<MovieList {...props} />);
  });
});
