import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {User, UserAuth} from '../types/user';
import {Extra} from '../types/store';
import {QuestInfo} from '../types/quest';
import {BookingInfo, BookingRequest, BookingSlot} from '../types/booking';
import {ApiRoute, AppRoute, HttpResponses} from '../const/const';
import {Token} from '../utils/token';

export const Action = {
  FETCH_QUESTS: 'quests/fetch',
  FETCH_QUEST: 'quests/fetch-current',
  FETCH_BOOKING_SLOT: 'quests/fetch-booking-slot',
  POST_BOOKING_SLOT: 'quests/post-booking-slot',
  FETCH_BOOKING_QUESTS: 'quests/fetch-booking',
  DELETE_BOOKING_QUEST: 'quests/delete-booking',
  FETCH_USER_STATUS: 'user/fetch-status',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
};

export const fetchQuests = createAsyncThunk<QuestInfo[], undefined, { extra: Extra }>(
  Action.FETCH_QUESTS,
  async (_, {extra}) => {
    try {
      const {api} = extra;
      const {data} = await api.get<QuestInfo[]>(ApiRoute.Quest);

      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchQuest = createAsyncThunk<QuestInfo, QuestInfo['id'], { extra: Extra }>(
  Action.FETCH_QUEST,
  async (id, {extra}) => {
    const {api, history} = extra;
    try {
      const {data} = await api.get<QuestInfo>(`${ApiRoute.Quest}/${id}`);

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === HttpResponses.NotFound) {
        history.push(AppRoute.NotFound);
      }

      return Promise.reject(error);
    }
  }
);

export const fetchBookingSlot = createAsyncThunk<BookingSlot[], string, { extra: Extra }>(
  Action.FETCH_BOOKING_SLOT,
  async (questId, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<BookingSlot[]>(`${ApiRoute.Quest}/${questId}/booking`);
    return data;
  }
);

export const postBookingSlot = createAsyncThunk<void, { questId: string; body: BookingRequest }, { extra: Extra }>(
  Action.POST_BOOKING_SLOT,
  async ({questId, body}, {extra}) => {
    const {api} = extra;
    await api.post(`${ApiRoute.Quest}/${questId}/booking`, body);
  }
);

export const fetchBookingQuests = createAsyncThunk<BookingInfo[], undefined, { extra: Extra }>(
  Action.FETCH_BOOKING_QUESTS,
  async (_, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<BookingInfo[]>(ApiRoute.BookingQuests);
    return data;
  }
);

export const deleteBookingQuests = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_BOOKING_QUEST,
  async (reservationId, {extra}) => {
    const {api} = extra;
    await api.delete(`${ApiRoute.BookingQuests}/${reservationId}`);
  }
);

export const fetchUserStatus = createAsyncThunk<User, undefined, { extra: Extra }>(
  Action.FETCH_USER_STATUS,
  async (_, {extra}) => {
    const {api} = extra;
    const {data} = await api.get<User>(ApiRoute.Login, { errorHandler: 'silent' });

    return data;
  }
);

export const loginUser = createAsyncThunk<UserAuth['email'], UserAuth, { extra: Extra }>(
  Action.LOGIN_USER,
  async ({email, password}, {extra}) => {
    const {api} = extra;
    const {data} = await api.post<User>(ApiRoute.Login, {email, password});
    const {token} = data;

    Token.set(token);

    return email;
  }
);

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (_, {extra}) => {
    const {api} = extra;
    await api.delete<User>(ApiRoute.Logout);

    Token.remove();
  }
);
