// routes.tsx

import {
  HOOK_ROUTE,
  MAIN_ROUTE,
  NOTFOUND_ROUTE,
  UNCONTROLLED_ROUTE,
} from './constants/route';
import HookForm from './pages/HookForm';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import UncontrolledForm from './pages/UncontrolledForm';

export const routes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: UNCONTROLLED_ROUTE,
    Component: UncontrolledForm,
  },
  {
    path: HOOK_ROUTE,
    Component: HookForm,
  },
  {
    path: NOTFOUND_ROUTE,
    Component: NotFound,
  },
];
