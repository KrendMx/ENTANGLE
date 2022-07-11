import classNames from 'classnames';
import type { ChangeEvent } from 'react';
import React, {
    ChangeEventHandler,
    useCallback,
    useReducer,
} from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Input from 'UI/ui-kit/Input';
import Text from 'UI/Pages/HomePage/PayModal/Text';
import GradientButton from 'UI/ui-kit/GradientButton';
import MiniButton from 'UI/ui-kit/MiniButton';
import TokenSelect, { TokenOption } from 'UI/ui-kit/TokenSelect';
import { networks, chainToNameConfig } from 'utils/Global/Vars';
import Typography from 'UI/ui-kit/Typography';
import type { IRepayProps, RepayState } from './Tabs.interfaces';
import styles from '../style.module.css';

const RepayTab: React.FC<IRepayProps> = () => {
    const [state, dispatch] = useReducer(
        (oldState: RepayState, newState: Partial<RepayState>) => ({
            ...oldState,
            ...newState,
        }),
        {
            enterEnUSD: '',
            repayToken: '',
            repayPosition: '',
            unlockAmount: '',
            activeButtonRepay: '',
            AVGCollaterization: '88.55',
            exchangeRate: '1.36',
            currentLTVRate: '90',
        },
    );

    const miniButtons = ['25%', '50%', '75%', '100%'];

    const dolgi = {
        '56': {
            amount: '423.532',
        },
        '1': {
            amount: '43.1',
        },
    };

    const buttonChangeHandler = (value: string) => {
        if (!state.repayPosition) return;
        const percent = (Number(state.repayPosition) * Number(value.split('%')[0])) / 100;
        dispatch({
            enterEnUSD: percent.toString(),
            unlockAmount: (percent / Number(state.exchangeRate)).toFixed(2),
            activeButtonRepay: value,
        });
    };

    const repayPositionChangeHandler = (value: string) => {
        if (value) {
            dispatch({
                unlockAmount: Number(
                    (Number(value) / Number(state.exchangeRate)).toFixed(2),
                ).toString(),
                enterEnUSD: value,
                activeButtonRepay: '',
            });
        } else {
            dispatch({
                unlockAmount: '',
                enterEnUSD: '',
                activeButtonRepay: '',
            });
        }
    };

    const unlockedChangeHandler = (value: string) => {
        if (value) {
            dispatch({
                enterEnUSD: Number(
                    (Number(value) * Number(state.exchangeRate)).toFixed(2),
                ).toString(),
                unlockAmount: value,
                activeButtonRepay: '',
            });
        } else {
            dispatch({
                unlockAmount: '',
                enterEnUSD: '',
                activeButtonRepay: '',
            });
        }
    };

    const getMax = () => {
        if (!state.repayPosition) return;
        dispatch({
            unlockAmount: Number(
                (Number(state.repayPosition) / Number(state.exchangeRate)).toFixed(2),
            ).toString(),
            enterEnUSD: state.repayPosition,
            activeButtonRepay: '',
        });
    };

    const { t } = useTranslation('borrow');

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
                            value={state.repayToken}
                            onChange={(value: string) =>
                                dispatch({
                                    repayToken: value,
                                    repayPosition: dolgi[value].amount,
                                })}
                            title={t('DebtPositions')}
                            currency="EnUSD"
                            showPayModal
                            withBalance
                        >
                            {Object.keys(dolgi).map((el, idx) => (
                                <TokenOption
                                    key={idx}
                                    value={el}
                                    amount={dolgi[el].amount}
                                    currency="EnUSD"
                                >
                                    {networks[el].currencyMin}
                                </TokenOption>
                            ))}
                        </TokenSelect>
                    </div>
                    <div>
                        <Typography
                            type="textBody"
                            classNameModifier={classNames(
                                styles.mgb,
                                styles.mgt,
                            )}
                        >
                            {t('RepayPosition')}
                        </Typography>
                        <Input
                            type="number"
                            placeholder={`${t('AmountIn')} $EnUSD`}
                            value={state.enterEnUSD}
                            onChange={({
                                target,
                            }: ChangeEvent<HTMLInputElement>) =>
                                repayPositionChangeHandler(target.value)}
                            getMax={getMax}
                        />
                    </div>
                    <div className={styles.miniButtonsGroup}>
                        {miniButtons.map((el, idx) => (
                            <MiniButton
                                key={idx}
                                title={el}
                                clickHandler={() => buttonChangeHandler(el)}
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
                            {`${t('Unlocked')} Synth-LP`}
                        </Typography>
                        <Input
                            type="number"
                            placeholder={`${t('AmountIn').split(' ')[0]} (LP)`}
                            value={state.unlockAmount}
                            onChange={({
                                target,
                            }: ChangeEvent<HTMLInputElement>) =>
                                unlockedChangeHandler(target.value)}
                            getMax={getMax}
                        />
                    </div>
                    <Text
                        title={t('TotalBorrowed')}
                        content="$900 EnUSD"
                        classText={styles.mgt}
                    />
                    <Text
                        title={t('Interest')}
                        content="$27 EnUSD"
                        classText={styles.mgt}
                    />
                    <Text
                        title={t('ExchangeRate')}
                        content={`1 SynthLP = ${state.exchangeRate} enUSD`}
                        classText={styles.mgt}
                    />
                </div>
            </div>
            <div className={styles.helper}>
                <GradientButton
                    title={t('RepayLoan')}
                    onClick={() => {}}
                    disabled={
                        Number(state.repayPosition) < Number(state.enterEnUSD)
                    }
                />
            </div>
        </>
    );
};

export default RepayTab;
