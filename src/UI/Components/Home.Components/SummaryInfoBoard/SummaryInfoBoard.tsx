import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useTranslation } from 'next-i18next';
import { ChainService } from 'src/Services';
import type { InfoBlockProps } from './SummaryInfoBoard.interfaces';
import { InfoBlockTypes, numberFormatter } from './SummaryInfoBoard.constants';

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
    const [TVD, setTVD] = useState<number | null>(null);
    const [TRA, setTRA] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            const resTVD = await ChainService.getTVDForBuyAndSell();
            console.log(resTVD);
            setTVD(resTVD);
            const resTRA = await ChainService.getTRAForBuyAndSell();
            setTRA(Number(resTRA));
        })();
    }, []);

    const { t } = useTranslation('index');

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <InfoBlock
                    info={t('tpe')}
                    value={TRA}
                    type={InfoBlockTypes.MONEY}
                    isShort
                />
                <InfoBlock
                    info={t('tvd')}
                    value={TVD}
                    type={InfoBlockTypes.MONEY}
                />
            </div>
        </div>
    );
};

export default SummaryInfoBoard;
