import hash from '@/utils/helpers/hashHelper';
import { httpPost } from '@/utils/helpers/httpHelper';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './PasswordChangesModal.module.css';

type Props = { cancelHandler: () => void; changePassword: () => void };

type PassInputs = {
  password: string;
  passwordAgain: string;
};

const PasswordChangesModal = ({ cancelHandler }: Props) => {
  const [buttonText, setText] = useState('Change Password');
  const [passChange, setPassText] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PassInputs>({ mode: 'onTouched' });

  const password = useRef({});
  password.current = watch('password', '');

  const submitHandler = handleSubmit(async ({ password }) => {
    setText('Wait ...');

    const hashedpass = hash(password);

    const response = (await httpPost(
      '/api/auth/changepassword',
      hashedpass
    )) as any;

    if (response.data.message.acknowledged) {
      setText('Changed');
      setPassText('Password has been changed.');

      return;
    }

    setText('Error');
    setPassText('Something went wrong');


  });

  const passChangeOption = {
    password: {
      required: 'Password is required.',
      minLength: {
        value: 6,
        message: 'Have to be bigger than 6',
      },
    },
    passwordAgain: {
      required: 'PasswordAgain is required.',
      validate: {
        isMatch: (value: string) =>
          value === password.current || 'The passwords do not match',
      },
    },
  };

  return (
    <div className={styles.darkmodal}>
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={submitHandler}>
          <label>New Password</label>
          <input
            className={styles.input}
            type='text'
            {...register('password', passChangeOption.password)}
            placeholder='New Password'
          />
          {errors.password && (
            <label className={styles.error}>{errors.password.message}</label>
          )}
          <label>Password Again</label>
          <input
            className={styles.input}
            type='text'
            {...register('passwordAgain', passChangeOption.passwordAgain)}
            placeholder='Password Again'
          />
          {errors.passwordAgain && (
            <label className={styles.error}>
              {errors.passwordAgain.message}
            </label>
          )}

          <div className={styles.buttons}>
            <button type='submit'>{buttonText}</button>
            <button onClick={cancelHandler}>Cancel</button>
            <label className={styles.error}>{passChange}</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangesModal;
