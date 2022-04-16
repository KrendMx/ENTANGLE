import React from 'react';
import styles from './style.module.css';

type TextLoaderProps = {
    bgGradient: string;
};

const TextLoader: React.FC<TextLoaderProps> = ({ bgGradient }) => (
    <div className={styles.wrapper} style={{ background: bgGradient }} />
);

export default TextLoader;
