import React, { useState } from "react";
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    
    const handleToggleBookMark  = (id) => {
        setUsers((users) =>
        users.map((user) =>
        user._id === id
          ? {
              ...user,
              bookmark: !user.bookmark,
            }
          : user
      )
    );
    };
   
    return (
    <div className="App">
      <SearchStatus length={users.length}/>
       
    {users.length > 0 && (
      <Users onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} users={users}/>
    )} 
    </div>
    );    
}

export default App;