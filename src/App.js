import React from "react";
import Users from "./components/users";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";
import UserPage from "./components/userPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/" exact component={Users} />
                <Route path="/users/:userId?" component={UserPage} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Main} />
            </Switch>
        </div>
    );
}

export default App;
