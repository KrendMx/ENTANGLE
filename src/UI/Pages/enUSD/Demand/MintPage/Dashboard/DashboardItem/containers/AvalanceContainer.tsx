import React, { useState } from 'react';
import DashboardItem from '../DashboardItem';
import type { MintDashboardItemCardType } from '../../../types';

type PropType = {
    isFiltered: boolean;
};
const AvalanceContainer: React.FC<PropType> = ({ isFiltered = false }) => {
    const [data, setData] = useState<MintDashboardItemCardType>({
        icon: 'avalancheDashboard.png',
        bgGradient:
            'linear-gradient(90deg, #E93038 0%, rgba(239, 70, 78, 0) 100%)',
        heading: 'USDT-USDT.e',
        chainId: '43114',
        priceCurrency: 'USDT/USDT Synthetic LP',
        description: 'Generates yield by running an autocompound USDT/USDT strategyon',
        vendor: 'traderjoexyz.com',
        disabled: false,
        apr: '16.8%',
        price: '1.356',
        currentDeposits: '168’000',
    });
    return (
        <DashboardItem
            {...data}
            isFiltered={isFiltered}
            changeActiveData={data}
        />
    );
};
export default AvalanceContainer;
