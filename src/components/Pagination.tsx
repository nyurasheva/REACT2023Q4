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
  return (
    <div className="pagination-container">
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={onPageChange}
        containerClassName="pagination"
        previousLabel="Назад"
        nextLabel="Вперед"
        activeClassName="active"
        disabledClassName="disabled"
        initialPage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
