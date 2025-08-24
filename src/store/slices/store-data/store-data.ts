import {StoreData} from '../../../types/store';
import {createSlice} from '@reduxjs/toolkit';
import {StoreSlices} from '../../../const/const';
import {
  deleteBookingQuests,
  fetchBookingQuests,
  fetchBookingSlot,
  fetchQuest,
  fetchQuests,
} from '../../actions';

const initialState: StoreData = {
  quests: [],
  isQuestsLoading: false,
  quest: null,
  isQuestLoading: false,
  bookingInfo: [],
  isBookingInfoLoading: false,
  bookingQuests: [],
  isBookingQuestsLoading: false,
};

export const storeData = createSlice({
  name: StoreSlices.StoreData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuests.pending, (state) => {
        state.isQuestsLoading = true;
      })
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.isQuestsLoading = false;
      })
      .addCase(fetchQuests.rejected, (state, action) => {
        state.isQuestsLoading = false;
      })
      .addCase(fetchQuest.pending, (state) => {
        state.isQuestLoading = true;
      })
      .addCase(fetchQuest.fulfilled, (state, action) => {
        state.quest = action.payload;
        state.isQuestLoading = false;
      })
      .addCase(fetchQuest.rejected, (state) => {
        state.isQuestLoading = false;
      })
      .addCase(fetchBookingSlot.pending, (state) => {
        state.isBookingInfoLoading = true;
      })
      .addCase(fetchBookingSlot.fulfilled, (state, action) => {
        state.bookingInfo = action.payload;
        state.isBookingInfoLoading = false;
      })
      .addCase(fetchBookingSlot.rejected, (state, action) => {
        state.isBookingInfoLoading = false;
      })
      .addCase(fetchBookingQuests.pending, (state) => {
        state.isBookingQuestsLoading = true;
      })
      .addCase(fetchBookingQuests.fulfilled, (state, action) => {
        state.bookingQuests = action.payload;
        state.isBookingQuestsLoading = false;
      })
      .addCase(fetchBookingQuests.rejected, (state, action) => {
        state.isBookingQuestsLoading = false;
      })
      .addCase(deleteBookingQuests.fulfilled, (state, action) => {
        state.bookingQuests = state.bookingQuests.filter((reservation) => reservation.id !== action.meta.arg);
      })
      .addCase(deleteBookingQuests.rejected, (state, action) => {
        state.bookingQuests = [];
      });
  }
});
