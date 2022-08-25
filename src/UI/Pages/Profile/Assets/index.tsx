import { useStore } from 'core/store';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import type { ICardUnit } from 'src/UI/Components/Profile.Components/InvestCard/InvestCard.interfaces';
import {
    CardsOrder,
    generateInitState,
} from 'src/UI/Components/Profile.Components/InvestCard/InvestCards.const';
import AssetsDashboard from 'src/UI/Components/Profile.Components/AssetsComponent/AssetsDashboard';
import Typography from 'src/UI/ui-kit/Typography';
import { loader } from '../Profile.constant';
import type { IFilter } from '../Profile.interfaces';
import styles from './style.module.css';

const AssetsComponent = () => {
    const { store } = useStore((store) => ({
        UserEntity: store.UserEntity,
    }));
    const {
        profits, totalBalance, balances, cardLoaded,
    } = store.UserEntity;

    const [cards, setCards] = useState<ICardUnit[]>([]);

    const InitCards = useMemo(() => generateInitState(balances), [balances]);

    const [filter, setFilter] = React.useState<IFilter>('Sort by');

    const [hasTokens, setHasTokens] = useState<boolean>(false);

    const handleChangeFilter = (value: IFilter) => setFilter(value);

    const { t } = useTranslation('profile');

    const updateCardsFilter = () => {
        let cardsPrepared = [...cards];
        if (CardsOrder[filter]) {
            cardsPrepared = cardsPrepared.sort(CardsOrder[filter]);
        } else {
            cardsPrepared = InitCards;
        }
        setCards(cardsPrepared);
    };

    const updateCards = () => {
        setCards(InitCards);
    };

    useEffect(() => {
        updateCardsFilter();
    }, [filter]);

    useEffect(() => {
        updateCards();
    }, []);

    useEffect(() => {
        if (totalBalance > 0) {
            setHasTokens(true);
        }
    }, [totalBalance]);

    return (
        <div className={styles.wrapper}>
            <Typography type="title" classNameModifier={styles.titleMargin}>
                {t('Your Entangle Assets')}
            </Typography>
            <div>
                {!cardLoaded ? (
                    <div
                        style={{
                            height: '400px',
                            borderRadius: '16px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {loader}
                    </div>
                ) : (
                    <AssetsDashboard
                        balances={balances}
                        totalBalance={totalBalance}
                        filter={filter}
                        hasTokens={hasTokens}
                        smallCard={false}
                    />
                )}
            </div>
            <Typography type="title" classNameModifier={styles.titleMargin}>
                {t('Locked Assets')}
            </Typography>
            <div
                style={{
                    display: 'flex',
                    height: '400px',
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        src="/images/bar-graph.png"
                        alt=""
                        quality={100}
                        width={104}
                        height={90}
                    />
                </div>
                <h2
                    style={{
                        textAlign: 'center',
                        fontSize: '22px',
                        fontWeight: '400',
                        color: '#A3A3A3',
                        margin: '0 0 50px',
                    }}
                >
                    {t('nowAsset')}
                </h2>
            </div>
        </div>
    );
};

export default AssetsComponent;
