import React, { useReducer, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Tabs from 'UI/ui-kit/Tabs';
import InfoBlock from 'src/UI/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from 'src/UI/ui-kit/InfoBlock/InfoBlock.constants';
import styles from './style.module.css';
import BorrowTab from './Tabs/Borrow.tab';
import type { infoReducer } from './Borrow.intefaces';
import RepayTab from './Tabs/Repay.tab';

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
    const switchHandler = (tab: number): void => setActionType(tab);

    const { t } = useTranslation('borrow');

    const buttons = [t('Borrow'), t('Repay')];

    return (
        <div>
            <div className={styles.wrapper}>
                <InfoBlock
                    value={infoValuesState.slpInCollateral}
                    info={`SynthLP ${t('inCollateral')}`}
                    type={InfoBlockTypes.MONEY}
                />
                <InfoBlock
                    value={infoValuesState.slpInCollateral}
                    info={`SynthLP ${t('inCollateral')}`}
                    type={InfoBlockTypes.MONEY}
                />
                <InfoBlock
                    value={infoValuesState.slpInCollateral}
                    info={`SynthLP ${t('inCollateral')}`}
                    type={InfoBlockTypes.MONEY}
                />
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
