import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from '../src/components/layout/Footer';
import MainNavigator from '../src/components/layout/MainNavigator';
import NewNote from '../src/components/NewNote/NewNote';
import Notes from '../src/components/Notes/Notes';
import { fetchNotes } from '../src/store/reducers/Notes/noteSlice';
import { useAppDispatch, useAppSelector } from '../src/store/store';


const Home = () => {
  const { isRegistered, username } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [creating, setCreating] = useState(false);
  useEffect(() => {
    if (!isRegistered) {
      Router.push('/welcome');
      return;
    }

    dispatch(fetchNotes(username));
  }, [isRegistered, dispatch, username]);

  const createNoteHandler = () => {
    setCreating(!creating);
  };

  return (
    <>
      {isRegistered && (
        <>
          {creating && <NewNote exitHandler={createNoteHandler} />}
          <MainNavigator />
          <Notes createNoteHandler={createNoteHandler} />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
