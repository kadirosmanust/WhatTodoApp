import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import { httpGet } from '@/utils/helpers/httpHelper';
import store from '@/store/store';
import { login } from '@/store/reducers/Auth/authSlice';
import { setdark } from '@/store/reducers/Theme/themeSlice';

import '../src/styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const response = (await httpGet(
        '/api/auth/checkuserindex'
      )) as AxiosResponse;

      const { isLogged: isLogin, username, token } = response.data;
      let isDark;
      const isDarkCookie = document.cookie.split(';');
      if (!token) {
        document.cookie = 'token= ; path=/; Max-Age=-99999999;';
      }
      isDarkCookie.forEach((x) => {
        if (x.includes('isDark')) {
          isDark = x.split('=')[1];
        }
      });

      if (isDark === 'true') {
        store.dispatch(setdark());
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
