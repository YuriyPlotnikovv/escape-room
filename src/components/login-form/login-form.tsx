import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {loginUser} from '../../store/actions';
import {LocationState, LoginFormInputs} from '../../types/login';
import {AppRoute, VALID_EMAIL_REGEXP, VALID_PASSWORD_REGEXP} from '../../const/const';
import {useLocation} from 'react-router-dom';
import {history} from '../../utils/history';

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [formError, setFormError] = useState<string>('');
  const {register, handleSubmit, formState: {errors, isValid}} = useForm<LoginFormInputs>({
    mode: 'onTouched',
  });

  const state = location.state as LocationState | null;
  const fromPage = state?.from?.pathname || AppRoute.Root;

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const formData = {
      email: data.email,
      password: data.password
    };

    try {
      await dispatch(loginUser(formData));
      history.push(fromPage);
    } catch {
      setFormError('Ошибка входа. Попробуйте ещё раз.');
    }
  };

  return (
    <div className="login__form">
      <form className="login-form" onSubmit={(evt) => {
        handleSubmit(onSubmit)(evt);
      }}
      >
        <div className="login-form__inner-wrapper">
          <h1 className="title title--size-s login-form__title">Вход</h1>

          <div className="login-form__inputs">
            <div className="custom-input login-form__input">
              <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>

              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Укажите почту',
                  pattern: {
                    value: VALID_EMAIL_REGEXP,
                    message: 'Некорректный email',
                  },
                })}
              />

              {errors.email && <span className="subtitle">{errors.email.message}</span>}
            </div>

            <div className="custom-input login-form__input">
              <label className="custom-input__label" htmlFor="password">Пароль</label>

              <input
                type="password"
                id="password"
                {...register('password', {
                  required: 'Введите пароль',
                  pattern: {
                    value: VALID_PASSWORD_REGEXP,
                    message: 'От 3 до 15 символов',
                  },
                  minLength: {value: 3, message: 'Минимум 3 символа'},
                  maxLength: {value: 15, message: 'Максимум 15 символов'},
                })}
              />

              {errors.password && <span className="subtitle">{errors.password.message}</span>}
            </div>
          </div>

          {formError && <span className="subtitle">{formError}</span>}

          <button className="btn btn--accent btn--general login-form__submit" type="submit" disabled={!isValid}>Войти</button>
        </div>

        <label className="custom-checkbox login-form__checkbox">
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

        {errors.agreement && <span className="login-form__checkbox subtitle">{errors.agreement.message}</span>}
      </form>
    </div>
  );
}

export default LoginForm;
