import {Helmet} from 'react-helmet';
import {CONTACTS_PLACE} from '../../const/const';
import Map from '../../components/map/map';
import PageDecor from '../../components/page-decor/page-decor';
import Heading from '../../components/heading/heading';

function Contacts(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Контакты - Escape Room</title>
      </Helmet>

      <PageDecor/>

      <div className="container">
        <Heading addClass={'page-content__title-wrapper--underlined'}>
          <p className="subtitle page-content__subtitle">квесты в&nbsp;Санкт-Петербурге</p>

          <h1 className="title title--size-m page-content__title">Контакты</h1>
        </Heading>

        <div className="contacts">
          <dl className="contacts__list">
            <div className="contacts__item">
              <dt className="contacts__dt">Адрес</dt>

              <dd className="contacts__dd">
                <address className="contacts__address">Санкт-Петербург,<br/> Набережная реки Карповка, д 5П</address>
              </dd>
            </div>

            <div className="contacts__item">
              <dt className="contacts__dt">Режим работы</dt>

              <dd className="contacts__dd">Ежедневно, с&nbsp;10:00 до&nbsp;22:00</dd>
            </div>

            <div className="contacts__item">
              <dt className="contacts__dt">Телефон</dt>

              <dd className="contacts__dd">
                <a className="link" href="tel:+78003335599">8 (000) 111-11-11</a>
              </dd>
            </div>

            <div className="contacts__item">
              <dt className="contacts__dt">E&ndash;mail</dt>

              <dd className="contacts__dd">
                <a className="link" href="mailto:info@escape-room.ru">info@escape-room.ru</a>
              </dd>
            </div>
          </dl>

          <div className="contacts__map">
            <Map places={CONTACTS_PLACE}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacts;
