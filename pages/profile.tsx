import React from 'react';
import type { NextPage } from 'next';
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

export default Profile;
