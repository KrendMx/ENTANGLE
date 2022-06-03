import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

import userReducer from './reducers/UserSlice';
import appReducer from './reducers/AppSlice';
import walletReducer from './reducers/WalletSlice';
import SidebarReducer from './reducers/MintSidebarSlice';

enableMapSet();

const rootReducer = combineReducers({
    appReducer,
    userReducer,
    walletReducer,
});

// Store initialization
export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }),
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
