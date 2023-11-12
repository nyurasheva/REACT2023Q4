import fetchMock from 'jest-fetch-mock';
jest.mock('node-fetch');

describe('PokemonSearch', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders with initial data', async () => {
    const mockData = {
      count: 100,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));
  });

  it('handles search', async () => {
    const mockData = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
      abilities: [{ ability: { name: 'static' } }],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));
  });
});
