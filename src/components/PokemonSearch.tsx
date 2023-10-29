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

  async componentDidMount() {
    // Проверяем, есть ли сохраненный поисковый запрос в localStorage
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      await this.fetchPokemonData(savedSearchTerm);
    } else {
      await this.fetchPokemonData('');
    }
  }

  handleSearch = async (searchTerm: string) => {
    await this.fetchPokemonData(searchTerm);
  };

  async fetchPokemonData(searchTerm: string) {
    // Старт загрузки
    this.setState({ isLoading: true });

    if (searchTerm.trim().length === 0) {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        const results: Pokemon[] = data.results;
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
          const results: Pokemon[] = [{ name: data.name, url: apiUrl }];
          this.setState({ searchResults: results, isLoading: false });
        } else {
          this.setState({ searchResults: [], isLoading: false });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.setState({ searchResults: [], isLoading: false });
      }
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
              isLoading={this.state.isLoading}
              results={this.state.searchResults}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default PokemonSearch;
