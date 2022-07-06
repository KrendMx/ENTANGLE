import type { FC, ReactNode } from 'react';
import Image from 'next/image';
import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';

import type { ToastOptions } from './Notification.interfaces';
import { NotyTypes } from './Notification.interfaces';
import { NOTIFICATIONS } from './Notification.constants';

import 'react-toastify/dist/ReactToastify.css';
import './CustomReactTostify.scss';
import styles from './style.module.css';

export const NotificationComponent: FC = () => (
    <ToastContainer
        position="top-right"
        newestOnTop
        draggable={false}
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        toastClassName="reactToastifyContainer"
        bodyClassName="reactToastifyBody"
        className="reactToastifyWrap"
        // closeButton={() => (
        //     <button type="button">
        //         <CloseIcon />
        //     </button>
        // )}
    />
);

export const createCustomContent = (title: string, content: ReactNode, type: NotyTypes): ReactNode => {
    const { titleColor, contentColor, lineColor } = NOTIFICATIONS[type];
    return (
        <div className={styles.wrapper}>
            <div className={styles.closeWrapper}>
                <Image
                    width={15}
                    height={15}
                    className={styles.closeImg}
                    // onClick={handleClose}
                    quality={100}
                    src="/images/close.svg"
                    alt="closeImg"
                />
            </div>
            <div className={styles.content}>
                <div className={styles.warning}>
                    <Image
                        width={49}
                        height={49}
                        quality={100}
                        src="/images/warning.svg"
                        alt="warning"
                    />
                </div>
                <div className={styles.errorText}>
                    <h3>{title}</h3>
                    <h5>{content}</h5>
                </div>
            </div>
        </div>
    );
};

const toastFactory = (type: NotyTypes) => (
    title: string,
    content?: ReactNode,
    options?: ToastOptions,
): React.ReactText => NOTIFICATIONS[type].action(createCustomContent(title, content, type), {
    transition: Slide,
    autoClose: 5000,
    ...options,
});

type ToastFn = (title: string, content?: ReactNode, options?: ToastOptions) => React.ReactText;

export interface INotification {
  success: ToastFn;
  error: ToastFn;
  warning: ToastFn;
}

export const Notification: INotification = {
    success: toastFactory(NotyTypes.SUCCESS),
    error: toastFactory(NotyTypes.ERROR),
    warning: toastFactory(NotyTypes.WARNING),
};
