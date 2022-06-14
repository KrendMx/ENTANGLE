import classNames from 'classnames';
import React, { useCallback, useReducer } from 'react';
import Image from 'next/image';
import Input from '@/components/ui-kit/Input';
import styles from '../style.module.css';
import Text from '@/components/HomePage/PayModal/Text';
import GradientButton from '@/components/ui-kit/GradientButton';
import SyntSelect from '@/components/ui-kit/SynteticSelector';

type PropType = {

}

type RepayState = {
    enterEnUSD: string,
    synthLp: string,
    balanceOfEnUSD: string,
    LTVRateUser: string,
    AVGCollaterization: string,
    exchangeRate: string,
    currentLTVRate: string
}

type RepayAction =
{type: 'setEnterEnUSD', value: {}}
|
{type: 'setSynthLp', value: string}
|
{type: 'setBalanceOfEnUSD', value: number}
|
{type: 'setLTVRateUser', value: number}
|
{type: 'setAVGCollaterization', value: number}
|
{type: 'setExchangeRate', value: number}
|
{type: 'setCurrentLTVRate', value: number}

const Repay: React.FC<PropType> = () => {
    function reducer(state:RepayState, action:RepayAction) {
        switch (action.type) {
        case 'setSynthLp':
            return { ...state, synthLp: action.value };
        default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        enterEnUSD: '',
        synthLp: '',
        balanceOfEnUSD: '',
        LTVRateUser: '',
        AVGCollaterization: '88,55',
        exchangeRate: '1,36',
        currentLTVRate: '90',
    });

    const changeCurrency = useCallback((value: string) => {
        dispatch({ type: 'setSynthLp', value });
    }, []);

    return (
        <>
            <div className={styles.wrapper} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <div className={classNames(styles.actionCard)}>
                    <div>
                        <p className={
                            classNames(styles.sectionTitle, styles.white)
                        }
                        >
                            Enter amount of enUSD
                        </p>
                        <SyntSelect
                            currenc={state.synthLp}
                            func={changeCurrency}
                            currencSymbol="EnUSD"
                        />
                    </div>
                    <div>
                        <p className={
                            classNames(styles.sectionTitle, styles.white)
                        }
                        >
                            Repay EnUSD Amount
                        </p>
                        <Input type="number" placeholder="Enter amount of EnUSD" onChange={() => {}} />
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
                        <p className={
                            classNames(styles.sectionTitle, styles.white)
                        }
                        >
                            Unlocked Synth-LP
                        </p>
                        <Input type="number" placeholder="Unlocked Synth-LP" onChange={() => {}} />
                    </div>
                    <div>
                        <Text title="Curren AVG collaterization" content={`${state.AVGCollaterization}%`} />
                        <Text title="Exchange rate" content={`1 SynthLP = ${state.exchangeRate} enUSD`} />
                    </div>

                </div>
            </div>
            <div className={styles.helper}>
                <GradientButton title="Mint Synth-LP" onClick={() => {}} />
            </div>
        </>
    );
};

export default Repay;
