import type { ChangeEvent } from 'react';
import React, { useReducer } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './style.module.css';

import type { IWithdrawState, WithdrawProps } from './Tabs.interfaces';
import GradientButton from 'UI/ui-kit/GradientButton';
import Input from 'UI/ui-kit/Input';
import TokenSelect, { TokenOption } from 'UI/ui-kit/TokenSelect';
import { networks } from '@/src/utils/GlobalConst';
import Typography from '@/components/ui-kit/Typography';
import Text from '@/components/HomePage/PayModal/Text';
import MiniButton from '@/components/ui-kit/MiniButton';

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
            activeButtonRepay: '',
        },
    );

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
    const miniButtons = ['25%', '50%', '75%', '100%'];

    return (
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
                            <TokenOption value={el} key={idx}>
                                {networks[el].title}
                            </TokenOption>
                        ))}
                    </TokenSelect>
                </div>
                <div>
                    <div className={classNames(styles.mgt, styles.mgb)}>
                        <Typography type="textBody" classNameModifier={styles.mgb}>
                            Enter Amount of Locked USDC
                            {`${t('enterAmount')} USDC`}
                        </Typography>
                    </div>
                    <Input
                        type="number"
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
                    <div className={classNames(styles.mgb)}>
                        <Typography type="textBody">
                            You will get
                        </Typography>
                    </div>
                    <Input
                        type="cut"
                        placeholder="You will get"
                        onChange={() => {}}
                    />
                    <Text title={t('AvaiableToUnlock')} content="92 USDC" classText={styles.mgt2} />
                    <Text title="The remainder of the lock" content="3 USDC" classText={styles.mgt2} />
                    <div className={styles.mgt}><GradientButton title={t('withdraw')} onClick={() => {}} /></div>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
