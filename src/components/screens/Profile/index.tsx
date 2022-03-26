import React, { useState, useEffect } from "react";
import { auth, storage, db } from "../../../services/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import CameraBtn from "../../common/CameraBtn";
import DeleteBtn from "../../common/DeleteBtn";
import Image from "../../../assets/images/avatar.png";

const Profile = () => {
  const [avatar, setAvatar] = useState<any>("");
  const [user, setUser] = useState<any>();
  const [loader, setLoader] = useState(false);

  const updateAvatar = (e: any) => {
    console.log(e.target.files[0]);
    setAvatar(e.target.files[0]);
  };

  useEffect(() => {
    if (auth.currentUser)
      getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
        if (docSnap.exists()) setUser(docSnap.data());
      });

    if (avatar) {
      setLoader(true);
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()}-${avatar.name}`
        );

        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }

          const snap = await uploadBytes(imgRef, avatar);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          if (auth.currentUser)
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
              avatar: url,
              avatarPath: snap.ref.fullPath,
            });

          setAvatar("");
          setTimeout(() => {
            setLoader(false);
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      };
      uploadImg();
    }
  }, [avatar]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        if (auth.currentUser)
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: "",
            avatarPath: "",
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return user ? (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="profileCard rounded-lg w-11/12 max-w-md p-5 md:py-12 md:px-7 text-white outline-none border-none">
        <div className="flex items-center justify-center">
          <div className="img_container relative  cursor-pointer w-2/5 flex justify-center">
            {loader ? (
              <img
                src={require("../../../assets/images/loading.gif")}
                alt="loading..."
                className="h-20 w-20"
              />
            ) : (
              <>
                <img
                  src={user.avatar || Image}
                  alt="avatar"
                  className="h-28 w-28 rounded-full border border-gray-500 transition-opacity"
                />
                <div className="overlay flex">
                  <label htmlFor="photo">
                    <CameraBtn />
                  </label>
                  {user.avatar ? (
                    <span className="ml-2">
                      <DeleteBtn deleteImage={deleteImage} />
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

          <div className="text_container w-3/5">
            <h3 className="text-xl font-bold mb-1">{user.name}</h3>
            <h3 className="text-lg ">{user.email}</h3>
            <div className="border my-3 border-t-gray-500 w-full"></div>
            <h3 className="text-base ">
              {/* {console.log(user.createdAt.toDate().toUTCString())} */}
              Joined on: {user.createdAt.toDate().toDateString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Profile;
