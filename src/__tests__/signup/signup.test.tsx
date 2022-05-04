/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { Provider } from 'react-redux';
import store from '../../store/store';

describe('SingUp Form', () => {
  describe('Username Valid Check', () => {
    it('Validation Check for short username', async () => {
      render(<Provider store={store}><SignUpForm /></Provider>);
      const input = await screen.findByLabelText('Username');

      fireEvent.input(input, { target: { value: 'a' } });
      fireEvent.submit(await screen.findByRole('button'));

      expect(await screen.findByText('Have to be bigger than 4')).toBeTruthy();
    });

    it('Validation Check for nullcheck', async () => {
      render(<Provider store={store}><SignUpForm /></Provider>);
      const input = await screen.findByLabelText('Username');

      fireEvent.input(input, { target: { value: '' } });
      fireEvent.submit(await screen.findByRole('button'));

      expect(await screen.findByText('Username is required.')).toBeTruthy();
    });
  });

  describe('Password Valid Check', () => {
    it('Validation Check for short Password', async () => {
      render(<Provider store={store}><SignUpForm /></Provider>);
      const input = await screen.findByLabelText('Password');

      fireEvent.input(input, { target: { value: 'a' } });
      fireEvent.submit(await screen.findByRole('button'));

      expect(await screen.findByText('Have to be bigger than 6')).toBeTruthy();
    });

    it('Validation Check for nullcheck', async () => {
      render(<Provider store={store}><SignUpForm /></Provider>);
      const input = await screen.findByLabelText('Password');

      fireEvent.input(input, { target: { value: '' } });
      fireEvent.submit(await screen.findByRole('button'));

      expect(await screen.findByText('Password is required.')).toBeTruthy();
    });
  });

  describe('Email Valid Check', () => {
    it('Validation Check for valid email adress', async () => {
      render(<Provider store={store}><SignUpForm /></Provider>);
      const input = await screen.findByLabelText('Email');

      fireEvent.input(input, { target: { value: 'aaaa' } });
      fireEvent.submit(await screen.findByRole('button'));

      expect(await screen.findByText('invalid email address')).toBeTruthy();
    });

    it('Validation Check for nullcheck', async () => {
      render(<Provider store={store}><SignUpForm /></Provider>);
      const input = await screen.findByLabelText('Email');

      fireEvent.input(input, { target: { value: '' } });
      fireEvent.submit(await screen.findByRole('button'));

      expect(await screen.findByText('Email is required.')).toBeTruthy();
    });
  });

  describe('PassAgain Valid Check', () => {
    it('Validation Check for not matched', async () => {
      render(<Provider store={store}><SignUpForm /></Provider>);
      const password = await screen.findByLabelText('Password');
      const passAgain = await screen.findByLabelText('Password Again');

      fireEvent.input(password, { target: { value: 'aaaaaa' } });
      fireEvent.input(passAgain, { target: { value: 'aaaaaaaa' } });
      fireEvent.submit(await screen.findByRole('button'));

      expect(
        await screen.findByText('The passwords do not match')
      ).toBeTruthy();
    });

    it('Validation Check for nullcheck', async () => {
      render(<Provider store={store}><SignUpForm /></Provider>);
      const input = await screen.findByLabelText('Password Again');

      fireEvent.input(input, { target: { value: '' } });
      fireEvent.submit(await screen.findByRole('button'));

      expect(
        await screen.findByText('PasswordAgain is required.')
      ).toBeTruthy();
    });
  });
});
