// SearchResult.tsx

import React, { useEffect, useMemo } from 'react';
// import { useRouter } from 'next/router';
import { useGetAllPokemonsQuery, useGetPokemonsQuery } from '../redux/apiSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  Pokemon,
  setIsSearching,
  setLoading,
  setSearchResults,
} from '../redux/pokemonReducer';
import { PokemonCard } from './PokemonCard';

interface SearchResultProps {
  onClosePokemonDetails: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  onClosePokemonDetails,
}) => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    searchResults,
    selectedId,
    itemsPerPage,
    currentPage,
    searchTermValue,
  } = useAppSelector((state) => state.pokemonState);

  const pokemonsData = useGetPokemonsQuery({
    page: currentPage,
    itemsPerPage,
  }).data;

  const allPokemonsData = useGetAllPokemonsQuery({
    count: pokemonsData?.count || 0,
  }).data;

  // const router = useRouter();

  const displayResults = useMemo(() => {
    const resultSearch = [
      {
        name: searchTermValue.toLowerCase(),
        url: `https://pokeapi.co/api/v2/pokemon/${searchTermValue.toLowerCase()}/`,
      },
    ];

    return searchTermValue ? resultSearch : pokemonsData?.results || [];
  }, [searchTermValue, pokemonsData]);

  const handleContainerClick = () => {
    if (selectedId !== null) {
      onClosePokemonDetails();
    }
  };

  useEffect(() => {
    if (pokemonsData) {
      dispatch(setLoading(true));
      const fetchData = async () => {
        try {
          const arrPokemons = allPokemonsData?.results.map(
            (pokemon) => pokemon.name
          );
          const isIncluded = arrPokemons?.includes(searchTermValue);
          // const path = searchTermValue ? '/search' : `/`;
          // : `/search?page=${currentPage}`;

          dispatch(
            setSearchResults(
              !isIncluded && searchTermValue ? [] : displayResults
            )
          );
          // router.push(path);
        } catch (error) {
        } finally {
          dispatch(setLoading(false));
        }
      };
      fetchData().catch((error) => {
        console.error('Произошла ошибка:', error);
        dispatch(setLoading(false));
      });
    }
  }, [
    allPokemonsData?.results,
    currentPage,
    dispatch,
    displayResults,
    pokemonsData,
    searchTermValue,
  ]);

  useEffect(() => {
    dispatch(setIsSearching(Boolean(searchTermValue)));
  }, [dispatch, searchTermValue]);

  return (
    <div className="search-results" onClick={handleContainerClick}>
      <h2>Результаты поиска</h2>
      {isLoading && <div className="loading">Loading...</div>}
      {Boolean(searchResults.length) && !isLoading && (
        <div className="pokemon">
          {displayResults.map((result: Pokemon, index: number) => (
            <PokemonCard url={result.url} key={`${result.name}-${index}`} />
          ))}
        </div>
      )}
      {!Boolean(searchResults.length) && !isLoading && (
        <div>Нет результатов</div>
      )}
    </div>
  );
};

export default SearchResult;
