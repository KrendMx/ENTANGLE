import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import type { InfoBlockProps } from './SummaryInfoBoard.interfaces';
import { InfoBlockTypes, numberFormatter } from './SummaryInfoBoard.constants';
import type {
    iService,
    TotalValueLockedData,
} from '../../../context/ServiceContext/ServiceContext.interfaces';
import { ServiceContext } from '../../../context/ServiceContext/ServiceContext';

import styles from './style.module.css';

// TODO MIGRATE TO INFO BLOCK from UI
const InfoBlock: React.FC<InfoBlockProps> = ({
    value,
    type,
    info,
}: InfoBlockProps) => {
    let valueText = String(value);
    let additionalClass = {};

    if (value !== null) {
        switch (type) {
        case InfoBlockTypes.MONEY: {
            valueText = `$${numberFormatter(value, 2)}`;
            break;
        }
        case InfoBlockTypes.PERCENTAGE: {
            const sign = value > 0 ? '+' : '';
            additionalClass = {
                [styles.blockValueGood]: value > 0,
                [styles.blockValueBad]: value < 0,
            };
            valueText = `${sign}${value.toFixed(2)}%`;
            break;
        }
        default: {
            throw new Error('Unexpected block info type');
        }
        }
    } else {
        valueText = '~';
    }

    return (
        <div className={styles.blockWrapper}>
            <div className={styles.blockInfo}>{info}</div>
            <div className={classNames(styles.blockValue, additionalClass)}>
                {valueText}
            </div>
        </div>
    );
};

const SummaryInfoBoard = () => {
    const service = useContext<iService>(ServiceContext);
    const [totalValueLockedData, setTotalValueLockedData] = useState<TotalValueLockedData | null>(null);

    const updateTVL = () => {
        service.getTotalValueLocked().then(setTotalValueLockedData);
    };

    const updateData = () => {
        updateTVL();
    };

    // useEffect(() => {
    //     updateData();
    // }, []);

    // useEffect(() => {
    //     const updateTimer = setInterval(updateData, 10000);

    //     return () => {
    //         clearInterval(updateTimer);
    //     }
    // }, []);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <InfoBlock
                    info="Total Value Locked (USD)"
                    value={
                        totalValueLockedData
                            ? totalValueLockedData.amount
                            : null
                    }
                    type={InfoBlockTypes.MONEY}
                    isShort
                />
                <InfoBlock
                    info="Change (24h)"
                    value={
                        totalValueLockedData
                            ? totalValueLockedData.change
                            : null
                    }
                    type={InfoBlockTypes.PERCENTAGE}
                />
                <InfoBlock
                    info="Current enUSD Minted"
                    value={0}
                    type={InfoBlockTypes.MONEY}
                />
                <InfoBlock
                    info="Change (24h)"
                    value={0}
                    type={InfoBlockTypes.PERCENTAGE}
                />
            </div>
        </div>
    );
};

export default SummaryInfoBoard;
