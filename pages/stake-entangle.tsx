import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import StackeEntangle from '@/components/Stake/Entangle/index';

const Profile: NextPage = () => (
    <div>
        <Head>
            <title>Stake Ent. Token | Entangle</title>
        </Head>
        <main>
            <StackeEntangle />
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

export default Profile;
