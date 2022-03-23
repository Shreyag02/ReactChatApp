import React, { useState, useEffect } from "react";
import { auth, storage } from "../../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import CameraBtn from "../../common/CameraBtn";
import DeleteBtn from "../../common/DeleteBtn";
import Image from "../../../assets/images/avatar.png";

const Profile = () => {
  type avatarType = any;
  const [avatar, setAvatar] = useState<avatarType>("");

  const updateAvatar = (e: any) => {
    console.log(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };
  console.log("avatar is", avatar);

  useEffect(() => {
    if (avatar) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${avatar.name}`
        );

        const snap = await uploadBytes(imgRef, avatar);
        console.log("snap", snap.ref.fullPath);
      };
      uploadImg();
    }
  }, [avatar]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="profileCard rounded-lg w-11/12 max-w-md p-5 md:py-12 md:px-7 text-white outline-none border-none">
        <div className="flex items-center justify-center">
          <div className="img_container relative  cursor-pointer w-2/5 flex justify-center">
            <img
              src={Image}
              alt="avatar"
              className="h-28 w-28 rounded-full border border-gray-400 transition-opacity"
            />
            <div className="overlay flex">
              <label htmlFor="photo" className="mr-2">
                <CameraBtn />
              </label>
              <DeleteBtn />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={updateAvatar}
              />
            </div>
          </div>

          <div className="text_container w-3/5">
            <h3 className="text-xl font-bold mb-1">John Doe</h3>
            <h3 className="text-lg ">JohnDoe@gmail.com</h3>
            <div className="border my-3 border-t-gray-400 w-full"></div>
            <h3 className="text-lg ">Joined on:</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
