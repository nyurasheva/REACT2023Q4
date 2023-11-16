// pokemonReducer.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Pokemon {
  name: string;
  url: string;
  image?: string;
  abilities: string[];
}

export interface PokemonState {
  searchResults: Pokemon[];
  isLoading: boolean;
  isSearching: boolean;
  abilityDescriptions: { [key: string]: string | null };
  images: { [key: string]: string | null };
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  selectedId: string | null;
  isDetailsOpen: boolean;
}

const initialState: PokemonState = {
  searchResults: [] as Pokemon[],
  isLoading: false,
  isSearching: false,
  abilityDescriptions: {} as { [key: string]: string | null },
  images: {} as { [key: string]: string | null },
  currentPage: 1,
  itemsPerPage: 20,
  totalPages: 0,
  selectedId: null as string | null,
  isDetailsOpen: false,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setAbilityDescriptions(
      state,
      action: PayloadAction<{ [key: string]: string | null }>
    ) {
      state.abilityDescriptions = action.payload;
    },
    setImages(state, action: PayloadAction<{ [key: string]: string | null }>) {
      state.images = action.payload;
    },
    setIsSearching(state, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSearchResults(state, action: PayloadAction<Pokemon[]>) {
      state.searchResults = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setSelectedId(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
    setIsDetailsOpen(state, action: PayloadAction<boolean>) {
      state.isDetailsOpen = action.payload;
    },
    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  setAbilityDescriptions,
  setImages,
  setIsSearching,
  setLoading,
  setSearchResults,
  setCurrentPage,
  setTotalPages,
  setSelectedId,
  setIsDetailsOpen,
  setItemsPerPage,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
