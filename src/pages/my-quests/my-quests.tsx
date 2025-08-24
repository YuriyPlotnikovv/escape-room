import {Helmet} from 'react-helmet';
import {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {deleteBookingQuests, fetchBookingQuests} from '../../store/actions';
import {getBookingQuests, getIsBookingQuestsLoading} from '../../store/slices/store-data/selectors';
import MyQuestsList from '../../components/my-quests-list/my-quests-list';
import PageDecor from '../../components/page-decor/page-decor';
import Heading from '../../components/heading/heading';

function MyQuests(): JSX.Element {
  const dispatch = useAppDispatch();
  const quests = useAppSelector(getBookingQuests);
  const isQuestsLoading = useAppSelector(getIsBookingQuestsLoading);

  useEffect(() => {
    dispatch(fetchBookingQuests());
  }, [dispatch]);

  const handleCancel = (id: string) => {
    dispatch(deleteBookingQuests(id));
  };

  return (
    <>
      <Helmet>
        <title>Мои бронирования - Escape Room</title>
      </Helmet>

      <PageDecor/>

      <div className="container">
        <Heading>
          <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
        </Heading>

        <MyQuestsList quests={quests} isLoading={isQuestsLoading} onCancel={handleCancel}/>
      </div>
    </>
  );
}

export default MyQuests;
