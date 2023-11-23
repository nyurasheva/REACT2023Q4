// PokemonCard.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/svg/pokemon.svg';
import { useSearchPokemonQuery } from '../redux/apiSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setAbilityDescriptions,
  setImages,
  setIsDetailsOpen,
  setSelectedId,
} from '../redux/pokemonReducer';

interface PokemonCardInter {
  url: string;
}

export const PokemonCard: React.FC<PokemonCardInter> = ({ url }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { abilityDescriptions, images, isLoading, currentPage } =
    useAppSelector((state) => state.pokemonState);

  const pokemonUrl = url.split('/');
  const pokemonId = pokemonUrl[pokemonUrl.length - 2];
  const searchData = useSearchPokemonQuery({ searchTerm: pokemonId }).data;
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [pokemonImages, setPokemonImages] = useState<
    Record<string, string | null>
  >({});

  const getPokemonImg = useCallback(async () => {
    try {
      if (searchData) {
        const imageUrl =
          searchData.sprites.other['official-artwork'].front_default;

        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setImageLoading(false);

          setPokemonImages((prevImages) => ({
            ...prevImages,
            [searchData!.name]: imageUrl,
          }));
        };

        img.onerror = () => {
          console.error(`Failed to load image: ${imageUrl}`);
          setImageLoading(false);
        };
      } else {
        console.error('Error fetching abilities. Response not OK:');
        setImageLoading(false);
      }
    } catch (error) {
      console.error('Error fetching abilities:', error);
      setImageLoading(false);
    }
  }, [searchData]);

  useEffect(() => {
    if (searchData) {
      if (!pokemonImages[searchData.name]) {
        getPokemonImg();
      }
    }
  }, [getPokemonImg, searchData, pokemonImages]);

  const handleItemClick = (pokemonName: string) => {
    dispatch(setSelectedId(pokemonName));
    dispatch(
      setImages({ ...images, [pokemonName]: pokemonImages[pokemonName] })
    );
    if (searchData) {
      dispatch(
        setAbilityDescriptions({
          ...abilityDescriptions,
          [pokemonName]: searchData.abilities
            .map(
              (ability: { ability: { name: string } }) => ability.ability.name
            )
            .join(', '),
        })
      );
    }
    dispatch(setIsDetailsOpen(true));
    navigate(`${location.pathname}?page=${currentPage}&details=${pokemonName}`);
  };

  if (!searchData || isLoading || imageLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div
      className="result-item pokemon__wrapper"
      onClick={() => handleItemClick(searchData!.name)}
    >
      <div className="pokemon__image">
        {pokemonImages[searchData.name] !== null ? (
          <img
            src={pokemonImages[searchData.name] || logo}
            alt={searchData.name}
          />
        ) : (
          <div>Изображение не найдено</div>
        )}
      </div>
      <h3 className="pokemon__title">{searchData.name}</h3>
      <div className="pokemon__description">
        Вас приветствует покемон,{' '}
        {searchData.name.charAt(0).toUpperCase() + searchData.name.slice(1)}.
      </div>
      {abilityDescriptions[searchData?.name?.toLowerCase()] !== null && (
        <div className="pokemon__ability">
          <h4>Способности:</h4>
          {searchData.abilities.map(
            (ability: { ability: { name: string } }) => (
              <div key={ability.ability.name}>{ability.ability.name}</div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
