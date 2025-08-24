import {StoreState} from '../../../types/store';
import {StoreSlices} from '../../../const/const';

export const getGenre = (state: StoreState) => state[StoreSlices.StoreProcesses].genre;
export const getLevel = (state: StoreState) => state[StoreSlices.StoreProcesses].level;
