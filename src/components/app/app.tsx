import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const/const';
import {history} from '../../utils/history';
import {SvgSpriteLoader} from '../../utils/functions';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import PrivateRoute from '../private-route/private-route';
import Login from '../../pages/login/login';
import MyQuests from '../../pages/my-quests/my-quests';
import Quest from '../../pages/quest/quest';
import Booking from '../../pages/booking/booking';
import Contacts from '../../pages/contacts/contacts';
import NotFound from '../../pages/not-found/not-found';

function App(): JSX.Element {
  return (
    <>
      <SvgSpriteLoader/>

      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout/>}>
            <Route index element={<Main/>}/>

            <Route path={AppRoute.Login} element={
              <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
                <Login/>
              </PrivateRoute>
            }
            />

            <Route path={AppRoute.MyQuest} element={
              <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
                <MyQuests/>
              </PrivateRoute>
            }
            />

            <Route path={`${AppRoute.Quest}/:id`} element={<Quest/>}/>

            <Route
              path={`${AppRoute.Quest}/:id/booking`}
              element={
                <PrivateRoute restrictedFor={AuthorizationStatus.NoAuth} redirectTo={AppRoute.Login}>
                  <Booking/>
                </PrivateRoute>
              }
            />

            <Route path={AppRoute.Contacts} element={<Contacts/>}/>

            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </HistoryRouter>
    </>

  );
}

export default App;
