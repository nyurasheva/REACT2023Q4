import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';

describe('NotFound component', () => {
  it('renders correctly', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    expect(screen.getByText('404')).toBeTruthy();
    expect(screen.getByText('Ошибка')).toBeTruthy();
    expect(
      screen.getByText('Извините! Мы не смогли найти то, что вы искали.')
    ).toBeTruthy();
    expect(screen.getByText('Запрашиваемая страница не найдена.')).toBeTruthy();
    expect(
      screen.getByRole('link', { name: 'Перейти на главную страницу' })
    ).toBeTruthy();
  });
});
