import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import ProfileComponent from '../components/Profile';

const Profile: NextPage = () => (
    <div>
        <Head>
            <title>Profile | Entangle</title>
        </Head>
        <main>
            <ProfileComponent />
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
