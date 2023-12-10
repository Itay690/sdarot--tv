import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { sdarotApi } from './services/sdarot.api';

export const store = configureStore({
  reducer: { [sdarotApi.reducerPath]: sdarotApi.reducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sdarotApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
