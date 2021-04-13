/* eslint-disable react/jsx-props-no-spreading */
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import MockDate from 'mockdate';
import Fromular from './Form';

describe('fomular component', () => {
  MockDate.set('2021-04-13');

  test('it should render Form component', () => {
    const props = {
      videosData: [
        {
          path: 'Jk7rliZpuSs', date: 1617974782332, platform: 'youtube', isFavorite: false,
        }, {
          path: 'TdJriJftSNc', date: 1617974903221, platform: 'youtube', isFavorite: false,
        },
      ],
      setVideosData: jest.fn(),
    };
    render(<Fromular {...props} />);
  });

  test('it should submit value from input', async () => {
    const props = {
      videosData: [
        {
          path: 'Jk7rliZpuSs', date: 1617974782332, platform: 'youtube', isFavorite: false,
        }, {
          path: 'TdJriJftSNc', date: 1617974903221, platform: 'youtube', isFavorite: false,
        },
      ],
      setVideosData: jest.fn(),
    };
    render(<Fromular {...props} />);

    const input = screen.getByPlaceholderText('put a link to the input to add a video...');
    const button = screen.getByText('Submit');

    fireEvent.change(input, {
      target: {
        value: 'https://www.youtube.com/watch?v=aOZREbWHKcM',
      },
    });
    fireEvent.click(button);
    await waitFor(() => expect(props.setVideosData).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(props.setVideosData).toHaveBeenCalledWith([{
      date: 1617974782332, isFavorite: false, path: 'Jk7rliZpuSs', platform: 'youtube',
    }, {
      date: 1617974903221, isFavorite: false, path: 'TdJriJftSNc', platform: 'youtube',
    }, {
      date: 1618272000000, isFavorite: false, path: 'aOZREbWHKcM', platform: 'youtube',
    }]));
  });

  test('it should throw error when input value is incorrect', async () => {
    const props = {
      videosData: [
        {
          path: 'Jk7rliZpuSs', date: 1617974782332, platform: 'youtube', isFavorite: false,
        }, {
          path: 'TdJriJftSNc', date: 1617974903221, platform: 'youtube', isFavorite: false,
        },
      ],
      setVideosData: jest.fn(),
    };
    render(<Fromular {...props} />);

    const input = screen.getByPlaceholderText('put a link to the input to add a video...');
    const button = screen.getByText('Submit');

    fireEvent.change(input, {
      target: {
        value: 'https://www.youtube.com/12312',
      },
    });
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText('your link is invalid or this video is already uploaded'))
      .toBeTruthy());
  });

  test('it should throw error when input value is empty', async () => {
    const props = {
      videosData: [
        {
          path: 'Jk7rliZpuSs', date: 1617974782332, platform: 'youtube', isFavorite: false,
        }, {
          path: 'TdJriJftSNc', date: 1617974903221, platform: 'youtube', isFavorite: false,
        },
      ],
      setVideosData: jest.fn(),
    };
    render(<Fromular {...props} />);

    const input = screen.getByPlaceholderText('put a link to the input to add a video...');
    const button = screen.getByText('Submit');

    fireEvent.change(input, {
      target: {
        value: '',
      },
    });
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByText('your link is invalid or this video is already uploaded'))
      .toBeTruthy());
  });
});
