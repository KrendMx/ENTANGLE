import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
    initStateType,
    payDataActionType,
    ImportTypes,
    positionSumType,
    profitSumType,
} from '../interfaces/User.interfaces';
import { networks } from '../../../utils/GlobalConst';
import ethereumNetworksConfig from '../../ethereumNetworksConfig';

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
    isOpenModal: false,
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
                        throw new Error(switchError);
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
                state.profits.set(action.payload.key, {
                    value: action.payload.n,
                    change: action.payload.change,
                }),
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
        setIsOpenModal(state, action: PayloadAction<boolean>) {
            state.isOpenModal = action.payload;
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
    setIsOpenModal,
} = userSlice.actions;
export default userSlice.reducer;
