import {QuestInfo} from '../types/quest';
import {GenresList, LevelsList} from '../const/const';
import {useEffect} from 'react';

export function SvgSpriteLoader() {
  useEffect(() => {
    fetch('/img/sprite.svg')
      .then((result) => result.text())
      .then((text) => {
        const div = document.createElement('div');
        div.classList.add('visually-hidden');
        div.innerHTML = text;
        document.body.prepend(div);
      });
  }, []);

  return null;
}

export function getLevelName(levelCode: string): string {
  const entry = Object.entries(LevelsList).find(
    ([, level]) => level.id === levelCode
  );
  return entry ? entry[0] : levelCode;
}

export function getGenreName(genreCode: string): string {
  const entry = Object.entries(GenresList).find(
    ([, genre]) => genre.id === genreCode
  );
  return entry ? entry[0] : genreCode;
}

export function getPeoplesCount(peoples: QuestInfo['peopleMinMax']): string {
  const [min, max] = peoples;
  return max !== undefined ? `${min}-${max} чел` : `${min} чел`;
}
