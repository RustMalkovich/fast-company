import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
// import UserProvider from "../hooks/useUsers";
// import { useAuth } from "../hooks/useAuth";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();
    // const { currentUser } = useAuth();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {/* <UserProvider> */}
                    {userId ? (
                        edit ? (
                            userId === currentUserId ? (
                                <EditUserPage />
                            ) : (
                                <Redirect to={`/users/${currentUserId}/edit`} />
                            )
                        ) : (
                            <UserPage userId={userId} />
                        )
                    ) : (
                        <UsersListPage />
                    )}
                {/* </UserProvider> */}
            </UsersLoader>
        </>
    );
};

export default Users;
