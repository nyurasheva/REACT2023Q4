import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import NotFound from '../pages/404';
import { MAIN_ROUTE } from '../constants/route';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('NotFound Component', () => {
  it('renders 404 page with correct content', () => {
    (useRouter as jest.Mock).mockReturnValueOnce({
      asPath: '/',
    });

    render(<NotFound />);

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
    (useRouter as jest.Mock).mockReturnValueOnce({
      asPath: '/non-existing-route',
    });

    render(<NotFound />);

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
