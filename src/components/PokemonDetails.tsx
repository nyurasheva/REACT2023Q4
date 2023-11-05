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

  useEffect(() => {
    if (id !== null && id !== undefined) {
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
        })
        .catch((error) => {
          console.error('Error fetching pokemon details: ', error);
        });
    }
  }, [id]);

  if (!pokemonDetails) {
    return <div className="details-section">Loading...</div>;
  }

  return (
    <div className="details-section">
      <h2>{pokemonDetails.name}</h2>
      <img src={pokemonDetails.imageUrl} alt={pokemonDetails.name} />
      <p>Способности: {pokemonDetails.abilities.join(', ')}</p>
      <p>Масса: {pokemonDetails.weight}</p>
      <p>Высота: {pokemonDetails.height}</p>
      <button className="button-second" onClick={onClosePokemonDetails}>
        Закрыть
      </button>
    </div>
  );
};

export default PokemonDetails;
