import React, { useReducer } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './style.module.css';
import SyntSelect from '@/ui-kit/SynteticSelector';
import GradientButton from '@/ui-kit/GradientButton';
import Input from '@/components/ui-kit/Input';

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
                        <p
                            className={classNames(
                                styles.sectionTitle,
                                styles.white,
                            )}
                        >
                            Select Network
                        </p>
                        <SyntSelect
                            currenc={state.network}
                            handleChange={() => {}}
                            currencSymbol="EnUSD"
                        />
                    </div>
                    <div>
                        <Input
                            type="number"
                            placeholder={`Enter amount of ${token}`}
                            onChange={() => {}}
                            title={`Enter Amount ${token}`}
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
                        <Typography type='textBody'>Choose lock period</Typography>
                        <Tabs
                            buttons={['3 Months', '6 Months', '12 Months']}
                            switchHandler={(tab: number) =>
                                dispatch({ lockPeriod: tab })
                            }
                            activeTab={state.lockPeriod}
                            customClassTabName={styles.customTabsMonths}
                            customClassButtonName={styles.customButton}
                        />
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
