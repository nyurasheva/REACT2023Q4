import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchInput from './SearchInput';
import Pagination from './Pagination';

export interface Pokemon {
  name: string;
  url: string;
  image?: string;
}

interface Ability {
  ability: {
    name: string;
  };
}

const PokemonSearch: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [abilityDescriptions, setAbilityDescriptions] = useState<{
    [key: string]: string | null;
  }>({});
  const [abilitiesLoading, setAbilitiesLoading] = useState<number>(0);
  const [images, setImages] = useState<{ [key: string]: string | null }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    const pageParam = new URLSearchParams(location.search).get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    setCurrentPage(page);

    if (savedSearchTerm) {
      fetchPokemonData(savedSearchTerm, page);
    } else {
      fetchPokemonData('', page);
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleSearch = async (searchTerm: string, page: number) => {
    await fetchPokemonData(searchTerm, page);
    navigate(`/search?page=${page}`);
  };

  const fetchPokemonData = async (searchTerm: string, page: number) => {
    setLoading(true);

    const limit = 20;
    const offset = (page - 1) * limit;

    if (searchTerm.trim().length === 0) {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();
        const results: Pokemon[] = data.results;

        for (const result of results) {
          await fetchPokemonDetails(result.url, results);
        }

        setSearchResults(results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    } else {
      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
        const response = await fetch(apiUrl);
        if (response.status === 200) {
          const data = await response.json();
          setSearchResults([data]);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchPokemonDetails = async (
    pokemonUrl: string,
    searchResults: Pokemon[] | null
  ) => {
    setAbilitiesLoading((prevAbilitiesLoading) => prevAbilitiesLoading + 1);

    try {
      const response = await fetch(pokemonUrl);

      if (response.status === 200) {
        const data = await response.json();
        const abilities: Ability[] = data.abilities;
        const abilityNames: string[] = abilities.map(
          (ability: Ability) => ability.ability.name
        );

        setAbilitiesLoading((prevAbilitiesLoading) => prevAbilitiesLoading - 1);
        setAbilityDescriptions((prevAbilityDescriptions) => {
          return {
            ...prevAbilityDescriptions,
            [data.name]: abilityNames.join(', '),
          };
        });

        if (searchResults) {
          const updatedResults = [...searchResults];
          const resultIndex = updatedResults.findIndex(
            (result) => result.name === data.name
          );
          if (resultIndex !== -1) {
            const imageUrl =
              data.sprites.other['official-artwork'].front_default;

            const imagePromise = new Promise((resolve) => {
              const image = new Image();
              image.src = imageUrl;
              image.onload = () => {
                resolve(image.src);
              };
            });

            const imagePromises = [imagePromise];

            Promise.all(imagePromises).then((images) => {
              updatedResults[resultIndex].image = images[0] as string;

              setSearchResults(updatedResults);

              const updatedImages = updatedResults.reduce(
                (images, result) => {
                  if (result.image) {
                    images[result.name] = result.image;
                  }
                  return images;
                },
                {} as { [key: string]: string | null }
              );

              setImages(updatedImages);
              localStorage.setItem(
                'pokemonImages',
                JSON.stringify(updatedImages)
              );
            });
          }
        } else {
          localStorage.setItem(
            'abilityDescriptions',
            JSON.stringify(abilityDescriptions)
          );
        }
      }
    } catch (error) {
      console.error('Error fetching abilities:', error);
      setAbilitiesLoading((prevAbilitiesLoading) => prevAbilitiesLoading - 1);
    }
  };

  return (
    <main>
      <div className="content container">
        <div className="top-section">
          <SearchInput
            onSearch={(searchTerm: string) =>
              handleSearch(searchTerm, currentPage)
            }
          />
        </div>
        <div className="bottom-section">
          <SearchResult
            isLoading={isLoading || abilitiesLoading > 0}
            results={searchResults}
            abilityDescriptions={abilityDescriptions}
            images={images}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(searchResults.length)}
            navigate={navigate}
          />
        </div>
      </div>
    </main>
  );
};

export default PokemonSearch;
