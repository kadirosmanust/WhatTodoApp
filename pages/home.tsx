import React from 'react';
import Footer from '../src/components/layout/Footer';
import MainNavigator from '../src/components/layout/MainNavigator';
import NoteList from '../src/components/NoteList/NoteList';

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
