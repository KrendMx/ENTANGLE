import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './style.module.css';

interface OwnProps {
    onClick: () => void;
    title: string;
}

type Props = OwnProps;

const WhiteButton: FunctionComponent<Props> = ({ title, onClick }) => (
    <div className={styles.wrapper} onClick={onClick}>
        <p>{title}</p>
    </div>
);

export default WhiteButton;
