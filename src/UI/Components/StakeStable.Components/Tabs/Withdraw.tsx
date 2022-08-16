import type { ChangeEvent } from 'react';
import React, { useReducer } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import GradientButton from 'UI/ui-kit/GradientButton';
import Input from 'UI/ui-kit/Input';
import TokenSelect, { TokenOption } from 'UI/ui-kit/TokenSelect';
import { networks } from 'utils/Global/Vars';
import Typography from 'UI/ui-kit/Typography';
import MiniButton from 'UI/ui-kit/MiniButton';
import { Arrow } from 'src/UI/ui-kit/Arrow';
import TextGroup from 'src/UI/ui-kit/TextGrop';
import type { IWithdrawState, WithdrawProps } from './Tabs.interfaces';
import styles from './style.module.css';

const Withdraw: React.FC<WithdrawProps> = React.memo(({ token }) => {
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

    const inputChangeHandler = ({
        target,
    }: ChangeEvent<HTMLInputElement>): void => {
        if (target.value === '' && state.usdcAmount.length === 1) {
            dispatch({ usdcAmount: '' });
            return;
        }
        if (/^[1-9]\d*(\.\d+)?$/.test(target.value)) {
            dispatch({ usdcAmount: target.value });
        }
    };
    const miniButtons = ['25%', '50%', '100%'];

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
                        <Typography
                            type="textBody"
                            classNameModifier={styles.mgb}
                        >
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
                <Arrow />
                <div>
                    <div className={classNames(styles.mgb)}>
                        <Typography type="textBody">
                            {t('youWillGet')}
                        </Typography>
                    </div>
                    <Input
                        type="cut"
                        placeholder={t('youWillGet')}
                        onChange={() => {}}
                    />

                    <TextGroup
                        title={t('AvaiableToUnlock')}
                        value="92 USDC"
                        customClassNameWrapper={styles.mgt2}
                        customClassNameTitle={styles.textTitle}
                        customClassNameValue={styles.textValue}
                    />
                    <TextGroup
                        title={t('remainder')}
                        value="3 USDC"
                        customClassNameWrapper={styles.mgt2}
                        customClassNameTitle={styles.textTitle}
                        customClassNameValue={styles.textValue}
                    />
                </div>

                <div className={styles.mgt}>
                    <GradientButton
                        title={t('withdraw')}
                        onClick={() => {}}
                        isWhite
                    />
                </div>
            </div>
        </div>
    );
});

export default Withdraw;
