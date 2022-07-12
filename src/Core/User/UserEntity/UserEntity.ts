// Deps
import { createSlice } from '@reduxjs/toolkit';
import { withHelperReducers, withHelperState } from 'src/Core/utils/helper';

// Interfaces
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IWithHelperState } from 'src/Core/utils/helper';
import type {
    IAssetBalance, IUserEntityState, IUserInfo, TransactionHistoryEntity, payDataActionType,
} from './UserEntity.interfaces';

const initialState: IUserEntityState & IWithHelperState = {
    ...withHelperState,
    profits: {},
    positionSumObj: {},
    avgPrices: {},
    totalBalance: 0,
    balances: {},
    cardLoaded: false,
    txLoading: false,
    txHistory: [],
    txLoaded: false,
    isOpenModal: false,
    payData: {},
};

export const UserEntity = createSlice({
    name: 'UserEntity',
    initialState,
    reducers: {
        ...withHelperReducers,
        setProfit(state, action: PayloadAction<any>) {
            state.profits = action.payload;
        },
        setAvgPrice(state, action: PayloadAction<{res: typeof this.state.avgPrices}>) {
            state.avgPrices = action.payload;
        },
        setTotalBalance(state, action: PayloadAction<IUserInfo>) {
            state.totalBalance = action.payload.totalBalance;
        },
        setAssetBalance(state, action: PayloadAction<any>) {
            state.balances = action.payload;
        },
        setTxHistory(state, action: PayloadAction<TransactionHistoryEntity[]>) {
            state.txHistory = action.payload;
        },
        setTxLoaded(state, action: PayloadAction<boolean>) {
            state.txLoaded = action.payload;
        },
        changeLoadingTx(state, action: PayloadAction<boolean>) {
            state.txLoading = action.payload;
        },
        setCardLoaded(state, action: PayloadAction<boolean>) {
            state.cardLoaded = action.payload;
        },
        setIsOpenModal(state, action: PayloadAction<boolean>) {
            state.isOpenModal = action.payload;
        },
        setPayData(state, action: PayloadAction<payDataActionType>) {
            state.payData[action.payload.key] = action.payload.data;
        },
        setPositionSum(state, action: PayloadAction<{key: string, n: number}>) {
            const { n, key } = action.payload;
            state.positionSumObj[key] = n;
        },
    },
});
