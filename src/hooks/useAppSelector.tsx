import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {StoreState} from '../types/store';

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
