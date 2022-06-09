import ChartWrapper from '../../ui-kit/ChartWrapper/ChartWrapper';
import Loader from '@/ui-kit/Loader/index';
import styles from './style.module.css';

const ChartLoader = (
    <div className={styles.loaderWrapper}>
        <ChartWrapper
            labelFormat="HH:MM A"
            labels={[]}
            data={[]}
        />
        <div className={styles.loaderBlock}>
            <Loader />
        </div>
    </div>
);

export default ChartLoader;
