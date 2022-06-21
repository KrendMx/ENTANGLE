import classNames from 'classnames';
import React, { useCallback, useReducer } from 'react';
import Image from 'next/image';
import Input from '@/components/ui-kit/Input';
import styles from '../style.module.css';
import Text from '@/components/HomePage/PayModal/Text';
import GradientButton from '@/components/ui-kit/GradientButton';
import MiniButton from '@/components/ui-kit/MiniButton';
import TokenSelect, { TokenOption } from '@/components/ui-kit/TokenSelect';
import type { IRepayProps, RepayState } from './Tabs.interfaces';
import { networks, chainToNameConfig } from '@/src/utils/GlobalConst';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';
import Typography from '@/ui-kit/Typography';

const RepayTab: React.FC<IRepayProps> = () => {
    const [state, dispatch] = useReducer(
        (oldState: RepayState, newState: Partial<RepayState>) => ({
            ...oldState,
            ...newState,
        }),
        {
            enterEnUSD: '',
            synthLp: '',
            balanceOfEnUSD: '',
            LTVRateUser: '',
            activeButtonRepay: '',
            activeButtonUnlock: '',
            AVGCollaterization: '88,55',
            exchangeRate: '1,36',
            currentLTVRate: '90',
        },
    );

    const { balances } = useAppSelector((state) => state.userReducer);

    const miniButtons = ['25%', '50%', '75%', '100%'];

    return (
        <>
            <div
                className={styles.wrapperRepay}
                style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
            >
                <div className={classNames(styles.actionCard)}>
                    <div>
                        <TokenSelect
                            defaultLabel="Select Position"
                            value={state.synthLp}
                            onChange={(value: string) =>
                                dispatch({ synthLp: value })
                            }
                            title="Debt Positions"
                            withBalance
                        >
                            {Object.keys(networks).map((el, idx) => (
                                <TokenOption
                                    value={el}
                                    key={idx}
                                    amount={
                                        balances[chainToNameConfig[el]]
                                            ?.positions
                                            ? `${
                                                  balances[
                                                      chainToNameConfig[el]
                                                  ].positions
                                              } EnUSD`
                                            : 'Buy now'
                                    }
                                >
                                    {networks[el].currencyMin}
                                </TokenOption>
                            ))}
                        </TokenSelect>
                    </div>
                    <div>
                        <Typography
                            type="textBody"
                            classNameModifier={classNames(styles.mgb, styles.mgt)}
                        >
                            Repay Position
                        </Typography>
                        <Input
                            type="number"
                            placeholder="Amount in $EnUSD"
                            onChange={() => {}}
                        />
                    </div>
                    <div className={styles.miniButtonsGroup}>
                        {miniButtons.map((el, idx) => (
                            <MiniButton
                                key={idx}
                                title={el}
                                clickHandler={() =>
                                    dispatch({ activeButtonRepay: el })
                                }
                                active={el === state.activeButtonRepay}
                            />
                        ))}
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
                        <Typography
                            type="textBody"
                            classNameModifier={styles.mgb}
                        >
                            Unlocked Synth-LP
                        </Typography>
                        <Input
                            type="number"
                            placeholder="Amount (LP)"
                            onChange={() => {}}
                        />
                    </div>
                    <Text
                        title="Total Borrowed"
                        content={`$900 EnUSD`}
                        classText={styles.mgt}
                    />
                    <Text
                        title="Interest"
                        content={`$27 EnUSD`}
                        classText={styles.mgt}
                    />
                     <Text
                        title="Exchange rate"
                        content={`1 SynthLP = ${state.exchangeRate} enUSD`}
                        classText={styles.mgt}
                    />
                </div>
            </div>
            <div className={styles.helper}>
                <GradientButton title="Repay loan" onClick={() => {}} />
            </div>
        </>
    );
};

export default RepayTab;
