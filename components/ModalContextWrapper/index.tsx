import React from 'react';
import ErrorModal from '../Modal/ErrorModal/ErrorModal';
import SuccessModal from '../Modal/SuccessModal/SuccessModal';
import SelectWalletModal from '../Modal/SelectWalletModal/SelectWalletModal';

import { useAppSelector, useAppDispatch } from '../../Redux/store/hooks/redux';
import {
    setError,
    setSucInfo,
    setIsOpenSelectWalletModal,
} from '../../Redux/store/reducers/AppSlice';
import { setWallet } from '../../Redux/store/reducers/ActionCreators';

const ModalContextWrapper = () => {
    const dispatch = useAppDispatch();
    const { error, sucInfo, isOpenSelectWalletModal } = useAppSelector(
        (state) => state.appReducer,
    );
    return (
        <>
            {error && (
                <ErrorModal
                    error={error}
                    handleClose={() => {
                        dispatch(setError(null));
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
                    selectWallet={(
                        walletProviderName: any,
                    ) => dispatch(setWallet({ walletKey: walletProviderName }))}
                    handleClose={() => {
                        dispatch(setIsOpenSelectWalletModal(false));
                    }}
                />
            )}
        </>
    );
};

export default ModalContextWrapper;
