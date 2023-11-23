import { render } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { Provider } from 'react-redux';
import store from '../redux/store';

describe('Pagination Component', () => {
  it('renders correctly and handles page change', () => {
    const totalPages = 10;
    const onPageChange = jest.fn();

    render(
      <Provider store={store}>
        <Pagination totalPages={totalPages} onPageChange={onPageChange} />
      </Provider>
    );
  });
});
