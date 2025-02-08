import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFail,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";
import img1 from "../images/img1.jpeg";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [showListingErro, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFail(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFail(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFail(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFail(data.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center py-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full w-24 h-24 object:cover cursor-pointer self-center "
        />
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 uppercase">
          Update
        </button>
        <Link
          to="/create-listing"
          className="bg-green-700 uppercase p-3 rounded-lg text-white hover:opacity-95 text-center"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <button onClick={handleShowListing} className="text-green-700 w-full">
        Show Listing
      </button>

      <p className="text-red-700 mt-5">
        {" "}
        {showListingErro ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center my-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg flex justify-between items-center p-3 gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img src={img1} alt="" className="h-16 w-16 object-contain" />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-700 font-semibold flex-1 hover:underline truncate"
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
