import React, { Component } from 'react';
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

interface PokemonSearchState {
  searchResults: Pokemon[];
  isLoading: boolean;
  abilityDescriptions: { [key: string]: string | null };
  abilitiesLoading: number;
  images: { [key: string]: string | null };
}

class PokemonSearch extends Component<object, PokemonSearchState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchResults: [],
      isLoading: false,
      abilityDescriptions: {},
      abilitiesLoading: 0,
      images: {},
    };
  }

  async componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      await this.fetchPokemonData(savedSearchTerm);
    } else {
      await this.fetchPokemonData('');
    }

    const savedAbilityDescriptions = localStorage.getItem(
      'abilityDescriptions'
    );
    if (savedAbilityDescriptions) {
      this.setState({
        abilityDescriptions: JSON.parse(savedAbilityDescriptions),
      });
    }

    const savedImages = localStorage.getItem('pokemonImages');
    if (savedImages) {
      this.setState({
        images: JSON.parse(savedImages),
      });
    }
  }

  handleSearch = async (searchTerm: string) => {
    await this.fetchPokemonData(searchTerm);
  };

  async fetchPokemonData(searchTerm: string) {
    this.setState({ isLoading: true });

    if (searchTerm.trim().length === 0) {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        const results: Pokemon[] = data.results;

        for (const result of results) {
          await this.fetchPokemonDetails(result.url, results);
        }

        this.setState({ searchResults: results, isLoading: false });
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      }
    } else {
      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
        const response = await fetch(apiUrl);
        if (response.status === 200) {
          const data = await response.json();
          this.setState({ searchResults: [data], isLoading: false });
        } else {
          this.setState({ searchResults: [], isLoading: false });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ searchResults: [], isLoading: false });
      }
    }
  }

  async fetchPokemonDetails(
    pokemonUrl: string,
    searchResults: Pokemon[] | null
  ) {
    this.setState((prevState) => ({
      abilitiesLoading: prevState.abilitiesLoading + 1,
    }));

    try {
      const response = await fetch(pokemonUrl);

      if (response.status === 200) {
        const data = await response.json();
        const abilities: Ability[] = data.abilities;
        const abilityNames: string[] = abilities.map(
          (ability: Ability) => ability.ability.name
        );

        const updatedAbilityDescriptions = {
          ...this.state.abilityDescriptions,
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

          this.setState((prevState) => ({
            abilityDescriptions: updatedAbilityDescriptions,
            abilitiesLoading: prevState.abilitiesLoading - 1,
            searchResults: updatedResults,
          }));

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
          this.setState((prevState) => ({
            abilityDescriptions: updatedAbilityDescriptions,
            abilitiesLoading: prevState.abilitiesLoading - 1,
          }));
        }

        localStorage.setItem(
          'abilityDescriptions',
          JSON.stringify(updatedAbilityDescriptions)
        );
      }
    } catch (error) {
      console.error('Error fetching abilities:', error);
      this.setState((prevState) => ({
        abilitiesLoading: prevState.abilitiesLoading - 1,
      }));
    }
  }

  render() {
    return (
      <main>
        <div className="content container">
          <div className="top-section">
            <SearchInput onSearch={this.handleSearch} />
          </div>
          <div className="bottom-section">
            <SearchResult
              isLoading={
                this.state.isLoading || this.state.abilitiesLoading > 0
              }
              results={this.state.searchResults}
              abilityDescriptions={this.state.abilityDescriptions}
              images={this.state.images}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default PokemonSearch;
