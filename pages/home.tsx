import React from 'react';
import Footer from '../components/layout/Footer';
import MainNavigator from '../components/layout/MainNavigator';
import NoteList from '../components/NoteList/NoteList';

type Props = {};

const home = (props: Props) => {
  return (
    <>
      <MainNavigator />
      <NoteList />
      <Footer />
    </>
  );
};

export default home;
