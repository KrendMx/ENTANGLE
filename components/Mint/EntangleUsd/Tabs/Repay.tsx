import classNames from 'classnames';
import React, { useReducer } from 'react';
import Image from 'next/image';
import Input from '@/components/ui-kit/Input';
import styles from '../style.module.css';
import Text from '@/components/HomePage/PayModal/Text';
import GradientButton from '@/components/ui-kit/GradientButton';

type PropType = {

}

type RepayState = {
    enterEnUSD: string,
    synthLpUnlock: string,
    balanceOfEnUSD: string,
    LTVRateUser: string,
    AVGCollaterization: string,
    exchangeRate: string,
    currentLTVRate: string
}

type RepayAction =
{type: 'setEnterEnUSD', value: {}}
|
{type: 'setSynthLpUnlock', value: number}
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

const Repay: React.FC<PropType> = (props) => {
    function reducer(state:RepayState, action:RepayAction) {
        switch (action.type) {
        default:
            return state;
        }
    }

    const [state, action] = useReducer(reducer, {
        enterEnUSD: '',
        synthLpUnlock: '',
        balanceOfEnUSD: '',
        LTVRateUser: '',
        AVGCollaterization: '88,55',
        exchangeRate: '1,36',
        currentLTVRate: '90',
    });

    return (
        <>
            <div className={styles.wrapper}>
                <div className={classNames(styles.actionCard)}>
                    <div>
                        <p className={
                            classNames(styles.sectionTitle, styles.white)
                        }
                        >
                            Enter amount of enUSD
                        </p>
                        <Input type="number" placeholder="Enter amount of enUSD" onChange={() => {}} value="" />
                    </div>
                    <div>
                        <Text title="Your Balance of enUSD" content="150 enUSD" />
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
                        <p className={
                            classNames(styles.sectionTitle, styles.white)
                        }
                        >
                            Unlocked Synth-LP
                        </p>
                        <Input type="number" placeholder="Unlocked Synth-LP" onChange={() => {}} value="" />
                    </div>
                    <div>
                        <Text title="Curren AVG collaterization" content={`${state.AVGCollaterization}%`} />
                        <Text title="Exchange rate" content={`1 SynthLP = ${state.exchangeRate} enUSD`} />
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
                        <p className={
                            classNames(styles.sectionTitle, styles.white)
                        }
                        >
                            Set LTV Rate
                        </p>
                        <Input type="" placeholder="Set LTV Rate" onChange={() => {}} value="" />
                    </div>
                    <div>
                        <Text title="Current LTV Rate" content={`${state.currentLTVRate}%`} bigFont />
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
