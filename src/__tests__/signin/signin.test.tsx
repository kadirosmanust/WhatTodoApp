/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInForm from '../../components/SignInForm/SignInForm';

describe('SignIn Form', () => {
  it('Null Check for Form', async () => {
    render(<SignInForm />);

    fireEvent.submit(await screen.findByRole('button'));

    expect(
      await screen.findByText('Username is required.')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Password is required.')
    ).toBeInTheDocument();
  });
});
