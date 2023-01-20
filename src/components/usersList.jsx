import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import Search from "./layouts/search";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;
    const [searchName, setSearchName] = useState("");
    const [foundedUsers, setFoundedUsers] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) =>
                user._id === id
                    ? {
                        ...user,
                        bookmark: !user.bookmark
                    }
                    : user
            )
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchName]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchName("");
        setFoundedUsers("");
    };

    const handleChangePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (!users) {
        return (
            <div>
                loading...
            </div>
        );
    }
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : foundedUsers || users;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
        setSearchName("");
        setFoundedUsers("");
    };

    const handleUserSearch = (target) => {
        setSelectedProf("");
        const searchResult = users.filter((user) => {
            return user.name.toLowerCase().includes(target.value.toLowerCase());
        });
        setSearchName(target.value);
        setFoundedUsers(searchResult);
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                <Search value={searchName} onChange={handleUserSearch} />
                {userCrop && userCrop.length > 0 && (
                    <UserTable
                        users={userCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handleChangePage}
                    />
                </div>
            </div>
        </div>
    );
};

UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
