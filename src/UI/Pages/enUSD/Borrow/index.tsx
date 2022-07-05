import React, { useEffect, useReducer, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './style.module.css';
import Tabs from '@/ui-kit/Tabs';
import BorrowTab from './Tabs/Borrow.tab';
import type { infoReducer } from './Borrow.intefaces';
import RepayTab from './Tabs/Repay.tab';
import ChainService from '@/src/ChainService/ChainService';

const Borrow: React.FC = () => {
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
    const switchHandler = (): void =>
        (actionType === 0 ? setActionType(1) : setActionType(0));

    const { t } = useTranslation('borrow');

    const buttons = [t('Borrow'), t('Repay')];

    return (
        <div style={{ marginBottom: '5rem' }}>
            <div className={styles.wrapper}>
                <div className={styles.blockWrapper}>
                    <p className={styles.sectionTitle}>{`SynthLP ${t('inCollateral')}`}</p>
                    <p className={styles.sectionValue}>
                        {`$${infoValuesState.slpInCollateral}`}
                    </p>
                </div>
                <div className={styles.blockWrapper}>
                    <p className={styles.sectionTitle}>{`SynthLP ${t('balance')}`}</p>
                    <p className={styles.sectionValue}>
                        {`$${infoValuesState.slpBalance}`}
                    </p>
                </div>
                <div className={styles.blockWrapper}>
                    <p className={styles.sectionTitle}>{`EnUSD ${t('Borrowed')}`}</p>
                    <p className={styles.sectionValue}>
                        {`$${infoValuesState.EnUSDBorrowed}`}
                    </p>
                </div>
            </div>
            <div className={styles.switcher}>
                <h1>{t('GetStarted')}</h1>
                <div>
                    <Tabs
                        activeTab={actionType}
                        switchHandler={switchHandler}
                        buttons={buttons}
                        isBlack
                    />
                </div>
            </div>
            <div>{actionType === 0 ? <BorrowTab /> : <RepayTab />}</div>
        </div>
    );
};

export default Borrow;
