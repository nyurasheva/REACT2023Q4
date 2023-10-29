import React, { Component } from 'react';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class SearchInput extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    // Retrieve the previous search term from local storage
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
    }
  }

  handleSearch = () => {
    const searchTerm = this.state.searchTerm.trim();

    // Save the search term to local storage
    localStorage.setItem('searchTerm', searchTerm);

    // Trigger the search
    this.props.onSearch(searchTerm);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Trigger the search when Enter key is pressed
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className="search-directory">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Поиск..."
        />
        <button onClick={this.handleSearch}></button>
      </div>
    );
  }
}

export default SearchInput;
