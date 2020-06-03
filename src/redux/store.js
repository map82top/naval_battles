import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middleware = [thunk];

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)))
export const persistor = persistStore(store)








