import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import GradientButton from 'UI/ui-kit/GradientButton';
import { networks, STABLES } from 'utils/Global/Vars';
import type { IAssetItem } from '../../../Pages/Stake/Stable/Stable.interfaces';

import styles from './style.module.css';

const AssetItem: React.FC<IAssetItem> = ({
    title,
    apr,
    volume,
    availableNetworks,
}) => {
    const { t } = useTranslation('stable');
    const { t: tIndex } = useTranslation('index');
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.asset}>
                    <Image
                        src={`/images/stables/${STABLES[title].img}`}
                        width={44}
                        height={44}
                        quality={100}
                        alt={`${title}-icon`}
                    />
                    <div className={styles.name}>
                        <p className={styles.textWhite}>{title}</p>
                        <p className={styles.textGray}>{STABLES[title].full}</p>
                    </div>
                </div>
                <div className={styles.available}>
                    <p className={styles.textGray}>{t('availableNetwork')}</p>
                    <div className={styles.netBlock}>
                        {availableNetworks.map((el, idx) => (
                            <div
                                key={idx}
                                className={styles.netItem}
                                style={{ left: `${idx}rem` }}
                            >
                                <Image
                                    src={`/images/alternativeAssets/${networks[el].abbr}.svg`}
                                    width={24}
                                    height={24}
                                    quality={100}
                                    alt={`${networks[el].title}-icon`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.apr}>
                    <p className={styles.textGray}>{tIndex('aprCard')}</p>
                    <p className={styles.textWhite}>
                        {apr}
                        %
                    </p>
                </div>
                <div className={styles.volume}>
                    <p className={styles.textGray}>{t('pastVolume')}</p>
                    <p className={styles.textWhite}>
                        $
                        {volume}
                    </p>
                </div>
                <div className={styles.button}>
                    <Link
                        href={`/stake-stablecoin/${title}`}
                        as={`/stake-stablecoin/${title}`}
                        passHref
                    >
                        <GradientButton
                            title={t('view')}
                            onClick={() => {}}
                            titleClass={styles.titleClass}
                            wrapperClass={styles.blockClass}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AssetItem;
