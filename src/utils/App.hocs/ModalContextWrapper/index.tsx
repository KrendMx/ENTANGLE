import React, { useEffect, useState } from 'react';
import SuccessModal from 'UI/Components/Modal/SuccessModal/SuccessModal';
import SelectWalletModal from 'UI/Components/Modal/SelectWalletModal/SelectWalletModal';
import Disclaimer from 'UI/Components/Disclaimer';
import WrongNetModal from 'UI/Components/Modal/WrongNetModal/WrongNetModal';

import { useStore } from 'core/store';
import { useDispatch } from 'react-redux';
import Modal from 'src/UI/Components/Modal';
import PayModal from 'src/UI/Components/Home.Components/PayModal';
import { availableChainsArray, namesConfig } from 'src/utils/Global/Vars';
import { CSSTransition } from 'react-transition-group';
import type { availableChains } from 'utils/Global/Types';
import { ethers } from 'ethers';
import styles from './style.module.css';

const ModalContextWrapper = () => {
    const {
        store: {
            AppEntity: {
                isOpenSelectWalletModal,
                sucInfo,
            },
            UserEntity: {
                isOpenModal,
            },
            CardEntity: {
                data: CardData,
            },
            WalletEntity: {
                chainId,
                isOpenWrongChainModal,
            },
        }, actions: {
            App: {
                setSucInfo,
                setIsOpenSelectWalletModal,
            },
            User: {
                setIsOpenModal,
            },
            Wallet: {
                setIsOpenWrongChainModal,
            },
        }, asyncActions: {
            Wallet: {
                setWallet,
                changeNetwork,
            },
        },
    } = useStore((store) => ({
        UserEntity: store.UserEntity,
        AppEntity: store.AppEntity,
        WalletEntity: store.WalletEntity,
        CardEntity: store.CardsEntity,
    }));

    const dispatch = useDispatch();

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
            <CSSTransition
                in={!!sucInfo}
                classNames={{
                    enter: styles['alert-enter'],
                    enterActive: styles['alert-enter-active'],
                    exit: styles['alert-exit'],
                    exitActive: styles['alert-exit-active'],
                }}
                timeout={250}
                unmountOnExit
                mountOnEnter
            >
                <SuccessModal
                    transactionInfo={sucInfo}
                    handleClose={() => {
                        dispatch(setSucInfo(null));
                    }}
                />

            </CSSTransition>
            <CSSTransition
                in={isOpenSelectWalletModal}
                classNames={{
                    enter: styles['alert-enter'],
                    enterActive: styles['alert-enter-active'],
                    exit: styles['alert-exit'],
                    exitActive: styles['alert-exit-active'],
                }}
                timeout={250}
                unmountOnExit
                mountOnEnter
            >
                <SelectWalletModal
                    selectWallet={(walletProviderName: any) =>
                        dispatch(setWallet({ walletKey: walletProviderName }))}
                    handleClose={() => {
                        dispatch(setIsOpenSelectWalletModal(false));
                    }}
                />
            </CSSTransition>
            {
                isOpenWrongChainModal && (
                    <WrongNetModal
                        handleClose={() => dispatch(setIsOpenWrongChainModal(false))}
                        selectChain={(chain: availableChains) => {
                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                            dispatch(changeNetwork({ chainId: chain, provider }));
                        }}
                    />
                )
            }
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
