import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { SingleSide } from 'src/UI/Pages/SingleSide';

const StakeStablePage: NextPage = () => (
    <div>
        <Head>
            <title>Single Side Assets Staking | Entangle</title>
        </Head>
        <main>
            <SingleSide />
        </main>
    </div>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'stake',
            'header',
            'footer',
            'stable',
            'index',
            'error',
            'ssasdep',
            'modal',
            'ssas',
        ])),
    },
});

export default StakeStablePage;
