import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAbilityDescriptions,
  setImages,
  setIsSearching,
  setLoading,
  setSearchResults,
  setSelectedId,
  setIsDetailsOpen,
  setCurrentPage,
  setTotalPages,
  setItemsPerPage,
  Pokemon,
} from '../redux/pokemonReducer';
import PageInput from './PageInput';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import Pagination from './Pagination';
import PokemonDetails from './PokemonDetails';
import { RootState } from '../redux/rootReducer';

export const PokemonSearch: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.pokemon);
  const location = useLocation();
  const navigate = useNavigate();

  const updatePokemonDetails = useCallback(
    (pokemonDetails: (Pokemon | null)[]) => {
      const updatedAbilityDescriptions: { [key: string]: string | null } = {};
      const updatedImages: { [key: string]: string | null } = {};

      for (const pokemonData of pokemonDetails) {
        if (pokemonData) {
          updatedAbilityDescriptions[pokemonData.name] =
            pokemonData.abilities.join(', ');
          updatedImages[pokemonData.name] = pokemonData.image || null;
        }
      }

      dispatch(setAbilityDescriptions(updatedAbilityDescriptions));
      dispatch(setImages(updatedImages));
      localStorage.setItem(
        'abilityDescriptions',
        JSON.stringify(updatedAbilityDescriptions)
      );
      localStorage.setItem('pokemonImages', JSON.stringify(updatedImages));
    },
    [dispatch]
  );

  const handleItemClick = (pokemonName: string) => {
    const selected = state.searchResults.find(
      (pokemon) => pokemon.name === pokemonName
    );
    dispatch(setSelectedId(selected ? pokemonName : null));
    dispatch(setIsDetailsOpen(true));
    navigate(
      `${location.pathname}?page=${state.currentPage}&details=${pokemonName}`
    );
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    const newPage = 1;
    dispatch(setItemsPerPage(newItemsPerPage));
    dispatch(setCurrentPage(newPage));
    navigate(`/search?page=${newPage}`);
    fetchPokemons(newPage);
  };

  const calculateTotalCountAndPages = (count: number, itemsPerPage: number) => {
    const totalCount = count - 12;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    return { totalCount, totalPages };
  };

  const handleSearchResultClose = () => {
    dispatch(setSelectedId(null));
    navigate(`${location.pathname}?page=${state.currentPage}`);
  };

  const fetchPokemonDetails = useCallback(async (pokemonUrl: string) => {
    try {
      const response = await fetch(pokemonUrl);
      if (response.ok) {
        const data = await response.json();
        const abilities = data.abilities.map(
          (ability: { ability: { name: string } }) => ability.ability.name
        );
        const imageUrl = data.sprites.other['official-artwork'].front_default;

        const imagePromise = new Promise<string>((resolve) => {
          const image = new Image();
          image.src = imageUrl;
          image.onload = () => {
            resolve(image.src);
          };
        });

        const image = await imagePromise;

        return {
          name: data.name,
          url: data.url,
          image: image,
          abilities: abilities,
        };
      } else {
        console.error('Error fetching abilities. Response not OK:', response);
        return null;
      }
    } catch (error) {
      console.error('Error fetching abilities:', error);
      return null;
    }
  }, []);

  const searchPokemon = useCallback(
    async (searchTerm: string) => {
      dispatch(setIsSearching(true));
      dispatch(setLoading(true));

      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
        const pokemon = await fetchPokemonDetails(apiUrl);
        const results = [pokemon].filter(Boolean) as Pokemon[];
        dispatch(setSearchResults(results));
        updatePokemonDetails(results);
      } catch (error) {
        console.error('Error searching for Pokemon:', error);
        dispatch(setSearchResults([]));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, fetchPokemonDetails, updatePokemonDetails]
  );

  const fetchPokemons = useCallback(
    async (page: number = 1) => {
      const offset = (page - 1) * state.itemsPerPage;

      dispatch(setLoading(true));

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${state.itemsPerPage}`
        );
        if (response.ok) {
          const data = await response.json();

          const { totalPages } = calculateTotalCountAndPages(
            data.count || 0,
            state.itemsPerPage
          );

          const results: Pokemon[] = data.results || [];
          const fetchPromises = results.map(async (result) => {
            const pokemonData = await fetchPokemonDetails(result.url);
            return pokemonData;
          });

          const pokemonDetails = await Promise.all(fetchPromises);
          const validPokemonDetails = pokemonDetails.filter(
            (data) => data !== null
          ) as Pokemon[];

          dispatch(setSearchResults(validPokemonDetails));
          updatePokemonDetails(validPokemonDetails);
          dispatch(setTotalPages(totalPages));
        } else {
          console.error('Error fetching data. Response not OK:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, fetchPokemonDetails, state.itemsPerPage, updatePokemonDetails]
  );

  const doSearch = useCallback(
    (searchTerm: string, page?: number) => {
      if (searchTerm) {
        searchPokemon(searchTerm);
      } else {
        fetchPokemons(page);
      }
    },
    [searchPokemon, fetchPokemons]
  );

  const handleSearch = async (searchTerm: string) => {
    doSearch(searchTerm);
    navigate('/search');
    dispatch(setSelectedId(null));
  };

  useEffect(() => {
    const initPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        try {
          const data = await response.json();
          if (!data || !data.count) {
            console.warn(
              'Предупреждение: общее количество не найдено в ответе.'
            );
            return;
          }

          const { totalPages } = calculateTotalCountAndPages(
            data.count,
            state.itemsPerPage
          );

          dispatch(setTotalPages(totalPages));

          // Делаем инициализацию данных только если запрос к серверу выполнен успешно
          const savedAbilityDescriptions = localStorage.getItem(
            'abilityDescriptions'
          );
          if (savedAbilityDescriptions) {
            dispatch(
              setAbilityDescriptions(JSON.parse(savedAbilityDescriptions))
            );
          }

          const savedImages = localStorage.getItem('pokemonImages');
          if (savedImages) {
            dispatch(setImages(JSON.parse(savedImages)));
          }

          const savedSearchTerm = localStorage.getItem('searchTerm');
          doSearch(savedSearchTerm || '', state.currentPage);
        } catch (jsonError) {
          console.error('Ошибка при разборе JSON:', jsonError);
        }
      } catch (error) {
        console.error('Ошибка при получении общего количества:', error);
      }
    };

    initPokemons();
  }, [dispatch, doSearch, state.currentPage, state.itemsPerPage]);

  useEffect(() => {
    navigate(`/search?page=${state.currentPage}`);
  }, [state.currentPage, navigate]);

  return (
    <main>
      <div className="content container">
        <div className="top-section">
          <PageInput
            itemsPerPage={state.itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
          <SearchInput onSearch={handleSearch} />
        </div>

        <div className="bottom-section">
          <SearchResult
            onItemClick={handleItemClick}
            onClosePokemonDetails={handleSearchResultClose}
          />
          {state.totalPages > 0 && (
            <Pagination
              currentPage={state.currentPage}
              totalPages={
                state.isSearching
                  ? state.searchResults.length
                  : state.totalPages
              }
              onPageChange={(e) => {
                const page = e.selected + 1;
                setTimeout(() => {
                  dispatch(setCurrentPage(page));
                  handleSearchResultClose();
                });
              }}
            />
          )}
        </div>
      </div>
      {state.selectedId && state.isDetailsOpen && (
        <div className="right-panel">
          <PokemonDetails
            id={state.selectedId}
            onClosePokemonDetails={handleSearchResultClose}
          />
        </div>
      )}
    </main>
  );
};

export default PokemonSearch;
