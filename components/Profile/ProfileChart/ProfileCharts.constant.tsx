import ChartWrapper from '../../ui-kit/ChartWrapper/ChartWrapper';
import styles from './style.module.css';

const ChartLoader = (
    <div className={styles.loaderWrapper}>
        <ChartWrapper
            labelFormat="HH:MM A"
            labels={[]}
            data={[]}
        />
        <div className={styles.loaderBlock}>
            <i className="fa fa-spinner fa-spin fa-5x" />
        </div>
    </div>
);

export default ChartLoader;
