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
    },
    extraReducers: (builder) => {
        builder.addCase(importToken.fulfilled, (state, action) => {
            state.positionSumObj = action.payload;
        });
    },
});

export default userSlice.reducer;
