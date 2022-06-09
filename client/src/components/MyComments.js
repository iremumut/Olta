import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import Comment from "./Comment";

const MyComments = () => {
  const [commments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [noComments, setNoComments] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    const fetchComments = async () => {
      await axios
        .get("http://localhost:5000/users/comments", config)
        .then((res) => res.data)
        .then((data) => {
          if (!data) {
            setNoComments(true);
          } else {
            setComments(data);
          }
        })
        .then(() => setLoading(false));
    };

    fetchComments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      {noComments ? <p>No comments.</p> : ""}
      {!noComments && commments.length !== 0
        ? commments.map((commment) => {
            return <Comment key={uuid()} comment={commment} user={user} />;
          })
        : ""}
    </div>
  );
};

export default MyComments;
