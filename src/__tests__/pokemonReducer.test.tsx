import pokemonReducer, {
  PokemonState,
  setAbilityDescriptions,
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

  it('should handle setAbilityDescriptions action', () => {
    const abilityDescriptions = { bulbasaur: 'Overgrow' };
    const newState = pokemonReducer(
      initialState,
      setAbilityDescriptions(abilityDescriptions)
    );

    expect(newState.abilityDescriptions).toEqual(abilityDescriptions);
  });
});
