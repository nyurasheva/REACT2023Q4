// Main.tsx

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { fields } from '../constants/fields';
import { FieldName } from '../types/interfaces';
import { HOOK_ROUTE, UNCONTROLLED_ROUTE } from '../constants/route';

const Main = () => {
  const { formData } = useAppSelector((state) => state.formState);

  return (
    <div className="tygh">
      <Header />
      <main>
        <h1>Главная страница</h1>
        <ul className="main__button">
          <li>
            <NavLink to={UNCONTROLLED_ROUTE} className="button">
              Uncontrolled Form
            </NavLink>
          </li>
          <li>
            <NavLink to={HOOK_ROUTE} className="button button-second">
              React Hook Form
            </NavLink>
          </li>
        </ul>
        {formData.firstName && (
          <div>
            <h1>Отображение данных</h1>
            <img
              className="main__img"
              src={formData.image.toString()}
              alt="Uploaded"
            />
            {fields.map(({ label, name }) =>
              name !== 'image' ? (
                <label key={name} className="label">
                  <p>
                    {label}
                    {name !== 'terms' ? formData[name as FieldName] : 'Да'}
                  </p>
                </label>
              ) : null
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export { Main };
