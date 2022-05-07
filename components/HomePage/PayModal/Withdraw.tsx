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
    sellToken: (value: number) => void;
} & Pick<ContainerStateType, 'available' | 'totalAvailable' | 'price'>;

const Withdraw: React.FC<propsType> = (props) => {
    const {
        available, totalAvailable, price, sellToken,
    } = props;
    const {
        getAllowance,
        approve,
        chainId,
        account,
        txLoading,
        changeLoadingTx,
        payData,
    } = useContext(ProviderContext);
    const [amount, setAmount] = useState<string>('');
    const [allowance, setAllowance] = useState(0);
    const [maxAmount, setMaxAmount] = useState<string>();
    const [maxError, setMaxError] = useState<boolean>(false);

    const localChain = chainId === '43114' ? '250' : '43114';

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
            if (contracts.CROSSCHAIN) {
                getAllowance(
                    contracts.CONTRACTS.SYNTH.address,
                    contracts.CONTRACTS.FEE.address,
                ).then((awc) => setAllowance(Number(awc.toBigInt())));
            } else {
                setAllowance(100000);
            }
            const contract = new Contract(
                networks[chainId].synth,
                opToken,
                new providers.JsonRpcProvider(networks[chainId].rpc),
            );

            const balance = Number(await contract.balanceOf(account))
                / 10 ** (await contract.decimals());
            setMaxAmount(balance.toString());
        }());
    }, []);

    useEffect(() => {
        if (Number(amount) > Number(maxAmount)) {
            setMaxError(true);
        } else {
            setMaxError(false);
        }
    }, [amount]);

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
            contracts.CONTRACTS.SYNTH.address,
            contracts.CONTRACTS.FEE.address,
        );
        if (data) {
            changeLoadingTx(true);
        }
        const res = await data.wait();
        if (res?.status === 1) {
            setAllowance(10000000000);
            changeLoadingTx(false);
        }
    };

    const getMax = async () => {
        setAmount(maxAmount!);
    };

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
                        {payData[localChain]?.totalAvailable}
                    </p>
                </div>
                <div
                    className={classNames(styles.rowGradient, styles.hidden)}
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
                            src={`./images/networks/${networks[localChain].icon}`}
                            alt=""
                        />
                        {networks[localChain].currency}
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
                    onChange={(event) => {
                        const value = event.target.value.replace(',', '.');
                        if (Number(value) >= 0) {
                            setAmount(value);
                        }
                    }}
                    placeholder="Enter amount"
                    type="text"
                    otherProps={{ autoFocus: true }}
                >
                    <p className={styles.gradientText} onClick={getMax}>
                        max
                    </p>
                </Input>
                {maxError && (
                    <p className={styles.error}>Not enought Synth LP</p>
                )}
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
                    <p className={styles.sectionValue}>$</p>
                </div>
            </div>
            {txLoading || maxError ? (
                <GradientButton
                    title={maxError ? 'Sell funds' : 'Waiting'}
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
                    title={allowance > 0 ? 'Sell funds' : 'Approve'}
                    onClick={
                        allowance > 0
                            ? () => sellToken(parseFloat(amount))
                            : () => handleApprove()
                    }
                />
            )}
        </>
    );
};

export default Withdraw;
