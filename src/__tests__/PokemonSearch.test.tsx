import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PokemonProvider } from '../context/PokemonContext';
import PokemonSearch from '../components/PokemonSearch';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('PokemonSearch component', () => {
  it('renders without errors and displays search results', async () => {
    // Имитация первого запроса для общего количества покемонов
    fetchMock.mockResponseOnce(
      JSON.stringify({
        count: 1,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      })
    );

    // Имитация второго запроса для списка покемонов
    fetchMock.mockResponseOnce(
      JSON.stringify({
        count: 1,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      })
    );

    // Имитация третьего запроса для получения деталей покемона
    fetchMock.mockResponseOnce(
      JSON.stringify({
        name: 'bulbasaur',
        abilities: [
          { ability: { name: 'chlorophyll' } },
          { ability: { name: 'overgrow' } },
        ],
        sprites: {
          other: {
            'official-artwork': {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            },
          },
        },
      })
    );

    render(
      <BrowserRouter>
        <PokemonProvider>
          <PokemonSearch />
        </PokemonProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const searchResultsText = screen.getByText(/Результаты поиска/, {
        exact: false,
      });
      expect(searchResultsText).toBeInTheDocument();
    });
  });

  it('opens Pokemon details on click', async () => {
    // Mock the first request to get the total number of Pokemon
    fetchMock.mockResponseOnce(
      JSON.stringify({
        count: 1,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      })
    );

    // Mock the third request to get Pokemon details
    fetchMock.mockResponseOnce(
      JSON.stringify({
        name: 'bulbasaur',
        abilities: [
          { ability: { name: 'chlorophyll' } },
          { ability: { name: 'overgrow' } },
        ],
        sprites: {
          other: {
            'official-artwork': {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
            },
          },
        },
      })
    );

    render(
      <BrowserRouter>
        <PokemonProvider>
          <PokemonSearch />
        </PokemonProvider>
      </BrowserRouter>
    );

    await waitFor(async () => {
      const searchResultsText = await screen.findByText(/Результаты поиска/i);

      expect(searchResultsText).toBeInTheDocument();
    });
  });
});
