import React, { useEffect, useRef } from 'react';
import { Pokemon } from './PokemonSearch';
import logo from '../assets/img/logo.png';

interface SearchResultProps {
  isLoading: boolean;
  results: Pokemon[];
  abilityDescriptions: { [key: string]: string | null };
  images: { [key: string]: string | null };
  onItemClick: (pokemonName: string) => void;
  selectedId: string | null;
  onClosePokemonDetails: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  isLoading,
  abilityDescriptions,
  images,
  onItemClick,
  selectedId,
  onClosePokemonDetails,
}) => {
  const handleItemClick = (pokemonName: string) => {
    onItemClick(pokemonName);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        if (selectedId) {
          onClosePokemonDetails();
        }
      }
    };

    if (selectedId) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [selectedId, onClosePokemonDetails]);

  return (
    <div className="search-results">
      <h2>Результаты поиска</h2>
      <div className="pokemon" ref={containerRef}>
        {isLoading && <div className="loading">Loading...</div>}
        {Boolean(results.length) &&
          !isLoading &&
          results.map((result, index) => (
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
        {!Boolean(results.length) && !isLoading && <div>Нет результатов</div>}
      </div>
    </div>
  );
};

export default SearchResult;
