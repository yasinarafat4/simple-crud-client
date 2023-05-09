import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDeleteUser = (_id) => {
    console.log("dlt", _id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("Deleted Successfully");
          const remainingUsers = users.filter((user) => user._id !== _id);
          setUsers(remainingUsers);
        }
      });
  };

  return (
    <div>
      <h2>Total Users: {users.length}</h2>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name}:{user.email}{" "}
            <Link to={`/update/${user._id}`}>
              <button className="btn-update">Update User</button>
            </Link>
            <button
              onClick={() => handleDeleteUser(user._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "5px 10px 5px 10px",
              }}
            >
              X
            </button>
          </p>
        ))}
      </div>
      <Link to="/">
        <button className="btn">Back to Home</button>
      </Link>
    </div>
  );
};

export default Users;
