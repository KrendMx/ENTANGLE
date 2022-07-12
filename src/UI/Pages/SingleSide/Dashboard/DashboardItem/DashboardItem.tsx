import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Typography from 'src/UI/ui-kit/Typography';
import HintModal from 'src/UI/ui-kit/HintModal';
import TextLoader from 'src/UI/ui-kit/TextLoader/TextLoader';
import GradientButton from 'src/UI/ui-kit/GradientButton';
import { availableSingleSideNetworks } from 'src/utils/Global/Vars';
import styles from './style.module.css';
import type { IDashboardSASSItems } from '../Dashboard.interfaces';

export const DashboardItem: React.FC<IDashboardSASSItems> = (props) => {
    const {
        firstChainId,
        secondChainId,
        depositeInFirstCurrency,
        depositeInSecondCurrency,
        desc,
        term,
        projectedILProtection,
        APR,
    } = props;
    return (
        <div className={styles.wrapper}>
            <span
                className={styles.topGradient}
                style={
                    {
                        backgroundImage: `linear-gradient(to right, 
                            ${availableSingleSideNetworks[firstChainId].mainColor}, 
                            ${availableSingleSideNetworks[secondChainId].mainColor})`,
                    } as React.CSSProperties
                }
            />
            <div className={styles.cardHeader}>
                <div className={styles.images}>
                    <Image
                        width={43}
                        height={43}
                        quality={100}
                        alt=""
                        src={availableSingleSideNetworks[firstChainId].mainIcon}
                    />
                    <Image
                        width={43}
                        height={43}
                        quality={100}
                        className={styles.absImage}
                        alt=""
                        src={
                            availableSingleSideNetworks[secondChainId].mainIcon
                        }
                    />
                </div>
                <Typography type="title" classNameModifier={styles.headerTitle}>
                    {`${availableSingleSideNetworks[firstChainId].abbr}/
                    ${availableSingleSideNetworks[secondChainId].abbr}`}
                </Typography>
            </div>
            <p className={styles.description}>{desc}</p>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    <p>{`Deposit in ${availableSingleSideNetworks[firstChainId].abbr}`}</p>
                    <HintModal>
                        <p>{`Deposit in ${availableSingleSideNetworks[secondChainId].abbr}`}</p>
                    </HintModal>
                </div>
                <div className={styles.sectionRow}>
                    {depositeInFirstCurrency !== null ? (
                        <p className={styles.sectionValue}>
                            {depositeInFirstCurrency !== 0 ? (
                                `${depositeInFirstCurrency} ${availableSingleSideNetworks[firstChainId].abbr}`
                            ) : (
                                <span style={{ color: 'var(--green)' }}>
                                    Awaiting Deposit
                                </span>
                            )}
                        </p>
                    ) : (
                        <TextLoader
                            bgGradient={`linear-gradient(to right, 
                            ${availableSingleSideNetworks[firstChainId].mainColor}, 
                            ${availableSingleSideNetworks[secondChainId].mainColor})`}
                        />
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    <p>{`Deposit in ${availableSingleSideNetworks[secondChainId].abbr}`}</p>
                    <HintModal>
                        <p>{`Deposit in ${availableSingleSideNetworks[secondChainId].abbr}`}</p>
                    </HintModal>
                </div>
                <div className={styles.sectionRow}>
                    {depositeInSecondCurrency !== null ? (
                        <p className={styles.sectionValue}>
                            {depositeInSecondCurrency !== 0 ? (
                                `${depositeInSecondCurrency} ${availableSingleSideNetworks[secondChainId].abbr}`
                            ) : (
                                <span style={{ color: 'var(--green)' }}>
                                    Awaiting Deposit
                                </span>
                            )}
                        </p>
                    ) : (
                        <TextLoader
                            bgGradient={`linear-gradient(to right, 
                        ${availableSingleSideNetworks[firstChainId].mainColor}, 
                        ${availableSingleSideNetworks[secondChainId].mainColor})`}
                        />
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    <p>Staking term</p>
                </div>
                <div className={styles.sectionRow}>
                    {term ? (
                        <p className={styles.sectionValue}>{`${term} days`}</p>
                    ) : (
                        <TextLoader
                            bgGradient={`linear-gradient(to right, 
                        ${availableSingleSideNetworks[firstChainId].mainColor}, 
                        ${availableSingleSideNetworks[secondChainId].mainColor})`}
                        />
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    <p>Projected IL Protection</p>
                </div>
                <div className={styles.sectionRow}>
                    {projectedILProtection ? (
                        <p className={styles.sectionValue}>
                            {`${projectedILProtection}%`}
                        </p>
                    ) : (
                        <TextLoader
                            bgGradient={`linear-gradient(to right, 
                        ${availableSingleSideNetworks[firstChainId].mainColor}, 
                        ${availableSingleSideNetworks[secondChainId].mainColor})`}
                        />
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    <p>APR, %</p>
                </div>
                <div className={styles.sectionRow}>
                    {APR ? (
                        <p className={styles.sectionValue}>{`${APR}%`}</p>
                    ) : (
                        <TextLoader
                            bgGradient={`linear-gradient(to right, 
                        ${availableSingleSideNetworks[firstChainId].mainColor}, 
                        ${availableSingleSideNetworks[secondChainId].mainColor})`}
                        />
                    )}
                </div>
            </div>
            <div className={styles.footer}>
                <Link
                    href={`/single-side-staking/deposit?first=${firstChainId}&second=${secondChainId}&time=${term}`}
                    as={`/single-side-staking/deposit?first=${firstChainId}&second=${secondChainId}&time=${term}`}
                    passHref
                >
                    <GradientButton title="Select" onClick={() => {}} />
                </Link>
            </div>
        </div>
    );
};
