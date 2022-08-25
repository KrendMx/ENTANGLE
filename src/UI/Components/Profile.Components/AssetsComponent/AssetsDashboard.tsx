import classNames from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import Typography from 'src/UI/ui-kit/Typography';
import InvestCardExp from '../InvestCard/Card/InvestCards';
import type { ICardUnit, IProps } from '../InvestCard/InvestCard.interfaces';
import { CardsOrder, generateInitState } from '../InvestCard/InvestCards.const';
import styles from './style.module.css';
import Pager from '../TransactionHistory/Pager/Pager';

const AssetsDashboard: React.FC<IProps> = ({ balances, filter, hasTokens }) => {
    const [cards, setCards] = useState<ICardUnit[]>([]);

    const InitCards = useMemo(() => generateInitState(balances), [balances]);

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

    const { t } = useTranslation('profile');

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [pageLimit, setPageLimit] = useState<number>(8);
    useEffect(() => {
        setCurrentPage(1);
    }, [pageLimit]);

    return (
        <div>
            <div className={styles.cardsWrapper}>
                {!hasTokens ? (
                    <div
                        style={{
                            display: 'flex',
                            height: '100%',
                            width: '100%',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
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
                    </div>
                ) : (
                    <div>
                        <div>
                            <div className={styles.cardWrapper}>
                                {cards
                                    .slice(
                                        (currentPage - 1) * pageLimit,
                                        currentPage * pageLimit,
                                    )
                                    .map((el, key) =>
                                        (Number(el.positions) ? (
                                            <InvestCardExp
                                                chainId={el.chainId}
                                                description={el.description}
                                                positions={el.positions}
                                                price={el.price}
                                                bgGradient={el.bgGradient}
                                                cardType="Synthetic-LP"
                                                cardTypeLabelBg={
                                                    el.cardTypeLabelBg
                                                }
                                                cardTypeLabelColor={
                                                    el.cardTypeLabelColor
                                                }
                                                currencyName={el.currencyName}
                                            />
                                        ) : undefined))}
                            </div>
                        </div>
                    </div>
                )}
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        margin: '10px 0 40px',
                    }}
                >
                    <div style={{ width: 'auto' }}>
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
            </div>
        </div>
    );
};

export default AssetsDashboard;
