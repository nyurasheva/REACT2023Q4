import React from 'react';
import { Pokemon } from './PokemonSearch';

interface SearchResultProps {
  results: Pokemon[];
  isLoading: boolean;
}

const SearchResult: React.FC<SearchResultProps> = ({ results, isLoading }) => {
  return (
    <div className="search-results">
      <h2>Результаты поиска</h2>
      {isLoading && <div>Loading...</div>}
      {Boolean(results.length) &&
        !isLoading &&
        results.map((result, index) => (
          <div key={index} className="result-item">
            <h3>{result.name}</h3>
            <div>{result.url}</div>
          </div>
        ))}
      {!Boolean(results.length) && !isLoading && <div>Нет результатов</div>}
    </div>
  );
};

export default SearchResult;
