import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageInput from '../components/PageInput';

describe('PageInput', () => {
  it('renders with initial itemsPerPage and updates on change', () => {
    const initialItemsPerPage = 10;
    const onItemsPerPageChange = jest.fn();

    render(
      <PageInput
        itemsPerPage={initialItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    );

    expect(
      screen.getByLabelText('Кол-во покемонов на странице:')
    ).toBeDefined();
    expect(
      screen.getByDisplayValue(initialItemsPerPage.toString())
    ).toBeDefined();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '15' } });

    expect(onItemsPerPageChange).toHaveBeenCalledWith(15);

    fireEvent.blur(input);

    expect(onItemsPerPageChange).toHaveBeenCalledWith(initialItemsPerPage);
  });

  it('handles decrease and increase button clicks', () => {
    const initialItemsPerPage = 5;
    const onItemsPerPageChange = jest.fn();

    render(
      <PageInput
        itemsPerPage={initialItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    );
    const decreaseButton = screen.getByRole('button', { name: '−' });
    fireEvent.click(decreaseButton);

    expect(onItemsPerPageChange).toHaveBeenCalledWith(initialItemsPerPage - 1);

    const increaseButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(increaseButton);

    expect(onItemsPerPageChange).toHaveBeenCalledWith(initialItemsPerPage + 1);
  });
});
