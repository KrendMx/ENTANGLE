import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import StakeEntangle from 'UI/Pages/Stake/Entangle/index';

const StakeEntanglePage: NextPage = () => (
    <div>
        <Head>
            <title>Stake Ent. Token | Entangle</title>
        </Head>
        <main>
            <StakeEntangle />
        </main>
    </div>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'index',
            'profile',
            '404',
            'header',
            'modal',
            'error',
            'footer',
        ])),
    },
});

export default StakeEntanglePage;
