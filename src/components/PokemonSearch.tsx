import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchInput from './SearchInput';
import Pagination from './Pagination';
import PageInput from './PageInput';
import PokemonDetails from './PokemonDetails';

export interface Pokemon {
  name: string;
  url: string;
  image?: string;
  abilities: string[];
}

interface Ability {
  ability: {
    name: string;
  };
}

const getPageFromUrl = () => {
  const pageParam = new URLSearchParams(location.search).get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  return page;
};

const PokemonSearch: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [abilityDescriptions, setAbilityDescriptions] = useState<{
    [key: string]: string | null;
  }>({});
  const [images, setImages] = useState<{ [key: string]: string | null }>({});
  const [currentPage, setCurrentPage] = useState<number>(getPageFromUrl());
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [totalPages, setTotalPages] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleItemClick = (pokemonName: string) => {
    const selected = searchResults.find(
      (pokemon) => pokemon.name === pokemonName
    );
    setSelectedId(selected ? pokemonName : null);
    setIsDetailsOpen(true);
    navigate(`${location.pathname}?page=${currentPage}&details=${pokemonName}`);
  };

  const closeDetails = () => {
    setSelectedId(null);
    setIsDetailsOpen(false);
    navigate(`${location.pathname}?page=${currentPage}`);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    const newPage = 1;
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(newPage);
    navigate(`/search?page=${newPage}`);
    fetchPokemons(newPage);
  };

  const calculateTotalCountAndPages = (count: number, itemsPerPage: number) => {
    const totalCount = count - 12;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    return { totalCount, totalPages };
  };

  const handleSearchResultClose = () => {
    setSelectedId(null);
    navigate(`${location.pathname}?page=${currentPage}`);
  };

  const fetchPokemonDetails = useCallback(async (pokemonUrl: string) => {
    try {
      const response = await fetch(pokemonUrl);
      const data = await response.json();
      const abilities: Ability[] = data.abilities;
      const abilityNames: string[] = abilities.map(
        (ability: Ability) => ability.ability.name
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
        abilities: abilityNames,
      } as Pokemon;
    } catch (error) {
      console.error('Error fetching abilities: ', error);
    }
  }, []);

  const searchPokemon = useCallback(
    async (searchTerm: string) => {
      setIsSearching(true);
      setLoading(true);

      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
        const pokemon = await fetchPokemonDetails(apiUrl);
        const results = [pokemon] as Pokemon[];
        setSearchResults(results);
        updatePokemonDetails(results);
      } catch (error) {
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    },
    [fetchPokemonDetails]
  );

  const fetchPokemons = useCallback(
    async (page: number = 1) => {
      const offset = (page - 1) * itemsPerPage;

      setLoading(true);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`
        );
        const data = await response.json();

        const { totalPages } = calculateTotalCountAndPages(
          data.count,
          itemsPerPage
        );

        const results: Pokemon[] = data.results;

        const fetchPromises = results.map((result) =>
          fetchPokemonDetails(result.url)
        );

        const pokemonDetails = await Promise.all(fetchPromises);
        // Фильтруем и удаляем все значения undefined из массива
        const validPokemonDetails = pokemonDetails.filter(
          (data) => !!data
        ) as Pokemon[];

        setSearchResults(validPokemonDetails);
        updatePokemonDetails(validPokemonDetails);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching data: ', error);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [fetchPokemonDetails, itemsPerPage]
  );

  const doSearch = useCallback(
    (searchTerm: string, page?: number) => {
      if (searchTerm) {
        searchPokemon(searchTerm);
      } else {
        fetchPokemons(page);
      }
    },
    [fetchPokemons, searchPokemon]
  );

  useEffect(() => {
    const initPokemons = async () => {
      const savedAbilityDescriptions = localStorage.getItem(
        'abilityDescriptions'
      );
      if (savedAbilityDescriptions) {
        setAbilityDescriptions(JSON.parse(savedAbilityDescriptions));
      }

      const savedImages = localStorage.getItem('pokemonImages');
      if (savedImages) {
        setImages(JSON.parse(savedImages));
      }

      const savedSearchTerm = localStorage.getItem('searchTerm');
      doSearch(savedSearchTerm || '', currentPage);
    };
    const fetchTotalCount = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        if (response.ok) {
          const data = await response.json();
          const { totalPages } = calculateTotalCountAndPages(
            data.count,
            itemsPerPage
          );
          setTotalPages(totalPages);
        }
      } catch (error) {
        console.error('Error fetching total count:', error);
      }
    };

    fetchTotalCount();
    initPokemons();
  }, [doSearch, location, currentPage, itemsPerPage]);

  const handleSearch = async (searchTerm: string) => {
    doSearch(searchTerm);
    navigate('/search');
    setSelectedId(null);
  };

  const updatePokemonDetails = (pokemonDetails: Pokemon[]) => {
    const updatedAbilityDescriptions: { [key: string]: string | null } = {};
    const updatedImages: { [key: string]: string | null } = {};

    for (const pokemonData of pokemonDetails) {
      updatedAbilityDescriptions[pokemonData.name] =
        pokemonData.abilities.join(', ');
      updatedImages[pokemonData.name] = pokemonData.image || null;
    }

    setAbilityDescriptions(updatedAbilityDescriptions);
    setImages(updatedImages);
    localStorage.setItem(
      'abilityDescriptions',
      JSON.stringify(updatedAbilityDescriptions)
    );
    localStorage.setItem('pokemonImages', JSON.stringify(updatedImages));
  };

  useEffect(() => {
    navigate(`/search?page=${currentPage}`);
  }, [currentPage, navigate]);

  return (
    <main>
      <div className="content container">
        <div className="top-section">
          <PageInput
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
          <SearchInput onSearch={handleSearch} />
        </div>

        <div className="bottom-section">
          <SearchResult
            isLoading={isLoading}
            results={searchResults}
            abilityDescriptions={abilityDescriptions}
            images={images}
            onItemClick={handleItemClick}
            selectedId={selectedId}
            onClosePokemonDetails={closeDetails}
          />
          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={isSearching ? searchResults.length : totalPages}
              onPageChange={(e) => {
                const page = e.selected + 1;
                setTimeout(() => {
                  setCurrentPage(page);
                  handleSearchResultClose();
                });
              }}
            />
          )}
        </div>
      </div>
      {selectedId && isDetailsOpen && (
        <div className="right-panel">
          <PokemonDetails
            id={selectedId}
            onClosePokemonDetails={closeDetails}
          />
        </div>
      )}
    </main>
  );
};

export default PokemonSearch;
