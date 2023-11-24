// PokemonSearch.tsx

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useGetPokemonsQuery } from '../redux/apiSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/store';
import {
  setCurrentPage,
  setSearchTermValue,
  setSelectedId,
  setTotalPages,
} from '@/redux/pokemonReducer';
import PageInput from './PageInput';
import SearchInput from './SearchInput';
import PokemonDetails from './PokemonDetails';
import SearchResult from './SearchResult';
import Pagination from './Pagination';

export const PokemonSearch: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const {
    itemsPerPage,
    currentPage,
    isSearching,
    totalPages,
    searchResults,
    selectedId,
  } = useAppSelector((state) => state.pokemonState);

  const pokemonsData = useGetPokemonsQuery({
    page: currentPage,
    itemsPerPage,
  }).data;

  // const [searchParams] = useSearchParams();

  const calculateTotalCountAndPages = (count: number, itemsPerPage: number) => {
    const totalCount = count - 32;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    return { totalCount, totalPages };
  };

  const handleSearchResultClose = () => {
    dispatch(setSelectedId(null));
  };

  // useEffect(() => {
  //   router.push(`${location.pathname}`);
  //   router.push(`${location.pathname}?page=${currentPage}`);
  // }, [currentPage, router]);

  useEffect(() => {
    const initPokemons = async () => {
      try {
        if (pokemonsData) {
          const { totalPages } = calculateTotalCountAndPages(
            pokemonsData.count,
            itemsPerPage
          );
          dispatch(setTotalPages(totalPages));
        }
      } catch (error) {
        console.error('Ошибка при получении общего количества:', error);
      }
    };

    initPokemons();
  }, [dispatch, itemsPerPage, pokemonsData]);

  useEffect(() => {
    const pageNumber = Number(router.query.page);
    if (pageNumber > 0) {
      dispatch(setCurrentPage(pageNumber));
    }
  }, [dispatch, router.query.page]);

  // useEffect(() => {
  //   router.push(`/search?page=${currentPage}`);
  // }, [currentPage, router]);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTermValue');
    if (savedSearchTerm) {
      dispatch(setSearchTermValue(savedSearchTerm));
    }
  }, [dispatch]);

  return (
    <main>
      <div className="content container">
        <div className="top-section">
          <PageInput />
          <SearchInput />
        </div>

        <div className="bottom-section">
          <SearchResult onClosePokemonDetails={handleSearchResultClose} />
          {totalPages > 0 && (
            <Pagination
              totalPages={isSearching ? searchResults.length : totalPages}
              onPageChange={(e) => {
                const page = e.selected + 1;
                dispatch(setCurrentPage(page));
                handleSearchResultClose();
              }}
            />
          )}
        </div>
      </div>
      {selectedId && (
        <div className="right-panel">
          <PokemonDetails onClosePokemonDetails={handleSearchResultClose} />
        </div>
      )}
    </main>
  );
};

export default PokemonSearch;
