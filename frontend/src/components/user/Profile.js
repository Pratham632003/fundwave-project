import React, { Fragment } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {
            isAuthenticated && user && (
                  <div className="profileContainer">
                <div>
                  <h1>My Profile</h1>
                  <img src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
                </div>
                <div>
                  <div>
                    <h4>Name</h4>
                    <p>{user?.name}</p>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>{user?.email}</p>
                  </div>
                  <div>
                    <h4>User Role</h4>
                    <p>{user?.role === "admin" ? "Teacher" : "Student"}</p>
                  </div>
                  <div>
                    <h4>Joined On</h4>
                    <p>{(user?.createdAt).substr(0,10)}</p>
                  </div>
                </div>
              </div>
            )
          }
          
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
