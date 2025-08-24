import {StoreState} from '../../../types/store';
import {AuthorizationStatus, StoreSlices} from '../../../const/const';

export const getAuthorizationStatus = (state: StoreState) => state[StoreSlices.StoreUser].authorizationStatus;
export const getIsAuthorized = (state: StoreState) => state[StoreSlices.StoreUser].authorizationStatus === AuthorizationStatus.Auth;
