import React, { useState, useEffect } from "react";
import userService from "../services/user.service";

const Homec = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getUser().then(
      (response) => {
        setUsers(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <h3>
        {users.map((user, index) => (
          <div key={index}>{user}</div>
        ))}
      </h3>
    </div>
  );
};

export default Homec;