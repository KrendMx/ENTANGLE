import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HomePage from '../components/HomePage';

const Home: NextPage = () => (
    <div>
        <Head>
            <title>Index | Entangle</title>
        </Head>
        <main>
            <HomePage />
        </main>
    </div>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'index',
            'profile',
            '404',
        ])),
    },
});

export default Home;
