import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import MintPage from '../components/Mint/Demand/MintPage';

const Mint: NextPage = () => (
    <div style={{ position: 'relative' }}>
        <Head>
            <title>Mint on Demand | Entangle</title>
        </Head>
        <main>
            <MintPage />
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

export default Mint;
