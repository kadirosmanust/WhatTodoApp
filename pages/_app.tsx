import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import store from '../src/store/store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { httpGet } from '../src/utils/helpers/httpHelper';
import { login } from '../src/store/reducers/Auth/authSlice';
import { AxiosResponse } from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const response = (await httpGet(
        '/api/Auth/checkuserindex'
      )) as AxiosResponse;

      const { isLogged: isLogin, username } = response.data;

      store.dispatch(login({ isLogin, username }));
      setLoading(true);
    })();
  }, []);

  return (
    <Provider store={store}>{Loading && <Component {...pageProps} />}</Provider>
  );
}

export default MyApp;
