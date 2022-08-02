import type { WalletProviderNames } from 'utils/Global/Vars';
import type { availableChains } from 'utils/Global/Types';

type SelectWalletProps = {
    selectChain: (chainId: availableChains) => any;
    handleClose: () => any;
};

export type { SelectWalletProps };
