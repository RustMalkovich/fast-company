import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;
    const [users, setUsers] = useState();
    const [searchQuery, setSearchQuery] = useState("");

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
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedProf(item);
    };

    const handleChangePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

    if (users) {
        const filteredUsers = searchQuery
            ? users.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;

        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
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
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search..."
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    {count > 0 && (
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
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
