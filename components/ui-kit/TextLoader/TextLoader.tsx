import React from 'react';
import styles from './style.module.css';

type TextLoaderProps = {
    bgGradient: string;
    margin?: string;
};

const TextLoader: React.FC<TextLoaderProps> = ({ bgGradient, margin = '0.25 0' }) => (
    <div className={styles.wrapper} style={{ background: bgGradient, margin }} />
);

export default TextLoader;
