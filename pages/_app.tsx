import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import { httpGet } from '../src/utils/helpers/httpHelper';
import store from '../src/store/store';
import { login } from '../src/store/reducers/Auth/authSlice';
import { setdark } from '../src/store/reducers/Theme/themeSlice';

import '../src/styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const response = (await httpGet(
        '/api/auth/checkuserindex'
      )) as AxiosResponse;

      const { isLogged: isLogin, username } = response.data;
      if (isLogin) {
        const isDark = document.cookie.split(';')[1]?.split('=')[1];
        if (isDark === 'true') {
          store.dispatch(setdark());
        }
      } else {
        const isDark = document.cookie.split('=')[1];
        if (isDark === 'true') {
          store.dispatch(setdark());
        }
      }

      store.dispatch(login({ isLogin, username }));
      setLoading(true);
    })();
  }, []);

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Provider store={store}>
        {Loading && <Component {...pageProps} />}
      </Provider>
    </>
  );
}

export default MyApp;
