import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import styles from './style.module.css';
import type { MintDashboardItemCardType } from '../../types';
import TextLoader from '../../../ui-kit/TextLoader/TextLoader';
import GradientButton from '../../../ui-kit/GradientButton';

type MintDashBoardItemProps = {
    isFiltered: boolean;
} & MintDashboardItemCardType;

const MintDashboardItem: React.FC<MintDashBoardItemProps> = ({
    bgGradient,
    icon,
    heading,
    description,
    priceCurrency,
    disabled,
    apr,
    price,
    currentDeposits,
    isFiltered,
}) => (
    <div
        className={`${styles.overlayWrapper} ${
            isFiltered ? styles.hidden : null
        }`}
    >
        {disabled && <div className={styles.overlayDisabled} />}
        <div className={styles.wrapper}>
            <div className={styles.topBg}>
                <div className={styles.bg} style={{ background: bgGradient }} />
            </div>
            <div className={styles.top}>
                <div className={styles.logo}>
                    <Image
                        width={60}
                        height={60}
                        quality={100}
                        src={`/images/networks/${icon}`}
                        alt=""
                    />
                </div>
                <p className={styles.title}>Synthetic-LP</p>
            </div>
            <div className={styles.heading}>{`${heading} Synth-LP`}</div>
            <div className={styles.description}>{description}</div>
            <div className={styles.section}>
                <p className={styles.sectionTitle}>Price</p>
                <div className={styles.sectionRow}>
                    {price ? (
                        <>
                            <p className={styles.sectionValue}>{`$${price}`}</p>
                            <p className={styles.sectionSubValue}>
                                {priceCurrency}
                            </p>
                        </>
                    ) : (
                        <TextLoader bgGradient={bgGradient} />
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <p className={styles.sectionTitle}>Current Projected APR</p>
                <div className={styles.sectionRow}>
                    {apr ? (
                        <p className={styles.sectionValue}>{apr}</p>
                    ) : (
                        <TextLoader bgGradient={bgGradient} />
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <p className={styles.sectionTitle}>Current Deposits</p>
                <div className={styles.sectionRow}>
                    <p className={styles.sectionValue}>{currentDeposits}</p>
                    <p className={styles.sectionSubValue}>
                        fUSDT/USDC Synthetic LP
                    </p>
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <div className={styles.mt2}>
                    <GradientButton
                        title="Mint Synth-LP"
                        onClick={() => {}}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    </div>
);
export default MintDashboardItem;
