import React, { useEffect, useState } from 'react';
import type { MenuBtnProps } from './MenuBtn.interfaces';
import styles from './style.module.css';

const MenuBtn: React.FC<MenuBtnProps> = ({
    isOpen: isOpenProp = false,
    onChange = () => {},
    onClose = () => {},
    onOpen = () => {},
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(isOpenProp);

    useEffect(() => {
        setIsOpen(isOpenProp);
    }, [isOpenProp]);

    useEffect(() => {
        if (isOpen) {
            onOpen();
        } else {
            onClose();
        }
        onChange();
    }, [isOpen]);

    return (
        <label className={styles.label} htmlFor="MenuBtn">
            <input
                className={styles.input}
                type="checkbox"
                id="MenuBtn"
                checked={isOpen}
                onChange={() => {
                    setIsOpen(!isOpen);
                }}
            />
            <div className={styles.bagete} />
            <div className={styles.bagete} />
            <div className={styles.bagete} />
        </label>
    );
};
export default MenuBtn;
