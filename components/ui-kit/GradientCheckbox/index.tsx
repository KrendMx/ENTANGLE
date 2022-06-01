import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

interface IProps {
    isChecked: boolean;
    text: string;
    gradient: string;
    additionalClass?: React.HTMLAttributes<HTMLDivElement>['className'];
    onClickHandler: () => void;
}

const GradientCheckbox: React.FC<IProps> = ({
    text,
    isChecked,
    onClickHandler,
    additionalClass,
}) => (
    <div className={classNames(additionalClass, styles.container)}>
        <input
            type="checkbox"
            id="confirmCheck"
            onClick={onClickHandler}
            checked={isChecked}
            className={classNames(styles.checkBox)}
        />
        <label htmlFor="confirmCheck" className={styles.text}>
            {text}
        </label>
    </div>
);

export default GradientCheckbox;
