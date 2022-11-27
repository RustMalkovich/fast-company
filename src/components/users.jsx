import React, { useState } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "./utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Провфессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handleChangePage}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            profession: PropTypes.objectOf(PropTypes.string.isRequired),
            qualities: PropTypes.arrayOf(
                PropTypes.objectOf(PropTypes.string.isRequired)
            ),
            completedMeetings: PropTypes.number.isRequired,
            rate: PropTypes.number.isRequired,
            bookmark: PropTypes.bool.isRequired
        })
    )
};

export default Users;
