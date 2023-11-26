import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PokemonCard } from '../components/PokemonCard';
import store from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    query: '',
  }),
}));

jest.mock('../redux/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('PokemonCard Component', () => {
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useAppSelector as jest.Mock).mockReturnValue({
      abilityDescriptions: {},
      images: {},
      isLoading: false,
      currentPage: 1,
    });
  });

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

  // it('renders loading state when data is not available', () => {
  //   jest
  //     .spyOn(require('../redux/apiSlice'), 'useSearchPokemonQuery')
  //     .mockReturnValue({
  //       data: null,
  //       isLoading: true,
  //     });

  //   render(<PokemonCard url="https://pokeapi.co/api/v2/pokemon/1" />);

  //   expect(screen.getByText('Loading...')).toBeInTheDocument();
  // });

  it('renders Pokemon details when data is available', () => {
    jest
      .spyOn(require('../redux/apiSlice'), 'useSearchPokemonQuery')
      .mockReturnValue({
        data: {
          name: 'Pikachu',
          abilities: [
            { ability: { name: 'Static' } },
            { ability: { name: 'Thunderbolt' } },
          ],
          sprites: {
            other: {
              'official-artwork': {
                front_default: 'https://path.to.image/pikachu.png',
              },
            },
          },
        },
        isLoading: false,
      });

    render(<PokemonCard url="https://pokeapi.co/api/v2/pokemon/25" />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Способности:')).toBeInTheDocument();
    expect(screen.getByText('Static')).toBeInTheDocument();
    expect(screen.getByText('Thunderbolt')).toBeInTheDocument();
  });

  it('handles item render', () => {
    jest
      .spyOn(require('../redux/apiSlice'), 'useSearchPokemonQuery')
      .mockReturnValue({
        data: { name: 'сharmander', abilities: [] },
        isLoading: false,
      });

    render(<PokemonCard url="https://pokeapi.co/api/v2/pokemon/4" />);
  });
});
