import React, { useReducer } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './style.module.css';
import TokenSelect, { TokenOption } from '@/ui-kit/TokenSelect';
import GradientButton from '@/ui-kit/GradientButton';
import Input from '@/components/ui-kit/Input';
import { networks } from '@/src/utils/GlobalConst';
import StakeTextArea from '@/components/ui-kit/StakeTextArea';
import Text from '@/components/HomePage/PayModal/Text';

import type { LockProps, ILockState } from './Tabs.interfaces';
import Tabs from '@/components/ui-kit/Tabs';
import Typography from '@/components/ui-kit/Typography';

const Lock: React.FC<LockProps> = ({ token }) => {
    const [state, dispatch] = useReducer(
        (oldState: ILockState, newState: Partial<ILockState>) => ({
            ...oldState,
            ...newState,
        }),
        {
            network: '',
            usdcAmount: '',
            lockPeriod: 0,
            apr: '25',
            apr24: '92',
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
                            defaultLabel="Select LP"
                            value={state.network}
                            onChange={(value: string) =>
                                dispatch({ network: value })
                            }
                            title={'Select Network'}
                            withBalance={false}
                        >
                            {Object.keys(networks).map((el, idx) => (
                                <TokenOption
                                    value={el}
                                    key={idx}
                                >
                                    {networks[el].currencyMin}
                                </TokenOption>
                            ))}
                        </TokenSelect>
                    </div>
                    <div>
                        <Typography type='textBody' classNameModifier={styles.mgb}>Choose lock period</Typography>
                        <Input
                            type="number"
                            placeholder={`Enter amount of ${token}`}
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
                        <Typography type='textBody' classNameModifier={styles.mgb}>Choose lock period</Typography>
                        <Tabs
                            buttons={['3 Months', '6 Months', '12 Months']}
                            switchHandler={(tab: number) =>
                                dispatch({ lockPeriod: tab })
                            }
                            activeTab={state.lockPeriod}
                            customClassTabName={styles.customTabsMonths}
                            customClassButtonName={styles.customButton}
                        />
                        <Text title='You will get $ENTGL' content='3 $ENTGL' classText={styles.mgt} />
                        <Text title='24h Trading Fee APR' content='92 $ENTGL' classText={styles.mgt} />
                        <Text title='92 $ENTGL' content='25%' classText={styles.mgt} />
                    </div>
                </div>
            </div>
            <div className={styles.helper}>
                <GradientButton title={`Stake ${token}`} onClick={() => {}} />
            </div>
        </>
    );
};

export default Lock;
