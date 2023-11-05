import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: ({ selected }: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const paginationComponent = (
    <ReactPaginate
      initialPage={currentPage - 1}
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
