import { act, render, screen } from '@testing-library/react';
import { Main } from '../pages/Main';
import { BrowserRouter } from 'react-router-dom';
import { PokemonProvider } from '../context/PokemonContext';
// import App from '../App';

describe('Main component', () => {
  it('renders Main component', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <PokemonProvider>
            <Main />
          </PokemonProvider>
        </BrowserRouter>
      );
    });

    expect(screen.getByText('2023')).toBeTruthy();
  });
});
