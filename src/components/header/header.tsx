import {Link, matchPath, NavLink, useLocation} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getIsAuthorized} from '../../store/slices/store-user/selectors';
import {logoutUser} from '../../store/actions';
import {AppRoute} from '../../const/const';
import {history} from '../../utils/history';


function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getIsAuthorized);
  const {pathname} = useLocation() as { pathname: AppRoute };
  const location = useLocation();

  const navLinks = [
    {
      to: AppRoute.Root,
      name: 'Квесты',
      props: {end: true},
      show: true
    },
    {
      to: AppRoute.Contacts,
      name: 'Контакты',
      show: true
    },
    {
      to: AppRoute.MyQuest,
      name: 'Мои бронирования',
      show: authorizationStatus
    }
  ];

  const handleButtonClick = async () => {
    if (authorizationStatus) {
      await dispatch(logoutUser());

      const privateRoutes = [AppRoute.MyQuest, `${AppRoute.Quest}/:id/booking`];

      if (privateRoutes.some((route) => matchPath(route, location.pathname))) {
        history.push('/');
      }
    }
  };

  return (
    <header className="header">
      <div className="container container--size-l">
        {
          pathname === AppRoute.Root
            ? (
              <span className="logo header__logo">
                <svg width="134" height="52" aria-hidden="true">
                  <use xlinkHref="#logo"></use>
                </svg>
              </span>
            )
            : (
              <Link to={AppRoute.Root} className="logo header__logo" aria-label="Перейти на Главную">
                <svg width="134" height="52" aria-hidden="true">
                  <use xlinkHref="#logo"></use>
                </svg>
              </Link>
            )
        }

        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {navLinks.filter((link) => link.show).map((link) => (
              <li className="main-nav__item" key={link.to}>
                <NavLink
                  to={link.to}
                  {...(link.props || {})}
                  className={({isActive}) => `link${isActive ? ' active' : ''}`}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__side-nav">
          {
            authorizationStatus
              ? <button className="btn btn--accent header__side-item" type="button" onClick={() => {handleButtonClick();}}>Выйти</button>
              : <Link to={AppRoute.Login} className="btn header__side-item">Вход</Link>
          }

          <a className="link header__side-item header__phone-link" href="tel:+78003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
