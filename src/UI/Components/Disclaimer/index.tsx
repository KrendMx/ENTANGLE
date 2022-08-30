import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollLock from 'react-scrolllock';
import GradientButton from 'UI/ui-kit/GradientButton';
import GradientCheckbox from 'UI/ui-kit/GradientCheckbox';
import styles from './styles.module.css';

interface DisclaimerProps {
    handleClose: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ handleClose }) => {
    const [checked, setChecked] = useState(false);
    const { t } = useTranslation('disclaimer');
    return (
        <div className={styles.wrapper}>
            <ScrollLock>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h1 className={styles.headerText}>
                            {t('disclaimer')}
                        </h1>
                    </div>
                    <div className={styles.mainContent}>
                        <div className={styles.blockText}>
                            <p className={styles.paragraph}>
                                <span className={styles.highLight}>
                                    {t('unauditedMVP')}
                                </span>
                                :
                                {' '}
                                {t('firstPhrase')}
                                {' '}
                                (
                                <span className={styles.blueText}>
                                    {t('max30')}
                                </span>
                                )
                                {' '}
                                {t('secondPhrase')}
                            </p>
                            <p className={styles.paragraph}>
                                {t('welcomeTo')}
                            </p>
                            <p className={styles.paragraph}>
                                {t('inTheNear')}
                                {' '}
                                (
                                <span className={styles.blueText}>
                                    enUSD
                                </span>
                                )
                                {' '}
                                {t('aCrossChain')}
                            </p>

                            <p className={styles.paragraph}>
                                {t('noRepresentation')}
                            </p>
                            <p className={styles.paragraph}>
                                {t('youTakeFull')}
                            </p>
                            <p className={styles.paragraph}>
                                {t('isNotAvailable')}
                                    &nbsp;
                                <span className={styles.highLight}>
                                    {t('placement')}
                                </span>
                            </p>
                            <p className={styles.paragraph}>
                                {t('byUsingEntangle')}
                            </p>
                        </div>
                        <div>
                            <GradientCheckbox
                                text={t('buttonText')}
                                gradient="linear-gradient(90deg, #FF5EBA 1.04%, #00F0FF 103.25%)"
                                isChecked={checked}
                                onClickHandler={() => setChecked(!checked)}
                                additionalClass={styles.extraForCheckbox}
                            />
                        </div>
                    </div>
                    <GradientButton
                        title={t('enter')}
                        onClick={checked ? handleClose : undefined}
                        wrapperClass={styles.btn}
                        disabled={!checked}
                    />
                </div>
            </ScrollLock>
        </div>
    );
};

export default Disclaimer;
