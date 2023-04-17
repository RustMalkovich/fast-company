import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionsReducer from "./professions";
import qualitiesReduser from "./qualities";
import usersReducer from "./users";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
    qualities: qualitiesReduser,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
