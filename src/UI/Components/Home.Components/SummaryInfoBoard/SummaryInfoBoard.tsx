import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useTranslation } from 'next-i18next';
import { ChainService } from 'src/Services';
import InfoBlock from 'src/UI/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from 'src/UI/ui-kit/InfoBlock/InfoBlock.constants';
import styles from './style.module.css';

const SummaryInfoBoard = () => {
    const [TVD, setTVD] = useState<number | null>(null);
    const [TRA, setTRA] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            const resTVD = await ChainService.getTVDForBuyAndSell();
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
