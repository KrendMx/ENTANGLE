import React from 'react';
import styles from './styles.module.css';

interface IProps {
    isChecked: boolean;
    text: string;
    gradient: string;
    onClickHandler: () => void;
}

const GradientCheckbox: React.FC<IProps> = ({
    text,
    isChecked,
    onClickHandler,
    gradient,
}) => (
    <div className={styles.container}>
        <input
            type="checkbox"
            id="confirmCheck"
            onClick={onClickHandler}
            checked={isChecked}
            className={styles.checkBox}
            style={{ background: gradient }}
        />
        <label htmlFor="confirmCheck" className={styles.text}>
            {text}
        </label>
    </div>
);

export default GradientCheckbox;
