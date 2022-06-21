import React, { useReducer } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './style.module.css';

import type { IWithdrawState, WithdrawProps } from './Tabs.interfaces';
import GradientButton from '@/ui-kit/GradientButton';
import Input from '@/ui-kit/Input';
import TokenSelect, { TokenOption } from '@/ui-kit/TokenSelect';
import { networks } from '@/src/utils/GlobalConst';
import Typography from '@/components/ui-kit/Typography';
import Text from '@/components/HomePage/PayModal/Text';

const Withdraw: React.FC<WithdrawProps> = ({ token }) => {
    const [state, dispatch] = useReducer(
        (oldState: IWithdrawState, newState: Partial<IWithdrawState>) => ({
            ...oldState,
            ...newState,
        }),
        {
            network: '',
            usdcAmount: '',
            getUsdc: '',
        },
    );
    return (
        <>
            <div
                className={styles.wrapper}
                style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
            >
                <div className={classNames(styles.actionCard)}>
                    <div>
                        <TokenSelect
                            defaultLabel="Select Network"
                            value={state.network}
                            onChange={(value: string) =>
                                dispatch({ network: value })
                            }
                            title={'Select Network'}
                        >
                            {Object.keys(networks).map((el, idx) => (
                                <TokenOption value={el} key={idx}>
                                    {networks[el].currencyMin}
                                </TokenOption>
                            ))}
                        </TokenSelect>
                    </div>
                    <div>
                        <Typography type="textBody" classNameModifier={styles.mgb}>
                            Enter Amount of locked USDC
                        </Typography>
                        <Input
                            type="number"
                            placeholder="Enter amount locked USDC"
                            onChange={() => {}}
                        />
                    </div>
                </div>
                <div className={classNames(styles.actionCard)}>
                    <div className={styles.arrow}>
                        <Image
                            src="/images/Arrow.svg"
                            width={100}
                            height={100}
                            quality={100}
                            alt="arrow-icon"
                        />
                    </div>
                    <div>
                        <Typography type="textBody" classNameModifier={styles.mgb}>
                            Unlocked Synth-LP
                        </Typography>
                        <Input
                            type="number"
                            placeholder="Unlocked Synth-LP"
                            onChange={() => {}}
                        />
                        <Text title='Avaiable to unlock' content='92 USDC' classText={styles.mgt2} />
                        <Text title='Current price' content='3 USDC' classText={styles.mgt2} />
                        <Text title='Projected APR' content='25%' classText={styles.mgt2} />
                    </div>
                </div>
            </div>
            <div className={styles.helper}>
                <GradientButton title="Withdraw" onClick={() => {}} />
            </div>
        </>
    );
};

export default Withdraw;
