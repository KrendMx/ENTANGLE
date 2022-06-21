import classNames from 'classnames';
import { ChangeEvent, useEffect } from 'react';
import React, { useCallback, useReducer, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/ui-kit/Input';
import styles from '../style.module.css';
import Text from '@/components/HomePage/PayModal/Text';
import GradientButton from '@/components/ui-kit/GradientButton';
import TokenSelect, { TokenOption } from '@/ui-kit/TokenSelect';
import GradientSlider from '@/components/ui-kit/GradientSlider';
import type { IBorrowProps, BorrowState } from './Tabs.interfaces';
import { networks, chainToNameConfig } from '@/src/utils/GlobalConst';

import local from './style.module.css';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';
import Typography from '@/components/ui-kit/Typography';

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

    const { balances } = useAppSelector((state) => state.userReducer);

    useEffect(() => {
        if (!state.lendSynthLp) return
        dispatch({
            getEnUSD: Number(
                (
                    (Number(state.lendSynthLp)) *
                    (Number(state.LTVRate) / 100)
                ).toFixed(2),
            ).toString(),
        });
    }, [state.LTVRate]);

    const changeLendHandler = (value: string) =>
        value
            ? dispatch({
                  getEnUSD: Number(
                      (
                          Number(value) *
                          (Number(state.LTVRate) / 100)
                      ).toFixed(2),
                  ).toString(),
                  lendSynthLp: value,
              })
            : dispatch({ lendSynthLp: '', getEnUSD: '' });

    const changeEnUSDHandler = (value: string) =>
        value
            ? dispatch({
                  lendSynthLp: Number(
                      (
                          (Number(value)) /
                          (Number(state.LTVRate) / 100)
                      ).toFixed(2),
                  ).toString(),
                  getEnUSD: value,
              })
            : dispatch({ lendSynthLp: '', getEnUSD: '' });

    const changeLTVRate = useCallback((value: string) => {
        dispatch({ LTVRate: value });
    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className={styles.wrapperBorrow}>
                <div className={classNames(styles.actionCard)}>
                    <div>
                        <TokenSelect
                            defaultLabel="Select LP"
                            value={state.synthLp}
                            onChange={(value: string) =>
                                dispatch({ synthLp: value })
                            }
                            title={'Select your Synth-LP'}
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
                                              } SYNTHUSDC`
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
                            classNameModifier={styles.mgb}
                        >
                            Lend your Synthetic LP
                        </Typography>
                        <Input
                            type="number"
                            value={state.lendSynthLp}
                            placeholder="Amount (LP)"
                            onChange={({
                                target,
                            }: ChangeEvent<HTMLInputElement>) => {
                                changeLendHandler(target.value);
                            }}
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
                        <p className={classNames(styles.white)}>Set LTV Rate</p>
                        <div style={{ width: '30%' }}>
                            <GradientButton
                                title="info"
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
                                    "url('/public/images/back-for-flip.png')",
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
                                    title="Curren LTV Rate"
                                    content={`${state.LTVRate}%`}
                                    hasTooltip
                                    tooltipText="Test"
                                    classText={local.mg1}
                                />
                                <Text
                                    title="Liquidation commission"
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
                                <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industrys standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled
                                </p>
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
                            Amount of EnUSD to be borrowed
                        </Typography>
                        <Input
                            type="number"
                            placeholder="You will get EnUSD"
                            onChange={({
                                target,
                            }: ChangeEvent<HTMLInputElement>) => {
                                changeEnUSDHandler(target.value);
                            }}
                            value={state.getEnUSD}
                        />
                    </div>

                    <Text
                        title="Curren AVG collaterization"
                        content={`${state.AVGCollaterization}%`}
                    />
                    <Text
                        title="Exchange rate"
                        content={`1 SynthLP = ${state.exchangeRate} enUSD`}
                    />
                </div>
            </div>
            <div className={styles.helper}>
                <GradientButton title="Mint Synth-LP" onClick={() => {}} />
            </div>
        </>
    );
};

export default BorrowTab;
