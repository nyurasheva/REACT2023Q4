import React, { Component } from 'react';
import SearchResult from './SearchResult';
import SearchInput from './SearchInput';

export interface Pokemon {
  name: string;
  url: string;
}

interface PokemonSearchState {
  searchResults: Pokemon[];
  isLoading: boolean;
}

class PokemonSearch extends Component<object, PokemonSearchState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchResults: [],
      isLoading: false,
    };
  }

  handleSearch = async (searchTerm: string) => {
    // Start loading
    this.setState({ isLoading: true });

    if (searchTerm === '') {
      // Handle empty search term (e.g., fetch all Pokémon)
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        const results: Pokemon[] = data.results;
        this.setState({ searchResults: results });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      // Handle the API call with the provided search term
      try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const results: Pokemon[] = [{ name: data.name, url: apiUrl }];
        this.setState({ searchResults: results });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Stop loading after the API call is completed
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className="content container">
        <div className="top-section">
          <SearchInput onSearch={this.handleSearch} />
        </div>
        <div className="bottom-section">
          <SearchResult
            isLoading={this.state.isLoading}
            results={this.state.searchResults}
          />
        </div>
      </div>
    );
  }
}

export default PokemonSearch;
