import { applyMiddleware} from "@reduxjs/toolkit";
import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import persistReducer from "redux-persist/es/persistReducer";
import { thunk } from 'redux-thunk';
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./reducers/rootReducer";
import { initState } from "./initState";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
    ]
  }
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    initState,
    composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
persistor.purge();

export default store;
