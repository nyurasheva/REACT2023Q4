import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import PokemonDetails from '../components/PokemonDetails';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

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

  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <Provider store={store}>
        <PokemonDetails onClosePokemonDetails={() => {}} />
      </Provider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('displays "Подробности отсутствуют" when abilities information is not available', async () => {
    const selectedId = 'pikachu';
    jest.spyOn(require('../redux/hooks'), 'useAppSelector').mockReturnValue({
      selectedId,
      images: {},
      abilityDescriptions: {},
    });

    render(
      <Provider store={store}>
        <PokemonDetails onClosePokemonDetails={() => {}} />
      </Provider>
    );

    await screen.findByText('Подробности отсутствуют');
    const abilitiesInfo = screen.queryByText('Способности:');
    expect(abilitiesInfo).not.toBeInTheDocument();
  });
});
