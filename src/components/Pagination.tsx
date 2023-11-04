import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  navigate: (to: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, navigate }) => {
  const handlePageChange = ({ selected }: { selected: number }) => {
    navigate(`/search?page=${selected + 1}`);
  };

  return (
    <div className="pagination-container">
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        previousLabel="Назад"
        nextLabel="Вперед"
        activeClassName="active"
        disabledClassName="disabled"
      />
    </div>
  );
};

export default Pagination;
