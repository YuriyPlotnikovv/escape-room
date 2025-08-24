import {Genre, GenreName, Level, LevelName} from '../types/quest';
import {Place} from '../types/map';

export const BASE_URL = 'https://grading.design.htmlacademy.pro/v1/escape-room';
export const REQUEST_TIMEOUT = 5000;

export const VALID_PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
export const VALID_EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const VALID_NAME_REGEXP = /^[A-Za-zА-Яа-яЁё\-'\s]{1,15}$/;
export const VALID_PHONE_REGEXP = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
export const URL_MARKER_DEFAULT = '/img/svg/pin-default.svg';
export const URL_MARKER_CURRENT = '/img/svg/pin-active.svg';

export const CONTACTS_PLACE: Place[] = [
  {
    id: '',
    location: {
      coords: [59.968295, 30.317525],
      address: 'Санкт-Петербург, Набережная реки Карповка, д 5П',
    }
  }
];

export const DEFAULT_BG_IMAGE = '/img/content/maniac/maniac-bg-size-m.jpg';
export const DEFAULT_BG_IMAGE_2X = '/img/content/maniac/maniac-bg-size-m@2x.jpg';
export const DEFAULT_BG_WEBP = '/img/content/maniac/maniac-bg-size-m.webp';
export const DEFAULT_BG_WEBP_2X = '/img/content/maniac/maniac-bg-size-m@2x.webp';
export const DEFAULT_BG_HEIGHT = '1959';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Quest = '/quest',
  Contacts = '/contacts',
  MyQuest = '/my-quests',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum HttpResponses {
  ValidationError = 400,
  CommonError = 401,
  NotFound = 404,
}

export enum ApiRoute {
  Quest = '/quest',
  BookingQuests = '/reservation',
  Login = '/login',
  Logout = '/logout',
}

export enum StoreSlices {
  StoreData = 'STORE_DATA',
  StoreProcesses = 'STORE_PROCESSES',
  StoreUser = 'STORE_USER',
}

export const Genres = ['Все квесты', 'Приключения', 'Ужасы', 'Мистика', 'Детектив', 'Sci-Fi'] as const;
export const Levels = ['Любой', 'Легкий', 'Средний', 'Сложный'] as const;
export const GenreIds = ['all', 'adventure', 'horror', 'mystic', 'detective', 'sciFi'] as const;
export const LevelIds = ['any', 'easy', 'medium', 'hard'] as const;
export const BookingDays = ['today', 'tomorrow'] as const;

export const GenresList: { [key in GenreName]: Genre } = {
  'Все квесты': {
    id: 'all',
    icon: '',
  },
  'Приключения': {
    id: 'adventure',
    icon: 'adventure',
  },
  'Ужасы': {
    id: 'horror',
    icon: 'horror',
  },
  'Мистика': {
    id: 'mystic',
    icon: 'mystic',
  },
  'Детектив': {
    id: 'detective',
    icon: 'detective',
  },
  'Sci-Fi': {
    id: 'sciFi',
    icon: 'sci-fi',
  },
};

export const LevelsList: { [key in LevelName]: Level } = {
  'Любой': {
    id: 'any',
  },
  'Легкий': {
    id: 'easy',
  },
  'Средний': {
    id: 'medium',
  },
  'Сложный': {
    id: 'hard',
  },
};
