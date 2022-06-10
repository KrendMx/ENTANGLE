import classNames from 'classnames';
import React, { useReducer } from 'react';
import Image from 'next/image';
import Input from '@/components/ui-kit/Input';
import styles from '../style.module.css';
import Select, { Option } from '@/components/ui-kit/Select';
import Text from '@/components/HomePage/PayModal/Text';
import GradientButton from '@/components/ui-kit/GradientButton';

type PropType = {

}

type RepayState = {
    synthLp: string,
    synthLpLock: string,
    getEnUSD: string,
    LTVRateUser: string,
    AVGCollaterization: string,
    exchangeRate: string,
    currentLTVRate: string
}

type RepayAction =
{type: 'setSynthLp', value: {}}
|
{type: 'setSynthLpLock', value: number}
|
{type: 'setGetEnUSD', value: number}
|
{type: 'setLTVRateUser', value: number}
|
{type: 'setAVGCollaterization', value: number}
|
{type: 'setExchangeRate', value: number}
|
{type: 'setCurrentLTVRate', value: number}

const Borrow: React.FC<PropType> = () => {
    function reducer(state:RepayState, action:RepayAction) {
        switch (action.type) {
        default:
            return state;
        }
    }

    const [state, action] = useReducer(reducer, {
        synthLp: '1',
        synthLpLock: '',
        getEnUSD: '',
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
                            Select your Synth-Lp

                        </p>
                        <Select
                            onChange={() => {}}
                            value={state.synthLp}
                        >
                            <Option value="2">Select your Synth-Lp</Option>
                            <Option value="1">Select your Synth-Lp</Option>
                        </Select>
                    </div>
                    <div>

                        <p className={
                            classNames(styles.sectionTitle, styles.white)
                        }
                        >
                            Lock Synth-LP Amount
                        </p>
                        <Input
                            type="number"
                            placeholder="Enter amount of Synth-LP"
                            onChange={() => {}}
                            value={state.synthLpLock}
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
                        <p className={
                            classNames(styles.sectionTitle, styles.white)
                        }
                        >
                            You will get enUSD
                        </p>
                        <Input
                            type="number"
                            placeholder="You will get enUSD"
                            onChange={() => {}}
                            value={state.getEnUSD}
                        />
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
                        <Input
                            type=""
                            placeholder="Set LTV Rate"
                            onChange={() => {}}
                            value={state.LTVRateUser}
                        />
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

export default Borrow;
