import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { profileReducer } from "./slices/profileSlice";
import { postReducer } from "./slices/postSlice";
import { categoryReducer } from "./slices/categorySlice";
import { commentReducer } from "./slices/commentSlice";
import { passwordReducer } from "./slices/passwordSlice";


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    category: categoryReducer,
    comment: commentReducer,
    password: passwordReducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store);

// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//     },
// });
