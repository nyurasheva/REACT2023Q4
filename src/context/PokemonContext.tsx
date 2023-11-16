// PokemonContext.tsx

import React, { createContext, useContext, useReducer } from 'react';

export interface Pokemon {
  name: string;
  url: string;
  image?: string;
  abilities: string[];
}

interface PokemonProviderProps {
  children: React.ReactNode;
}

// Начальное состояние
const initialState = {
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

// Типы для действий и состояния
type Action =
  | { type: 'setSelectedId'; payload: string | null }
  | { type: 'setIsDetailsOpen'; payload: boolean }
  | { type: 'setSearchResults'; payload: Pokemon[] }
  | { type: 'setLoading'; payload: boolean }
  | {
      type: 'setAbilityDescriptions';
      payload: { [key: string]: string | null };
    }
  | { type: 'setImages'; payload: { [key: string]: string | null } }
  | { type: 'setCurrentPage'; payload: number }
  | { type: 'setTotalPages'; payload: number }
  | { type: 'setIsSearching'; payload: boolean }
  | { type: 'setItemsPerPage'; payload: number };

type State = typeof initialState;

type PokemonContextType = {
  state: State;
  dispatch: (action: Action) => void;
};

// Сам контекст
const PokemonContext = createContext<PokemonContextType>({
  state: initialState,
  dispatch: () => {},
});

// Редуктор
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setSelectedId':
      return { ...state, selectedId: action.payload };
    case 'setIsDetailsOpen':
      return { ...state, isDetailsOpen: action.payload };
    case 'setSearchResults':
      return { ...state, searchResults: action.payload };
    case 'setLoading':
      return { ...state, isLoading: action.payload };
    case 'setAbilityDescriptions':
      return { ...state, abilityDescriptions: action.payload };
    case 'setImages':
      return { ...state, images: action.payload };
    case 'setCurrentPage':
      return { ...state, currentPage: action.payload };
    case 'setTotalPages':
      return { ...state, totalPages: action.payload };
    case 'setIsSearching':
      return { ...state, isSearching: action.payload };
    case 'setItemsPerPage':
      return { ...state, itemsPerPage: action.payload };
    default:
      return state;
  }
}

// Компонент-обертка, который предоставит состояние и диспетчер всем компонентам
export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
};

// Хук, который позволит компонентам использовать состояние и диспетчер
export const usePokemonContext = () => useContext(PokemonContext);
