import { toast } from 'react-toastify';
import { NotyTypes } from './Notification.interfaces';

export const NOTIFICATIONS = {
    [NotyTypes.SUCCESS]: {
        action: toast.success,
        titleColor: 'var(--white)',
        contentColor: 'var(--white)',
        lineColor: 'var(--blue)',
    },
    [NotyTypes.WARNING]: {
        action: toast.warn,
        titleColor: 'var(--white)',
        contentColor: 'var(--white)',
        lineColor: 'var(--inputWarningOrange)',
    },
    [NotyTypes.ERROR]: {
        action: toast.error,
        titleColor: 'var(--white)',
        contentColor: 'var(--white)',
        lineColor: 'var(--red)',
    },
};
