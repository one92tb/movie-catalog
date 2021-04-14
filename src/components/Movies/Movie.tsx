/* eslint-disable no-param-reassign */
import React from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  CardFooter,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faEye, faStar, faTrashAlt, faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { VideosData } from '../../interfaces/videoData';
import { ModalData } from '../../interfaces/modalData';
import { InputValues } from '../../interfaces/inputValues';
import { Video } from '../../interfaces/video';

interface Props {
    setVideosData: (value: VideosData[]) => void,
    setMovies: (value: Video[]) => void,
    getModalData: (value: ModalData) => void,
    videosData: VideosData[],
    movie: Video,
    movies: Video[],
    inputValues: InputValues,
}

export const MovieCard: React.FC<Props> = (props) => {
  const {
    setVideosData, getModalData, setMovies, inputValues, movies, movie, videosData,
  } = props;

  const remove = (id: number) => {
    const filterById = (video: Video | VideosData) => video.date !== id;
    const filteredMovies: Video[] = movies.filter(filterById);
    const filteredVideosData: VideosData[] = videosData.filter(filterById);
    setVideosData(filteredVideosData);
    setMovies(filteredMovies);
  };

  const addFavorite = (id: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setFavorite = ((video : any) => {
      if (video.date === id) {
        video.isFavorite = !video.isFavorite;
        return video;
      }
      return video;
    });

    const favoriteMovies: Video[] = movies.map(setFavorite);
    const favoritesVideosData: VideosData[] = videosData.map(setFavorite);
    setMovies(favoriteMovies);
    setVideosData(favoritesVideosData);
  };

  return (
    <Card data-testid="card" className={`data-slice ${inputValues.display === 'vertical' ? 'card-horizontal' : ''}`}>
      <CardHeader>
        <CardTitle tag="h4">{movie.title}</CardTitle>
      </CardHeader>
      <CardBody className={`${inputValues.display === 'vertical' ? '' : 'card-body-horizontal'}`}>
        <CardImg
          top
          width="100%"
          src={movie.mediumThumbnail}
          alt="thubnail"
          onClick={() => getModalData({
            title: movie.title,
            url: movie.url,
            platform: movie.platform,
            isOpen: true,
          })}
        />
      </CardBody>
      <CardFooter className="text-muted">
        <span>
          <FontAwesomeIcon icon={faEye} />
          {` ${movie.viewCounts}`}
        </span>
        {movie.likeCount && (
        <span>
          <FontAwesomeIcon icon={faThumbsUp} />
          {` ${movie.likeCount}`}
        </span>
        )}
        <span>
          <FontAwesomeIcon icon={faClock} />
          {` ${new Date(movie.date).toLocaleString().split(',')[0]}`}
        </span>
        <span>
          <FontAwesomeIcon
            data-testid="remove-icon"
            icon={faTrashAlt}
            onClick={() => remove(movie.date)}
          />
        </span>
        <span>
          <FontAwesomeIcon
            icon={faStar}
            className={`${movie.isFavorite ? 'active-star' : ''}`}
            onClick={() => addFavorite(movie.date)}
          />
        </span>
      </CardFooter>
    </Card>
  );
};
