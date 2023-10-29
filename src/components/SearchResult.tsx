import React from 'react';
import { Pokemon } from './PokemonSearch';

interface SearchResultProps {
  results: Pokemon[];
  isLoading: boolean;
}

const SearchResult: React.FC<SearchResultProps> = ({ results, isLoading }) => {
  const getPokemonImageUrl = (pokemonName: string) => {
    // Привести имя к нижнему регистру, так как имена покемонов на GitHub в нижнем регистре
    const lowercaseName = pokemonName.toLowerCase();
    return `https://raw.githubusercontent.com/nyurasheva/pokemon_img/main/img/${lowercaseName}.png`;
  };

  return (
    <div className="search-results">
      <h2>Результаты поиска</h2>
      <div className="pokemon">
        {isLoading && <div>Loading...</div>}
        {Boolean(results.length) &&
          !isLoading &&
          results.map((result, index) => (
            <div key={index} className="result-item pokemon__wrapper">
              <div className="pokemon__image">
                <img src={getPokemonImageUrl(result.name)} alt={result.name} />
              </div>
              <h3>{result.name}</h3>
              <div className="pokemon__description">
                Вас приветствует покемон{' '}
                {result.name.charAt(0).toUpperCase() + result.name.slice(1)}.
              </div>
            </div>
          ))}
        {!Boolean(results.length) && !isLoading && <div>Нет результатов</div>}
      </div>
    </div>
  );
};

export default SearchResult;
