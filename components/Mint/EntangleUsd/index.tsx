import React, { useReducer, useState } from 'react';
import styles from './style.module.css';
import Tabs from '@/ui-kit/Tabs';
import Borrow from './Tabs/Borrow';
import type { infoReducer } from './MintEnt.interfaces';
import Repay from './Tabs/Repay';

const StakeEntangle: React.FC = () => {
    const [actionType, setActionType] = useState<number>(0);

    const [infoValuesState, infoValuesDispatcher] = useReducer(
        (oldState: infoReducer, newState: Partial<infoReducer>) => ({
            ...oldState,
            ...newState,
        }),
        {
            slpInCollateral: 201.55,
            slpBalance: 201.55,
            EnUSDBorrowed: 201.55,
        },
    );
    /*-----------------------------------------*/
    /*-----------------------------------------*/

    const switchHandler = (): void =>
        (actionType === 0 ? setActionType(1) : setActionType(0));

    const buttons = ['Borrow', 'Repay'];

    return (
        <div style={{ marginBottom: '5rem' }}>
            <div className={styles.wrapper}>
                <div className={styles.blockWrapper}>
                    <p className={styles.sectionTitle}>SynthLP in Collateral</p>
                    <p className={styles.sectionValue}>
                        {`$${infoValuesState.slpInCollateral}`}
                    </p>
                </div>
                <div className={styles.blockWrapper}>
                    <p className={styles.sectionTitle}>SynthLP Balance</p>
                    <p className={styles.sectionValue}>
                        {`$${infoValuesState.slpBalance}`}
                    </p>
                </div>
                <div className={styles.blockWrapper}>
                    <p className={styles.sectionTitle}>EnUSD Borrowed</p>
                    <p className={styles.sectionValue}>
                        {`$${infoValuesState.EnUSDBorrowed}`}
                    </p>
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
            <div>{actionType === 0 ? <Borrow /> : <Repay />}</div>
        </div>
    );
};

export default StakeEntangle;
