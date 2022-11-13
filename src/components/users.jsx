import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  function declinationOfNumber(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  const formatUsers = () => {
    return users.length === 0
      ? "никто не тусанет с тобой"
      : `${users.length} 
      ${declinationOfNumber(users.length, [
        "человек тусанет",
        "человека тусанут",
        "человек тусанет",
      ])} с тобой`;
  };

  const getBageClasses = () => {
    let classes = "badge m-2 ";
    classes += users.length === 0 ? "bg-danger" : "bg-primary";
    return classes;
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPhase = (number) => {
    return (
      number !== 0 && (
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col"></th>
        </tr>
      )
    );
  };

  const renderTable = () => {
    return users.map((user) => {
      return (
        <tr key={user._id} id={user._id}>
          <th scope="row">{user.name}</th>
          <td>
            {user.qualities.map((qualities, key) => {
              return (
                <span key={key} className={`badge m-2 bg-${qualities.color}`}>
                  {qualities.name}
                </span>
              );
            })}
          </td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}</td>
          <td>
            <button
              className="badge bg-danger"
              onClick={() => handleDelete(user._id)}
            >
              delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <span className={getBageClasses()}>{formatUsers()}</span>

      <table className="table">
        <thead>{renderPhase(users.length)}</thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </>
  );
};

export default Users;
