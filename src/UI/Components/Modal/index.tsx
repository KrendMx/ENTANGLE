import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ScrollLock from 'react-scrolllock';
import { CSSTransition } from 'react-transition-group';

import styles from './style.module.css';

type ModalProps = {
    children: JSX.Element;
    handleClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, handleClose }) => {
    const modal = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClick = (e: MouseEvent) =>
            e.target === modal.current && handleClose();

        window.addEventListener('mousedown', handleClick);

        return () => window.removeEventListener('mousedown', handleClick);
    }, []);

    return ReactDOM.createPortal(
        <div className={styles.wrapper} ref={modal}>
            <ScrollLock>
                <div>{children}</div>
            </ScrollLock>
        </div>,
        document.body,
    );
};

export default Modal;
