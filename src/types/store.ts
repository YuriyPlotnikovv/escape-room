import {store} from '../store';
import {AxiosInstance} from 'axios';
import {AuthorizationStatus} from '../const/const';
import {History} from 'history';
import {GenreId, LevelId, QuestInfo} from './quest';
import {User} from './user';
import {BookingInfo, BookingSlot} from './booking';

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Extra = {
  api: AxiosInstance;
  history: History;
}

export type StoreData = {
  quests: QuestInfo[];
  isQuestsLoading: boolean;
  quest: QuestInfo | null;
  isQuestLoading: boolean;
  bookingInfo: BookingSlot[];
  isBookingInfoLoading: boolean;
  bookingQuests: BookingInfo[];
  isBookingQuestsLoading: boolean;
}

export type StoreProcesses = {
  genre: GenreId;
  level: LevelId;
}

export type StoreUser = {
  user: User['email'];
  authorizationStatus: AuthorizationStatus;
}
