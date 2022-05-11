import React, { useEffect, useMemo } from 'react';
import InvestCardExp from './InvestCars.example';
import type { IState, IFilter } from '../index';

interface IProps {
    avaxState: IState;
    ftmState: IState;
    avgPrice?: {
        fantomSynth: number;
        avaxSynth: number;
    };
    isLoaded: boolean;
    filter: IFilter;
}

const InvestCard: React.FC<IProps> = ({
    ftmState,
    avaxState,
    isLoaded,
    avgPrice,
    filter,
}) => {
    const loader = (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '100px 0',
                fontSize: '3rem',
            }}
        >
            <i className="fa fa-spinner fa-spin" />
        </div>
    );
    const hasPhantom = Number(ftmState?.positions) > 0;
    const hasAvax = Number(avaxState?.positions) > 0;
    const hasNoOne = !hasPhantom && !hasAvax;
    let cards = [
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
    ];
    const data = useMemo(() =>
        cards.map((el, key) => (
            el.position
                ? (
                    <InvestCardExp
                        key={key}
                        chainId={el.chainId as '250' | '43114'}
                        description={el.description}
                        positions={el.position}
                        price={el.price}
                    />
                )
                : undefined
        )), [cards, filter]);

    useEffect(() => {
        switch (filter) {
        case 'l1': {
            cards = cards.sort((a, b) => (a.price > b.price ? 1 : -1));
            break;
        }
        case 'l2': {
            cards = cards.sort((a, b) => (a.price < b.price ? 1 : -1));
            break;
        }
        case 'l3': {
            cards = cards.sort((a, b) => (a.position > b.position ? 1 : -1));
            break;
        }
        case 'l4': {
            cards = cards.sort((a, b) => (a.position > b.position ? 1 : -1));
            break;
        }
        default:
            break;
        }
        console.log(cards);
    }, [filter]);
    return (
        <div>
            {!isLoaded ? (
                loader
            ) : (
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
                    : data
            )}
        </div>
    );
};

export default InvestCard;
