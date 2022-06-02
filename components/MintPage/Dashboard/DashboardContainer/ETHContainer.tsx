import React, { useState } from 'react';
import DashboardItem from './DashboardItem';
import type { MintDashboardItemCardType } from '../../types';
import styles from './style.module.css';

type PropType = {
    isFiltered: boolean;
};

const AvalanceContainer: React.FC<PropType> = ({ isFiltered = false }) => {
    const [data, setData] = useState<MintDashboardItemCardType>({
        icon: 'etheriumDashboard.svg',
        bgGradient:
            'linear-gradient(90deg, rgba(152,152,152,0.2) 0%, rgba(246, 246, 246, 0) 96.87%)',
        heading: 'MIM-UST',
        chainId: '250',
        priceCurrency: 'USDT/USDT.e Synthetic LP',
        description: (
            <div className={styles.description}>
                Generates yield by running an autocompound fUSDT/USDC strategy
                on
                <span style={{ color: 'white' }}>&nbsp;spookyswap.finance</span>
            </div>
        ),
        disabled: false,
        apr: '16.8%',
        price: '1.356',
        currentDeposits: '168’000',
    });
    return (
        <DashboardItem {...data} isFiltered={isFiltered} />
    );
};
export default AvalanceContainer;
