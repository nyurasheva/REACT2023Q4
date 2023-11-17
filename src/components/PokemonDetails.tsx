import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/pokemonReducer';
import { RootState } from '../redux/rootReducer';

const PokemonDetails: React.FC<{
  onClosePokemonDetails: () => void;
}> = ({ onClosePokemonDetails }) => {
  const dispatch = useDispatch();
  const { abilityDescriptions, isLoading, selectedId } = useSelector(
    (state: RootState) => state.pokemon
  );
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (selectedId) {
      dispatch(setLoading(true));
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedId}`)
        .then((response) => response.json())
        .then((data) => {
          const weight = data.weight || null;
          const height = data.height || null;
          dispatch(setLoading(false));
          setWeight(weight);
          setHeight(height);
        })
        .catch((error) => {
          console.error('Error fetching pokemon details: ', error);
          dispatch(setLoading(false));
        });
    }
  }, [abilityDescriptions, dispatch, selectedId]);

  // Получаем детали покемона из состояния
  const pokemonDetails = useSelector((state: RootState) =>
    state.pokemon.searchResults.find((pokemon) => pokemon.name === selectedId)
  );

  return (
    <div className="details-section">
      {isLoading ? (
        <div>Loading...</div>
      ) : pokemonDetails ? (
        <>
          <h2>{pokemonDetails.name}</h2>
          <img src={pokemonDetails.image} alt={pokemonDetails.name} />
          <p>
            Способности:{' '}
            {abilityDescriptions[pokemonDetails.name.toLowerCase()] ||
              'Неизвестно'}
          </p>
          <p>Масса: {weight !== null ? weight : 'Неизвестно'}</p>
          <p>Высота: {height !== null ? height : 'Неизвестно'}</p>
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
