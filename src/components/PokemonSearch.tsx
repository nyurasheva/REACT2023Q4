/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SearchResult from './SearchResult';
import SearchInput from './SearchInput';

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

const PokemonSearch: React.FunctionComponent = () => {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [abilityDescriptions, setAbilityDescriptions] = useState<{
    [key: string]: string | null;
  }>({});
  const [abilitiesLoading, setAbilitiesLoading] = useState<number>(0);
  const [images, setImages] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      fetchPokemonData(savedSearchTerm);
    } else {
      fetchPokemonData('');
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
  }, []);

  const handleSearch = async (searchTerm: string) => {
    await fetchPokemonData(searchTerm);
  };

  const fetchPokemonData = async (searchTerm: string) => {
    setLoading(true);

    if (searchTerm.trim().length === 0) {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
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

        const updatedAbilityDescriptions = {
          ...abilityDescriptions,
          [data.name]: abilityNames.join(', '),
        };

        if (searchResults) {
          const updatedResults = [...searchResults];
          const resultIndex = updatedResults.findIndex(
            (result) => result.name === data.name
          );
          if (resultIndex !== -1) {
            updatedResults[resultIndex].image =
              data.sprites.other['official-artwork'].front_default;
          }

          setAbilityDescriptions(updatedAbilityDescriptions);
          setAbilitiesLoading(
            (prevAbilitiesLoading) => prevAbilitiesLoading - 1
          );
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

          localStorage.setItem('pokemonImages', JSON.stringify(updatedImages));
        } else {
          setAbilityDescriptions(updatedAbilityDescriptions);
          setAbilitiesLoading(
            (prevAbilitiesLoading) => prevAbilitiesLoading - 1
          );
        }

        localStorage.setItem(
          'abilityDescriptions',
          JSON.stringify(updatedAbilityDescriptions)
        );
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
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="bottom-section">
          <SearchResult
            isLoading={isLoading || abilitiesLoading > 0}
            results={searchResults}
            abilityDescriptions={abilityDescriptions}
            images={images}
          />
        </div>
      </div>
    </main>
  );
};

export default PokemonSearch;
