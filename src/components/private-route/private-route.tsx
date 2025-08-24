import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getAuthorizationStatus} from '../../store/slices/store-user/selectors';
import {AppRoute, AuthorizationStatus} from '../../const/const';
import Loader from '../loader/loader';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
}

function PrivateRoute({restrictedFor, redirectTo, children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const location = useLocation();

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loader/>;
  }

  return (
    authorizationStatus !== restrictedFor
      ? children
      : <Navigate to={redirectTo} state={{from: location}} replace/>
  );
}

export default PrivateRoute;
