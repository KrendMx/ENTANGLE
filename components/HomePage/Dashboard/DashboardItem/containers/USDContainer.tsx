import React, { useEffect, useMemo, useReducer } from 'react';
import { Contract, providers, BigNumber } from 'ethers';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';

const USDContainer = () => {
  const [state, setState] = useReducer(
    (
      containerState: ContainerStateType,
      stateUpdate: Partial<ContainerStateType>,
    ) => ({ ...containerState, ...stateUpdate }),
    {
      apr: '15.22%',
      currentDeposits: '0',
      totalDeposits: 'UST LP',
      available: '0',
      totalAvailable: '$0',
      price: '0',
      positions: '$0',
      totalPositions: 'UST Synthetic LP',
      rowGradient:
                'linear-gradient(90deg, #2845AE 0%, rgba(84, 147, 247, 0) 96.87%)',
    },
  );

  const data = {
    icon: 'anchorDashboard.png',
    bgGradient:
            'linear-gradient(90deg, rgba(40, 69, 174, 0.2) 0%, rgba(84, 147, 247, 0) 96.87%)',
    heading: 'UST',
    chainId: '43114',
    priceCurrency: 'UST Synthetic LP',
    description:
            'Generates yield by running an autocompound UST strategy on Anchor.Potocol',
    disabled: true,
    ...state,
  } as const;

  return <DashboardItem {...data} />;
};

export default USDContainer;
