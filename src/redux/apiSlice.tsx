// apiSlice.tsx

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from './pokemonReducer';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<Pokemon[], number>({
      query: (page = 1, itemsPerPage = 20) => {
        const offset = (page - 1) * itemsPerPage;
        const limit = itemsPerPage - 12;
        return `pokemon?offset=${offset}&limit=${limit}`;
      },
    }),
    searchPokemon: builder.query<Pokemon | null, string>({
      query: (searchTerm) => `pokemon/${searchTerm.toLowerCase()}`,
    }),
    getPokemonDetails: builder.query<
      { weight: number; height: number },
      string
    >({
      query: (pokemonId) => `pokemon/${pokemonId}`,
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useSearchPokemonQuery,
  useGetPokemonDetailsQuery,
} = api;
