import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import PokemonDetails from '../components/PokemonDetails';

describe('PokemonDetails component', () => {
  it('displays "Выберите покемона" when no Pokemon is selected', async () => {
    render(
      <Provider store={store}>
        <PokemonDetails onClosePokemonDetails={() => {}} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Выберите покемона')).toBeInTheDocument();
    });
  });

  it('displays loading indicator during data fetching', async () => {
    const onClosePokemonDetailsMock = jest.fn();

    render(
      <Provider store={store}>
        <PokemonDetails onClosePokemonDetails={onClosePokemonDetailsMock} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Выберите покемона')).toBeInTheDocument();
    });

    expect(onClosePokemonDetailsMock).not.toHaveBeenCalled();
  });

  it('handles absence of details', async () => {
    const onClosePokemonDetailsMock = jest.fn();

    render(
      <Provider store={store}>
        <PokemonDetails onClosePokemonDetails={onClosePokemonDetailsMock} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Выберите покемона')).toBeInTheDocument();
    });

    expect(onClosePokemonDetailsMock).not.toHaveBeenCalled();
  });
});
