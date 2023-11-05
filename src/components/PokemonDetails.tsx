import React, { useEffect, useState } from 'react';

interface PokemonDetails {
  name: string;
  imageUrl: string;
  abilities: string[];
  weight: string;
  height: string;
}

interface Ability {
  ability: {
    name: string;
  };
}

const PokemonDetails: React.FC<{
  id: string | null;
  onClosePokemonDetails: () => void;
}> = ({ id, onClosePokemonDetails }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id !== null && id !== undefined) {
      setIsLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => {
          const name = data.name;
          const imageUrl = data.sprites.other['official-artwork'].front_default;
          const abilities = data.abilities.map(
            (ability: Ability) => ability.ability.name
          );
          const weight = data.weight;
          const height = data.height;

          const details: PokemonDetails = {
            name,
            imageUrl,
            abilities,
            weight,
            height,
          };

          setPokemonDetails(details);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching pokemon details: ', error);
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="details-section">
      {isLoading ? (
        <div>Loading...</div>
      ) : pokemonDetails ? (
        <>
          <h2>{pokemonDetails.name}</h2>
          <img src={pokemonDetails.imageUrl} alt={pokemonDetails.name} />
          <p>Способности: {pokemonDetails.abilities.join(', ')}</p>
          <p>Масса: {pokemonDetails.weight}</p>
          <p>Высота: {pokemonDetails.height}</p>
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
