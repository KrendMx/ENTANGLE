import classNames from 'classnames';
import React, {
    useContext, useEffect, useMemo, useState,
} from 'react';
import { Contract, providers } from 'ethers';
import styles from './style.module.css';
import Input from '../../ui-kit/Input';
import GradientButton from '../../ui-kit/GradientButton';
import type { ContainerStateType } from '../Dashboard/DashboardItem/containers/types';
import { opToken } from '../../../src/utils/abi/index';
import { ProviderContext } from '../../../src/context/ProviderContext';
import { networks, farms, namesConfig } from '../../../src/utils/GlobalConst';
import { ChainConfig } from '../../../src/ChainService/config';
import type { namesValues, chainsValues } from './index';

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

    const localChain = useMemo(
        () =>
            namesConfig[
                sessionStorage.getItem('card') as namesValues
            ],
        [chainId],
    );

    useEffect(() => {
        (async function () {
            const contracts = (
                ChainConfig[
                    sessionStorage.getItem('card') as namesValues
                ].SYNTH as any
            ).find(
                (el: any) =>
                    el.ID
                    === farms[chainId][
                        sessionStorage.getItem('card') as namesValues
                    ],
            );
            getAllowance(
                contracts.CONTRACTS.STABLE.address,
                contracts.CONTRACTS.FEE.address,
            ).then((awc) => setAllowance(Number(awc.toBigInt())));
            console.log(contracts);
            const contract = new Contract(
                contracts.CONTRACTS.STABLE.address,
                contracts.CONTRACTS.STABLE.abi,
                new providers.JsonRpcProvider(networks[chainId]?.rpc),
            );
            const balance = Number((await contract.balanceOf(account)).toBigInt()
                / BigInt(10 ** (await contract.decimals())));
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
            ChainConfig[
                sessionStorage.getItem('card') as namesValues
            ].SYNTH as any
        ).find(
            (el: any) =>
                el.ID
                === farms[chainId][
                    sessionStorage.getItem('card') as namesValues
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
                        {payData[localChain as chainsValues]?.available}
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
                        {payData[localChain as chainsValues]?.price}
                    </p>
                    <p
                        className={classNames(
                            styles.sectionSubValue,
                            styles.networkIconWrapper,
                        )}
                    >
                        <img
                            className={styles.networkIcon}
                            src={`./images/networks/${networks[localChain as chainsValues]?.icon}`}
                            alt=""
                        />
                        {networks[localChain as chainsValues]?.currency}
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
                        {networks[localChain as chainsValues]?.currency}
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
