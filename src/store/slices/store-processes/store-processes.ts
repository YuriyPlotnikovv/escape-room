import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StoreProcesses} from '../../../types/store';
import {GenreId, LevelId} from '../../../types/quest';
import {GenreIds, LevelIds, StoreSlices} from '../../../const/const';

const initialState: StoreProcesses = {
  genre: GenreIds[0],
  level: LevelIds[0],
};

export const storeProcesses = createSlice({
  name: StoreSlices.StoreProcesses,
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<GenreId>) => {
      state.genre = action.payload;
    },
    setLevel: (state, action: PayloadAction<LevelId>) => {
      state.level = action.payload;
    },
  }
});

export const {setGenre, setLevel} = storeProcesses.actions;
