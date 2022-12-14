import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Typography from 'UI/ui-kit/Typography';
import HintModal from 'UI/ui-kit/HintModal';
import TextLoader from 'UI/ui-kit/TextLoader/TextLoader';
import GradientButton from 'UI/ui-kit/GradientButton';
import { availableSingleSideNetworks } from 'utils/Global/Vars';
import { DescriptionGenerator } from 'src/UI/ui-kit/DescriptionGenerator';
import { useRouter } from 'next/router';
import TextGroup from 'src/UI/ui-kit/TextGrop';
import styles from './style.module.css';
import type { IDashboardSASSItems } from '../Dashboard.interfaces';

export const DashboardItem: React.FC<IDashboardSASSItems> = (props) => {
    const {
        firstChainId,
        secondChainId,
        depositeInFirstCurrency,
        depositeInSecondCurrency,
        site,
        term,
        projectedILProtection,
        APR,
    } = props;

    const { t: tIndex } = useTranslation('index');
    const { t } = useTranslation('ssas');

    const Router = useRouter();
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
                <Typography type="title" classNameModifier={styles.headerTitle}>
                    {`${availableSingleSideNetworks[firstChainId].abbr}/
                    ${availableSingleSideNetworks[secondChainId].abbr}`}
                </Typography>
                <div className={styles.images}>
                    <Image
                        width={44}
                        height={44}
                        quality={100}
                        alt=""
                        src={availableSingleSideNetworks[firstChainId].mainIcon}
                    />
                    <Image
                        width={44}
                        height={44}
                        quality={100}
                        className={styles.absImage}
                        alt=""
                        src={
                            availableSingleSideNetworks[secondChainId].mainIcon
                        }
                    />
                </div>
            </div>
            <DescriptionGenerator
                customClassName={styles.description}
                currencyName={`${availableSingleSideNetworks[firstChainId].abbr}/
                    ${availableSingleSideNetworks[secondChainId].abbr}`}
                currencySite={site}
            />
            <TextGroup
                title={`${t('depositeIn')} ${
                    availableSingleSideNetworks[firstChainId].abbr
                }`}
                value={depositeInFirstCurrency !== null ? (
                    <p className={styles.sectionValue}>
                        {depositeInFirstCurrency !== 0 ? (
                            `${depositeInFirstCurrency} ${availableSingleSideNetworks[firstChainId].abbr}`
                        ) : (
                            <span style={{ color: 'var(--green)' }}>
                                {t('awaitingDeposit')}
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
                hintText={`${t('depositeIn')} ${
                    availableSingleSideNetworks[secondChainId].abbr
                }`}
                customClassNameTitle={styles.sectionTitle}
                customClassNameValue={styles.sectionValue}
            />
            <TextGroup
                title={`${t('depositeIn')} ${
                    availableSingleSideNetworks[secondChainId].abbr
                }`}
                value={depositeInSecondCurrency !== null ? (
                    <p className={styles.sectionValue}>
                        {depositeInSecondCurrency !== 0 ? (
                            `${depositeInSecondCurrency} ${availableSingleSideNetworks[firstChainId].abbr}`
                        ) : (
                            <span style={{ color: 'var(--green)' }}>
                                {t('awaitingDeposit')}
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
                hintText={`${t('depositeIn')} ${
                    availableSingleSideNetworks[secondChainId].abbr
                }`}
                customClassNameTitle={styles.sectionTitle}
                customClassNameValue={styles.sectionValue}
            />
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    <p>{t('stakingTerm')}</p>
                </div>
                <div className={styles.sectionRow}>
                    {term ? (
                        <p className={styles.sectionValue}>
                            {`${term} ${t('days')}`}
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
                    <p>{t('ProjectedIL')}</p>
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
                    <p>APR %</p>
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
                <GradientButton
                    title={tIndex('select')}
                    onClick={() => {
                        Router.push(
                            `/single-side-staking/deposit?first=${firstChainId}&second=${secondChainId}&time=${term}`,
                        );
                    }}
                    isWhite
                />
            </div>
        </div>
    );
};
