import type { availableChains } from 'utils/Global/Types';

type SelectWrongWalletProps = {
    selectChain: (chainId: availableChains) => any;
    handleClose: () => any;
};

export type { SelectWrongWalletProps };
