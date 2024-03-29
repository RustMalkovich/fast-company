import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
// import { ProfessionProvider } from "./hooks/useProfessions";
// import { QualitiesProvider } from "./hooks/useQualities";
// import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                {/* <AuthProvider> */}
                <NavBar />
                {/* <QualitiesProvider> */}
                {/* <ProfessionProvider> */}
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
                {/* </ProfessionProvider> */}
                {/* </QualitiesProvider> */}
                {/* </AuthProvider> */}
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
