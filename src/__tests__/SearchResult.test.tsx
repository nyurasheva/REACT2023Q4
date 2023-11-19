import { render, screen } from '@testing-library/react';
import SearchResult from '../components/SearchResult';
// import { Pokemon } from '../redux/pokemonReducer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../redux/pokemonReducer';

const mockStore = configureStore({
  reducer: {
    pokemonState: pokemonReducer,
  },
});

// const mockResults: Pokemon[] = [
//   { name: 'bulbasaur', url: 'url1', abilities: ['ability1', 'ability2'] },
//   { name: 'charmander', url: 'url2', abilities: ['ability3', 'ability4'] },
//   { name: 'squirtle', url: 'url3', abilities: ['ability5', 'ability6'] },
// ];

describe('SearchResult Component', () => {
  // it('renders loading state', async () => {
  //   render(
  //     <Provider store={mockStore}>
  //       <SearchResult onItemClick={() => {}} onClosePokemonDetails={() => {}} />
  //     </Provider>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText('Loading...')).toBeInTheDocument();
  //   });
  // });

  // it('handles item click', () => {
  //   const onItemClick = jest.fn();

  //   render(
  //     <Provider store={mockStore}>
  //       <SearchResult
  //         onItemClick={onItemClick}
  //         onClosePokemonDetails={() => {}}
  //       />
  //     </Provider>
  //   );

  //   fireEvent.click(screen.getByText(mockResults[0].name));
  //   expect(onItemClick).toHaveBeenCalledWith(mockResults[0].name);
  // });

  it('displays a message when no cards are present', () => {
    render(
      <Provider store={mockStore}>
        <SearchResult onItemClick={() => {}} onClosePokemonDetails={() => {}} />
      </Provider>
    );

    const noResultsMessage = screen.getByText('Нет результатов');
    expect(noResultsMessage).toBeInTheDocument();
  });
});
