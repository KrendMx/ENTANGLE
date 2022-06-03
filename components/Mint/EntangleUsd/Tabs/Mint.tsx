import React from 'react';
import styles from '../../../Stake/Entangle/style.module.css';
import StakeTextArea from '@/ui-kit/StakeTextArea/index';
import TextGroupStake from '@/ui-kit/TextGropStake';

import { networks } from '@/src/utils/GlobalConst';

import Input from '@/ui-kit/Input';
import GradientButton from '@/components/ui-kit/GradientButton';
import Select, { Option } from '@/ui-kit/Select/index';

type IMint = {
    dropValue: string;
    handleChangeSynthDrop: (value: string) => void;
    amount: string;
    getMax: () => void;
    setAmount: React.Dispatch<React.SetStateAction<string>>;
};

const Mint: React.FC<IMint> = ({
    dropValue,
    amount,
    setAmount,
    getMax,
    handleChangeSynthDrop,
}) => (
    <>
        <div className={styles.formItem}>
            <Select value={dropValue} onChange={handleChangeSynthDrop}>
                <Option value="">Select Synth-LP</Option>
                {Object.keys(networks).map((el, idx) => (
                    <Option key={idx} value={networks[el].abbr}>
                        {networks[el].title}
                    </Option>
                ))}
            </Select>
        </div>
        <div>
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={({ target }) => setAmount(target.value)}
                title="Lock Synth-LP Amount"
                getMax={getMax}
            />
        </div>
        <div>
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={({ target }) => setAmount(target.value)}
                title="enUSD"
                getMax={getMax}
            />
        </div>
        <div className={styles.formItem}>
            <StakeTextArea title="LTV Rate">90%</StakeTextArea>
        </div>
        <TextGroupStake title="Exchange rate" value="1 SynthLP = 1.36 enUSD" />
        <TextGroupStake title="Curren AVG collaterization" value="88.55%" />
        <GradientButton title="Mint Synth-LP" onClick={() => {}} />
    </>
);

export default Mint;
