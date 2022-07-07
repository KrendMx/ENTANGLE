import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Notification } from 'src/libs/Notification';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import HomePage from '../components/HomePage';

const Home: NextPage = () => (
    <div>
        <Head>
            <title>Index | Entangle</title>
        </Head>
        <main>
            {/* <HomePage /> */}
            <div>
                <button
                    style={{ color: '#fff' }}
                    onClick={() => {
                        Notification.error('asdf', 'asdf');
                    }}
                >
                    sadfasdf
                </button>
            </div>
        </main>
    </div>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'index',
            'common',
            'header',
            'footer',
        ])),
    },
});

export default Home;
