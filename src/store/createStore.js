import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReduser from "./qualities";

const rootReducer = combineReducers({ qualities: qualitiesReduser });

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
