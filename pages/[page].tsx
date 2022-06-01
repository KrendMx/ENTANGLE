import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';

const NotFound: NextPage = () => {
    const { t } = useTranslation('404');
    console.log(t('soon'));

    return (
        <div style={{ marginTop: '200px', marginBottom: '200px' }}>
            <h1 style={{ textAlign: 'center', fontSize: '5rem' }}>{t('soon')}</h1>
        </div>
    );
};

export default NotFound;
