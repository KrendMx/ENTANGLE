import React from 'react';
import styles from './style.module.css';

interface IText {
    title: string;
    content: string;
}

const Text: React.FC<IText> = ({ title, content }) => (
    <div className={styles.text}>
        <p>{title}</p>
        <p>{content}</p>
    </div>
);

export default Text;
