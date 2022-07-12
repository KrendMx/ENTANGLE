import React, { useReducer } from 'react';
import Typography from 'src/UI/ui-kit/Typography';
import InfoBlock from 'src/UI/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from 'src/UI/ui-kit/InfoBlock/InfoBlock.constants';
import { useTranslation } from 'react-i18next';
import type { SingleSideReducerType } from './SingleSide.interfaces';
import styles from './style.module.css';
import { ActionPanel } from './ActionPanel';
import { Dashboard } from './Dashboard';

export const SingleSide = () => {
    const [store, dispatch] = useReducer(
        (
            oldState: SingleSideReducerType,
            newState: Partial<SingleSideReducerType>,
        ) => ({ ...oldState, ...newState }),
        {
            tvl: '1080000',
            volume: '413004',
            totalEarned: '44124124',
            search: '',
            timeStatus: '',
            network: '',
        },
    );

    const searchChanger = (value: string) => {
        dispatch({ search: value });
    };

    const networkChanger = (value: string) => {
        dispatch({ network: value });
    };

    const timeStatusCahnger = (value: string) => {
        dispatch({ timeStatus: value });
    };

    const { t } = useTranslation('ssas');

    return (
        <div className={styles.wrapper}>
            <Typography type="title" classNameModifier={styles.header}>
                {t('earn')}
            </Typography>
            <Typography type="textBody" classNameModifier={styles.headerDesc}>
                {t('description')}
            </Typography>
            <div className={styles.infoWrapper}>
                <InfoBlock
                    info={t('tvl')}
                    value={Number(store.tvl)}
                    type={InfoBlockTypes.MONEY}
                />
                <InfoBlock
                    info={t('volume24')}
                    value={Number(store.volume)}
                    type={InfoBlockTypes.MONEY}
                />
                <InfoBlock
                    info={t('totalEarned')}
                    value={Number(store.totalEarned)}
                    type={InfoBlockTypes.ABOUT_MONEY}
                />
            </div>
            <ActionPanel
                {...store}
                setSearch={searchChanger}
                setNetwork={networkChanger}
                setTimeStatus={timeStatusCahnger}
            />
            <Dashboard {...store} />
        </div>
    );
};
