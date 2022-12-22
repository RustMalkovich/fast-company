import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ match }) => {
    const userId = match.params.userId;
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });
    const handleClick = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>Встретился, раз: {user.completedMeetings}</p>
                <h2>Оценка: {user.rate}</h2>
                <button
                    onClick={() => {
                        handleClick();
                    }}
                >
                    Все пользователи
                </button>
            </div>
        );
    }
    return <h1>Loading</h1>;
};
UserPage.propTypes = {
    match: PropTypes.object.isRequired
};

export default UserPage;
