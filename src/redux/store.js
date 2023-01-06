import { configureStore } from '@reduxjs/toolkit';
import { favReducer } from './slices/Favslice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, favReducer)


export const store = configureStore({
    reducer: {favoriteMovies:persistedReducer},
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})



export const persistor = persistStore(store)
