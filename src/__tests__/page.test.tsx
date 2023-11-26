import { render } from '@testing-library/react';
import Home from '../pages';
import { Provider } from 'react-redux';
import store from '../redux/store';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { page: 'mockedPageValue' },
    push: jest.fn(),
  }),
}));

describe('Home Page', () => {
  it('renders Home page correctly', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });
});
