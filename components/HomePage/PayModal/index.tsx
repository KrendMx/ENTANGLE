import React, { useState, useContext, useEffect } from 'react';
import { Contract } from 'ethers';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import classNames from 'classnames';
import styles from './style.module.css';
import { networks } from '../../../src/utils/GlobalConst';
import { ProviderContext } from '../../../context/ProviderContext';
import type { ContainerStateType } from '../Dashboard/DashboardItem/containers/types';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

type PayModalPropsType = {
    handleClose: () => void;
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>

const PayModal: React.FC<PayModalPropsType> = (props) => {
    const {
        handleClose,
        price,
        available,
        totalAvailable,
    } = props;
    const [activeTab, setActiveTab] = useState(0);
    const buttons = ['Deposit', 'Withdraw'];

    const {
        chainId, provider, changeLoadingTx, setSucInfo,
    } = useContext(ProviderContext);

    const opositeId = chainId === '250' ? '43114' : '250';

    useEffect(() => {
        if (chainId !== '250' && chainId !== '43114') {
            handleClose();
        }
    }, [chainId]);

    const buyToken = async (value: number) => {
        const buyContract = new Contract(
            networks[opositeId].dex,
            networks[opositeId].dexAbi,
            (provider as Web3Provider).getSigner(),
        );

        const amount = Math.floor(value * 10 ** 6);
        const response = await buyContract.buy(amount);
        if (response) {
            changeLoadingTx(true);
        }
        const res = await response.wait();

        if (res?.status) {
            changeLoadingTx(false);
            setSucInfo({
                value,
                symbol: networks[chainId].currencyMin,
                isReceived: true,
            });
        }
    };

    const sellToken = async (value: number) => {
        try {
            const sellContract = new Contract(
                networks[opositeId].dex,
                networks[opositeId].dexAbi,
                (provider as Web3Provider).getSigner(),
            );
            // eslint-disable-next-line
            const amount = BigInt(Math.floor(Number(value * Math.pow(10, 18))));
            const response = await sellContract.sell(amount);
            if (response) {
                changeLoadingTx(true);
            }
            const res = await response.wait();

            if (res?.status) {
                changeLoadingTx(false);
                setSucInfo({
                    value,
                    symbol: networks[chainId].currencyMin,
                    isReceived: false,
                });
                // closeModal();
            }
        } catch (e) {
            console.log(e);
        }
    };

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
