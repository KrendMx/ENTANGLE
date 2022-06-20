import React, {
    useEffect, useState,
} from 'react';
import InvestCardExp from './InvestCars.example';
import { CardsOrder } from './InvestCards.const';
import type { availableChains } from '@/src/utils/GlobalConst';
import type { IProps, ICard } from './InvestCard.interfaces';

import styles from './style.module.css';

const InvestCard: React.FC<IProps> = ({
    balances,
    filter,
}) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const hasPhantom = Number(balances?.FTM?.positions) > 0;
    const hasAvax = Number(balances.AVAX?.positions) > 0;
    const hasBnb = Number(balances.BSC?.positions) > 0;
    const hasNoOne = !hasPhantom && !hasAvax && !hasBnb;

    const InitCards = [
        {
            chainId: '250',
            description:
                'Generates yield by running an autocompound MIM/USDC strategy on spookyswap.finance',
            position: balances?.FTM?.positions,
            price: balances?.FTM?.price,
            bgGradient: 'linear-gradient(90deg, rgba(0, 148, 255, 0.15) 0%, rgba(0, 148, 255, 0.04) 100%)',
            cardType: 'Synthetic-LP',
            cardTypeLabelColor: '#00AFFF',
            cardTypeLabelBg: '#0094FF40',
            currencyName: 'FTM',
        },
        {
            chainId: '43114',
            description:
                'Generates yield by running autocompounded USDC/USDC.e strategy on traderjoexyz.com',
            position: balances?.AVAX?.positions,
            price: balances?.AVAX?.price,
            bgGradient: 'linear-gradient(90deg, rgba(241, 78, 86, 0.15) 0%, rgba(241, 78, 86, 0.04) 100%)',
            cardType: 'Synthetic-LP',
            cardTypeLabelColor: '#E7252E',
            cardTypeLabelBg: 'linear-gradient(180deg, #F14E5640 -23.33%, #E7252E40 118.33%)',
            currencyName: 'AVAX',
        },
        {
            chainId: '56',
            description:
                'Generates yield by running an autocompound USDT/BUSD strategy on pancakeswap.finance',
            position: balances?.BSC?.positions,
            price: balances?.BSC?.price,
            bgGradient: 'linear-gradient(90deg, rgba(255, 199, 0, 0.15) 0%, rgba(255, 199, 0, 0.04) 100%)',
            cardType: 'Synthetic-LP',
            cardTypeLabelColor: '#FF8A00',
            cardTypeLabelBg: 'linear-gradient(180deg, #FFC70045 -23.33%, #FF8A0045 118.33%)',
            currencyName: 'BSC',
        },
    ];

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

    return (
        <div>
            {!hasNoOne ? (
                <h2
                    style={{
                        textAlign: 'center',
                        fontSize: '3rem',
                        margin: '100px 0',
                    }}
                >
                    You do not have purchased synth
                </h2>
            ) : (
                <div className={styles.cardsWrapper}>
                    {cards.map((el, key) =>
                        (!Number(el.position) ? (
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
            )}
        </div>
    );
};

export default InvestCard;
