import { configureStore, DeepPartial } from '@reduxjs/toolkit';

import logger from 'redux-logger';

import rootReducer from './reducers/rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

export type PartialRootState = DeepPartial<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
