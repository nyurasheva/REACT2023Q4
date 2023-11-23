import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  MemoryRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { MAIN_ROUTE } from '../constants/route';

describe('NotFound Component', () => {
  it('renders 404 page with correct content', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Ошибка')).toBeInTheDocument();
    expect(
      screen.getByText('Извините! Мы не смогли найти то, что вы искали.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Запрашиваемая страница не найдена.')
    ).toBeInTheDocument();

    const link = screen.getByText('Перейти на главную страницу');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(MAIN_ROUTE);
  });

  it('renders 404 page when navigating to non-existing route', () => {
    render(
      <MemoryRouter initialEntries={['/non-existing-route']}>
        <Routes>
          <Route path="/non-existing-route" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Ошибка')).toBeInTheDocument();
    expect(
      screen.getByText('Извините! Мы не смогли найти то, что вы искали.')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Запрашиваемая страница не найдена.')
    ).toBeInTheDocument();
    const link = screen.getByText('Перейти на главную страницу');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(MAIN_ROUTE);
  });
});
