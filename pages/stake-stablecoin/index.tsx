import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import StakeStable from 'UI/Pages/Stake/Stable/index';

const StakeStablePage: NextPage = () => (
    <div>
        <Head>
            <title>Stake Stable Token | Entangle</title>
        </Head>
        <main>
            <StakeStable />
        </main>
    </div>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'stake',
            'header',
            'footer',
            'error',
            'stable',
            'index',
        ])),
    },
});

export default StakeStablePage;
