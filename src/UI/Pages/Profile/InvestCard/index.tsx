import React, {
    useEffect, useState,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import InvestCardExp from './Card/InvestCards';
import { CardsOrder } from './InvestCards.const';
import type { availableChains } from '@/src/utils/GlobalConst';
import type { IProps, ICard } from './InvestCard.interfaces';

import styles from './style.module.css';
import type { IChain } from '@/src/ChainService/ChainService.interface';
import Pager from '../TransactionHistory/Pager/Pager';

const InvestCard: React.FC<IProps> = ({
    balances,
    filter,
}) => {
    const InitCards = [
        {
            chainId: '250',
            description:
                'Generates yield by running an autocompound MIM/USDC strategy on spookyswap.finance',
            position: balances?.FTM?.positions,
            price: balances?.FTM?.price,
            bgGradient: 'linear-gradient(90deg, rgba(0, 148, 255, 0.10) 0%, rgba(0, 148, 255, 0.04) 100%)',
            cardType: 'Synthetic-LP',
            cardTypeLabelColor: '#00AFFF',
            cardTypeLabelBg: '#0094FF40',
            currencyName: 'FTM' as IChain,
        },
        {
            chainId: '43114',
            description:
                'Generates yield by running autocompounded USDC/USDC.e strategy on traderjoexyz.com',
            position: balances?.AVAX?.positions,
            price: balances?.AVAX?.price,
            bgGradient: 'linear-gradient(90deg, rgba(241, 78, 86, 0.10) 0%, rgba(241, 78, 86, 0.04) 100%)',
            cardType: 'Synthetic-LP',
            cardTypeLabelColor: '#E7252E',
            cardTypeLabelBg: 'linear-gradient(180deg, #F14E5640 -23.33%, #E7252E40 118.33%)',
            currencyName: 'AVAX' as IChain,
        },
        {
            chainId: '56',
            description:
                'Generates yield by running an autocompound USDT/BUSD strategy on pancakeswap.finance',
            position: balances?.BSC?.positions,
            price: balances?.BSC?.price,
            bgGradient: 'linear-gradient(90deg, rgba(255, 199, 0, 0.10) 0%, rgba(255, 199, 0, 0.04) 100%)',
            cardType: 'Synthetic-LP',
            cardTypeLabelColor: '#FF8A00',
            cardTypeLabelBg: 'linear-gradient(180deg, #FFC70045 -23.33%, #FF8A0045 118.33%)',
            currencyName: 'BSC' as IChain,
        },
    ];

    const [cards, setCards] = useState<ICard[]>([]);
    const hasPhantom = Number(balances?.FTM?.positions) > 0;
    const hasAvax = Number(balances.AVAX?.positions) > 0;
    const hasBnb = Number(balances.BSC?.positions) > 0;
    const hasNoOne = !hasPhantom && !hasAvax && !hasBnb;

    const updateCardsFilter = () => {
        let cardsPrepared = [...cards];
        if (CardsOrder[filter]) {
            cardsPrepared = cardsPrepared.sort(CardsOrder[filter]);
        } else {
            cardsPrepared = InitCards;
        }
        setCards(cardsPrepared);
    };

    const updateCards = () => {
        setCards(InitCards);
    };

    useEffect(() => {
        updateCardsFilter();
    }, [filter]);

    useEffect(() => {
        updateCards();
    }, []);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pageLimit, setPageLimit] = useState<number>(4);

    const { t } = useTranslation('profile');

    return (
        <div>
            {hasNoOne ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image
                            src="/images/bar-graph.png"
                            alt=""
                            quality={100}
                            width={221}
                            height={190}
                        />
                    </div>
                    <h2
                        style={{
                            textAlign: 'center',
                            fontSize: '22px',
                            fontWeight: '400',
                            color: '#A3A3A3',
                            margin: '0 0 50px',
                        }}
                    >
                        {t('nowAsset')}
                    </h2>
                </>
            ) : (
                <>
                    <div className={styles.cardsWrapper}>
                        {cards.slice(
                            (currentPage - 1) * pageLimit,
                            currentPage * pageLimit,
                        ).map((el, key) => (Number(el.position) ? (
                            <InvestCardExp
                                key={key}
                                chainId={el.chainId as availableChains}
                                description={el.description}
                                positions={el.position}
                                price={el.price}
                                bgGradient={el.bgGradient}
                                cardType={el.cardType}
                                cardTypeLabelBg={el.cardTypeLabelBg}
                                cardTypeLabelColor={el.cardTypeLabelColor}
                                currencyName={el.currencyName}
                            />
                        ) : undefined))}
                    </div>
                    <div
                        className={classNames(
                            styles.flex,
                            styles.itemsCenter,
                            styles.my1,
                        )}
                    >
                        <div className={classNames(styles.flex, styles.mxAuto)}>
                            <Pager
                                selectedPage={currentPage}
                                pageCount={Math.max(
                                    Math.ceil(
                                        cards.length / pageLimit,
                                    ),
                                    1,
                                )}
                                onPageChange={(n) => {
                                    setCurrentPage(n);
                                }}
                            />

                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default InvestCard;
