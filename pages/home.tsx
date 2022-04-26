import Router from 'next/router';
import React, { useEffect } from 'react';
import Footer from '../src/components/layout/Footer';
import MainNavigator from '../src/components/layout/MainNavigator';
import NoteList from '../src/components/NoteList/NoteList';
import { getNotes, fetchNotes } from '../src/store/reducers/Notes/noteSlice';
import { useAppDispatch, useAppSelector } from '../src/store/store';

type Props = {};

const Home = () => {
  const { isRegistered, username } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { data, error, pending } = useAppSelector(getNotes);
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
          <NoteList notesData={data} pending={pending} error={error} />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
