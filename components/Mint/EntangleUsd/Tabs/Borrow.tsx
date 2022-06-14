import classNames from 'classnames';
import React, { useCallback, useReducer, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/ui-kit/Input';
import styles from '../style.module.css';
import Text from '@/components/HomePage/PayModal/Text';
import GradientButton from '@/components/ui-kit/GradientButton';
import SyntSelect from '@/ui-kit/SynteticSelector';
import GradientSlider from '@/components/ui-kit/GradientSlider';

type PropType = {};

type RepayState = {
    synthLp: string;
    synthLpLock: string;
    getEnUSD: string;
    LTVRate: string;
    AVGCollaterization: string;
    commision: string;
    exchangeRate: string;
};

type RepayAction =
    | { type: 'setSynthLp'; value: string }
    | { type: 'setSynthLpLock'; value: number }
    | { type: 'setGetEnUSD'; value: number }
    | { type: 'setLTVRate'; value: string }
    | { type: 'setAVGCollaterization'; value: number }
    | { type: 'setCommision'; value: string }
    | { type: 'setCurrentLTVRate'; value: number };

const Borrow: React.FC<PropType> = () => {
    function reducer(state: RepayState, action: RepayAction) {
        switch (action.type) {
        case 'setSynthLp':
            return { ...state, synthLp: action.value };
        case 'setLTVRate':
            return { ...state, LTVRate: action.value };
        default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        synthLp: '',
        synthLpLock: '',
        getEnUSD: '',
        LTVRate: '70',
        AVGCollaterization: '88,55',
        commision: '3-5',
        exchangeRate: '1.542',
    });

    const changeCurrency = useCallback((currency: string) => {
        dispatch({ type: 'setSynthLp', value: currency });
    }, []);

    const changeLTVRate = useCallback((value: string) => {
        dispatch({ type: 'setLTVRate', value });
    }, []);

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
                            placeholder="Enter amount of Synth-LP"
                            onChange={() => {}}
                        />
                    </div>
                </div>
                <div className={classNames(styles.actionCard)}>
                    <div className={styles.arrow}>
                        <Image
                            src="/images/Arrow.svg"
                            width={55}
                            height={55}
                            quality={100}
                            alt="arrow-icon"
                        />
                    </div>
                    <div>
                        <div className={styles.infoContainer}>
                            <p
                                className={classNames(
                                    styles.sectionTitle,
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
                    </div>
                    <div>
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
                </div>
                <div className={styles.actionCard}>
                    <div className={styles.arrow}>
                        <Image
                            src="/images/Arrow.svg"
                            width={55}
                            height={55}
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
                        />
                    </div>
                    <div>
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
            </div>
            <div className={styles.helper}>
                <GradientButton title="Mint Synth-LP" onClick={() => {}} />
            </div>
        </>
    );
};

export default Borrow;
