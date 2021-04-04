import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import useLocalStorage from '../../localStorage/localStorage';

const Nav = (props) => {
  const { localStorageData, getCurrentPage } = props;
  const [videosData, setVideosData] = useLocalStorage('videosData', []);
  const [currentPage, setCurrentPage] = useState(0);
  const pagesCount = Math.ceil(videosData.length / 6);

  useEffect(() => {
    if (localStorageData.length > videosData.length) {
      setVideosData(localStorageData);
    }
  }, [localStorageData, setVideosData, videosData.length]);

  useEffect(() => {
    getCurrentPage(currentPage);
  }, [currentPage, getCurrentPage]);

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  return (
    <div className="pagination-wrapper">
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink
            onClick={(e) => handleClick(e, 0)}
            previous
            href="#"
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            onClick={(e) => handleClick(e, currentPage - 1)}
            previous
            href="#"
          />
        </PaginationItem>
        {
          [...Array(pagesCount)].map((video, i) => (
            <PaginationItem active={i === currentPage} key={videosData[i].date}>
              <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        <PaginationItem disabled={currentPage >= pagesCount - 1}>
          <PaginationLink
            onClick={(e) => handleClick(e, currentPage + 1)}
            next
            href="#"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={(e) => handleClick(e, pagesCount - 1)}
            next
            href="#"
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default Nav;

Nav.defaultProps = {
  localStorageData: [],
  getCurrentPage: () => 0,
};

Nav.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  localStorageData: PropTypes.array,
  getCurrentPage: PropTypes.func,
};
