import {Helmet} from 'react-helmet';
import LoginForm from '../../components/login-form/login-form';
import PageDecor from '../../components/page-decor/page-decor';

function Login(): JSX.Element {
  const image = '/img/content/maniac/maniac-size-m.jpg';
  const image2x = '/img/content/maniac/maniac-size-m@2x.jpg';
  const webp = '/img/content/maniac/maniac-size-m.webp';
  const webp2x = '/img/content/maniac/maniac-size-m@2x.webp';
  const height = '768';

  return (
    <>
      <Helmet>
        <title>Авторизация - Escape Room</title>
      </Helmet>

      <PageDecor image={image} image2x={image2x} webp={webp} webp2x={webp2x} height={height}/>

      <div className="container container--size-l">
        <LoginForm/>
      </div>
    </>
  );
}

export default Login;
