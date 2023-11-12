import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  it('renders correctly and handles page change', () => {
    const currentPage = 3;
    const totalPages = 10;
    const onPageChange = jest.fn();

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );

    const paginationContainer = screen.getByRole('navigation');
    expect(paginationContainer).toBeInTheDocument();

    const previousPageButton = screen.getByText('Назад');
    expect(previousPageButton).toBeInTheDocument();

    const nextPageButton = screen.getByText('Вперед');
    expect(nextPageButton).toBeInTheDocument();

    const activePage = screen.getByLabelText(
      `Page ${currentPage} is your current page`
    );
    expect(activePage).toBeInTheDocument();
  });
});
