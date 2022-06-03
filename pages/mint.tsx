import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import MintPage from '../components/MintPage';

const Mint: NextPage = () => (
    <div style={{ position: 'relative' }}>
        <Head>
            <title>Mint & Burn | Entangle</title>
        </Head>
        <main>
            <MintPage />
        </main>
    </div>
);
export default Mint;
