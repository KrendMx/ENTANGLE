import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
// import MintPage from '../components/enUSD/Demand/MintPage';

const Mint: NextPage = () => (
    <div style={{ position: 'relative' }}>
        <Head>
            <title>Mint on Demand | Entangle</title>
        </Head>
        <main>
            {/* <MintPage /> */}
        </main>
    </div>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'index',
            'profile',
            'error',
            'header',
            'footer',
            '404',
        ])),
    },
});

export default Mint;
