import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import AssetPage from 'UI/Components/StakeStable.Components/AssetPage';

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
        ...(await serverSideTranslations(locale!, ['stake',
            'header',
            'footer',
            'error',
            'stable',
            'modal',
            'index'])),
    },
});

export async function getStaticPaths({ locales }) {
    const paths = locales.map((locale) => ({
        params: { stable: 'USDC' },
        locale,
    }));
    return {
        paths,
        fallback: false,
    };
}

export default StakeStablePage;
