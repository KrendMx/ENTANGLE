import React from 'react';
import InvestCardFantom from './Fantom';
import InvestCardAvax from './Avalanche';
import type { IState } from '../index';

interface IProps {
    avaxState: IState;
    ftmState: IState;
}

const InvestCard: React.FC<IProps> = ({ ftmState, avaxState }) => (
    <div>
        {Number(ftmState?.positions) > 0 ? (
            <InvestCardFantom
                price={ftmState?.price!}
                positions={ftmState?.positions!}
            />
        ) : undefined}
        {Number(avaxState?.positions) > 0 ? (
            <InvestCardAvax
                price={avaxState?.price!}
                positions={avaxState?.positions!}
            />
        ) : undefined}
        {Number(avaxState?.positions) <= 0
        && Number(ftmState?.positions) <= 0 ? (
            <h2
                style={{
                  textAlign: 'center',
                  fontSize: '3rem',
                  margin: '100px 0',
                }}
            >
                You do not have purchased synth
            </h2>
          ) : undefined}
    </div>
);

export default InvestCard;
