import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import type { availableChains } from 'utils/Global/Types';
import InvestCardExp from 'UI/Components/Profile.Components/InvestCard/Card/InvestCards';
import { networks } from 'src/utils/Global/Vars';
import GradientButton from 'src/UI/ui-kit/GradientButton';
import Typography from 'src/UI/ui-kit/Typography';
import { useRouter } from 'next/router';
import { CardsOrder, generateInitState } from './InvestCards.const';
import type { IProps, ICardUnit } from './InvestCard.interfaces';

import styles from './style.module.css';

const ProfileCard: React.FC<{
    position: number;
    priceInUSD: number;
    name: string;
    key: number;
}> = ({
    position, priceInUSD, name, key,
}) => {
    const detectedChainId = (chainName: string): availableChains => {
        for (const key in networks) {
            if (networks[key].abbr === chainName) {
                return key as availableChains;
            }
        }
    };

    return (
        <div className={styles.profileCard} key={key}>
            <div className={styles.currencyInfo}>
                <Image
                    src={`/images/networks/${
                        networks[detectedChainId(name)].icon
                    }`}
                    alt=""
                    width={32}
                    height={32}
                />
                <p className={styles.title}>
                    {networks[detectedChainId(name)].currencyMin}
                </p>
            </div>
            <div className={styles.priceInfo}>
                <p className={styles.primary}>
                    {position}
                    {networks[detectedChainId(name)].mmCurrency}
                </p>
                <p className={styles.secondary}>
                    ~$
                    {priceInUSD}
                </p>
            </div>
        </div>
    );
};

const InvestCard: React.FC<IProps> = ({
    balances,
    filter,
    hasTokens,
    smallCard = true,
}) => {
    const [cards, setCards] = useState<ICardUnit[]>([]);

    const InitCards = useMemo(() => generateInitState(balances), [balances]);

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

    const { t } = useTranslation('profile');

    const Router = useRouter();

    return (
        <div className={styles.cardsWrapper}>
            {!hasTokens ? (
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
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
            ) : (
                <div className={styles.betweenContainer}>
                    <div>
                        <Typography type="textBody">
                            {t('Your Entangle Assets')}
                        </Typography>
                        <div className={classNames({ [styles.assetsPage]: !smallCard })}>
                            {cards
                                .reverse()
                                .slice(0, 3)
                                .map((el, key) =>
                                    (Number(el.positions) ? (
                                        <ProfileCard
                                            key={key}
                                            position={el.positions}
                                            priceInUSD={
                                                el.positions * el.price
                                            }
                                            name={el.currencyName}
                                        />
                                    ) : undefined))}
                        </div>
                    </div>
                    {smallCard && (
                        <GradientButton
                            title="View All"
                            onClick={() => {
                                Router.push('/profile/assets');
                            }}
                            isWhite
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default InvestCard;
