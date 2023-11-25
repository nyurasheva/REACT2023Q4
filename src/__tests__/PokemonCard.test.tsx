import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PokemonCard } from '../components/PokemonCard';
import store from '../redux/store';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    query: '',
  }),
}));

describe('PokemonCard Component', () => {
  it('displays the pokemon name when data is available', () => {
    const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/1';
    const { getByText } = render(
      <Provider store={store}>
        <PokemonCard url={pokemonUrl} />
      </Provider>
    );

    const pokemonNameElement = getByText(/Loading.../i, { exact: false });
    expect(pokemonNameElement).toBeInTheDocument();
  });
});
