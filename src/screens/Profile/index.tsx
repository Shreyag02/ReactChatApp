import React, { useState, useEffect } from "react";

import CameraBtn from "../../assets/svg/CameraBtn";
import DeleteBtn from "../../assets/svg/DeleteBtn";
import Image from "../../assets/images/avatar.png";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  deleteAvatarFetch,
  updateAvatarFetch,
} from "../../store/reducers/userReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<any>("");
  const { currentUser, isLoading } = useSelector(
    (state: RootState) => state.user
  );

  const updateAvatar = (e: any) => {
    setAvatar(e.target.files[0]);
  };

  useEffect(() => {
    if (avatar) {
      const uploadImg = async () => {
        try {
          dispatch(updateAvatarFetch({ avatar, currentUser }));
          setAvatar("");
        } catch (error) {
          console.log(error);
        }
      };
      uploadImg();
    }
  }, [avatar, currentUser, dispatch]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        dispatch(deleteAvatarFetch({ currentUser }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return currentUser ? (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="profileCard rounded-lg w-11/12 max-w-md p-5 md:py-12 md:px-7 text-white outline-none border-none">
        <div className="flex items-center justify-center flex-col">
          <div className="img_container relative  cursor-pointer flex justify-center">
            {isLoading ? (
              <img
                src={require("../../assets/images/loading.gif")}
                alt="loading..."
                className="h-20 w-20"
              />
            ) : (
              <>
                <img
                  src={currentUser?.avatar || Image}
                  alt="avatar"
                  className="h-28 w-28 rounded-full border border-gray-500 transition-opacity"
                />
                <div className="overlay flex">
                  <label htmlFor="photo">
                    <CameraBtn />
                  </label>
                  {currentUser.avatar ? (
                    <span className="ml-2" onClick={deleteImage}>
                      <DeleteBtn />
                    </span>
                  ) : null}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo"
                    onChange={updateAvatar}
                  />
                </div>
              </>
            )}
          </div>

          <div className="text_container text-center mt-3">
            <h3 className="text-xl font-bold mb-1">{currentUser.name}</h3>
            <h3 className="text-lg ">{currentUser.email}</h3>
            <div className="border my-3 border-t-gray-500 w-full"></div>
            <h3 className="text-base ">
              {/* {console.log(user.createdAt.toDate().toUTCString())} */}
              Joined on: {currentUser.createdAt.toDate().toDateString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;
