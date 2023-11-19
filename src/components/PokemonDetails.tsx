import React from 'react';
import { useGetPokemonDetailsQuery } from '../redux/apiSlice';
import { useAppSelector } from '../redux/hooks';

const PokemonDetails: React.FC<{
  onClosePokemonDetails: () => void;
}> = ({ onClosePokemonDetails }) => {
  const { abilityDescriptions, selectedId, images } = useAppSelector(
    (state) => state.pokemonState
  );

  const { data: pokemonDetails, isLoading: isDetailsLoading } =
    useGetPokemonDetailsQuery(selectedId || '');

  if (!selectedId) {
    return <div>Выберите покемона</div>;
  }

  return (
    <div className="details-section">
      {isDetailsLoading ? (
        <div>Loading...</div>
      ) : pokemonDetails ? (
        <>
          <h2>{selectedId}</h2>
          {images && images[selectedId] ? (
            <img src={images[selectedId] || undefined} alt={selectedId} />
          ) : (
            <div>Изображение отсутствует</div>
          )}
          <p>
            Способности:{' '}
            {abilityDescriptions[selectedId.toLowerCase()] || 'Неизвестно'}
          </p>
          <p>
            Масса:{' '}
            {pokemonDetails.weight !== null
              ? pokemonDetails.weight
              : 'Неизвестно'}
          </p>
          <p>
            Высота:{' '}
            {pokemonDetails.height !== null
              ? pokemonDetails.height
              : 'Неизвестно'}
          </p>
          <button className="button-second" onClick={onClosePokemonDetails}>
            Закрыть
          </button>
        </>
      ) : (
        <div>Подробности отсутствуют</div>
      )}
    </div>
  );
};

export default PokemonDetails;
