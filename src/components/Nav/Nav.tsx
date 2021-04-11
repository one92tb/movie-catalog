import React, { useEffect } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Movies } from '../../interfaces/fetchData';
import './style.css';

interface Props {
  displayData: Movies[],
  setCurrentPage: (value:number) => void,
  currentPage: number,
}

const Nav: React.FC<Props> = (props) => {
  const { displayData, setCurrentPage, currentPage } = props;
  const pagesCount = Math.ceil(displayData.length / 6);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
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
            <PaginationItem active={i === currentPage} key={displayData[i].date}>
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
