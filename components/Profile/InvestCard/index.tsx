import React, { useEffect, useMemo, useState } from 'react';
import InvestCardExp from './InvestCars.example';
import type { availableChains } from '../../../src/utils/GlobalConst';
import type { IState, IFilter } from '../index';

interface IProps {
    avaxState: IState;
    ftmState: IState;
    avgPrice?: {
        fantomSynth: number;
        avaxSynth: number;
    };
    filter: IFilter;
}

type ICard = {
    chainId: string,
    description: string,
    position: string,
    avg: number,
    price: string,
}

const InvestCard: React.FC<IProps> = ({
    ftmState,
    avaxState,
    avgPrice,
    filter,
}) => {
    const [cards, setCards] = useState<ICard[]>([
        {
            chainId: '250',
            description: 'Generates yield by running an autocompound UST/USDC strategy on sunny.ag',
            position: ftmState?.positions,
            avg: avgPrice?.fantomSynth,
            price: ftmState?.price,
        },
        {
            chainId: '43114',
            description: 'Generates yield by running an autocompound UST/USDC strategy on sunny.ag',
            position: avaxState?.positions,
            avg: avgPrice?.avaxSynth,
            price: avaxState?.price,
        },
        {
            chainId: '56',
            description: 'Generates yield by running an autocompound UST/USDC strategy on sunny.ag',
            position: '0',
            avg: 0,
            price: '0',
        },
    ]);
    const hasPhantom = Number(ftmState?.positions) > 0;
    const hasAvax = Number(avaxState?.positions) > 0;
    const hasNoOne = !hasPhantom && !hasAvax;

    useEffect(() => {
        switch (filter) {
        case 'l1': {
            setCards(cards.sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1)));
            break;
        }
        case 'l2': {
            setCards(cards.sort((a, b) => (Number(a.price) < Number(b.price) ? 1 : -1)));
            break;
        }
        case 'l3': {
            setCards(cards.sort((a, b) => (a.position > b.position ? 1 : -1)));
            break;
        }
        case 'l4': {
            setCards(cards.sort((a, b) => (a.position > b.position ? 1 : -1)));
            break;
        }
        default:
            break;
        }
    }, [filter]);

    return (
        <div>
            {
                hasNoOne
                    ? (
                        <h2
                            style={{
                                textAlign: 'center',
                                fontSize: '3rem',
                                margin: '100px 0',
                            }}
                        >
                            You do not have purchased synth
                        </h2>
                    )
                    : cards.map((el, key) => (
                        Number(el.position)
                            ? (
                                <InvestCardExp
                                    key={key}
                                    chainId={el.chainId as availableChains}
                                    description={el.description}
                                    positions={el.position}
                                    price={el.price}
                                />
                            )
                            : undefined
                    ))
            }
        </div>
    );
};

export default InvestCard;
