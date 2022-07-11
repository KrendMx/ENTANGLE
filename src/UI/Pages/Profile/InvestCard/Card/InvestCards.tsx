import React, {
    useState,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { useTranslation } from 'react-i18next';
import { networks } from '@/src/utils/GlobalConst';

import styles from '../style.module.css';
import { useAppSelector } from '@/src/Redux/store/hooks/redux';
import type { availableChains } from '@/src/utils/GlobalConst';
import HintModal from '@/components/ui-kit/HintModal';
import GradientButton from '@/components/ui-kit/GradientButton';

import PayModal from '../../../HomePage/PayModal/index';
import Modal from '@/components/Modal';
import type { IChain } from '@/src/ChainService/ChainService.interface';
import TextLoader from 'UI/ui-kit/TextLoader/TextLoader';

interface IState {
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

const InvestCardExp: React.FC<IState> = ({
    positions,
    price,
    chainId,
    description,
    bgGradient,
    cardTypeLabelBg,
    cardTypeLabelColor,
    currencyName,
}) => {
    const {
        profits, avgPrices,
    } = useAppSelector((state) => state.userReducer);

    const [isClose, setIsClose] = useState<boolean | null>(false);

    const cardData = useAppSelector((state) => state.cardDataReducer);

    const { t } = useTranslation('index');
    return (
        <div className={styles.root} style={{ background: bgGradient || '' }}>
            {isClose ? (
                <Modal handleClose={() => { setIsClose(false); }}>
                    <PayModal
                        available={cardData[chainId].available}
                        totalAvailable={cardData[chainId].available}
                        price={cardData[chainId].price}
                        handleClose={() => { setIsClose(false); }}
                    />
                </Modal>
            ) : null}
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
                        <p style={{ color: cardTypeLabelColor }}>Syntetic-LP</p>

                    </button>
                </div>
                <p className={styles.undertitle}>{description}</p>
            </div>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('yourPosition')}</p>
                    <p className={styles.itemValue}>{Number(positions.toFixed(2))}</p>
                    <p className={styles.undertitle}>
                        {networks[chainId].currency}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('price')}</p>
                    <p className={styles.itemValue}>{`$${Number(price.toFixed(6))}`}</p>
                    <p className={styles.undertitle}>
                        {networks[chainId].currencyMin}
                    </p>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('avgPrice')}</p>
                    {avgPrices[chainId] ? (
                        <>
                            <p className={styles.itemValue}>
                                $
                                {avgPrices[chainId]}
                            </p>
                            <p className={styles.undertitle}>
                                {networks[chainId].currency}
                            </p>
                        </>
                    ) : (
                        <p className={styles.itemValue}>
                            <TextLoader bgGradient={bgGradient} />
                        </p>
                    )}
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <p className={styles.undertitle}>{t('profit')}</p>
                    {profits.get(chainId)?.value ? (
                        <>
                            <p className={styles.itemValue}>
                                $
                                {profits.get(chainId)?.value}
                            </p>
                            <p
                                className={classNames(
                                    styles.undertitle,
                                    {
                                        [styles.loss]:
                                            profits.get(chainId)?.change! < 0,
                                    },
                                    {
                                        [styles.up]:
                                            profits.get(chainId)?.change! > 0,
                                    },
                                )}
                            >
                                {profits.get(chainId)?.change! > 0
                                    ? `+${profits.get(chainId)?.change}`
                                    : `${profits.get(chainId)?.change}`}
                                %
                            </p>
                        </>
                    ) : (
                        <p className={styles.itemValue}>
                            <TextLoader bgGradient={bgGradient} />
                        </p>
                    )}
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <GradientButton
                        title={t('buyAndSell')}
                        disabled={false}
                        onClick={() => {
                            sessionStorage.setItem('card', currencyName);
                            setIsClose(true);
                        }}
                        wrapperClass={styles.wrapperButtonClass}
                        titleClass={styles.buttonTitleClass}
                    />
                </li>
            </ul>
        </div>
    );
};

export default InvestCardExp;
