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
        setProfit(state, action: PayloadAction<IUserInfo>) {
            state.profits[action.payload.profit.key].value = action.payload.profit.value;
            state.profits[action.payload.profit.key].value = action.payload.profit.value;
        },
        setAvgPrice(state, action: PayloadAction<IUserInfo>) {
            state.avgPrices[action.payload.avgPrice.key] = action.payload.avgPrice.value;
        },
        setTotalBalance(state, action: PayloadAction<IUserInfo>) {
            state.totalBalance = action.payload.totalBalance;
        },
        setAssetBalance(state, action: PayloadAction<IAssetBalance>) {
            const { assetChainId, chainName, positions } = action.payload;
            state.balances[chainName][assetChainId] = positions;
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
