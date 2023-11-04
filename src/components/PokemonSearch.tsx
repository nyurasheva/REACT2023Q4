import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchInput from './SearchInput';
import Pagination from './Pagination';

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
  const [abilityDescriptions, setAbilityDescriptions] = useState<{
    [key: string]: string | null;
  }>({});
  const [images, setImages] = useState<{ [key: string]: string | null }>({});
  const [currentPage, setCurrentPage] = useState<number>(getPageFromUrl());
  const navigate = useNavigate();
  const location = useLocation();

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
      const limit = 20;
      const offset = (page - 1) * limit;

      setLoading(true);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();
        const results: Pokemon[] = data.results;

        const fetchPromises = results.map((result) =>
          fetchPokemonDetails(result.url)
        );

        const pokemonDetails = await Promise.all(fetchPromises);
        const pokemons = pokemonDetails.filter((data) => !!data) as Pokemon[];

        setSearchResults(pokemons);
        updatePokemonDetails(pokemons);
      } catch (error) {
        console.error('Error fetching data: ', error);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [fetchPokemonDetails]
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

    initPokemons();
  }, [doSearch, location, currentPage]);

  const handleSearch = async (searchTerm: string) => {
    doSearch(searchTerm);
    navigate('/search');
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

  return (
    <main>
      <div className="content container">
        <div className="top-section">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="bottom-section">
          <SearchResult
            isLoading={isLoading}
            results={searchResults}
            abilityDescriptions={abilityDescriptions}
            images={images}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={searchResults.length}
            onPageChange={(e) => {
              const page = e.selected + 1;
              setCurrentPage(page);
              navigate(`/search?page=${page}`);
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default PokemonSearch;
