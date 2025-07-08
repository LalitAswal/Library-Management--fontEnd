import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../common/Navbar";
import { userProfileAction } from "../../../Redux/features/action/authAction";
import "./userDetails.css";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: sessionStorage.getItem("userName"),
    role: sessionStorage.getItem("role"),
    id: sessionStorage.getItem("id"),
  });

  const { loading, profile, error } = useSelector(
    (state) => state?.profile?.data || {}
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(userProfileAction({ id: user?.id }));
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    console.log("profile?.data", profile);
    if (profile) {
      setUser(profile);
    }
  }, [profile]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleBookList = () => {
    navigate("/Borrowed_Book_List");
  };

  return (
    <>
      <NavBar
        user={user}
        handleLogout={handleLogout}
        handleProfile={handleProfile}
        handleBookList={handleBookList}
      />

      <div className="profile-container">
        <h2>User Profile</h2>
        <p>
          <strong>Name:</strong> {user.username || user.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user.email || "N/A"}
        </p>
        <p>
          <strong>Role:</strong> {user.role || "N/A"}
        </p>
      </div>
    </>
  );
}
