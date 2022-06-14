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
import QueryRequests from '../../../GraphService/queryRequests';
import type { TransactionHistoryEntity } from '../../../context/ServiceContext/ServiceContext.interfaces';
import { calculateBalances } from './ActionCreators';

const initialState: initStateType = {
    positionSumObj: new Map(),
    profits: new Map(),
    deposit: new Map(),
    avgPrices: {},
    txLoading: false,
    positionSum: 0,
    cardLoaded: false,
    totalBalance: 0,
    balances: {},
    txHistory: [],
    txLoaded: false,
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

export const getAverageBuyPrice = createAsyncThunk(
    'uesr/getAverageBuyPrice',
    async ({ account }: {account: string}): Promise<any> => (await QueryRequests.calculateAVG(account)),
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
            if (!state.profits.get('1')) {
                state.profits = new Map(
                    state.profits.set('1', {
                        value: 0,
                        change: 0,
                    }),
                );
            }
        },
        setTxLoaded(state, action: PayloadAction<boolean>) {
            state.txLoaded = action.payload;
        },
        setCardLoaded(state, action: PayloadAction<boolean>) {
            state.cardLoaded = action.payload;
        },
        setDeposit(state, action: PayloadAction<positionSumType>) {
            state.deposit = new Map(
                state.deposit.set(action.payload.key, action.payload.n),
            );
        },
        setTxHistory(state, action: PayloadAction<TransactionHistoryEntity[]>) {
            state.txHistory = action.payload;
        },
        setPrices(
            state,
            action: PayloadAction<{[key: string]: number}>,
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
        builder.addCase(getAverageBuyPrice.fulfilled, (state, action) => {
            state.avgPrices = action.payload;
        });
        builder.addCase(calculateBalances.fulfilled, (state, action) => {
            const { totalBalance, balances } = action.payload;
            state.totalBalance = totalBalance;
            state.balances = balances;
            state.cardLoaded = true;
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
    setTxHistory,
    setCardLoaded,
    setTxLoaded,
} = userSlice.actions;
export default userSlice.reducer;
