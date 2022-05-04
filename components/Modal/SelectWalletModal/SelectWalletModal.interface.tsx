import type { WalletProviderNames } from './SelectWalletModal.constants';

type SelectWalletProps = {
    selectWallet: (walletProvider: keyof typeof WalletProviderNames) => any;
    handleClose: () => any;
};

export type { SelectWalletProps };
