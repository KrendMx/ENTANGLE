import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
    WalletProviderNames, networks,
    namesConfig,
    STABLES,
    synths,
} from 'utils/Global/Vars';
import { useStore } from 'core/store';
import type { CryptoHeaderProps } from './CryptoHeader.interfaces';

import styles from './style.module.css';
import HoverTooltip from '../../ui-kit/HoverTooltip/HoverTooltip';
import CopyBtn from '../../ui-kit/CopyBtn/CopyBtn';

const CryptoHeader: React.FC<CryptoHeaderProps> = ({
    token,
    isStable,
    apr,
    locked,
    backHref,
    balance,
    earned,
}) => {
    const { store } = useStore((store) => ({
        WalletEntity: store.WalletEntity,
    }));

    const { chainId, provider, account } = store.WalletEntity;

    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

    const { t } = useTranslation('stable');
    const { t: tIndex } = useTranslation('index');

    const assetData = useMemo(() => {
        if (isStable) {
            return {
                path: `/images/stables/${token.toLowerCase()}.svg`,
                address: STABLES[token].address[chainId],
            };
        }
        return {
            path: `/images/networks/${networks[namesConfig[token]].icon}`,
            address: synths[namesConfig[token]][token],
        };
    }, []);

    const handleMetamaskClick = async () => {
        const options = {
            type: 'ERC20',
            options: {
                address: STABLES.USDC.address[chainId],
                symbol: 'USDC',
                decimals: STABLES.USDC.dec[chainId],
            },
        };
        // @ts-ignore
        await provider.send('wallet_watchAsset', options);
    };

    return (
        <>
            <div className={styles.back}>
                <Link href={backHref} passHref>
                    <span className={styles.dFlex}>
                        <Image
                            src="/images/back.svg"
                            width={9}
                            height={15}
                            quality={100}
                            alt="back-asset"
                        />
                        <p>{tIndex('back')}</p>
                    </span>
                </Link>
            </div>

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
                                        text={STABLES.USDC.address[chainId]}
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
                                            text={tIndex('metamask')}
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
                            <p className={styles.infoHeader}>{t('walletBalance')}</p>
                            <p className={styles.infoData}>
                                {balance}
                                {' '}
                                {token}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.infoHeader}>
                                {t('currentlyLocked')}
                            </p>
                            <p className={styles.infoData}>
                                {locked}
                                {' '}
                                {token}
                            </p>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.infoHeader}>{t('currentAPR')}</p>
                            <p className={styles.infoData}>
                                {apr}
                                %
                            </p>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.infoHeader}>{t('totalEarned')}</p>
                            <p className={styles.infoData}>
                                {earned}
                                {' '}
                                ENTGL
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CryptoHeader;
