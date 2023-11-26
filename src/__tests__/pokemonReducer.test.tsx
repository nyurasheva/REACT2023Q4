import pokemonReducer, {
  PokemonState,
  setAbilityDescriptions,
  setCurrentPage,
  setIsDetailsOpen,
  setLoading,
  setSelectedId,
  setSearchTermValue,
  setSearchResults,
  setTotalPages,
  setItemsPerPage,
  Pokemon,
} from '../redux/pokemonReducer';

describe('Pokemon Reducer', () => {
  let initialState: PokemonState;

  beforeEach(() => {
    initialState = {
      searchResults: [],
      isLoading: false,
      isSearching: false,
      abilityDescriptions: {},
      images: {},
      currentPage: 1,
      itemsPerPage: 20,
      totalPages: 1,
      selectedId: null,
      isDetailsOpen: false,
      searchTermValue: '',
    };
  });

  it('should return the initial state', () => {
    expect(pokemonReducer(undefined, { type: 'unknownAction' })).toEqual(
      initialState
    );
  });

  it('should handle setLoading action', () => {
    const newState = pokemonReducer(initialState, setLoading(true));
    expect(newState.isLoading).toBe(true);
  });

  it('should handle setAbilityDescriptions action', () => {
    const abilityDescriptions = { bulbasaur: 'Overgrow' };
    const newState = pokemonReducer(
      initialState,
      setAbilityDescriptions(abilityDescriptions)
    );

    expect(newState.abilityDescriptions).toEqual(abilityDescriptions);
  });

  it('should handle setCurrentPage action', () => {
    const newPage = 2;
    const newState = pokemonReducer(initialState, setCurrentPage(newPage));
    expect(newState.currentPage).toBe(newPage);
  });

  it('should handle setSelectedId action', () => {
    const newSelectedId = 'pikachu';
    const newState = pokemonReducer(initialState, setSelectedId(newSelectedId));
    expect(newState.selectedId).toBe(newSelectedId);
  });

  it('should handle setIsDetailsOpen action', () => {
    const newState = pokemonReducer(initialState, setIsDetailsOpen(true));
    expect(newState.isDetailsOpen).toBe(true);
  });

  it('should handle setSearchTerm action', () => {
    const newSearchTerm = 'charizard';
    const newState = pokemonReducer(
      initialState,
      setSearchTermValue(newSearchTerm)
    );
    expect(newState.searchTermValue).toBe(newSearchTerm);
  });

  it('should handle setSearchResults action', () => {
    const results: Pokemon[] = [
      { name: 'bulbasaur', url: 'url1', abilities: ['ability1', 'ability2'] },
      { name: 'charmander', url: 'url2', abilities: ['ability3', 'ability4'] },
    ];
    const newState = pokemonReducer(initialState, setSearchResults(results));
    expect(newState.searchResults).toEqual(results);
  });

  it('should handle setTotalPages action', () => {
    const newTotalPages = 5;
    const newState = pokemonReducer(initialState, setTotalPages(newTotalPages));
    expect(newState.totalPages).toBe(newTotalPages);
  });

  it('should handle setItemsPerPage action', () => {
    const newItemsPerPage = 30;
    const newState = pokemonReducer(
      initialState,
      setItemsPerPage(newItemsPerPage)
    );
    expect(newState.itemsPerPage).toBe(newItemsPerPage);
  });

  it('should handle setLoading action and maintain other properties', () => {
    const modifiedState: PokemonState = {
      ...initialState,
      currentPage: 3,
      selectedId: 'pikachu',
    };

    const newState = pokemonReducer(modifiedState, setLoading(true));

    expect(newState.isLoading).toBe(true);
    expect(newState.currentPage).toBe(3);
    expect(newState.selectedId).toBe('pikachu');
  });
});
