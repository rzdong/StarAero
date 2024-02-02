import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import themeReducer from './reducerSlice/theme';
import settingReducer from './reducerSlice/setting';
import bucketReducer from './reducerSlice/bucket';
import objectReducer from './reducerSlice/object';
import transportReducer from './reducerSlice/transport';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// store persist config
const persistConfig = (key: string, options?: object) => ({
  key,
  storage,
  ...options,
});

// combine reducer
const reducer = combineReducers({
  theme: persistReducer(persistConfig('theme'), themeReducer),
  
  setting: persistReducer(persistConfig('setting'), settingReducer),

  bucket: persistReducer(persistConfig('bucket', {
    blacklist: ['breadcrumbs'],
  }), bucketReducer),

  object: persistReducer(persistConfig('object', {
    blacklist: ['objects']
  }), objectReducer),

  transport: persistReducer(persistConfig('transport', {
    // blacklist: ['transports']
  }), transportReducer),
});


export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
