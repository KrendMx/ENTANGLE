import type { ChangeEvent } from 'react';
import React, { useReducer } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './style.module.css';
import TokenSelect, { TokenOption } from 'UI/ui-kit/TokenSelect';
import GradientButton from 'UI/ui-kit/GradientButton';
import Input from '@/components/ui-kit/Input';
import { networks, chainToNameConfig } from '@/src/utils/GlobalConst';
import Text from '@/components/HomePage/PayModal/Text';

import type { LockProps, ILockState } from './Tabs.interfaces';
import Tabs from '@/components/ui-kit/Tabs';
import Typography from '@/components/ui-kit/Typography';
import MiniButton from '@/components/ui-kit/MiniButton';

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
            activeButtonRepay: '',
        },
    );

    const miniButtons = ['25%', '50%', '75%', '100%'] as const;

    const { t } = useTranslation('stable');

    const inputChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>): void => {
        if (target.value === '' && state.usdcAmount.length === 1) {
            dispatch({ usdcAmount: '' });
            return;
        }
        if (/^[1-9]\d*(\.\d+)?$/.test(target.value)) {
            dispatch({ usdcAmount: target.value });
        }
    };

    return (
        <>
            <div
                className={styles.wrapper}
                style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
            >
                <div className={classNames(styles.actionCard)}>
                    <div>
                        <TokenSelect
                            defaultLabel={`${t('select')} ${t('network')}`}
                            value={state.network}
                            onChange={(value: string) =>
                                dispatch({ network: value })}
                            title={`${t('select')} ${t('network')}`}
                            withBalance={false}
                            showPayModal={false}
                            selectedTitle="title"
                        >
                            {Object.keys(networks).map((el, idx) => (
                                <TokenOption
                                    value={el}
                                    key={idx}
                                >
                                    {networks[el].title}
                                </TokenOption>
                            ))}
                        </TokenSelect>
                    </div>
                    <div>
                        <div className={classNames(styles.mgb, styles.mgt)}>
                            <Typography type="textBody">
                                {`${t('enterAmount')} USDC`}
                            </Typography>
                        </div>
                        <Input
                            type="number"
                            min="0"
                            value={state.usdcAmount}
                            placeholder={`${t('enterAmount')} ${token}`}
                            onChange={inputChangeHandler}
                        />
                        <div className={styles.miniButtonsGroup}>
                            {miniButtons.map((el, idx) => (
                                <MiniButton
                                    key={idx}
                                    title={el}
                                    clickHandler={() => {}}
                                    active={el === state.activeButtonRepay}
                                />
                            ))}
                        </div>
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
                        <Typography type="textBody" classNameModifier={styles.mgb}>{t('ChooseLock')}</Typography>
                        <Tabs
                            buttons={[`3 ${t('MonthOne')}`, `6 ${t('MonthTwo')}`, `12 ${t('MonthTwo')}`]}
                            switchHandler={(tab: number) =>
                                dispatch({ lockPeriod: tab })}
                            activeTab={state.lockPeriod}
                            customClassTabName={styles.customTabsMonths}
                            customClassButtonName={styles.customButton}
                        />
                        <Text title={`${t('YouGet')} $ENTGL`} content="3 $ENTGL" classText={styles.mgt} />
                        <Text title={t('TradingFee')} content="92 $ENTGL" classText={styles.mgt} />
                        <Text
                            title="Projected APR"
                            content="25%"
                            classText={styles.mgt}
                            hasTooltip
                            tooltipText="Test"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.helper}>
                <GradientButton title={`${t('StakeUSDC')} ${token}`} onClick={() => {}} />
            </div>
        </>
    );
};

export default Lock;
