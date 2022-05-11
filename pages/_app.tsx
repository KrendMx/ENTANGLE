import type { AppProps } from 'next/app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { setupStore } from '../Redux/store/store';
import ProviderContextWrapper from '../src/context/ProviderContext';
import Layout from '../src/HOC/Layout';

import '../styles/globals.css';

const store = setupStore();

const MyApp = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <ProviderContextWrapper>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ProviderContextWrapper>
    </Provider>
);

export default MyApp;
