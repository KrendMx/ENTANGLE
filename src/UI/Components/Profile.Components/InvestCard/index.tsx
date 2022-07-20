import React, {
    useEffect, useState, useMemo,
} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import type { availableChains } from 'utils/Global/Types';
import InvestCardExp from 'UI/Components/Profile.Components/InvestCard/Card/InvestCards';
import { CardsOrder, generateInitState } from './InvestCards.const';
import type { IProps, ICardUnit } from './InvestCard.interfaces';

import styles from './style.module.css';
import Pager from '../TransactionHistory/Pager/Pager';

const InvestCard: React.FC<IProps> = ({
    balances,
    filter,
    hasTokens,
}) => {
    const [cards, setCards] = useState<ICardUnit[]>([]);

    const InitCards = useMemo(() => (generateInitState(balances)), [balances]);

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

    const [pageLimit, setPageLimit] = useState<number>(5);

    const { t } = useTranslation('profile');

    return (
        <div>
            {!hasTokens ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image
                            src="/images/bar-graph.png"
                            alt=""
                            quality={100}
                            width={104}
                            height={90}
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
                        ).map((el, key) => (Number(el.positions) ? (
                            <InvestCardExp
                                key={key}
                                chainId={el.chainId as availableChains}
                                description={el.description}
                                positions={el.positions}
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
