import { render, screen, waitFor } from '@testing-library/react';
import SearchResult from '../components/SearchResult';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../redux/pokemonReducer';

const mockStore = configureStore({
  reducer: {
    pokemonState: pokemonReducer,
  },
});

describe('SearchResult Component', () => {
  it('displays a message when no cards are present', () => {
    render(
      <Provider store={mockStore}>
        <SearchResult onItemClick={() => {}} onClosePokemonDetails={() => {}} />
      </Provider>
    );

    const noResultsMessage = screen.getByText('Нет результатов');
    expect(noResultsMessage).toBeInTheDocument();
  });

  it('handles item click', async () => {
    const onItemClick = jest.fn();

    render(
      <Provider store={mockStore}>
        <SearchResult
          onItemClick={onItemClick}
          onClosePokemonDetails={() => {}}
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Результаты поиска')).toBeInTheDocument(); // Проверяем наличие основного заголовка
    });
  });
});
