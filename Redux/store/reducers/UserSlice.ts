import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { availableChains } from '../../../src/utils/GlobalConst';
import type { ProviderType } from '../../types';
import { networks } from '../../../src/utils/GlobalConst';
import ethereumNetworksConfig from '../../ethereumNetworksConfig';

interface payDataType {
    '43114': {
        available: string | null;
        totalAvailable: string | null;
        price: string | null;
    };
    '250': {
        available: string | null;
        totalAvailable: string | null;
        price: string | null;
    };
    '56': {
        available: string | null;
        totalAvailable: string | null;
        price: string | null;
    };
}

type payDataActionType = {
    key: availableChains;
    data: { available: string; totalAvailable: string; price: string };
};

type initStateType = {
    positionSumObj: Map<string, number>;
    profits: Map<string, { value: number; change: number }>;
    deposit: Map<string, number>;
    avgPrices: {
        '250': string | null;
        '43114': string | null;
    };
    txLoading: boolean;
    positionSum: string | number;
    payData: payDataType;
};

type ImportTypes = {
    chainId: availableChains;
    provider: ProviderType;
};

type positionSumType = {
    n: number;
    key: availableChains;
};

type profitSumType = {
    n: number,
    change: number,
    key: string
};

const initialState: initStateType = {
    positionSumObj: new Map(),
    profits: new Map(),
    deposit: new Map(),
    avgPrices: {
        '250': null,
        '43114': null,
    },
    txLoading: false,
    positionSum: 0,
    payData: {
        '43114': {
            available: null,
            totalAvailable: null,
            price: null,
        },
        '250': {
            available: null,
            totalAvailable: null,
            price: null,
        },
        '56': {
            available: null,
            totalAvailable: null,
            price: null,
        },
    },
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
            state.positionSumObj = new Map(
                state.positionSumObj.set(action.payload.key, action.payload.n),
            );
        },
        setProfit(state, action: PayloadAction<profitSumType>) {
            state.profits = new Map(
                state.profits.set(action.payload.key, { value: action.payload.n, change: action.payload.change }),
            );
        },
        setDeposit(state, action: PayloadAction<positionSumType>) {
            state.deposit = new Map(
                state.deposit.set(action.payload.key, action.payload.n),
            );
        },
        setPrices(
            state,
            action: PayloadAction<{ '250': string; '43114': string }>,
        ) {
            state.avgPrices = action.payload;
        },
        setPayData(state, action: PayloadAction<payDataActionType>) {
            state.payData[action.payload.key] = action.payload.data;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(importToken.fulfilled, (state, action) => {
            state.positionSumObj = action.payload;
        });
    },
});

export const {
    changeLoadingTx,
    setPositionSum,
    setPrices,
    setDeposit,
    setProfit,
    setPayData,
} = userSlice.actions;
export default userSlice.reducer;
