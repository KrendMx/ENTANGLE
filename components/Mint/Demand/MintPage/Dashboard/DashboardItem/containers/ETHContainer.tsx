import React, { useState } from 'react';
import DashboardItem from '../DashboardItem';
import type { MintDashboardItemCardType } from '../../../types';

type PropType = {
    isFiltered: boolean;
};

const AvalanceContainer: React.FC<PropType> = ({ isFiltered = false }) => {
    const [data, setData] = useState<MintDashboardItemCardType>({
        icon: 'etheriumDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(152,152,152,0.2) 0%, rgba(246, 246, 246, 0) 96.87%)',
        heading: 'aDAI-aSUSD',
        chainId: '250',
        priceCurrency: 'aDAI/aSUSD Synthetic LP',
        description: 'Generates yield by running an autocompound aDAI/aSUSD strategy on',
        vendor: 'convexfinance.com',
        disabled: false,
        apr: '16.8%',
        price: '1.356',
        currentDeposits: '168’000',
    });
    return (
        <DashboardItem {...data} isFiltered={isFiltered} changeActiveData={data} />
    );
};
export default AvalanceContainer;
