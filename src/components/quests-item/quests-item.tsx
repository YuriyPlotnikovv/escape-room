import {Link} from 'react-router-dom';
import {QuestInfo} from '../../types/quest';
import {AppRoute} from '../../const/const';
import {getLevelName, getPeoplesCount} from '../../utils/functions';

type QuestsItemProps = {
  quest: QuestInfo;
}

function QuestsItem({quest}: QuestsItemProps): JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={`${quest.previewImgWebp}`}/>

          <img src={`${quest.previewImg}`} width="344" height="232" alt={quest.title}/>
        </picture>
      </div>

      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link to={`${AppRoute.Quest}/${quest.id}`} className="quest-card__link">
            {quest.title}
          </Link>
        </div>

        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>

            {getPeoplesCount(quest.peopleMinMax)}
          </li>

          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>

            {getLevelName(quest.level)}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuestsItem;
