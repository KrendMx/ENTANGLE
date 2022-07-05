import React, { useEffect } from 'react';
import Image from 'next/image';
import GradientButton from '@/components/ui-kit/GradientButton';
import styles from '../style.module.css';
import type { availableChains } from '@/src/utils/GlobalConst';
import { networks } from '@/src/utils/GlobalConst';
import type { IChain } from '@/src/ChainService/ChainService.interface';
import HintModal from '@/components/ui-kit/HintModal';

type PropType = {
    chainId: availableChains;
    description: string;
    positions: number;
    price: number;
    bgGradient: string;
    cardType: string;
    cardTypeLabelBg:string,
    cardTypeLabelColor:string,
    currencyName: IChain,
}

const LockedCardExp: React.FC<PropType> = ({
    chainId,
    description,
    bgGradient,
    cardTypeLabelBg,
    cardTypeLabelColor,
}) => {
    useEffect(() => {}, []);
    return (
        <div className={styles.rootLook} style={{ background: bgGradient || '' }}>
            <div className={styles.logoWrapper}>
                <Image
                    width={64}
                    height={64}
                    quality={100}
                    src={`/images/networks/${networks[chainId].icon}`}
                    alt="alt"
                    className={styles.logo}
                />
            </div>
            <div className={styles.main}>
                <div className={styles.pare}>
                    <p>{`f${networks[chainId].currencyMin}`}</p>
                    <span style={{ margin: '0 10px 0 5px' }}>
                        <HintModal>
                            <p>test</p>
                        </HintModal>
                    </span>
                    <button
                        className={styles.cardLabel}
                        style={{ background: cardTypeLabelBg }}
                    >
                        <p style={{ color: cardTypeLabelColor }}>Locked</p>

                    </button>
                </div>
                <p className={styles.undertitle}>{description}</p>
            </div>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Network</p>
                    <p className={styles.itemValue}>Avalanche</p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Locked Amount ($)</p>
                    <p className={styles.itemValue}>125</p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>APR (%)</p>
                    <p className={styles.itemValue}>120%</p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Lock time (Total)</p>
                    <p className={styles.itemValue}>12 months</p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Lock time (Remaining)</p>
                    <p className={styles.itemValue}>1 month 12 days</p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>Profit</p>
                    <p className={styles.itemValue}>123 $ENTGL</p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <GradientButton
                        title="Withdraw"
                        disabled={false}
                        onClick={() => {
                        }}
                        titleClass={styles.buttonTitleClass}
                    />
                </li>
            </ul>
        </div>
    );
};

export default LockedCardExp;
