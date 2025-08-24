import {GenreIds, Genres, LevelIds, Levels} from '../const/const';

export type QuestInfo = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: string;
  type: string;
  peopleMinMax: [number, number];
  description: string;
  coverImg: string;
  coverImgWebp: string;
}

export type GenreName = typeof Genres[number];
export type LevelName = typeof Levels[number];
export type GenreId = typeof GenreIds[number];
export type LevelId = typeof LevelIds[number];

export type Genre = {
  id: string;
  icon: string;
};

export type Level = {
  id: string;
};
