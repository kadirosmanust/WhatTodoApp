import Router from 'next/router';
import React, { useEffect } from 'react';
import Footer from '../src/components/layout/Footer';
import MainNavigator from '../src/components/layout/MainNavigator';
import NoteList from '../src/components/NoteList/NoteList';
import { useAppSelector } from '../src/store/store';

type Props = {};

const Home = (props: Props) => {
  const { isRegistered, username } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isRegistered) {
      Router.push('/welcome');
      return;
    }
  }, [isRegistered]);

  return (
    <>
      {isRegistered && (
        <>
          <MainNavigator />
          <NoteList notesData={null} pending={null} error={null} />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
