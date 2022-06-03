import React, { useState } from 'react';
import classNames from 'classnames';
import { STAKE_DATE } from './Stable.const';
import { networks } from '@/src/utils/GlobalConst';

import Input from '@/ui-kit/Input';
import GradientButton from '@/components/ui-kit/GradientButton';
import MiniButton from '@/ui-kit/MiniButton/index';
import Select, { Option } from '@/ui-kit/Select/index';
import GlowLine from '@/ui-kit/GlowLine';
import Typography from '@/ui-kit/Typography';
import TextGroupStake from '@/ui-kit/TextGropStake/index';
import ChartWrapperWithText from '@/ui-kit/ChartWrapperWithText/index';

import styles from '../Entangle/style.module.css';
import localStyles from './style.module.css';

const StakeStable: React.FC = () => {
    const [amount, setAmount] = useState<string>();
    const [stakeDate, setStakeDate] = useState<string>('1 Month');
    const [dropSynthValue, setDropSynthValue] = useState<string>('');
    const [dropStableValue, setDropStableValue] = useState<string>('');

    const handleChangeSynthDrop = (value: string) => setDropSynthValue(value);
    const handleChangeStableDrop = (value: string) => setDropStableValue(value);

    const getMax = () => setAmount('100');

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.description}>
                    <Typography type="title">
                        Stake Stablecoins for Synth-LP Liquidity
                    </Typography>
                    <GlowLine />
                    <p className={styles.descriptItem}>
                        Users are able to deposit their stablecoins (single
                        sided liquidity) for the minting of Synthetic-LPs which
                        are made available to trade. Earn rewards in Entangle
                        tokens and receive a share of the protocol revenue,
                    </p>
                    <div className={styles.graphData}>
                        <ChartWrapperWithText
                            title="Total TVL"
                            value="568'530'000"
                        />
                        <ChartWrapperWithText
                            title="Total Synth-LP Circulation Supply"
                            value="475'123'477"
                            extraText="SynthLps"
                        />
                    </div>
                    <div className={localStyles.mBtm}>
                        <Typography type="title">Backers Breakdown</Typography>
                        <GlowLine />
                    </div>
                    <div className={styles.graphData}>
                        <ChartWrapperWithText
                            title="Locked for 1 month"
                            value="$110'000'000"
                        />
                        <ChartWrapperWithText
                            title="Locked for 3 months"
                            value="$74'565'555"
                        />
                    </div>
                    <div className={styles.graphData}>
                        <ChartWrapperWithText
                            title="Locked for 6 months"
                            value="$80'450'000"
                        />
                        <ChartWrapperWithText
                            title="Locked for 12 months"
                            value="$63'170'000"
                        />
                    </div>
                </div>
                <div className={styles.stakeForm}>
                    <div className={localStyles.formItem}>
                        <Select
                            value={dropStableValue}
                            onChange={handleChangeStableDrop}
                        >
                            <Option value="">Select Stablecoin</Option>
                            <Option value="usdc">USDC</Option>
                        </Select>
                    </div>
                    <div className={styles.formItem}>
                        <Select
                            value={dropSynthValue}
                            onChange={handleChangeSynthDrop}
                        >
                            <Option value="">Select Synth-LP</Option>
                            {Object.keys(networks).map((el, idx) => (
                                <Option key={idx} value={networks[el].abbr}>
                                    {networks[el].title}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className={localStyles.inputBlock}>
                        <Input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={({ target }) => setAmount(target.value)}
                            title="Amount USDC"
                            getMax={getMax}
                        />
                    </div>
                    <div
                        className={classNames(
                            styles.formItem,
                            styles.miniButtonsContainer,
                        )}
                    >
                        {STAKE_DATE.map((el, idx) => (
                            <MiniButton
                                title={el}
                                active={stakeDate === el}
                                clickHandler={() => setStakeDate(el)}
                                key={idx}
                            />
                        ))}
                    </div>
                    <TextGroupStake
                        title="Current Average Utilization Rate"
                        value="88%"
                    />
                    <TextGroupStake
                        title="Past 24h Volume"
                        value="$10’000’000"
                    />
                    <TextGroupStake title="Fees 24h" value="$40’000" />
                    <TextGroupStake title="APR" value="25%" hintText="test" />
                    <GradientButton title="Stake" onClick={() => {}} />
                </div>
            </div>
        </div>
    );
};

export default StakeStable;
