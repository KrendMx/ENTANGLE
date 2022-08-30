import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import CryptoHeader from 'UI/Components/CryptoHeader';

import ChartWrapper from 'UI/ui-kit/ChartWrapperNew/ChartWrapper';
import Typography from 'UI/ui-kit/Typography';
import Tabs from 'UI/ui-kit/Tabs';
import type { AssetPageProps } from './AssetPage.interfaces';
import styles from './style.module.css';

import Lock from '../Tabs/Lock';
import Withdraw from '../Tabs/Withdraw';

const AssetPage: React.FC<AssetPageProps> = ({ stable }) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const { t } = useTranslation('stable');

    const generateGraph = (): number[] => {
        // eslint-disable-next-line prefer-spread
        const arr = Array.apply(null, { length: 25 });
        return arr.map((el : number, i: number) => Math.random() * (30 - 10) + i);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <CryptoHeader
                    token={stable}
                    isStable
                    balance={1024}
                    locked={100}
                    apr={948}
                    earned={130}
                    backHref="/stake-stablecoin/"
                />
                <div className={styles.chartBlock}>
                    <div className={classNames(styles.chart, styles.mgr)}>
                        <ChartWrapper
                            label={`${t('tvl')} USDC`}
                            data={generateGraph()}
                            labels={Array.from(Array(25).keys())}
                            total="1568'530'000"
                            percentChange={54.345}
                            miniGraph
                        />
                    </div>
                    <div className={styles.chart}>
                        <ChartWrapper
                            label={t('slpSupply')}
                            data={generateGraph()}
                            labels={Array.from(Array(25).keys())}
                            total="1568'530'000"
                            percentChange={-54.345}
                            miniGraph
                        />
                    </div>
                </div>
                <div className={styles.lockWrapper}>
                    <div className={styles.header}>
                        <Typography type="title" classNameModifier={styles.headerText}>
                            {t('Provider LIquidity')}
                        </Typography>
                        <div className={styles.tabsContainer}>
                            <Tabs
                                buttons={[t('lock'), t('withdraw')]}
                                activeTab={activeTab}
                                switchHandler={setActiveTab}
                                isBlack
                            />
                        </div>
                    </div>
                    {!activeTab ? <Lock token={stable} /> : <Withdraw token={stable} />}
                </div>
            </div>
        </div>
    );
};

export default AssetPage;
