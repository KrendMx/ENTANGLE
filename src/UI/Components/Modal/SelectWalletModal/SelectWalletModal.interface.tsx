import type { WalletProviderNames } from 'utils/Global/Vars';

type SelectWalletProps = {
    selectWallet: (walletProvider: keyof typeof WalletProviderNames) => any;
    handleClose: () => any;
};

export type { SelectWalletProps };
