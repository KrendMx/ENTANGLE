import { useTranslation } from 'react-i18next';
import ChartWrapper from 'UI/ui-kit/ChartWrapper/ChartWrapper';
import Loader from 'UI/ui-kit/Loader';
import styles from './style.module.css';

const ChartLoader = () => {
    const { t } = useTranslation('profile');
    return (
        <div className={styles.loaderWrapper}>
            <ChartWrapper
                labelFormat="HH:MM A"
                labels={[]}
                data={[]}
            />
            <h1 className={styles.text}>{t('inDev')}</h1>
        </div>
    );
};

export default ChartLoader;
