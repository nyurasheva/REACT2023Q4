import React from 'react';
import { Pokemon } from './PokemonSearch';
import logo from '../assets/img/logo.png';

interface SearchResultProps {
  results: Pokemon[];
  isLoading: boolean;
  abilityDescriptions: { [key: string]: string | null };
  images: { [key: string]: string | null };
}

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  isLoading,
  abilityDescriptions,
  images,
}) => {
  return (
    <div className="search-results">
      <h2>Результаты поиска</h2>
      <div className="pokemon">
        {isLoading && <div>Loading...</div>}
        {Boolean(results.length) &&
          !isLoading &&
          results.map((result, index) => (
            <div key={index} className="result-item pokemon__wrapper">
              {images[result.name] && (
                <div className="pokemon__image">
                  {images[result.name] !== null ? (
                    <img src={images[result.name] || logo} alt={result.name} />
                  ) : (
                    <div>Изображение недоступно</div>
                  )}
                </div>
              )}
              <h3 className="pokemon__title">{result.name}</h3>
              <div className="pokemon__description">
                Вас приветствует покемон{' '}
                {result.name.charAt(0).toUpperCase() + result.name.slice(1)}.
              </div>
              {abilityDescriptions[result.name.toLowerCase()] !== null && (
                <div className="pokemon__ability">
                  Способность: {abilityDescriptions[result.name.toLowerCase()]}
                </div>
              )}
            </div>
          ))}
        {!Boolean(results.length) && !isLoading && <div>Нет результатов</div>}
      </div>
    </div>
  );
};

export default SearchResult;
