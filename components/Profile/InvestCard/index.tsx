import React, {
    useEffect, useState,
} from 'react';
import InvestCardExp from './InvestCars.example';
import { CardsOrder } from './InvestCards.const';
import type { availableChains } from '@/src/utils/GlobalConst';
import type { IProps, ICard } from './InvestCard.interfaces';

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
                'Generates yield by running an autocompound UST/USDC strategy on sunny.ag',
            position: balances?.FTM?.positions,
            price: balances?.FTM?.price,
        },
        {
            chainId: '43114',
            description:
                'Generates yield by running an autocompound UST/USDC strategy on sunny.ag',
            position: balances?.AVAX?.positions,
            price: balances?.AVAX?.price,
        },
        {
            chainId: '56',
            description:
                'Generates yield by running an autocompound UST/USDC strategy on sunny.ag',
            position: balances?.BSC?.positions,
            price: balances?.BSC?.price,
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
            {hasNoOne ? (
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
                cards.map((el, key) =>
                    (Number(el.position) ? (
                        <InvestCardExp
                            key={key}
                            chainId={el.chainId as availableChains}
                            description={el.description}
                            positions={Number(el.position.toFixed(2))}
                            price={Number(el.price.toFixed(6))}
                        />
                    ) : undefined))
            )}
        </div>
    );
};

export default InvestCard;
