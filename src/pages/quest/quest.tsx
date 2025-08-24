import {Helmet} from 'react-helmet';
import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getIsQuestLoading, getQuest} from '../../store/slices/store-data/selectors';
import {fetchQuest} from '../../store/actions';
import {AppRoute} from '../../const/const';
import {getGenreName, getLevelName, getPeoplesCount} from '../../utils/functions';
import Loader from '../../components/loader/loader';
import PageDecor from '../../components/page-decor/page-decor';

function Quest(): JSX.Element | null {
  const params = useParams();
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getQuest);
  const isQuestLoading = useAppSelector(getIsQuestLoading);

  useEffect(() => {
    const {id} = params;
    if (id) {
      const currentId = String(id);
      dispatch(fetchQuest(currentId));
    }
  }, [params, dispatch]);

  if (isQuestLoading) {
    return (
      <div className="container container--size-l">
        <Loader/>
      </div>
    );
  }

  if (!quest) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Квест {quest.title} - Escape Room</title>
      </Helmet>

      <PageDecor image={quest.coverImg} webp={quest.coverImgWebp} height={'768'}/>

      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">{quest.title}</h1>

          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>{getGenreName(quest.type)}
          </p>

          <ul className="tags tags--size-l quest-page__tags">
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

          <p className="quest-page__description">{quest.description}</p>

          <Link to={`${AppRoute.Quest}/${quest.id}/booking`} className="btn btn--accent btn--cta quest-page__btn">
            Забронировать
          </Link>
        </div>
      </div>
    </>
  );
}

export default Quest;
