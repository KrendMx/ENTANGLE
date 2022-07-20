import React, { useEffect, useState } from 'react';
import SuccessModal from 'UI/Components/Modal/SuccessModal/SuccessModal';
import SelectWalletModal from 'UI/Components/Modal/SelectWalletModal/SelectWalletModal';
import Disclaimer from 'UI/Components/Disclaimer';

import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import Modal from 'src/UI/Components/Modal';
import PayModal from 'src/UI/Components/Home.Components/PayModal';
import { namesConfig } from 'src/utils/Global/Vars';
import { CSSTransition } from 'react-transition-group';
import styles from './style.module.css';

const ModalContextWrapper = () => {
    const { store, actions, asyncActions } = useStore((store) => ({
        UserEntity: store.UserEntity,
        AppEntity: store.AppEntity,
        WalletEntity: store.WalletEntity,
        CardEntity: store.CardsEntity,
    }));

    const dispatch = useDispatch();

    const { isOpenSelectWalletModal, sucInfo } = store.AppEntity;

    const { setSucInfo, setIsOpenSelectWalletModal } = actions.App;
    const { setWallet } = asyncActions.Wallet;
    const { isOpenModal } = store.UserEntity;
    const { setIsOpenModal } = actions.User;
    const { data: CardData } = store.CardEntity;

    const [termsModal, setTermsModal] = useState(false);

    const payModalHandleClose = () => {
        history.replaceState({}, '', '/');
        dispatch(setIsOpenModal(false));
    };

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
            <CSSTransition
                in={isOpenModal}
                classNames={{
                    enter: styles['alert-enter'],
                    enterActive: styles['alert-enter-active'],
                    exit: styles['alert-exit'],
                    exitActive: styles['alert-exit-active'],
                }}
                timeout={250}
                unmountOnExit
            >
                <Modal handleClose={payModalHandleClose}>
                    <PayModal
                        handleClose={payModalHandleClose}
                        available={
                            (typeof window !== 'undefined') && CardData[
                                namesConfig?.[sessionStorage.getItem('card')]
                            ]?.available
                        }
                        totalAvailable={
                            (typeof window !== 'undefined') && CardData[
                                namesConfig?.[sessionStorage.getItem('card')]
                            ]?.totalAvailable
                        }
                        price={
                            (typeof window !== 'undefined') && CardData[
                                namesConfig?.[sessionStorage.getItem('card')]
                            ]?.price
                        }
                    />
                </Modal>
            </CSSTransition>

        </>
    );
};

export default ModalContextWrapper;
