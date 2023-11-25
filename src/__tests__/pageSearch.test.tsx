import { render } from '@testing-library/react';
import Search from '../pages/search';
import { Provider } from 'react-redux';
import store from '../redux/store';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: 'mockedPageValue' },
    push: jest.fn(),
  }),
}));

describe('Search Page', () => {
  it('renders Search page correctly', async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
  });
});
