import React from 'react';
import InvestCardFantom from './Fantom';
import InvestCardAvax from './Avalanche';
import type {IState} from '../index';

interface IProps {
    avaxState: IState;
    ftmState: IState;
    isLoaded: boolean;
}

const InvestCard: React.FC<IProps> = ({ftmState, avaxState, isLoaded}) => {
    const loader = <div style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '100px 0',
        fontSize: '3rem'
    }}><i
        className="fa fa-spinner fa-spin"
    /></div>;
    const hasPhantom = Number(ftmState?.positions) > 0;
    const hasAvax = Number(avaxState?.positions) > 0;
    const hasNoOne = !hasPhantom && !hasAvax;
    return <div>
        {!isLoaded
            ? loader
            : <>
                {hasAvax ? (
                    <InvestCardAvax
                        price={avaxState?.price!}
                        positions={avaxState?.positions!}
                    />
                ) : undefined}
                {hasPhantom ? (
                    <InvestCardFantom
                        price={ftmState?.price!}
                        positions={ftmState?.positions!}
                    />
                ) : undefined}
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
                ) : undefined}</>
        }
    </div>
};

export default InvestCard;
