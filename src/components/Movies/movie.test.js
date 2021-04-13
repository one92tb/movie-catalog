/* eslint-disable react/jsx-props-no-spreading */
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import Movie from './Movie';

describe('movie component', () => {
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
      }, {
        date: 1617974903221,
        isFavorite: false,
        likeCount: '118',
        mediumThumbnail: 'https://i.ytimg.com/vi/TdJriJftSNc/hqdefault.jpg',
        platform: 'youtube',
        title: 'FIFA World Cup GREAT GOALS - MAXI RODRÍGUEZ 🇦🇷 wonder goal! - Argentina v Mexico (Germany 2006)',
        url: 'TdJriJftSNc',
        viewCounts: '7594',
      }],
      movie: {
        date: 1617974782332,
        isFavorite: false,
        likeCount: '1220094',
        mediumThumbnail: 'https://i.ytimg.com/vi/Jk7rliZpuSs/hqdefault.jpg',
        platform: 'youtube',
        title: 'Urban Freeride Lives 3 - Fabio Wibmer',
        url: 'Jk7rliZpuSs',
        viewCounts: '66959908',
      },
      videosData: [
        {
          path: 'Jk7rliZpuSs',
          date: 1617974782332,
          platform: 'youtube',
          isFavorite: false,
        },
        {
          date: 1617974903221,
          isFavorite: false,
          path: 'TdJriJftSNc',
          platform: 'youtube',
        },
      ],
      inputValues: { display: 'vertical', favorite: 'all', order: 'newest' },
    };

    render(<Movie {...props} />);
  });

  test('it should start setvideosData, setMovies with correct parameters', async () => {
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
      }, {
        date: 1617974903221,
        isFavorite: false,
        likeCount: '118',
        mediumThumbnail: 'https://i.ytimg.com/vi/TdJriJftSNc/hqdefault.jpg',
        platform: 'youtube',
        title: 'FIFA World Cup GREAT GOALS - MAXI RODRÍGUEZ 🇦🇷 wonder goal! - Argentina v Mexico (Germany 2006)',
        url: 'TdJriJftSNc',
        viewCounts: '7594',
      }],
      movie: {
        date: 1617974782332,
        isFavorite: false,
        likeCount: '1220094',
        mediumThumbnail: 'https://i.ytimg.com/vi/Jk7rliZpuSs/hqdefault.jpg',
        platform: 'youtube',
        title: 'Urban Freeride Lives 3 - Fabio Wibmer',
        url: 'Jk7rliZpuSs',
        viewCounts: '66959908',
      },
      videosData: [
        {
          path: 'Jk7rliZpuSs',
          date: 1617974782332,
          platform: 'youtube',
          isFavorite: false,
        },
        {
          date: 1617974903221,
          isFavorite: false,
          path: 'TdJriJftSNc',
          platform: 'youtube',
        },
      ],
      inputValues: { display: 'vertical', favorite: 'all', order: 'newest' },
    };

    render(<Movie {...props} />);
    const removeIcon = screen.getByTestId('remove-icon');
    await fireEvent.click(removeIcon);
    expect(props.setMovies).toHaveBeenCalledTimes(1);
    expect(props.setMovies).toHaveBeenCalledWith([{
      date: 1617974903221,
      isFavorite: false,
      likeCount: '118',
      mediumThumbnail: 'https://i.ytimg.com/vi/TdJriJftSNc/hqdefault.jpg',
      platform: 'youtube',
      title: 'FIFA World Cup GREAT GOALS - MAXI RODRÍGUEZ 🇦🇷 wonder goal! - Argentina v Mexico (Germany 2006)',
      url: 'TdJriJftSNc',
      viewCounts: '7594',
    }]);
    expect(props.setVideosData).toHaveBeenCalledTimes(1);
    expect(props.setVideosData).toHaveBeenCalledWith([{
      date: 1617974903221,
      isFavorite: false,
      path: 'TdJriJftSNc',
      platform: 'youtube',
    }]);
  });
});
