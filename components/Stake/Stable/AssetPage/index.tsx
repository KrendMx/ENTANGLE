import React, { useState } from 'react';
import CryptoHeader from '@/components/ui-kit/CryptoHeader';
import classNames from 'classnames';
import styles from './style.module.css';

import type { AssetPageProps } from './AssetPage.interfaces';
import ChartWrapper from '@/components/ui-kit/ChartWrapperNew/ChartWrapper';
import Typography from '@/components/ui-kit/Typography';
import Tabs from '@/components/ui-kit/Tabs';

import Lock from '../Tabs/Lock';
import Withdraw from '../Tabs/Withdraw';

const AssetPage: React.FC<AssetPageProps> = ({ stable }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
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
                            label="TVL"
                            data={Array.apply(null, { length: 10 }).map(
                                Function.call,
                                Math.random,
                            )}
                            labels={Array.from(Array(10).keys())}
                            total="1568'530'000"
                            percentChange={54.345}
                            miniGraph
                        />
                    </div>
                    <div className={styles.chart}>
                        <ChartWrapper
                            label="Total Synth-LP Circulation Supply"
                            data={Array.apply(null, { length: 10 }).map(
                                Function.call,
                                Math.random,
                            )}
                            labels={Array.from(Array(10).keys())}
                            total="1568'530'000"
                            percentChange={-54.345}
                            miniGraph
                        />
                    </div>
                </div>
                <div className={styles.lockWrapper}>
                    <div className={styles.header}>
                        <Typography type="title" classNameModifier={styles.headerText}>Lock USDC</Typography>
                        <Tabs
                            buttons={['Lock', 'Withdraw']}
                            activeTab={activeTab}
                            switchHandler={setActiveTab}
                            customClassTabName={styles.customTabs}
                            customClassButtonName={styles.customButton}
                        />
                    </div>
                    {!activeTab ? <Lock token={stable} /> : <Withdraw token={stable} />}
                </div>
            </div>
        </div>
    );
};

export default AssetPage;
