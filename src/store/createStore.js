import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionsReducer from "./professions";
import qualitiesReduser from "./qualities";
import usersReducer from "./users";

const rootReducer = combineReducers({
    qualities: qualitiesReduser,
    professions: professionsReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
