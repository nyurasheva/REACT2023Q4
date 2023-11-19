import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import PageInput from '../components/PageInput';

describe('PageInput', () => {
  it('renders with initial itemsPerPage and updates on change', () => {
    const initialItemsPerPage = 20;

    render(
      <Provider store={store}>
        <PageInput />
      </Provider>
    );

    expect(
      screen.getByLabelText('Кол-во покемонов на странице:')
    ).toBeDefined();

    expect(
      screen.getByDisplayValue(initialItemsPerPage.toString())
    ).toBeDefined();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '15' } });

    expect(input).toHaveValue('15');

    fireEvent.blur(input);
  });

  it('handles decrease and increase button clicks', () => {
    render(
      <Provider store={store}>
        <PageInput />
      </Provider>
    );

    const decreaseButton = screen.getByRole('button', { name: '−' });
    fireEvent.click(decreaseButton);
  });
});
