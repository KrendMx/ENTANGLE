import classNames from 'classnames';
import React from 'react';
import styles from './style.module.css';

type IMiniButton = {
    title: string;
    active: boolean;
    clickHandler: () => void;
};

const MiniButton: React.FC<IMiniButton> = ({ title, clickHandler, active }) => (
    <button
        type="button"
        onClick={clickHandler}
        className={classNames(styles.miniButton, {
            [styles.active]: active,
        })}
    >
        {title}
    </button>
);

export default MiniButton;
