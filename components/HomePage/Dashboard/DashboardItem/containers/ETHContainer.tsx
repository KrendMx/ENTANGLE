import React, { useEffect, useMemo, useReducer } from 'react';
import { Contract, providers, BigNumber } from 'ethers';
import DashboardItem from '../index';
import type { ContainerStateType } from './types';

const ETHContainer = () => {
  const [state, setState] = useReducer(
    (
      containerState: ContainerStateType,
      stateUpdate: Partial<ContainerStateType>,
    ) => ({ ...containerState, ...stateUpdate }),
    {
      apr: 'TBA',
      currentDeposits: '$0',
      totalDeposits: '0 MIM/UST LP',
      available: '0',
      totalAvailable: '$0',
      price: '0',
      positions: '$0',
      totalPositions: 'MIM/UST Synthetic LP',
      rowGradient: '',
    },
  );

  const data = {
    icon: 'etheriumDashboard.svg',
    bgGradient:
            'linear-gradient(90deg, rgba(152,152,152,0.2) 0%, rgba(246, 246, 246, 0) 96.87%)',
    heading: 'MIM-UST',
    chainId: '43114',
    priceCurrency: 'MIM/UST Synthetic LP',
    description:
            'Generates yield by running autocompounded mim/UST strategy on convexfinance.com',
    disabled: true,
    ...state,
  } as const;

  return <DashboardItem {...data} />;
};

export default ETHContainer;
