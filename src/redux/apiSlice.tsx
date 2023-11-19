// apiSlice.tsx

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from './pokemonReducer';

type GetPokemonParams = {
  page: number;
  itemsPerPage: number;
};

type ResponsePokemon = {
  results: Pokemon[];
  count: number;
};

type ResponsePokemonSearch = {
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
  }>;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<ResponsePokemon, GetPokemonParams>({
      query: ({ page, itemsPerPage }) => {
        const offset = (page - 1) * itemsPerPage;
        const limit = itemsPerPage;
        return `?offset=${offset}&limit=${limit}`;
      },
    }),
    searchPokemon: builder.query<ResponsePokemonSearch, { searchTerm: string }>(
      {
        query: ({ searchTerm }) => `/${searchTerm.toLowerCase()}`,
      }
    ),

    getPokemonDetails: builder.query<
      { weight: number; height: number },
      string
    >({
      query: (pokemonId) => `/${pokemonId}`,
    }),
    getAllPokemons: builder.query<ResponsePokemon, void>({
      query: () => '',
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useSearchPokemonQuery,
  useGetPokemonDetailsQuery,
  useGetAllPokemonsQuery,
} = api;
