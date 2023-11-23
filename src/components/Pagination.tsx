import React from 'react';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from '../redux/hooks';

interface PaginationProps {
  totalPages: number;
  onPageChange: ({ selected }: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const { currentPage } = useAppSelector((state) => state.pokemonState);

  const paginationComponent = (
    <ReactPaginate
      initialPage={currentPage > 0 ? currentPage - 1 : 0}
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={onPageChange}
      containerClassName="pagination"
      previousLabel="Назад"
      nextLabel="Вперед"
      activeClassName="active"
      disabledClassName="disabled"
    />
  );

  return (
    <div className="pagination-container">
      {currentPage === 1 ? (
        paginationComponent
      ) : (
        <div>{paginationComponent}</div>
      )}
    </div>
  );
};

export default Pagination;
