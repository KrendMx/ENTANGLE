import React, { useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment/moment';
import classNames from 'classnames';
import type { availableChains } from 'utils/Global/Types';
import { networks } from 'utils/Global/Vars';
import GradientButton from 'UI/ui-kit/GradientButton';
import CopyBtn from 'UI/ui-kit/CopyBtn/CopyBtn';
import { useTranslation } from 'react-i18next';
import styles from './style.module.css';

type CardProps = {
    id: string;
    chainId: availableChains;
    date: Date;
    price: number;
};
const HistoryCard: React.FC<CardProps> = ({
    chainId, date, price, id,
}) => {
    const transactionDateMoment = moment(date);

    const { t } = useTranslation('profile');

    const detectGradient = (): string => {
        switch (chainId) {
        case '43114':
            return 'linear-gradient(90deg, rgba(241, 78, 86, 0.10) 0%, rgba(241, 78, 86, 0.04) 100%)';
        case '250':
            return 'linear-gradient(90deg, rgba(0, 148, 255, 0.10) 0%, rgba(0, 148, 255, 0.04) 100%)';
        case '56':
            return 'linear-gradient(90deg, rgba(255, 199, 0, 0.10) 0%, rgba(255, 199, 0, 0.04) 100%)';
        case '1':
            return 'linear-gradient(90deg, rgba(152,152,152,0.15) 0%, rgba(246, 246, 246, 0) 100%)';
        case '100':
            return 'linear-gradient(90deg, rgba(252,252,252,0.5) 0%, rgba(246, 246, 246, 0) 100%)';
        default:
            return '';
        }
    };

    return (
        <div
            className={styles.root}
            style={{ backgroundImage: detectGradient() }}
        >
            <div className={styles.logoWrapper}>
                <Image
                    width={100}
                    height={100}
                    quality={100}
                    src={`/images/networks/${networks[chainId]?.icon}`}
                    alt="alt"
                    className={styles.logo}
                />
            </div>
            <div className={styles.main}>
                <p className={styles.pare}>{networks[chainId]?.currencyMin}</p>
                <div className={styles.undertitle}>
                    {`${id.slice(0, 10)}...${id.slice(id.length - 10)}`}
                    <CopyBtn text={id} />
                </div>
            </div>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('dateTime')}</p>
                    <p className={styles.itemValue}>
                        {`${transactionDateMoment.format(
                            'Do MMMM YYYY hh:mm',
                        )} UTС`}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('price')}</p>
                    <p className={classNames(styles.itemValue)}>
                        {price < 0 && '-'}
                        $
                        {Math.abs(price).toFixed(4)}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('amount')}</p>
                    <p className={styles.itemValue}>96.589 $ENTGL</p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <GradientButton
                        wrapperClass={styles.wrapperButtonClass}
                        title={t('viewExplorer')}
                        onClick={() => {}}
                        titleClass={styles.buttonTitleClass}
                    />
                </li>
            </ul>
        </div>
    );
};

export default HistoryCard;
