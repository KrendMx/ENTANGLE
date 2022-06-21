import React, { useEffect, useState } from 'react';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import SuccessModal from '../Modal/SuccessModal/SuccessModal';
import SelectWalletModal from '../Modal/SelectWalletModal/SelectWalletModal';
import Disclaimer from '../Disclaimer/index';

import { useAppSelector, useAppDispatch } from '@/src/Redux/store/hooks/redux';
import {
    setError,
    setSucInfo,
    setIsOpenSelectWalletModal,
} from '@/src/Redux/store/reducers/AppSlice';
import { setUserError } from '@/src/Redux/store/reducers/WalletSlice';
import { setWallet } from '@/src/Redux/store/reducers/ActionCreators';

const ModalContextWrapper = () => {
    const dispatch = useAppDispatch();
    const [termsModal, setTermsModal] = useState(false);
    const { error, sucInfo, isOpenSelectWalletModal } = useAppSelector(
        (state) => state.appReducer,
    );
    const { userError } = useAppSelector((state) => state.walletReducer);
    const handleClose = () => {
        localStorage.setItem('terms', 'true');
        setTermsModal(false);
    };

    useEffect(() => {
        if (!localStorage.getItem('terms')) {
            setTermsModal(true);
        }
    }, []);
    return (
        <>
            {(error || userError) && (
                <ErrorModal
                    error={error || userError}
                    handleClose={() => {
                        dispatch(setError(null));
                        dispatch(setUserError({ error: null }));
                    }}
                />
            )}
            {sucInfo && (
                <SuccessModal
                    transactionInfo={sucInfo}
                    handleClose={() => {
                        dispatch(setSucInfo(null));
                    }}
                />
            )}
            {isOpenSelectWalletModal && (
                <SelectWalletModal
                    selectWallet={(walletProviderName: any) =>
                        dispatch(setWallet({ walletKey: walletProviderName }))
                    }
                    handleClose={() => {
                        dispatch(setIsOpenSelectWalletModal(false));
                    }}
                />
            )}
            {termsModal && <Disclaimer handleClose={handleClose} />}
        </>
    );
};

export default ModalContextWrapper;
