import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Pagination from '../components/Pagination';
import { useRouter as useRouterOriginal, NextRouter } from 'next/router';

jest.mock('next/router', () => ({
  ...(jest.requireActual('next/router') as NextRouter),
  useRouter: jest.fn(),
}));

const useRouter = useRouterOriginal as jest.Mock;

describe('Pagination Component', () => {
  it('renders correctly and handles page change', () => {
    const totalPages = 10;
    const onPageChange = jest.fn();

    useRouter.mockImplementation(() => ({
      query: { page: '1' },
      push: jest.fn(),
    }));

    render(
      <Provider store={store}>
        <Pagination totalPages={totalPages} onPageChange={onPageChange} />
      </Provider>
    );

    const nextPageButton = screen.getByText('Вперед');
    fireEvent.click(nextPageButton);
  });
});
