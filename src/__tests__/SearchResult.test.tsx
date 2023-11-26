import { render } from '@testing-library/react';
import SearchResult from '../components/SearchResult';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { NextRouter, useRouter } from 'next/router';

jest.mock('next/router', () => ({
  __esModule: true,
  ...(jest.requireActual('next/router') as NextRouter),
  useRouter: jest.fn(),
}));

describe('SearchResult Component', () => {
  it('displays the formation', () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      pathname: '/search',
      query: {},
      push: jest.fn(),
    }));

    render(
      <Provider store={store}>
        <SearchResult onClosePokemonDetails={() => {}} />
      </Provider>
    );
  });
});
