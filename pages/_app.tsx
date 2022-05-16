import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { setupStore } from '../Redux/store/store';
import ProviderContextWrapper from '../src/context/ProviderContext';
import Layout from '../src/HOC/Layout';

import ModalContextWrapper from '../components/ModalContextWrapper';

import '../styles/globals.css';

const store = setupStore();

const MyApp = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <ProviderContextWrapper>
            <Layout>
                <>
                    <Component {...pageProps} />
                    <ModalContextWrapper />
                </>
            </Layout>
        </ProviderContextWrapper>
    </Provider>
);

export default MyApp;
