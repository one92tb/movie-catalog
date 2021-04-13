/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent, render, screen } from '@testing-library/react';
import { demo } from '../../demo/demo';
import Panel from './Panel';

describe('panel component', () => {
  test('it should start setVideosData with empty table as a parameter when user is clicking  remove button', () => {
    const props = {
      setVideosData: jest.fn(),
      setPanelData: jest.fn(),
    };

    render(<Panel {...props} />);
    const removeBtn = screen.getByText('Remove all');
    fireEvent.click(removeBtn);
    expect(props.setVideosData).toHaveBeenCalledTimes(1);
    expect(props.setVideosData).toHaveBeenCalledWith([]);
  });

  test('it should start setVideosData with demo as a parameter when user is clicking loadDemo button', () => {
    const props = {
      setVideosData: jest.fn(),
      setPanelData: jest.fn(),
    };

    render(<Panel {...props} />);
    const loadBtn = screen.getByText('Load demo');
    fireEvent.click(loadBtn);
    expect(props.setVideosData).toHaveBeenCalledTimes(1);
    expect(props.setVideosData).toHaveBeenCalledWith(demo);
  });

  test('it should start setPanelData with inputValues as a parameter when inputValues are changing', () => {
    const props = {
      setVideosData: jest.fn(),
      setPanelData: jest.fn(),
    };

    render(<Panel {...props} />);

    const displayIntut = screen.getByTestId('display-select');
    fireEvent.change(displayIntut, {
      target: {
        value: 'horizontal',
      },
    });

    expect(props.setPanelData).toHaveBeenCalledTimes(2);
    expect(props.setPanelData).toHaveBeenCalledWith({
      display: 'horizontal',
      favorite: 'all',
      order: 'newest',
    });
  });
});
