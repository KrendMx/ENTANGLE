import React, { useState } from 'react';
import classNames from 'classnames';

import Tabs from 'UI/ui-kit/Tabs';
import Typography from 'UI/ui-kit/Typography';

import InfoBlock from 'src/UI/ui-kit/InfoBlock/InfoBlock';
import { InfoBlockTypes } from 'src/UI/ui-kit/InfoBlock/InfoBlock.constants';
import Lock from 'src/UI/Components/StakeEntangle.Components/Deposite/Lock';
import Withdraw from 'src/UI/Components/StakeEntangle.Components/Withdraw/Withdraw';
import { useTranslation } from 'react-i18next';
import styles from './style.module.css';

const StakeEntangle: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const { t } = useTranslation('entangle');

    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <Typography type="title" classNameModifier={styles.header}>
                    {t('EntangleStaking')}
                </Typography>
                <p className={styles.descriptItem}>
                    {t('desc')}
                </p>
            </div>
            <div className={styles.headerInfo}>
                <InfoBlock
                    info={t('TotalENTGLStaked')}
                    value={13000000}
                    type={InfoBlockTypes.DIVIDED_NUMBER}
                />
                <InfoBlock
                    info={t('ActiveValidators')}
                    value={Number('32')}
                    type={InfoBlockTypes.SIMPLE_TEXT}
                />
                <InfoBlock
                    info={t('AVGUptime')}
                    value={Number('94')}
                    type={InfoBlockTypes.SIMPLE_PERCENTAGE}
                />
            </div>
            <div className={styles.switcherContainer}>
                <div>
                    <Tabs
                        activeTab={activeTab}
                        switchHandler={setActiveTab}
                        buttons={['Deposite', 'Withdraw']}
                        customClassButtonName={styles.wrap}
                        isBlack
                    />
                </div>
            </div>
            {activeTab === 0 ? <Lock /> : <Withdraw token="USDC" />}
        </div>
    );
};

export default StakeEntangle;
