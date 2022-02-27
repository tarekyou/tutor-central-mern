import React from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
// import { useNavigate } from "react-router-dom";
import { UPDATE_USER } from "../utils/mutations";

function TutorProfile() {
  // return <div>Profile</div>;
  // let navigate = useNavigate();

  const { loading, data } = useQuery(QUERY_ME);
  console.log(data);

  // const user = data?.me ||  {};
  // console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>Viewing {data.me.username} profile</h2>
      </div>

      <div>
        <div>
          <p>{data.me.username}</p>
          <p>{data.me.email}</p>
        </div>
      </div>
    </>
  );
}

export default TutorProfile;
