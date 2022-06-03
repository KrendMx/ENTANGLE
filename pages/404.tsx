import type { NextPage, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const NotFound: NextPage = () => {
    const { t } = useTranslation('404');
    return (
        <div style={{ marginTop: '200px', marginBottom: '200px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '5rem' }}>{t('404')}</h1>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, [
            'index',
            'profile',
            '404',
        ])),
    },
});

export default NotFound;
