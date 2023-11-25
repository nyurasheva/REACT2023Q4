import Link from 'next/link';
import { MAIN_ROUTE } from '../constants/route';
import { Header } from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="tygh">
      <Header />
      <main className="main container">
        <div className="exception">
          <div className="exception__code">
            404
            <span className="exception__code-txt">Ошибка</span>
          </div>
          <div className="exception__title-info">
            <h1 className="exception__title">
              Извините! Мы не смогли найти то, что вы искали.
            </h1>
            <p className="exception__info">
              Запрашиваемая страница не найдена.
            </p>
            <div className="exception__links">
              <div className="exception__links-item">
                <Link href={MAIN_ROUTE}>Перейти на главную страницу</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
