import React from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { DepositPage } from 'src/UI/Pages/SingleSide/DepositPage';

const StakeStablePage: NextPage<any> = ({ paths }) => (
    <div>
        <Head>
            <title>Deposit on Stake | Entangle</title>
        </Head>
        <main>
            <DepositPage query={paths[0].params} />
        </main>
    </div>
);

export async function getServerSideProps({ locale, query }) {
    return {
        props: {
            paths: [
                {
                    params: query,
                },
            ],
            ...(await serverSideTranslations(locale!, [
                'stake',
                'header',
                'footer',
                'stable',
                'index',
                'ssasdep',
                'ssas',
            ])),
            fallback: false,
        },
    };
}

export default StakeStablePage;
