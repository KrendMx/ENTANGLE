import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { availableChains } from '../../../src/utils/GlobalConst';
import type { ProviderType } from '../../types';
import { networks } from '../../../src/utils/GlobalConst';
import ethereumNetworksConfig from '../../ethereumNetworksConfig';

type initStateType = {
    positionSumObj: Map<string, number>,
    txLoading: boolean,
    positionSum: string | number,
    isOpenSelectWalletModal: boolean;
    preLoader: boolean;
}

type ImportTypes = {
    chainId: availableChains;
    provider: ProviderType;
}

type positionSumType = {
    n: number,
    key: availableChains,
}

const initialState: initStateType = {
    positionSumObj: new Map(),
    txLoading: false,
    positionSum: 0,
    isOpenSelectWalletModal: false,
    preLoader: true,
};

const importToken = createAsyncThunk(
    'user/import-token',
    async ({ chainId, provider }: ImportTypes): Promise<any> => {
        if (provider) {
            const options = {
                type: 'ERC20',
                options: {
                    address: networks[chainId].synth,
                    symbol: 'SYNTH',
                    decimals: 18,
                },
            };
            try {
                // @ts-ignore
                await provider.send('wallet_watchAsset', options);
            } catch (switchError: any) {
                if (switchError.code === 4902) {
                    try {
                        await provider.send('wallet_addEthereumChain', [
                            ethereumNetworksConfig[chainId],
                        ]);
                    } catch (addError) {
                        console.log(switchError);
                    }
                }
            }
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeLoadingTx(state, action: PayloadAction<boolean>) {
            state.txLoading = action.payload;
        },
        setPositionSum(state, action: PayloadAction<positionSumType>) {
            state.positionSumObj = new Map(state.positionSumObj.set(action.payload.key, action.payload.n));
        },
        setIsOpenSelectWalletModal(state) {
            state.isOpenSelectWalletModal = !state.isOpenSelectWalletModal;
        },
        setPreloader(state) {
            state.preLoader = !state.preLoader;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(importToken.fulfilled, (state, action) => {
            state.positionSumObj = action.payload;
        });
    },
});

export const {
    changeLoadingTx, setPositionSum, setIsOpenSelectWalletModal, setPreloader,
} = userSlice.actions;
export default userSlice.reducer;
