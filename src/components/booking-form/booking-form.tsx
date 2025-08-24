import {useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import InputMask from 'react-input-mask';
import {BookingFormInputs, BookingSlot} from '../../types/booking';
import {QuestInfo} from '../../types/quest';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {postBookingSlot} from '../../store/actions';
import {BookingDays, VALID_NAME_REGEXP, VALID_PHONE_REGEXP} from '../../const/const';
import {history} from '../../utils/history';

type BookingFormProps = {
  place: BookingSlot;
  quest: QuestInfo;
};

function BookingForm({place, quest}: BookingFormProps): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [formError, setFormError] = useState<string>('');
  const {control, register, handleSubmit, formState: {errors, isValid}, resetField} = useForm<BookingFormInputs>({
    mode: 'onChange'
  });

  useEffect(() => {
    resetField('time', {keepDirty: false, keepTouched: false});
  }, [place.id, resetField]);

  const onSubmit: SubmitHandler<BookingFormInputs> = async (data) => {
    const {id} = params;
    if (id) {
      const [date, time] = data.time.split('-', 2);
      const formData = {
        questId: id,
        body: {
          date: date,
          time: time,
          contactPerson: data.contactPerson,
          phone: data.phone,
          withChildren: data.withChildren,
          peopleCount: Number(data.peopleCount),
          placeId: place.id,
        }
      };

      try {
        await dispatch(postBookingSlot(formData)).unwrap();
        history.push('/my-quests');
      } catch {
        setFormError('Ошибка отправки заявки. Попробуйте ещё раз.');
      }
    }
  };

  return (
    <form className="booking-form" onSubmit={(evt) => {
      handleSubmit(onSubmit)(evt);
    }}
    >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>

        {BookingDays.map((day) => (
          <fieldset className="booking-form__date-section" key={day}>
            <legend className="booking-form__date-title">{day === 'today' ? 'Сегодня' : 'Завтра'}</legend>

            <div className="booking-form__date-inner-wrapper">
              {place.slots[day].map((item) => (
                <label className="custom-radio booking-form__date" key={item.time}>
                  <input
                    type="radio"
                    {...register('time', {required: 'Выберите время'})}
                    value={`${day}-${item.time}`}
                    disabled={!item.isAvailable}
                  />

                  <span className="custom-radio__label">{item.time}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        {errors.time && <span className="subtitle">{errors.time.message}</span>}
      </fieldset>

      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>

          <input
            type="text"
            id="name"
            {...register('contactPerson', {
              required: 'Укажите имя',
              pattern: {value: VALID_NAME_REGEXP, message: 'От 1 до 15 букв, пробелы, дефис'},
              minLength: {value: 1, message: 'Минимум 1 символ'},
              maxLength: {value: 15, message: 'Максимум 15 символов'},
            })}
            placeholder="Имя"
          />

          {errors.contactPerson && <span className="subtitle">{errors.contactPerson.message}</span>}
        </div>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>

          <Controller
            control={control}
            name="phone"
            rules={{
              required: 'Укажите телефон',
              pattern: {
                value: VALID_PHONE_REGEXP,
                message: 'Формат: +7 (XXX) XXX-XX-XX'
              }
            }}
            render={({field}) => (
              <InputMask
                mask="+7 (999) 999-99-99"
                {...field}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="tel"
                    id="tel"
                    placeholder="Телефон"
                  />
                )}
              </InputMask>
            )}
          />

          {errors.phone && <span className="subtitle">{errors.phone.message}</span>}
        </div>

        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>

          <input
            type="number"
            id="person"
            {...register('peopleCount', {
              required: 'Укажите количество участников',
              min: {value: quest.peopleMinMax[0], message: `Минимум ${quest.peopleMinMax[0]}`},
              max: {value: quest.peopleMinMax[1], message: `Максимум ${quest.peopleMinMax[1]}`}
            })}
            placeholder="Количество участников"
          />

          {errors.peopleCount && <span className="subtitle">{errors.peopleCount.message}</span>}
        </div>

        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            {...register('withChildren')}
            id="children"
          />

          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>

          <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>

      {formError && <span className="subtitle">{formError}</span>}

      <button className="btn btn--accent btn--cta booking-form__submit" type="submit" disabled={!isValid}>
        Забронировать
      </button>

      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input
          type="checkbox"
          {...register('agreement', {
            required: 'Подтвердите согласие с правилами',
          })}
          id="id-order-agreement"
        />

        <span className="custom-checkbox__icon">
          <svg width="20" height="17" aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>

        <span className="custom-checkbox__label">
              Я&nbsp;согласен с <a className="link link--active-silver link--underlined" href="https://htmlacademy.ru/docs/privacy" target={'_blank'} rel="nofollow noopener noreferrer">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
        </span>
      </label>

      {errors.agreement &&
        <span className="booking-form__checkbox--agreement subtitle">{errors.agreement.message}</span>}
    </form>
  );
}

export default BookingForm;
