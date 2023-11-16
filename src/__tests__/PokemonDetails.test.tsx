import { render, screen, waitFor } from '@testing-library/react';
import { PokemonProvider } from '../context/PokemonContext';
import PokemonDetails from '../components/PokemonDetails';

describe('PokemonDetails component', () => {
  it('displays loading indicator during data fetching', async () => {
    render(
      <PokemonProvider>
        <PokemonDetails id="1" onClosePokemonDetails={() => {}} />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('handles absence of details', async () => {
    render(
      <PokemonProvider>
        <PokemonDetails id={null} onClosePokemonDetails={() => {}} />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Подробности отсутствуют')).toBeInTheDocument();
    });
  });
});
