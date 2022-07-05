import type { AppProps } from 'next/app';
import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { appWithTranslation } from 'next-i18next';

// import { setupStore } from '@/src/Redux/store/store';
// import Layout from '@/src/HOC/Layout';
// import { ServiceProvider } from '@/src/context/ServiceContext';
// import { MockService, MainService } from 'src/Service';
// import ModalContextWrapper from 'Components/ModalContextWrapper';
import { ErrorBoundary } from 'src/utils/App.hocs/ErrorBoundary';

import '../styles/index.css';

// const store = setupStore();

const MyApp = ({ Component, pageProps }: AppProps) =>
    // const service = useMemo(
    //     () =>
    //         (Number(process.env.NEXT_PUBLIC_REACT_APP_IS_MOCK_API) === 1
    //             ? new MockService()
    //             : new MainService()),
    //     [],
    // );
    (
        // <Provider store={store}>
        //     <ServiceProvider value={service}>
    // <Layout>
        <ErrorBoundary>
            <Component {...pageProps} />
            {/* <ModalContextWrapper /> */}
        </ErrorBoundary>
    // {/* </Layout> */}
    //         </ServiceProvider>
    //     </Provider>
    );
export default appWithTranslation(MyApp);
