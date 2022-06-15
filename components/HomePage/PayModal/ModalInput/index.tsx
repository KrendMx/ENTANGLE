import type { ChangeEvent } from 'react';
import Image from 'next/image';
import React from 'react';
import styles from './style.module.css';
import Input from '../Input/index';

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
}) => (
    <div className={styles.wrapper}>
        <div className={styles.inputBlock}>
            <div className={styles.inputContent}>
                <p>{titleSend}</p>
                <div className={styles.inputElem}>
                    <Input
                        onChange={onSendChange}
                        className={styles.input}
                        value={sendValue}
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
                width={45}
                height={45}
                quality={100}
                alt="arrow-icon"
            />
        </div>
        <div className={styles.inputBlock}>
            <div className={styles.inputContent}>
                <p>{titleReceive}</p>
                <div className={styles.inputElem}>
                    <Input
                        onChange={onReceiveChange}
                        className={styles.input}
                        value={receiveValue}
                    />
                    <p className={styles.currency}>{currencyReceive}</p>
                </div>
            </div>
        </div>
    </div>
);

export default ModalInput;
