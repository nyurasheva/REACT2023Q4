// PokemonSearch.tsx

import React, { useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import { useAppSelector } from '../redux/hooks';
import { useGetAllPokemonsQuery, useGetPokemonsQuery } from '../redux/apiSlice';

export const PokemonSearch: React.FC = () => {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state.pokemonState);
  const location = useLocation();
  const navigate = useNavigate();
  const prevItemsPerPageRef = useRef(state.itemsPerPage);

  const { itemsPerPage, currentPage } = useAppSelector(
    (state) => state.pokemonState
  );

  const dataAll = useGetAllPokemonsQuery().data;
  const pokemonsData = useGetPokemonsQuery({
    page: currentPage,
    itemsPerPage,
  }).data;

  const calculateTotalCountAndPages = (count: number, itemsPerPage: number) => {
    const totalCount = count - 12;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    return { totalCount, totalPages };
  };

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

  const fetchPokemons = useCallback(async () => {
    dispatch(setLoading(true));
    if (pokemonsData) {
      const { totalPages } = calculateTotalCountAndPages(
        pokemonsData.count || 0,
        state.itemsPerPage
      );

      const results: Pokemon[] = pokemonsData.results || [];
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
    }
    dispatch(setLoading(false));
  }, [
    dispatch,
    fetchPokemonDetails,
    pokemonsData,
    state.itemsPerPage,
    updatePokemonDetails,
  ]);

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

  const doSearch = useCallback(
    (searchTerm: string) => {
      if (searchTerm) {
        searchPokemon(searchTerm);
      } else {
        fetchPokemons();
      }
    },
    [searchPokemon, fetchPokemons]
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

  const handleSearch = useCallback(
    async (searchTermValue: string) => {
      doSearch(searchTermValue);
      navigate('/search');
      dispatch(setSelectedId(null));
    },
    [dispatch, doSearch, navigate]
  );

  const handleItemsPerPageChange = useCallback(
    (newItemsPerPage: number) => {
      const newPage = 1;
      dispatch(setItemsPerPage(newItemsPerPage));
      dispatch(setCurrentPage(newPage));
      navigate(`/search?page=${newPage}`);
      fetchPokemons();
    },
    [dispatch, fetchPokemons, navigate]
  );

  const handleSearchResultClose = () => {
    dispatch(setSelectedId(null));
    navigate(`${location.pathname}?page=${state.currentPage}`);
  };

  useEffect(() => {
    const initPokemons = async () => {
      try {
        if (dataAll) {
          const { totalPages } = calculateTotalCountAndPages(
            dataAll.count,
            state.itemsPerPage
          );
          dispatch(setTotalPages(totalPages));
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
          doSearch(savedSearchTerm || '');
        }
      } catch (error) {
        console.error('Ошибка при получении общего количества:', error);
      }
    };

    initPokemons();
  }, [dataAll, dispatch, doSearch, state.currentPage, state.itemsPerPage]);

  useEffect(() => {
    navigate(`/search?page=${state.currentPage}`);
  }, [state.currentPage, navigate]);

  useEffect(() => {
    if (state.searchTermValue) {
      handleSearch(state.searchTermValue);
    }
  }, [dispatch, handleSearch, state.searchTermValue]);

  useEffect(() => {
    if (state.itemsPerPage !== prevItemsPerPageRef.current) {
      handleItemsPerPageChange(state.itemsPerPage);
      prevItemsPerPageRef.current = state.itemsPerPage;
    }
  }, [handleItemsPerPageChange, state.itemsPerPage]);

  return (
    <main>
      <div className="content container">
        <div className="top-section">
          <PageInput />
          <SearchInput />
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
          <PokemonDetails onClosePokemonDetails={handleSearchResultClose} />
        </div>
      )}
    </main>
  );
};

export default PokemonSearch;
