import React, { useState } from 'react';
import classNames from 'classnames';

import Tabs from 'UI/ui-kit/Tabs';
import Typography from 'UI/ui-kit/Typography';

import InfoBlock from 'src/UI/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from 'src/UI/ui-kit/InfoBlock/InfoBlock.constants';
import styles from './style.module.css';

const StakeEntangle: React.FC = () => {
    const [amount, setAmount] = useState<string>();
    const [activeTab, setActiveTab] = useState(0);
    const [stakeDate, setStakeDate] = useState<string>('no lock');
    const [dropValue, setDropValue] = useState<string>('alpha');

    const handleChangeValidatorDrop = (value: string) => setDropValue(value);

    const getMax = () => setAmount('100');

    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <Typography type="title" classNameModifier={styles.header}>
                    Entangle Staking
                </Typography>
                <p className={styles.descriptItem}>
                    Deposit a single asset to be paired with other users
                    liquidity for access to yield, while minimizing % exposure
                    to impermanent loss
                </p>
            </div>
            <div className={styles.headerInfo}>
                <InfoBlock
                    info="Total ENTGL Staked"
                    value={Number('123')}
                    type={InfoBlockTypes.MONEY}
                />
                {' '}
                <InfoBlock
                    info="Active Validators"
                    value={Number('123')}
                    type={InfoBlockTypes.MONEY}
                />
                {' '}
                <InfoBlock
                    info="AVG Validators Uptime"
                    value={Number('94')}
                    type={InfoBlockTypes.SIMPLE_PERCENTAGE}
                />
            </div>
        </div>
    );
};

export default StakeEntangle;
