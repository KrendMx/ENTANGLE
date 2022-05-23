import type WalletConnectProvider from '@walletconnect/web3-provider';
import type { ProviderType, walletKeyType } from '../../types';
import type { availableChains } from '../../../utils/GlobalConst';

type initialStateType = {
    walletKey: walletKeyType,
    provider: ProviderType,
    account: string | null,
    chainId: availableChains,
    preLoader: boolean;
    connect: WalletConnectProvider;
}

export type { initialStateType };
