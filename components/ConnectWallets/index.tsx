import React from 'react';
import { setWallet } from '../../Redux/store/reducers/ActionCreators';
import { useAppDispatch, useAppSelector } from '../../Redux/store/hooks/redux';

const ConnectWallets = () => {
    const wallets = [
        'MetaMask',
        'Coin98',
        'CoinBase',
        'WalletConnect',
    ] as const;
    const { chainId, account } = useAppSelector((state) => state.walletReducer);
    const dispatch = useAppDispatch();

    const connectWallet = (key) => () => {
        dispatch(setWallet({ walletKey: key }));
    };

    return (
        <div>
            <h2>
                chainId:
                {chainId}
            </h2>
            <h3>
                account:
                {account}
            </h3>
            {wallets.map((key) => (
                <button
                    onClick={connectWallet(key as keyof typeof wallets)}
                    key={key}
                >
                    {key}
                </button>
            ))}
        </div>
    );
};

export default ConnectWallets;
