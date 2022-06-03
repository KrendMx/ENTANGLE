import React from 'react';
import classNames from 'classnames';
import styles from '../../../Stake/Entangle/style.module.css';
import StakeTextArea from '@/ui-kit/StakeTextArea/index';
import TextGroupStake from '@/ui-kit/TextGropStake';

import Input from '@/ui-kit/Input';
import GradientButton from '@/components/ui-kit/GradientButton';
import localStyles from '../style.module.css';

type IBurn = {
    amount: string;
    getMax: () => void;
    setAmount: React.Dispatch<React.SetStateAction<string>>;
};

const Burn: React.FC<IBurn> = ({ amount, setAmount, getMax }) => (
    <>
        <div className={localStyles.inputMar}>
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={({ target }) => setAmount(target.value)}
                title="enUSD"
                getMax={getMax}
            />
        </div>
        <div className={localStyles.inputMar}>
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={({ target }) => setAmount(target.value)}
                title="Unlocked Synth-LP"
                getMax={getMax}
            />
        </div>
        <div className={classNames(styles.formItem, localStyles.inputMar)}>
            <StakeTextArea title="LTV Rate">90%</StakeTextArea>
        </div>
        <div className={localStyles.margB}>
            <TextGroupStake title="Exchange rate" value="1 enUSD = 0.76 SynthLP" />
            <TextGroupStake title="Curren AVG collaterization" value="88.55%" />
        </div>
        <GradientButton title="Mint Synth-LP" onClick={() => {}} />
    </>
);

export default Burn;
