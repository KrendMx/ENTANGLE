// Interfaces
import type { Thunk } from 'core/utils/types';
import type { INotification } from 'src/libs/Notification';
import type { availableChains } from 'src/utils/Global/Types';
import type { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';

// Deps
import { createAsyncThunk } from '@reduxjs/toolkit';
import { networks } from 'utils/Global/Vars';
import { Notification } from 'src/libs/Notification';
import { Contract, ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { toChainId } from 'src/utils/toChainId';
import { opToken } from 'utils/ABIs/index';
import { ContractEntity } from '../ContractEntity';

export interface IContractInteractor {
    approve: Thunk<{
        tokenAddress: string;
        dexAddress: string;
        provider: Web3Provider;
        chainId: availableChains;
        cardId: availableChains;
    }>;
    getAllowance: Thunk<{
        contractAddress: string;
        dexAddress: string;
        provider: Web3Provider;
        account: string;
        chainId: availableChains;
        cardId: availableChains;
    }>;
}

export const createContractInteractor = (
    Entity: typeof ContractEntity,
    Notification: INotification,
): IContractInteractor => ({
    getAllowance: createAsyncThunk(
        'ContractInteractor/getAllowance',
        async (
            {
                account, dexAddress, contractAddress, provider, chainId, cardId,
            },
            { dispatch },
        ) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const contract = new Contract(
                    contractAddress,
                    opToken,
                    provider?.getSigner(),
                );

                const value = await contract.allowance(account, dexAddress);
                dispatch(
                    Entity.actions.setAllowance({ cardId, value }),
                );
            } catch (e) {
                Notification.error('Error', e.message);
                dispatch(Entity.actions.setError(e));
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
    approve: createAsyncThunk(
        'ContractInteractor/approve',
        async ({
            tokenAddress, dexAddress, provider, cardId, chainId,
        }, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const contract = new Contract(
                    tokenAddress,
                    opToken,
                    provider.getSigner(),
                );
                const value = await contract.approve(
                    dexAddress,
                    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                );
                const res = await value.wait();
                if (res?.status) {
                    Entity.actions.setAllowance({ cardId, value: 10000000 });
                } else {
                    Notification.error('Error', 'Internal blockchain error');
                }
            } catch (e) {
                Notification.error('Error', e.message);
                dispatch(Entity.actions.setError(e));
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
});

export const ContractInteractor = createContractInteractor(
    ContractEntity,
    Notification,
);
