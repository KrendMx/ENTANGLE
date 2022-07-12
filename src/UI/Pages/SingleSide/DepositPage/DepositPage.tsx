import React, { useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';
import Typography from 'src/UI/ui-kit/Typography';
import { availableSingleSideNetworks } from 'src/utils/Global/Vars';
import type { IDepositeProps } from './Deposite.interfaces';
import styles from './style.module.css';
import { DepositTab } from './DepositTab';
import { YieldTab } from './YielTab';

export const DepositPage: React.FC<IDepositeProps> = ({ query }) => {
    const { first, second, time } = query;

    const { t: tIndex } = useTranslation('index');

    const [activeTab, setActiveTab] = useState<string>('10 days');

    const yieldButtons = ['10 days', '30 days', '90 days'];

    const changeActive = (x: number) => {
        setActiveTab(yieldButtons[x]);
    };

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
                    {`Deposit ${availableSingleSideNetworks[first].abbr} / ${availableSingleSideNetworks[second].abbr}`}
                </Typography>
                <div className={styles.images}>
                    <Image
                        width={43}
                        height={43}
                        quality={100}
                        alt=""
                        src={availableSingleSideNetworks[first].mainIcon}
                    />
                    <Image
                        width={43}
                        height={43}
                        quality={100}
                        className={styles.absImage}
                        alt=""
                        src={availableSingleSideNetworks[second].mainIcon}
                    />
                </div>
            </div>
            <Typography type="textBody" classNameModifier={styles.headerDesc}>
                Deposit a single token and maintain 100% upside exposure while
                earning fees and rewards.
            </Typography>
            <DepositTab {...query} />
            <div className={styles.yieldHeader}>
                <div>
                    <Typography type="title" classNameModifier={styles.header}>
                        Your Yield
                    </Typography>
                    <Typography
                        type="textBody"
                        classNameModifier={styles.headerDesc}
                    >
                        Check your results here
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
