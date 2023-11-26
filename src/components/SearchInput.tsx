// SearchInput.tsx

import React, { useState, useEffect } from 'react';
import { setSearchTermValue } from '../redux/pokemonReducer';
import { useAppDispatch } from '../redux/hooks';

interface SearchInputProps {
  onClosePokemonDetails: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onClosePokemonDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    localStorage.setItem('searchTermValue', trimmedSearchTerm);
    dispatch(setSearchTermValue(trimmedSearchTerm));
    onClosePokemonDetails();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTermValue');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  return (
    <div className="row">
      <div className="search-directory">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Поиск..."
        />
        <button onClick={handleSearch}></button>
      </div>
    </div>
  );
};

export default SearchInput;
