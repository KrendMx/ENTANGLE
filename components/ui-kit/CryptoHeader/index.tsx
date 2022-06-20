import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import type { CryptoHeaderProps } from './CryptoHeader.interfaces';
import { WalletProviderNames } from '@/components/Modal/SelectWalletModal/SelectWalletModal.constants';
import {
    networks,
    namesConfig,
    STABLES,
    synths,
} from '@/src/utils/GlobalConst';
import {
    changeNetwork,
    importToken,
} from '@/src/Redux/store/reducers/ActionCreators';

import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';

import styles from './style.module.css';
import Link from 'next/link';
import HoverTooltip from '../HoverTooltip/HoverTooltip';
import CopyBtn from '../CopyBtn/CopyBtn';

const CryptoHeader: React.FC<CryptoHeaderProps> = ({
    token,
    isStable,
    apr,
    locked,
    backHref,
    balance,
    earned,
}) => {
    const dispatch = useAppDispatch();
    const { chainId, provider, account } = useAppSelector(
        (state) => state.walletReducer,
    );

    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
    const [addingToken, setAddingToken] = useState<boolean>(false);

    const assetData = useMemo(() => {
        if (isStable) {
            return {
                path: `/images/stables/${token}.svg`,
                address: STABLES[token].address[chainId],
            };
        } else {
            return {
                path: `/images/networks/${networks[namesConfig[token]].icon}`,
                address: synths[namesConfig[token]][token],
            };
        }
    }, []);

    const handleMetamaskClick = () => {
        if (addingToken) {
            dispatch(changeNetwork({ chainId: namesConfig[token], provider }));
            setAddingToken(true);
        } else {
            dispatch(
                importToken({
                    chainId,
                    synthAddress: assetData.address,
                    provider,
                }),
            );
        }
    };

    return (
        <>
            <Link href={backHref} passHref>
                <div className={styles.back}>
                    <Image
                        src="/images/back.svg"
                        width={9}
                        height={15}
                        quality={100}
                        alt="back-asset"
                    />
                    <p>Back</p>
                </div>
            </Link>

            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.assetData}>
                        <Image
                            src={assetData.path}
                            width={57}
                            height={57}
                            quality={100}
                            alt={`${token}-asset`}
                        />
                        <div className={styles.tokenData}>
                            <div className={styles.upperData}>
                                <p className={styles.name}>{token}</p>
                                <div className={styles.addImgWrapper}>
                                    <CopyBtn
                                        text={assetData.address}
                                        width={22}
                                        height={22}
                                    />
                                </div>
                                {provider && account && (
                                    <div
                                        className={styles.addImgWrapper}
                                        onMouseEnter={() => {
                                            setTooltipVisible(true);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipVisible(false);
                                        }}
                                        onClick={handleMetamaskClick}
                                    >
                                        <Image
                                            width={24}
                                            height={24}
                                            className={styles.metamaskBtnImg}
                                            quality={100}
                                            src={`/images/connectors/${WalletProviderNames.MetaMask}.svg`}
                                            alt="Add to MetaMask"
                                        />
                                        <HoverTooltip
                                            isVisible={tooltipVisible}
                                            text="Add to MetaMask"
                                        />
                                    </div>
                                )}
                            </div>
                            <p className={styles.fullName}>
                                {STABLES[token].full}
                            </p>
                        </div>
                    </div>
                    <div className={styles.infoWrapper}>
                        <div className={styles.info}>
                            <p className={styles.infoHeader}>Wallet Balance</p>
                            <p className={styles.infoData}>
                                {balance} {token}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.infoHeader}>
                                Currently locked amount
                            </p>
                            <p className={styles.infoData}>
                                {locked} {token}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.infoHeader}>Current APR</p>
                            <p className={styles.infoData}>{balance}%</p>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.infoHeader}>Total earned</p>
                            <p className={styles.infoData}>{balance} ENTGL</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CryptoHeader;
