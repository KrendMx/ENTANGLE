import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HomePage from 'UI/Pages/HomePage';

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
            'common',
            'header',
            'error',
            'footer',
            'disclaimer',
            'modal',
        ])),
    },
});

export default Home;
