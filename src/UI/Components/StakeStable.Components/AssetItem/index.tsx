import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import GradientButton from 'UI/ui-kit/GradientButton';
import { networks, STABLES } from 'utils/Global/Vars';
import { useRouter } from 'next/router';
import SearchIcon from 'src/UI/ui-kit/SearchIcon';
import TextGroup from 'src/UI/ui-kit/TextGrop';
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

    const router = useRouter();

    return (
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
                            style={{ left: `${idx * 16}px` }}
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
                <GradientButton
                    title={t('view')}
                    onClick={() => {
                        router.push(`/stake-stablecoin/${title}`);
                    }}
                    titleClass={styles.titleClass}
                    wrapperClass={styles.blockClass}
                    isWhite
                    isSearch
                />
            </div>
        </div>
    );
};

export default AssetItem;
