import React, { useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import Typography from 'UI/ui-kit/Typography';
import { availableSingleSideNetworks } from 'utils/Global/Vars';
import type { IDepositeProps } from './Deposite.interfaces';
import styles from './style.module.css';
import { DepositTab } from './DepositTab';
import { YieldTab } from './YielTab';

export const DepositPage: React.FC<IDepositeProps> = ({ query, reverse }) => {
    const { first, second, time } = query;

    const { t: tDep } = useTranslation('ssasdep');

    const { t: tIndex } = useTranslation('index');

    const { t: tSsas } = useTranslation('ssas');

    return (
        <div className={styles.wrapper}>
            <div className={styles.back}>
                <span
                    className={styles.dFlex}
                    onClick={() => {
                        Router.back();
                    }}
                >
                    <Image
                        src="/images/back.svg"
                        width={9}
                        height={15}
                        quality={100}
                        alt="back-asset"
                    />
                    <p>{tIndex('back')}</p>
                </span>
            </div>
            <div className={styles.dFlex}>
                <Typography type="title" classNameModifier={styles.header}>
                    {`${tDep('deposit')} ${
                        availableSingleSideNetworks[first].abbr
                    } / ${availableSingleSideNetworks[second].abbr}`}
                </Typography>
                <div className={styles.images}>
                    <Image
                        width={43}
                        height={43}
                        quality={100}
                        className={styles.absImage}
                        alt=""
                        src={availableSingleSideNetworks[second].mainIcon}
                    />
                    <Image
                        width={43}
                        height={43}
                        quality={100}
                        alt=""
                        src={availableSingleSideNetworks[first].mainIcon}
                    />
                </div>
            </div>
            <Typography type="textBody" classNameModifier={styles.headerDesc}>
                {tSsas('description')}
            </Typography>
            <DepositTab {...query} />
            <div className={styles.yieldHeader}>
                <div>
                    <Typography type="title" classNameModifier={styles.header}>
                        {tDep('yourYield')}
                    </Typography>
                    <Typography
                        type="textBody"
                        classNameModifier={styles.headerDesc}
                    >
                        {tDep('checkYourResultsHere')}
                    </Typography>
                </div>
            </div>
            <YieldTab
                firstChainId={first}
                secondChainId={second}
                duration={Number(time)}
            />
        </div>
    );
};
