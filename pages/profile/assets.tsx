import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import AssetsComponent from 'src/UI/Pages/Profile/Assets';

const Assets: NextPage = () => (
    <div>
        <Head>
            <title>Assets | Entangle</title>
        </Head>
        <main>
            <AssetsComponent />
        </main>
    </div>
);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'profile',
            'header',
            'footer',
            'error',
            'index',
            'modal',
            'borrow',
        ])),
    },
});

export default Assets;
