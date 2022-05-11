import React from 'react';
import InvestCardExp from './InvestCars.example';
import type { IState } from '../index';

interface IProps {
    avaxState: IState;
    ftmState: IState;
    avgPrice?: {
        fantomSynth: number;
        avaxSynth: number;
    };
    isLoaded: boolean;
}

const InvestCard: React.FC<IProps> = ({
    ftmState,
    avaxState,
    isLoaded,
    avgPrice,
}) => {
    const cards = [
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
    const data = (hasNoOne ? (
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
        cards.map((el, key) => (
            <InvestCardExp
                key={key}
                chainId={el.chainId as '250' | '43114'}
                description={el.description}
                positions={el.position}
                price={el.price}
            />
        ))
    ));
    return (
        <div>
            {!isLoaded ? (
                loader
            ) : (
                data
            )}
        </div>
    );
};

export default InvestCard;
