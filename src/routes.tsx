import { MAIN_ROUTE, NOTFOUND_ROUTE } from './constants/route';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';

export const routes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: NOTFOUND_ROUTE,
    Component: NotFound,
  },
];
