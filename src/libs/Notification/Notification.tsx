import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';

import type { ErrorModalProps } from './ErrorModal.interfaces';
import ErrorModalContent from './ErrorModalContent';
import { setError } from '@/src/Redux/store/reducers/AppSlice';
import { setUserError } from '@/src/Redux/store/reducers/WalletSlice';

const ErrorModal: React.FC<ErrorModalProps> = ({ error, handleClose }) => {
    const { error: ErrorState } = useAppSelector((state) => state.appReducer);
    const { userError } = useAppSelector((state) => state.walletReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(setError());
                dispatch(setUserError({ error: null }));
            }, 5000);
        }
    }, [ErrorState, userError]);
    return <ErrorModalContent handleClose={handleClose} error={error} />;
};

export default ErrorModal;
