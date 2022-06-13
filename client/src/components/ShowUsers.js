import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import UserCard from "./UserCard";
import uuid from "react-uuid";

const ShowUsers = ({ url }) => {
  const location = useLocation();

  const { user: loggedUser } = useSelector((state) => state.auth);

  const paths = location.pathname.split("/");

  const userid = paths[2] === "me" ? loggedUser._id : paths[2];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${loggedUser.token}`,
    },
  };

  useEffect(() => {
    const fetchUsers = async (url) => {
      axios
        .get(`http://localhost:5000/users/${userid}/${url}`, config)
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(true);
        });
    };

    fetchUsers(url);

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {!error && users.length === 0 ? <p>No {paths[3]}</p> : ""}
      {!error && users.length !== 0
        ? users.map((user) => {
            return <UserCard key={uuid()} user={user} />;
          })
        : ""}
    </div>
  );
};

export default ShowUsers;
