import type { ChangeEvent } from 'react';
import React, { useState } from 'react';

import Image from 'next/image';

import HoverTooltip from 'src/UI/ui-kit/HoverTooltip/HoverTooltip';
import { useTranslation } from 'react-i18next';
import styles from './style.module.css';
import Input from '../Input';

interface IModalInput {
    titleSend: string;
    titleReceive: string;
    sendValue: string;
    receiveValue: string;
    currencySend: string;
    currencyReceive: string;
    onSendChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onReceiveChange: (e: ChangeEvent<HTMLInputElement>) => void;
    getMax: () => void;
}

const ModalInput: React.FC<IModalInput> = ({
    titleReceive,
    titleSend,
    sendValue,
    receiveValue,
    currencyReceive,
    currencySend,
    getMax,
    onReceiveChange,
    onSendChange,
}) => {
    const [firstActive, setFirstAcitve] = useState<boolean>(false);
    const [secondActive, setSecondAcitve] = useState<boolean>(false);

    const closeFirst = () => {
        setFirstAcitve(true);
        setInterval(() => {
            setFirstAcitve(false);
        }, 5000);
    };

    const closeSecond = () => {
        setSecondAcitve(true);
        setInterval(() => {
            setSecondAcitve(false);
        }, 5000);
    };

    const { t } = useTranslation('index');
    return (
        <div className={styles.wrapper}>
            <div className={styles.inputBlock}>
                <div className={styles.inputContent}>
                    <p>{titleSend}</p>
                    <div className={styles.inputElem}>
                        <Input
                            onChange={(e) => {
                                closeFirst();
                                onSendChange(e);
                            }}
                            className={styles.input}
                            value={`${sendValue}`}
                            style={{
                                width: `${
                                    (sendValue.length + 5)
                                    * (sendValue.length + 2)
                                }px`,
                                maxWidth: '55px',
                            }}
                        />
                        <HoverTooltip
                            text={t('maxValueLength')}
                            isVisible={sendValue.length >= 6 && firstActive}
                        />
                        <p className={styles.currency}>{currencySend}</p>
                    </div>
                </div>
                <div className={styles.maxButtonBlock}>
                    <p className={styles.gradientText} onClick={getMax}>
                        max
                    </p>
                </div>
            </div>
            <div className={styles.arrow}>
                <Image
                    src="/images/Arrow.svg"
                    width={50}
                    height={50}
                    quality={100}
                    alt="arrow-icon"
                />
            </div>
            <div className={styles.inputBlock}>
                <div className={styles.inputContent}>
                    <p>{titleReceive}</p>
                    <div className={styles.inputElem}>
                        <Input
                            onChange={(e) => {
                                closeSecond();
                                onReceiveChange(e);
                            }}
                            className={styles.input}
                            value={receiveValue}
                            style={{
                                width: `${(receiveValue.length + 5) * 5}px`,
                            }}
                        />
                        <HoverTooltip
                            text={t('maxValueLength')}
                            isVisible={receiveValue.length >= 6 && secondActive}
                        />
                        <p className={styles.currency}>{currencyReceive}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalInput;
