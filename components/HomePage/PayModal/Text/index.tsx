import React from 'react';
import styles from './style.module.css';

interface IText {
    title: string;
    content: string;
    bigFont?: boolean;
}

const Text: React.FC<IText> = ({ title, content, ...props }) => (
    <div className={styles.text}>
        <p>{title}</p>
        <p className={props.bigFont ? styles.bigFont : null}>{content}</p>
    </div>
);

export default Text;
