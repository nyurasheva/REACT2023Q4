// SearchResult.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import logo from '../assets/img/logo.png';
import { Pokemon } from '../redux/pokemonReducer';

interface SearchResultProps {
  onItemClick: (pokemonName: string) => void;
  onClosePokemonDetails: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  onItemClick,
  onClosePokemonDetails,
}) => {
  const { isLoading, searchResults, abilityDescriptions, images, selectedId } =
    useSelector((state: RootState) => state.pokemon);

  const handleItemClick = (pokemonName: string) => {
    onItemClick(pokemonName);
  };

  const handleContainerClick = () => {
    if (selectedId !== null) {
      onClosePokemonDetails();
    }
  };

  // console.log(searchResults);

  return (
    <div className="search-results" onClick={handleContainerClick}>
      <h2>Результаты поиска</h2>
      <div className="pokemon">
        {isLoading && <div className="loading">Loading...</div>}
        {Boolean(searchResults.length) &&
          !isLoading &&
          searchResults.map((result: Pokemon, index: number) => (
            <div
              key={index}
              className="result-item pokemon__wrapper"
              onClick={() => {
                handleItemClick(result.name);
              }}
            >
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
        {!Boolean(searchResults.length) && !isLoading && (
          <div>Нет результатов</div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
