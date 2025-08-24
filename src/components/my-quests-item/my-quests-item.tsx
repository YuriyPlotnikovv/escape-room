import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import {getLevelName} from '../../utils/functions';
import {BookingInfo} from '../../types/booking';

type MyQuestsItemProps = {
  item: BookingInfo;
  onCancel: (id: string) => void;
}

function MyQuestsItem({item, onCancel}: MyQuestsItemProps): JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={item.quest.previewImgWebp}/>
          <img src={item.quest.previewImg} width="344" height="232" alt={item.quest.title}/>
        </picture>
      </div>

      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link to={`${AppRoute.Quest}/${item.quest.id}`} className="quest-card__link">
            {item.quest.title}
          </Link>

          <span className="quest-card__info">
                [{item.date === 'today' ? 'Сегодня' : 'Завтра'},&nbsp;{item.time}. {item.location.address}]
          </span>
        </div>

        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>

            {item.peopleCount} чел
          </li>

          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>

            {getLevelName(item.quest.level)}
          </li>
        </ul>

        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
          onClick={() => onCancel(item.id)}
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default MyQuestsItem;
