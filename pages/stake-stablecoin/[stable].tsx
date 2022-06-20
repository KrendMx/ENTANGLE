import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import AssetPage from '@/components/Stake/Stable/AssetPage';

const StakeStablePage: NextPage = () => {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>Stake Stable Token | Entangle</title>
            </Head>
            <AssetPage stable={router.query.stable.toString()} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['index', 'profile', '404'])),
    },
});

export async function getStaticPaths() {
    return {
        paths: ['/stake-stablecoin/USDC'],
        fallback: true,
    };
}

export default StakeStablePage;
