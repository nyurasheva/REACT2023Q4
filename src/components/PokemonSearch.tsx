// PokemonSearch.tsx

import React, { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPokemonsQuery } from '../redux/apiSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setCurrentPage,
  setSearchTermValue,
  setSelectedId,
  setTotalPages,
} from '../redux/pokemonReducer';
import PageInput from './PageInput';
import Pagination from './Pagination';
import PokemonDetails from './PokemonDetails';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

export const PokemonSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    itemsPerPage,
    currentPage,
    isSearching,
    totalPages,
    searchResults,
    selectedId,
  } = useAppSelector((state) => state.pokemonState);

  // const dataAll = useGetAllPokemonsQuery().data;
  const pokemonsData = useGetPokemonsQuery({
    page: currentPage,
    itemsPerPage,
  }).data;

  const [searchParams] = useSearchParams();

  const calculateTotalCountAndPages = (count: number, itemsPerPage: number) => {
    const totalCount = count - 32;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    return { totalCount, totalPages };
  };

  const handleSearchResultClose = () => {
    dispatch(setSelectedId(null));
  };

  useEffect(() => {
    navigate(`${location.pathname}?page=${currentPage}`);
  }, [currentPage, navigate, location.pathname]);

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
    const pageNumber = Number(searchParams.get('page'));
    if (pageNumber > 0) {
      dispatch(setCurrentPage(pageNumber));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    navigate(`/search?page=${currentPage}`);
  }, [currentPage, navigate]);

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
