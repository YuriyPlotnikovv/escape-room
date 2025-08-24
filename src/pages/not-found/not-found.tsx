import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import PageDecor from '../../components/page-decor/page-decor';
import Heading from '../../components/heading/heading';

function NotFound(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Страница не найдена - Escape Room</title>
      </Helmet>

      <PageDecor/>

      <div className="container">
        <Heading addClass={'page-content__title-wrapper--underlined'}>
          <p className="subtitle page-content__subtitle">Страница, которую вы ищете, затерялась в космосе.</p>

          <h1 className="title title--size-m page-content__title">404 - Страница не найдена</h1>
        </Heading>

        <Link to="/" className="btn btn--general">Вернуться на главную</Link>
      </div>
    </>
  );
}

export default NotFound;
