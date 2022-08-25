import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import Tabs from 'UI/ui-kit/Tabs';
import Typography from 'UI/ui-kit/Typography';

import InfoBlock from 'src/UI/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from 'src/UI/ui-kit/InfoBlock/InfoBlock.constants';
import Lock from 'src/UI/Components/StakeEntangle.Components/Deposite/Lock';
import Withdraw from 'src/UI/Components/StakeEntangle.Components/Withdraw/Withdraw';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';
import styles from './style.module.css';

const StakeEntangle: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const { t } = useTranslation('entangle');

    const validators = useMemo(
        () =>
            new Array(15)
                .fill('')
                .map(() => ethers.Wallet.createRandom().address),
        [],
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <Typography type="title" classNameModifier={styles.header}>
                    {t('EntangleStaking')}
                </Typography>
                <p className={styles.descriptItem}>{t('desc')}</p>
            </div>
            <div className={styles.headerInfo}>
                <InfoBlock
                    info={t('TotalENTGLStaked')}
                    value={13000000}
                    customValueClassName={styles.customInfoValue}
                    customWrapperClassName={styles.customInfoWrapper}
                    customTitleClassName={styles.customInfoTitle}
                    type={InfoBlockTypes.DIVIDED_NUMBER}
                />
                <InfoBlock
                    info={t('ActiveValidators')}
                    value={Number('32')}
                    customValueClassName={styles.customInfoValue}
                    customWrapperClassName={styles.customInfoWrapper}
                    customTitleClassName={styles.customInfoTitle}
                    type={InfoBlockTypes.SIMPLE_TEXT}
                />
                <InfoBlock
                    info={t('AVGUptime')}
                    value={Number('94')}
                    customValueClassName={styles.customInfoValue}
                    customWrapperClassName={styles.customInfoWrapper}
                    customTitleClassName={styles.customInfoTitle}
                    type={InfoBlockTypes.SIMPLE_PERCENTAGE}
                />
            </div>
            <div className={styles.switcherContainer}>
                <div>
                    <Tabs
                        activeTab={activeTab}
                        switchHandler={setActiveTab}
                        buttons={[t('Deposit'), t('Withdraw')]}
                        customClassButtonName={styles.wrap}
                        isBlack
                    />
                </div>
            </div>
            {activeTab === 0 ? (
                <Lock validators={validators} />
            ) : (
                <Withdraw validators={validators} />
            )}
        </div>
    );
};

export default StakeEntangle;
