import {Helmet} from 'react-helmet';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {fetchBookingSlot, fetchQuest} from '../../store/actions';
import {
  getIsQuestLoading,
  getQuest,
  getBookingInfo,
  getIsBookingInfoLoading
} from '../../store/slices/store-data/selectors';
import Loader from '../../components/loader/loader';
import PageDecor from '../../components/page-decor/page-decor';
import BookingForm from '../../components/booking-form/booking-form';
import Map from '../../components/map/map';
import Heading from '../../components/heading/heading';

function Booking(): JSX.Element | null {
  const params = useParams();
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getQuest);
  const isQuestLoading = useAppSelector(getIsQuestLoading);
  const bookingInfo = useAppSelector(getBookingInfo);
  const isBookingLoading = useAppSelector(getIsBookingInfoLoading);
  const [selectedPlace, setSelectedPlace] = useState<string>(bookingInfo[0]?.id);

  useEffect(() => {
    if (bookingInfo.length) {
      setSelectedPlace(bookingInfo[0].id);
    }
  }, [bookingInfo]);

  useEffect(() => {
    const {id} = params;
    if (id) {
      dispatch(fetchQuest(id));
      dispatch(fetchBookingSlot(id));
    }
  }, [params, dispatch]);

  if (isQuestLoading || isBookingLoading) {
    return <Loader/>;
  }

  if (!quest || !bookingInfo.length) {
    return null;
  }

  const places = bookingInfo;
  const place = places.find((item) => item.id === selectedPlace) || places[0];

  return (
    <>
      <Helmet>
        <title>Бронирование квеста - Escape Room</title>
      </Helmet>

      <PageDecor/>

      <div className="container container--size-s">
        <Heading>
          <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста</h1>

          <p className="title title--size-m title--uppercase page-content__title">{quest.title}</p>
        </Heading>

        <div className="page-content__item">
          <div className="booking-map">
            <Map places={places} selectedId={selectedPlace} onSelect={setSelectedPlace}/>

            <p className="booking-map__address">
              {
                `Вы выбрали: ${place.location.address}`
              }
            </p>
          </div>
        </div>

        <BookingForm place={place} quest={quest}/>
      </div>
    </>
  );
}

export default Booking;
