import React from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import type { MintDashboardItemCardType } from '../../types';
import TextLoader from '../../../../../ui-kit/TextLoader/TextLoader';
import GradientButton from '../../../../../ui-kit/GradientButton';
import { useAppDispatch } from '@/src/Redux/store/hooks/redux';
import { changeActiveCard } from '@/src/Redux/store/reducers/AppSlice';

type MintDashBoardItemProps = {
    isFiltered: boolean;
    changeActiveData: MintDashboardItemCardType;
} & MintDashboardItemCardType;

const MintDashboardItem: React.FC<MintDashBoardItemProps> = ({
    bgGradient,
    icon,
    heading,
    description,
    vendor,
    priceCurrency,
    disabled,
    apr,
    price,
    currentDeposits,
    isFiltered,
    changeActiveData,
}) => {
    const dispatch = useAppDispatch();
    const changeActive = () => {
        dispatch(changeActiveCard(changeActiveData));
    };
    return (
        <div
            className={`${styles.overlayWrapper} ${
                isFiltered ? styles.hidden : null
            }`}
        >
            {disabled && <div className={styles.overlayDisabled} />}
            <div className={styles.wrapper}>
                <div className={styles.topBg}>
                    <div
                        className={styles.bg}
                        style={{ background: bgGradient }}
                    />
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
                <div className={styles.heading}>
                    {`${heading} Synth-LP`}
                    <div className={styles.addImgWrapper}>
                        <Image
                            src="/images/i.svg"
                            width={16}
                            height={16}
                            quality={100}
                            alt=""
                        />
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.description}>
                        {description}
                        <span style={{ color: 'white' }}>
                            &nbsp;
                            {vendor}
                        </span>
                    </div>
                </div>
                <div className={styles.section}>
                    <p className={styles.sectionTitle}>Price</p>
                    <div className={styles.sectionRow}>
                        {price ? (
                            <>
                                <p className={styles.sectionValue}>
                                    {`$${price}`}
                                </p>
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
                            onClick={() => {
                                changeActive();
                            }}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MintDashboardItem;
