import Router from 'next/router';
import React, { useEffect } from 'react';
import Footer from '../src/components/layout/Footer';
import MainNavigator from '../src/components/layout/MainNavigator';
import NoteList from '../src/components/NoteList/NoteList';
import Notes from '../src/components/Notes/Notes';
import { getNotes, fetchNotes } from '../src/store/reducers/Notes/noteSlice';
import { useAppDispatch, useAppSelector } from '../src/store/store';

type Props = {};

const Home = () => {
  const { isRegistered, username } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isRegistered) {
      Router.push('/welcome');
      return;
    }

    dispatch(fetchNotes(username));
  }, [isRegistered, dispatch, username]);

  return (
    <>
      {isRegistered && (
        <>
          <MainNavigator />
          <Notes />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
