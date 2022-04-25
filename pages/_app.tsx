import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import store from '../src/store/store';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { httpGet } from '../src/utils/helpers/httpHelper';
import { register } from '../src/store/reducers/Auth/authSlice';
import { AxiosResponse } from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    (async () => {
      const response = (await httpGet(
        '/api/Auth/checkuserindex'
      )) as AxiosResponse;

      const { isLogged: isRegistered, username } = response.data;

      store.dispatch(register({ isRegistered, username }));
    })();
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
