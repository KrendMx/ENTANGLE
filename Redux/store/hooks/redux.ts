import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
// обычный селектор, но уже типизированный, используем его
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
