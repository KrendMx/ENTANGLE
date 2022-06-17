import classNames from 'classnames';
import type { ChangeEvent } from 'react';
import React, { useCallback, useReducer, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/ui-kit/Input';
import styles from '../style.module.css';
import Text from '@/components/HomePage/PayModal/Text';
import GradientButton from '@/components/ui-kit/GradientButton';
import SyntSelect from '@/ui-kit/SynteticSelector';
import GradientSlider from '@/components/ui-kit/GradientSlider';
import type { IBorrowProps, BorrowState } from './Tabs.interfaces';

const Borrow: React.FC<IBorrowProps> = () => {
    const [state, dispatch] = useReducer((oldState: BorrowState, newState: Partial<BorrowState>) => ({
        ...oldState,
        ...newState,
    }), {
        synthLp: '',
        synthLpLock: '',
        getEnUSD: '',
        LTVRate: '70',
        AVGCollaterization: '88,55',
        commision: '3-5',
        exchangeRate: '1.542',
    });

    const changeCurrency = useCallback((value: string) => {
        dispatch({ synthLp: value });
    }, []);

    const changeLTVRate = useCallback((value: string) => {
        dispatch({ LTVRate: value });
    }, []);

    const changeSLPAmount = (value: string) => { dispatch({ synthLpLock: value }); };

    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            <div className={styles.wrapper}>
                <div className={classNames(styles.actionCard)}>
                    <div>
                        <p
                            className={classNames(
                                styles.sectionTitle,
                                styles.white,
                            )}
                        >
                            Select your Synth-Lp
                        </p>
                        <SyntSelect
                            currenc={state.synthLp}
                            func={changeCurrency}
                            currencSymbol="SYNTHUSDC"
                        />
                    </div>
                    <div>
                        <p
                            className={classNames(
                                styles.sectionTitle,
                                styles.white,
                            )}
                        >
                            Lock Synth-LP Amount
                        </p>
                        <Input
                            type="number"
                            value={state.synthLpLock}
                            placeholder="Enter amount of Synth-LP"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                changeSLPAmount(e.target.value);
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
                        <p
                            className={classNames(
                                styles.white,
                            )}
                        >
                            Set LTV Rate
                        </p>
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
                    {isOpen ? (
                        <div className={styles.infoDescription}>
                            <p>
                                Lorem Ipsum is simply dummy text of the
                                printing and typesetting industry.
                                Lorem Ipsum has been the industrys standard dummy
                                text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled
                            </p>
                        </div>
                    ) : null}
                    <GradientSlider
                        min={50}
                        max={90}
                        extraSymbol="%"
                        outsideVariable={state.LTVRate}
                        setOutsideVariable={changeLTVRate}
                    />

                    <Text
                        title="Curren LTV Rate"
                        content={`${state.LTVRate}%`}
                        hasTooltip
                        tooltipText="Test"
                    />
                    <Text
                        title="Liquidation commission"
                        content={`${state.commision}%`}
                    />
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
                        <p
                            className={classNames(
                                styles.sectionTitle,
                                styles.white,
                            )}
                        >
                            Amount of EnUSD to be borrowed
                        </p>
                        <Input
                            type="number"
                            placeholder="You will get EnUSD"
                            onChange={() => {}}
                            value={((Number(state.synthLpLock) / 100) * Number(state.LTVRate)).toString()}
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

export default Borrow;
