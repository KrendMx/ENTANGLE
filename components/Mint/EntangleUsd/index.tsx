import React, { useReducer, useState } from 'react';
import classNames from 'classnames';
import styles from './style.module.css';
import Tabs from '@/ui-kit/Tabs';
import Borrow from './Tabs/Borrow';
import GradientButton from '@/ui-kit/GradientButton';
import Repay from './Tabs/Repay';

type infoReducer = {
    slpInCollateral: number,
    slpBalance: number,
    EnUSDBorrowed: number,
}

type Action =
{
    type: 'slpInCollateralChange',
    value: number
} |
{
    type: 'slpBalanceChange',
    value: number
} |
{
    type: 'EnUSDBorrowedChange',
    value: number
}

const StakeEntangle: React.FC = () => {
    const [actionType, setActionType] = useState<number>(0);

    const reducer = (state:infoReducer, action:Action) => {
        switch (action.type) {
        default:
            return state;
        }
    };

    const [infoValuesState, infoValuesDispatcher] = useReducer(reducer, {
        slpInCollateral: 201.55,
        slpBalance: 201.55,
        EnUSDBorrowed: 201.55,
    });

    const switchHandler = ():void => {
        if (actionType === 0) { setActionType(1); } else { setActionType(0); }
    };

    const buttons:string[] = ['Borrow', 'Repay'];

    return (
        <div style={{ marginBottom: '5rem' }}>
            <div className={styles.wrapper}>
                <div className={styles.blockWrapper}>
                    <p className={styles.sectionTitle}>SynthLP in Collateral</p>
                    <p className={styles.sectionValue}>{`$${infoValuesState.slpInCollateral}`}</p>
                </div>
                <div className={styles.blockWrapper}>
                    <p className={styles.sectionTitle}>SynthLP Balance</p>
                    <p className={styles.sectionValue}>{`$${infoValuesState.slpBalance}`}</p>
                </div>
                <div className={styles.blockWrapper}>
                    <p className={styles.sectionTitle}>EnUSD Borrowed</p>
                    <p className={styles.sectionValue}>{`$${infoValuesState.EnUSDBorrowed}`}</p>
                </div>
            </div>
            <div className={styles.switcher}>
                <h1>Get started</h1>
                <div>
                    <Tabs
                        activeTab={actionType}
                        switchHandler={switchHandler}
                        buttons={buttons}
                        customClassTabName={styles.customTabs}
                        customClassButtonName={styles.customButton}
                    />
                </div>
            </div>
            <div>
                {actionType === 0 ? <Borrow /> : <Repay />}
            </div>
        </div>
    );
};

export default StakeEntangle;
