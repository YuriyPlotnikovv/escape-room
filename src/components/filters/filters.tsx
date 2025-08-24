import {GenresList, LevelsList} from '../../const/const';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getGenre, getLevel} from '../../store/slices/store-processes/selectors';
import {setGenre, setLevel} from '../../store/slices/store-processes/store-processes';
import {GenreId, LevelId} from '../../types/quest';

function Filters(): JSX.Element {
  const dispatch = useDispatch();
  const selectedGenre = useAppSelector(getGenre);
  const selectedLevel = useAppSelector(getLevel);

  const handleGenreChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGenre(evt.target.value as GenreId));
  };

  const handleLevelChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLevel(evt.target.value as LevelId));
  };

  return (
    <div className="page-content__item">
      <form className="filter" action="#" method="get">
        <fieldset className="filter__section">
          <legend className="visually-hidden">Тематика</legend>

          <ul className="filter__list">
            {
              Object.entries(GenresList).map(([genreName, genreInfo]) => (
                <li key={genreInfo.id} className="filter__item">
                  <input
                    type="radio"
                    name="type"
                    id={genreInfo.id}
                    checked={selectedGenre === genreInfo.id}
                    value={genreInfo.id}
                    onChange={handleGenreChange}
                  />
                  <label className="filter__label" htmlFor={genreInfo.id}>
                    <svg className="filter__icon" width="26" height="30" aria-hidden="true">
                      <use xlinkHref={`#icon-${genreInfo.icon || 'all-quests'}`}></use>
                    </svg>

                    <span className="filter__label-text">{genreName}</span>
                  </label>
                </li>
              ))
            }
          </ul>
        </fieldset>

        <fieldset className="filter__section">
          <legend className="visually-hidden">Сложность</legend>

          <ul className="filter__list">
            {
              Object.entries(LevelsList).map(([levelName, levelInfo]) => (
                <li key={levelInfo.id} className="filter__item">
                  <input
                    type="radio"
                    name="level"
                    id={levelInfo.id}
                    checked={selectedLevel === levelInfo.id}
                    value={levelInfo.id}
                    onChange={handleLevelChange}
                  />
                  <label className="filter__label" htmlFor={levelInfo.id}>
                    <span className="filter__label-text">{levelName}</span>
                  </label>
                </li>
              ))
            }
          </ul>
        </fieldset>
      </form>
    </div>
  );
}

export default Filters;
