import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import type { InfoBlockProps } from './SummaryInfoBoard.interfaces';
import { InfoBlockTypes, numberFormatter } from './SummaryInfoBoard.constants';
import type {
    iService,
    TotalValueLockedData,
} from '@/src/context/ServiceContext/ServiceContext.interfaces';
import { ServiceContext } from '@/src/context/ServiceContext/ServiceContext';

import styles from './style.module.css';
import ChainService from '@/src/ChainService/ChainService';

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
    const [TVD, setTVD] = useState<number | null>(null);

    const updateTVL = () => {
        service.getTotalValueLocked().then(setTotalValueLockedData);
    };

    const updateData = () => {
        updateTVL();
    };

    useEffect(() => {
        updateData();
        (async () => {
            const res = await ChainService.getTVDForBuyAndSell();
            setTVD(res);
        })();
    }, []);

    useEffect(() => {
        const updateTimer = setInterval(updateData, 10000);

        return () => {
            clearInterval(updateTimer);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <InfoBlock
                    info="Total Profit of Entangle Users"
                    value={
                        totalValueLockedData
                            ? totalValueLockedData.amount
                            : null
                    }
                    type={InfoBlockTypes.MONEY}
                    isShort
                />
                <InfoBlock
                    info="Total Value Deposited"
                    value={TVD || null}
                    type={InfoBlockTypes.MONEY}
                />
            </div>
        </div>
    );
};

export default SummaryInfoBoard;
