import React, { useState } from 'react';

import Mint from './Tabs/Mint';
import Burn from './Tabs/Burn';
import Tabs from '@/ui-kit/Tabs';

import GlowLine from '@/ui-kit/GlowLine';
import Typography from '@/ui-kit/Typography';
import ChartWrapperWithText from '@/ui-kit/ChartWrapperWithText/index';

import styles from '../../Stake/Entangle/style.module.css';
import localStyles from './style.module.css';

const StakeEntangle: React.FC = () => {
    const [amount, setAmount] = useState<string>();
    const [activeTab, setActiveTab] = useState(0);
    const [dropValue, setDropValue] = useState<string>('');

    const handleChangeSynthDrop = (value: string) => setDropValue(value);

    const getMax = () => setAmount('100');

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.description}>
                    <Typography type="title">
                        Mint Entangle USD (enUSD) v Synth-LP Holdings
                    </Typography>
                    <GlowLine />
                    <p className={styles.descriptItem}>
                        enuSD is Entangle’s native stablecoin. Mint at dynamic
                        LTV rates against your Synth-LP holdings.
                    </p>
                    <p className={styles.descriptItem}>
                        Post mint users can burn their enUSD to release their
                        Synth-LP which is held as collateral against their
                        minted EnUSD.
                    </p>
                    <div className={localStyles.graphData}>
                        <ChartWrapperWithText
                            title="Total SynthLp Locked"
                            value="568'530'000"
                            extraText="Synth LP"
                        />
                        <ChartWrapperWithText
                            title="Total enUSD Cirulation Supply"
                            value="475'123'477"
                            extraText="enUSD"
                        />
                    </div>
                </div>
                <div className={localStyles.stakeForm}>
                    <Tabs
                        switchHandler={(idx: number) => setActiveTab(idx)}
                        activeTab={activeTab}
                        buttons={['Mint', 'Burn']}
                    />
                    {!activeTab ? (
                        <Mint
                            amount={amount}
                            handleChangeSynthDrop={handleChangeSynthDrop}
                            dropValue={dropValue}
                            setAmount={setAmount}
                            getMax={getMax}
                        />
                    ) : (
                        <Burn
                            amount={amount}
                            setAmount={setAmount}
                            getMax={getMax}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StakeEntangle;
