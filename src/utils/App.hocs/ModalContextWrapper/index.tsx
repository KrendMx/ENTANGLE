import React, { useEffect, useState } from 'react';
import SuccessModal from 'UI/Components/Modal/SuccessModal/SuccessModal';
import SelectWalletModal from 'UI/Components/Modal/SelectWalletModal/SelectWalletModal';
import Disclaimer from 'UI/Components/Disclaimer';

import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';

const ModalContextWrapper = () => {
    const { store, actions, asyncActions } = useStore((store) => ({
        UserEntity: store.UserEntity,
        AppEntity: store.AppEntity,
        WalletEntity: store.WalletEntity,
    }));

    const dispatch = useDispatch();

    const { isOpenSelectWalletModal, sucInfo } = store.AppEntity;

    const { setSucInfo, setIsOpenSelectWalletModal } = actions.App;
    const { setWallet } = asyncActions.Wallet;

    const [termsModal, setTermsModal] = useState(false);

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
                        dispatch(setWallet({ walletKey: walletProviderName }))}
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
