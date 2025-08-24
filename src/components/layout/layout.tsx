import {Outlet, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import Header from '../header/header';
import Footer from '../footer/footer';

function Layout(): JSX.Element {
  const { pathname } = useLocation() as { pathname: AppRoute };

  const getMainClass = (): string => {
    switch (true) {
      case pathname.startsWith('/login'):
        return 'login';
      case pathname.startsWith('/quest'):
        return 'quest-page';
      default:
        return 'page-content';
    }
  };

  const decoratedClass = pathname !== AppRoute.Root ? ' decorated-page' : '';

  return (
    <div className="wrapper">
      <Header/>

      <main className={`${getMainClass()}${decoratedClass}`}>
        <Outlet/>
      </main>

      <Footer/>
    </div>
  );
}

export default Layout;
