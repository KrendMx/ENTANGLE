import React, { useState, useEffect } from 'react';
import { Contract } from 'ethers';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import classNames from 'classnames';
import styles from './style.module.css';
import { networks, farms } from '../../../src/utils/GlobalConst';
import type { ContainerStateType } from '../Dashboard/DashboardItem/containers/types';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import { useAppSelector, useAppDispatch } from '../../../Redux/store/hooks/redux';
import { changeLoadingTx } from '../../../Redux/store/reducers/UserSlice';
import { setSucInfo } from '../../../Redux/store/reducers/AppSlice';
import { ChainConfig } from '../../../src/ChainService/config';

type PayModalPropsType = {
    handleClose: () => void;
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>

export type namesValues = 'AVAX' | 'FTM' | 'BSC';

const PayModal: React.FC<PayModalPropsType> = (props) => {
    const {
        handleClose,
        price,
        available,
        totalAvailable,
    } = props;
    const [activeTab, setActiveTab] = useState(0);
    const buttons = ['Deposit', 'Withdraw'];
    const dispatch = useAppDispatch();
    const { chainId, provider } = useAppSelector((state) => state.walletReducer);

    useEffect(() => {
        if (chainId !== '250' && chainId !== '43114' && chainId !== '56') {
            handleClose();
        }
    }, [chainId]);

    const buyToken = async (value: number) => {
        const contracts = (
            ChainConfig[sessionStorage.getItem('card') as namesValues]
                .SYNTH as any
        ).find(
            (el: any) =>
                el.ID
                === farms[chainId][
                    sessionStorage.getItem('card') as namesValues
                ],
        );
        const buyContract = new Contract(
            contracts.CONTRACTS.FEE.address,
            contracts.CONTRACTS.FEE.abi,
            (provider as Web3Provider).getSigner(),
        );
        const stableContract = new Contract(
            contracts.CONTRACTS.STABLE.address,
            contracts.CONTRACTS.STABLE.abi,
            (provider as Web3Provider).getSigner(),
        );

        const amount = BigInt(Math.floor(value * 10 ** (await stableContract.decimals())));
        const response = await buyContract.buyWithFee(amount);
        if (response) {
            dispatch(changeLoadingTx(true));
        }
        const res = await response.wait();

        if (res?.status) {
            dispatch(changeLoadingTx(false));
            dispatch(setSucInfo({
                value,
                symbol: networks[chainId].currencyMin,
                isReceived: true,
            }));
        }
    };

    const sellToken = async (value: number) => {
        try {
            const contracts = (
                ChainConfig[sessionStorage.getItem('card') as namesValues]
                    .SYNTH as any
            ).find(
                (el: any) =>
                    el.ID
                    === farms[chainId][
                        sessionStorage.getItem('card') as namesValues
                    ],
            );
            const sellContract = new Contract(
                contracts.CONTRACTS.FEE.address,
                contracts.CONTRACTS.FEE.abi,
                (provider as Web3Provider).getSigner(),
            );
            // eslint-disable-next-line
            const amount = BigInt((value * Math.pow(10, 18)));
            const response = await sellContract.sellWithFee(amount);
            if (response) {
                dispatch(changeLoadingTx(true));
            }
            const res = await response.wait();

            if (res?.status) {
                dispatch(changeLoadingTx(false));
                dispatch(setSucInfo({
                    value,
                    symbol: networks[chainId].currencyMin,
                    isReceived: false,
                }));
                handleClose();
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
