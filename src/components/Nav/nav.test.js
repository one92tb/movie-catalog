/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@testing-library/react';
import { Nav } from './Nav';

describe('panel component', () => {
  test('it should render nav component', () => {
    const props = {
      setCurrentPage: jest.fn(),
      currentPage: 0,
      displayData: [{
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
    };

    render(<Nav {...props} />);
    const paginationLink = screen.getAllByTestId('pagination-link');
    expect(paginationLink).toHaveLength(5);
  });
});
