import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { Provider } from 'react-redux';

import { setupStore } from '../Redux/store/store';
import Layout from '../src/HOC/Layout';

import ModalContextWrapper from '../components/ModalContextWrapper';

import '../styles/globals.css';
import { ServiceProvider } from '../src/context/ServiceContext';
import { MockService, MainService } from '../src/Service';

const store = setupStore();

const MyApp = ({ Component, pageProps }: AppProps) => {
    const service = useMemo(
        () => (Number(process.env.NEXT_PUBLIC_REACT_APP_IS_MOCK_API) === 1
            ? new MockService()
            : new MainService()),
        [],
    );
    return (
        <Provider store={store}>
            <ServiceProvider value={service}>
                <Layout>
                    <>
                        <Component {...pageProps} />
                        <ModalContextWrapper />
                    </>
                </Layout>
            </ServiceProvider>
        </Provider>
    );
};

export default MyApp;
