import { render, screen } from '@testing-library/react';
import { PokemonProvider, usePokemonContext } from '../context/PokemonContext';

const MockConsumer: React.FC = () => {
  const { state } = usePokemonContext();
  return (
    <div>
      <div data-testid="selectedId">{state.selectedId}</div>
      <div data-testid="currentPage">{state.currentPage}</div>
    </div>
  );
};

describe('PokemonContext', () => {
  it('provides state and dispatch to consumers', () => {
    render(
      <PokemonProvider>
        <MockConsumer />
      </PokemonProvider>
    );

    const selectedIdElement = screen.getByTestId('selectedId');
    const currentPageElement = screen.getByTestId('currentPage');

    expect(selectedIdElement).toHaveTextContent('');
    expect(currentPageElement).toHaveTextContent('1');
  });
});
