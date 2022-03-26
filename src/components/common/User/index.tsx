import clsx from "clsx";
import React from "react";
import Image from "../../../assets/images/avatar.png";
const User = ({ user, selectUser }: any) => {
  return (
    <div
      className="flex items-center justify-between p-2 px-3 border-b border-gray-500 cursor-pointer"
      onClick={() => selectUser(user)}
    >
      <div className=" flex items-center">
        <div className="user_img mr-2">
          <img
            src={user.avatar || Image}
            alt="avatar"
            className="h-12 w-12 rounded-full border border-gray-500"
          />
        </div>
        <div className="user_info">
          <p className="text-lg">{user.name}</p>
        </div>
      </div>
      <div
        className={clsx(
          "h-2 w-2 rounded-full",
          user.isOnline ? "bg-green-500" : "bg-red-500"
        )}
      ></div>
    </div>
  );
};

export default User;
