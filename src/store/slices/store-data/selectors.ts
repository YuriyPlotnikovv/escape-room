import {createSelector} from '@reduxjs/toolkit';
import {StoreState} from '../../../types/store';
import {QuestInfo} from '../../../types/quest';
import {BookingInfo, BookingSlot} from '../../../types/booking';
import {getGenre, getLevel} from '../store-processes/selectors';
import {GenreIds, LevelIds, StoreSlices} from '../../../const/const';

export const getQuests = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): QuestInfo[] => STORE_DATA.quests;
export const getIsQuestsLoading = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): boolean => STORE_DATA.isQuestsLoading;

export const getQuest = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): QuestInfo | null => STORE_DATA.quest;
export const getIsQuestLoading = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): boolean => STORE_DATA.isQuestLoading;

export const getBookingInfo = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): BookingSlot[] => STORE_DATA.bookingInfo;
export const getIsBookingInfoLoading = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): boolean => STORE_DATA.isBookingInfoLoading;

export const getBookingQuests = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): BookingInfo[] | [] => STORE_DATA.bookingQuests;
export const getIsBookingQuestsLoading = ({[StoreSlices.StoreData]: STORE_DATA}: StoreState): boolean => STORE_DATA.isBookingQuestsLoading;

export const selectQuests = createSelector(
  [getQuests, getGenre, getLevel],
  (quests, genre, level) => quests.filter(
    (quest: QuestInfo) =>
      (genre === GenreIds[0] || quest.type === genre) &&
      (level === LevelIds[0] || quest.level === level)
  ));
