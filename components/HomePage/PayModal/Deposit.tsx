import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Contract, providers } from 'ethers';
import styles from './style.module.css';
import Input from '../../ui-kit/Input';
import GradientButton from '../../ui-kit/GradientButton';
import type { ContainerStateType } from '../Dashboard/DashboardItem/containers/types';
import { opToken } from '../../../src/utils/abi/index';
import { ProviderContext } from '../../../context/ProviderContext';
import { networks, farms } from '../../../src/utils/GlobalConst';
import { ChainConfig } from '../../../src/ChainService/config';

type propsType = {
    buyToken: (value: number) => void;
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>;

const Deposit: React.FC<propsType> = (props) => {
    const {
        available, totalAvailable, price, buyToken,
    } = props;
    const {
        account,
        getAllowance,
        getDeposit,
        approve,
        chainId,
        changeLoadingTx,
        txLoading,
        payData,
    } = useContext(ProviderContext);
    const [amount, setAmount] = useState('');
    const [allowance, setAllowance] = useState<number>(0);
    const [maxAmount, setMaxAmount] = useState<string>();
    const [maxError, setMaxError] = useState<boolean>(false);

    const localChain = chainId === '43114' ? '250' : '43114';
    const localName = chainId === '43114' ? 'FTM' : 'AVAX';

    useEffect(() => {
        (async function () {
            const contracts = (
                ChainConfig[sessionStorage.getItem('card') as 'AVAX' | 'FTM']
                    .SYNTH as any
            ).find(
                (el: any) =>
                    el.ID
                    === farms[chainId][
                        sessionStorage.getItem('card') as 'AVAX' | 'FTM'
                    ],
            );
            getAllowance(
                contracts.CONTRACTS.STABLE.address,
                contracts.CONTRACTS.FEE.address,
            ).then((awc) => setAllowance(Number(awc.toBigInt())));
            const contract = new Contract(
                networks[chainId]?.fiat,
                opToken,
                new providers.JsonRpcProvider(networks[chainId]?.rpc),
            );
            const balance = (await contract.balanceOf(account)).toNumber()
                / 10 ** (await contract.decimals());
            setMaxAmount(balance.toString());
        }());
    }, [chainId]);

    useEffect(() => {
        if (Number(amount) > Number(maxAmount)) {
            setMaxError(true);
        } else {
            setMaxError(false);
        }
    }, [amount, chainId]);

    const handleApprove = async () => {
        const contracts = (
            ChainConfig[sessionStorage.getItem('card') as 'AVAX' | 'FTM']
                .SYNTH as any
        ).find(
            (el: any) =>
                el.ID
                === farms[chainId][
                    sessionStorage.getItem('card') as 'AVAX' | 'FTM'
                ],
        );
        const data = await approve(
            contracts.CONTRACTS.STABLE.address,
            contracts.CONTRACTS.FEE.address,
        );
        if (data) {
            changeLoadingTx(true);
        }
        const res = await data.wait();
        if (res?.status) {
            setAllowance(10000000000);
            changeLoadingTx(false);
        }
    };

    const getMax = async () => {
        setAmount(maxAmount!);
    };
    const percentage = Math.ceil(
        (Number(available) / getDeposit(chainId)) * 100,
    );

    return (
        <>
            <div className={styles.section}>
                <p className={styles.sectionTitle}>Available</p>
                <div
                    className={classNames(
                        styles.sectionRow,
                        styles.sectionAvailable,
                    )}
                >
                    <p className={styles.sectionValue}>
                        {payData[localChain]?.available}
                    </p>
                    <p className={styles.sectionSubValue}>Synth-LP</p>
                    <p
                        className={classNames(
                            styles.sectionSubValue,
                            styles.sectionGraySubValue,
                        )}
                    >
                        {payData[chainId]?.totalAvailable}
                    </p>
                </div>
                <div
                    className={styles.rowGradient}
                    style={
                        {
                            '--percentage': `${percentage}%`,
                            '--colorFrom': `${networks[chainId]?.mainColor}`,
                        } as React.CSSProperties
                    }
                />
            </div>
            <div className={styles.section}>
                <p className={styles.sectionTitle}>Price</p>
                <div className={styles.sectionRow}>
                    <p className={styles.sectionValue}>
                        {payData[localChain]?.price}
                    </p>
                    <p
                        className={classNames(
                            styles.sectionSubValue,
                            styles.networkIconWrapper,
                        )}
                    >
                        <img
                            className={styles.networkIcon}
                            src={`./images/networks/${networks[localChain]?.icon}`}
                            alt=""
                        />
                        {networks[localChain]?.currency}
                    </p>
                </div>
            </div>
            <div
                className={
                    maxError ? styles.inputWrapperError : styles.inputWrapper
                }
            >
                <Input
                    value={amount}
                    onChange={({ target }) => {
                        const value = target.value.replace(',', '.').trim();
                        if (Number(value) >= 0) {
                            setAmount(value);
                        }
                    }}
                    placeholder="Enter amount"
                    otherProps={{ autoFocus: true }}
                    type="text"
                >
                    <p onClick={getMax} className={styles.gradientText}>
                        max
                    </p>
                </Input>
                {maxError && <p className={styles.error}>Not enought USDC</p>}
            </div>
            <div className={styles.section}>
                <p className={styles.sectionTitle}>You get</p>
                <div className={styles.sectionRow}>
                    <p className={styles.sectionValue}>
                        {(amount && price
                            ? Number(amount) / Number(price)
                            : 0
                        ).toFixed(6)}
                    </p>
                    <p className={styles.sectionSubValue}>
                        {networks[localChain]?.currency}
                    </p>
                </div>
            </div>
            {txLoading || maxError ? (
                <GradientButton
                    title={maxError ? 'Add funds' : 'Waiting'}
                    onClick={() => {}}
                    disabled
                    loader={
                        !maxError ? (
                            <i
                                className="fa fa-spinner fa-spin"
                                style={{ marginLeft: '5px' }}
                            />
                        ) : undefined
                    }
                />
            ) : (
                <GradientButton
                    title={allowance > 0 ? 'Add funds' : 'Approve'}
                    onClick={
                        allowance > 0
                            ? () => buyToken(parseFloat(amount))
                            : () => handleApprove()
                    }
                />
            )}
            {}
        </>
    );
};

export default Deposit;
