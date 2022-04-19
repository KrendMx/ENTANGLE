import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ProviderContextWrapper from '../context/ProviderContext';
import Layout from '../src/HOC/Layout';

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
