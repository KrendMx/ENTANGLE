import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../src/HOC/Layout';

import { createStore } from 'redux';
import ProviderContextWrapper from '../context/ProviderContext';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(rootReducer, composeWithDevTools());

function MyApp({ Component, pageProps }: AppProps) {
    return (
        // <Provider store={store}>
        <ProviderContextWrapper>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ProviderContextWrapper>
        // </Provider>
    );
}

export default MyApp;
