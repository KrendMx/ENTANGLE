import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './style.module.css';
import type { ContainerStateType } from '../Dashboard/DashboardItem/containers/types';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

type PayModalPropsType = {
    handleClose: () => void;
    buyToken: (value: number) => void;
    sellToken: (value: number) => void;
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>

const PayModal: React.FC<PayModalPropsType> = (props) => {
    const {
        handleClose,
        price,
        available,
        totalAvailable,
        sellToken,
        buyToken,
    } = props;
    const [activeTab, setActiveTab] = useState(0);
    const buttons = ['Deposit', 'Withdraw'];

    return (
        <div className={styles.wrapper}>
            <img
                className={styles.close}
                onClick={handleClose}
                src="./images/close.svg"
                alt="closeImg"
            />
            <div className={styles.tabsBg}>
                <div className={styles.tabsWrapper}>
                    {buttons.map((title, idx) => (
                        <div
                            key={title}
                            onClick={() => setActiveTab(idx)}
                            className={classNames(styles.tabWrapper, {
                                [styles.active]: idx === activeTab,
                            })}
                        >
                            <p className={styles.tab}>{title}</p>
                        </div>
                    ))}
                </div>
            </div>
            {
                activeTab
                    ? (
                        <Withdraw
                            price={price}
                            available={available}
                            totalAvailable={totalAvailable}
                            sellToken={sellToken}
                        />
                    )
                    : (
                        <Deposit
                            price={price}
                            available={available}
                            totalAvailable={totalAvailable}
                            buyToken={buyToken}
                        />
                    )
            }
        </div>
    );
};

export default PayModal;
