import classNames from 'classnames';
import { useStore } from 'core/store';
import type { ChangeEvent } from 'react';
import React, {
    useEffect, useCallback, useReducer, useState,
} from 'react';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Input from 'UI/ui-kit/Input';
import Text from 'UI/Pages/HomePage/PayModal/Text';
import GradientButton from 'UI/ui-kit/GradientButton';
import TokenSelect, { TokenOption } from 'UI/ui-kit/TokenSelect';
import GradientSlider from 'UI/ui-kit/GradientSlider';
import { networks, chainToNameConfig } from 'utils/Global/Vars';

import Typography from 'UI/ui-kit/Typography';
import type { IBorrowProps, BorrowState } from './Tabs.interfaces';
import styles from '../style.module.css';

import local from './style.module.css';

const BorrowTab: React.FC<IBorrowProps> = () => {
    const [state, dispatch] = useReducer(
        (oldState: BorrowState, newState: Partial<BorrowState>) => ({
            ...oldState,
            ...newState,
        }),
        {
            synthLp: '',
            lendSynthLp: '',
            getEnUSD: '',
            LTVRate: '70',
            AVGCollaterization: '88,55',
            commision: '3-5',
            exchangeRate: '1.542',
        },
    );

    const { store } = useStore((store) => ({
        UserEntity: store.UserEntity,
    }));

    const { balances } = store.UserEntity;

    useEffect(() => {
        if (!state.lendSynthLp) return;
        dispatch({
            getEnUSD: Number(
                (
                    Number(state.lendSynthLp)
                    * (Number(state.LTVRate) / 100)
                ).toFixed(2),
            ).toString(),
        });
    }, [state.LTVRate]);

    const changeLendHandler = (value: string) =>
        (value
            ? dispatch({
                getEnUSD: Number(
                    (Number(value) * (Number(state.LTVRate) / 100)).toFixed(
                        2,
                    ),
                ).toString(),
                lendSynthLp: value,
            })
            : dispatch({ lendSynthLp: '', getEnUSD: '' }));

    const changeEnUSDHandler = (value: string) =>
        (value
            ? dispatch({
                lendSynthLp: Number(
                    (Number(value) / (Number(state.LTVRate) / 100)).toFixed(
                        2,
                    ),
                ).toString(),
                getEnUSD: value,
            })
            : dispatch({ lendSynthLp: '', getEnUSD: '' }));

    const changeLTVRate = useCallback((value: string) => {
        dispatch({ LTVRate: value });
    }, []);

    const getMax = () => {
        if (!state.synthLp) return;
        dispatch({
            lendSynthLp:
                balances[chainToNameConfig[state.synthLp]].positions.toString(),
            getEnUSD: Number(
                (
                    Number(
                        balances[chainToNameConfig[state.synthLp]].positions,
                    )
                    * (Number(state.LTVRate) / 100)
                ).toFixed(2),
            ).toString(),
        });
    };

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { t } = useTranslation('borrow');

    return (
        <>
            <div className={styles.wrapperBorrow}>
                <div className={classNames(styles.actionCard)}>
                    <div>
                        <TokenSelect
                            defaultLabel={`${t('SelectYour').split(' ')[0]} LP`}
                            value={state.synthLp}
                            onChange={(value: string) =>
                                dispatch({ synthLp: value })}
                            title={`${t('SelectYour')} Synth-LP`}
                            currency="SYNTHUSDC"
                            showPayModal
                        >
                            {Object.keys(networks).map((el, idx) => (
                                <TokenOption
                                    value={el}
                                    key={idx}
                                    name={networks[el].abbr}
                                    amount={
                                        balances[chainToNameConfig[el]]
                                            ?.positions
                                            ? `${
                                                balances[
                                                    chainToNameConfig[el]
                                                ].positions
                                            }`
                                            : 'Buy now'
                                    }
                                    currency="SYNTHUSDC"
                                >
                                    {networks[el].currencyMin}
                                </TokenOption>
                            ))}
                        </TokenSelect>
                    </div>
                    <div>
                        <Typography
                            type="textBody"
                            classNameModifier={styles.mgb}
                        >
                            {`${t('LendYour')} Synthetic LP`}
                        </Typography>
                        <Input
                            type="number"
                            value={state.lendSynthLp}
                            placeholder={`${t('AmountIn').split(' ')[0]} (LP)`}
                            onChange={({
                                target,
                            }: ChangeEvent<HTMLInputElement>) => {
                                changeLendHandler(target.value);
                            }}
                            getMax={getMax}
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
                    <div className={styles.infoContainer}>
                        <p className={classNames(styles.white)}>
                            {t('SetLTV')}
                        </p>
                        <div style={{ width: '30%' }}>
                            <GradientButton
                                title={t('info')}
                                active={isOpen}
                                titleClass={styles.noPadding}
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                }}
                            />
                        </div>
                    </div>
                    <div className={local.fariaFlipBox}>
                        <div
                            className={classNames(local.flipBoxFront, [
                                isOpen ? local.rotateFront : '',
                            ])}
                            style={{
                                backgroundImage:
                                    'url(\'/public/images/back-for-flip.png\')',
                                backgroundColor: 'rgb(17,17,17)',
                                minHeight: '150px',
                                height: 'auto',
                            }}
                        >
                            <div className={local.inner}>
                                <div className={local.sliderBlock}>
                                    <GradientSlider
                                        min={50}
                                        max={90}
                                        extraSymbol="%"
                                        outsideVariable={state.LTVRate}
                                        setOutsideVariable={changeLTVRate}
                                    />
                                </div>
                                <Text
                                    title={t('CurrenLTV')}
                                    content={`${state.LTVRate}%`}
                                    hasTooltip
                                    tooltipText="Test"
                                    classText={local.mg1}
                                />
                                <Text
                                    title={t('LiquidationComm')}
                                    content={`${state.commision}%`}
                                    classText={local.mg1}
                                />
                            </div>
                        </div>
                        <div
                            className={classNames(local.flipBoxBack, [
                                isOpen ? local.rotateBack : '',
                            ])}
                            style={{
                                backgroundColor: 'rgb(17,17,17)',
                                minHeight: '150px',
                                height: 'auto',
                            }}
                        >
                            <div className="inner">
                                <p>{t('infoText')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.actionCard}>
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
                            {t('AmountOfEnUSD')}
                        </Typography>
                        <Input
                            type="number"
                            placeholder={`${t('YouWillGet')} EnUSD`}
                            onChange={({
                                target,
                            }: ChangeEvent<HTMLInputElement>) => {
                                changeEnUSDHandler(target.value);
                            }}
                            value={state.getEnUSD}
                            getMax={getMax}
                        />
                    </div>

                    <Text
                        title={t('CurrentAVG')}
                        content={`${state.AVGCollaterization}%`}
                    />
                    <Text
                        title={t('ExchangeRate')}
                        content={`1 SynthLP = ${state.exchangeRate} enUSD`}
                    />
                </div>
            </div>
            <div className={styles.helper}>
                <GradientButton
                    title={`${t('Mint')} EnUSD`}
                    onClick={() => {}}
                />
            </div>
        </>
    );
};

export default BorrowTab;
