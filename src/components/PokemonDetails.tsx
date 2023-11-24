// PokemonDetails.tsx

import React from 'react';
import { useGetPokemonDetailsQuery } from '../redux/apiSlice';
import { useAppSelector } from '../redux/hooks';
import Image from 'next/image';

const PokemonDetails: React.FC<{
  onClosePokemonDetails: () => void;
}> = ({ onClosePokemonDetails }) => {
  const { selectedId, abilityDescriptions, images } = useAppSelector(
    (state) => state.pokemonState
  );

  const { data: pokemonDetails, isLoading: isDetailsLoading } =
    useGetPokemonDetailsQuery(selectedId || '');

  if (!selectedId) {
    return <div>Выберите покемона</div>;
  }

  const imageUrl = images && images[selectedId];
  if (imageUrl === null) {
    return <div>Изображение отсутствует</div>;
  }

  return (
    <div className="details-section">
      {isDetailsLoading ? (
        <div>Loading...</div>
      ) : pokemonDetails ? (
        <>
          <h2>{selectedId}</h2>
          {imageUrl ? (
            // {images && images[selectedId] ? (
            // <img src={images[selectedId] || undefined} alt={selectedId} />
            <Image src={imageUrl} alt={selectedId} width={300} height={300} />
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
