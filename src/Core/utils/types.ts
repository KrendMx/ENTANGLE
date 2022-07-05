import type { AsyncThunk } from '@reduxjs/toolkit';

export type Thunk<Args> = AsyncThunk<void, Args, any>;
