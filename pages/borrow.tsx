import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import MintEntangleUsd from '@/components/enUSD/Borrow/index';

const MintEntangleUsdPage: NextPage = () => (
    <div>
        <Head>
            <title>Mint Ent. USD | Entangle</title>
        </Head>
        <main>
            <MintEntangleUsd />
        </main>
    </div>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'header',
            'borrow',
            'index',
            'footer',
            'stable',
        ])),
    },
});

export default MintEntangleUsdPage;
