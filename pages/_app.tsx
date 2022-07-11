import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';
import { NotificationComponent } from 'src/libs/Notification';

import { store } from 'core/store';
import { Layout } from 'src/utils/App.hocs/Layout';
// import { ServiceProvider } from '@/src/context/ServiceContext';
import ModalContextWrapper from 'utils/App.hocs/ModalContextWrapper';
import { ErrorBoundary } from 'src/utils/App.hocs/ErrorBoundary';
import '../styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <Provider store={store}>
        <Layout>
            <>
                <Component {...pageProps} />
                <NotificationComponent />
            </>
        </Layout>
        <ModalContextWrapper />
    </Provider>
);
// { /* <ServiceProvider value={service}> */ }
// {/* </ErrorBoundary> */}
export default appWithTranslation(MyApp);
