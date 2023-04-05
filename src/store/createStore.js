import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionsReducer from "./professions";
import qualitiesReduser from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReduser,
    professions: professionsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
