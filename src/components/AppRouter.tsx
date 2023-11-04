import { Routes, Route } from 'react-router-dom';
import { routes } from '../routes';
import { Main } from '../pages/Main';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      <Route path="/search" element={<Main />} />
    </Routes>
  );
};

export { AppRouter };
