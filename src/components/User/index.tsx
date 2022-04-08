import clsx from "clsx";
import React, { useEffect } from "react";
import Image from "../../assets/images/avatar.png";
import Paperclip from "../../assets/svg/Paperclip";
import { UserProps } from "../../utils/types";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { getUserLastMsgFetch } from "../../store/reducers/chatReducer";

type userProps = {
  user: UserProps;
  selectUser: Function;
  loggedInUser: string | undefined;
  chat: UserProps;
};

const calcChatId = ({ loggedInUser, user2 }: any) => {
  const id =
    loggedInUser > user2
      ? `${loggedInUser + user2}`
      : `${user2 + loggedInUser}`;
  return id;
};
const User = ({ user, selectUser, loggedInUser, chat }: userProps) => {
  const dispatch = useDispatch();

  const user2 = user.uid;
  const id = calcChatId({ loggedInUser, user2 });
  const data = useSelector((state: RootState) => state.chat.lastMsg);

  useEffect(() => {
    if (user2 && loggedInUser) dispatch(getUserLastMsgFetch(id));
  }, [id, dispatch, loggedInUser, user2]);

  return (
    <div
      className={clsx(
        "flex items-center justify-between p-2 px-3 border-b border-gray-500 cursor-pointer overflow-hidden",
        chat.uid === user2 && "bg-gray-700"
      )}
      onClick={() => selectUser(user)}
    >
      <div className="flex items-center w-11/12">
        <div className="user_img mr-2 w-2/12 flex items-center justify-center">
          <img
            src={user.avatar || Image}
            alt="avatar"
            className="h-12 w-12 rounded-full border border-gray-500 bg-black"
          />
        </div>
        <div className="user_info overflow-hidden w-10/12">
          <div className="flex items-center">
            <p className="text-lg mr-2">{user.name}</p>
            {data && data.unread && data.from !== loggedInUser ? (
              <span className="bg-blue-500 px-1.5 rounded-full text-xs">
                new
              </span>
            ) : null}
          </div>

          {data ? (
            <div className="flex text-xs opacity-80">
              {data.from === loggedInUser ? (
                <span className="mr-1">me:</span>
              ) : null}
              {data.text ? (
                <p className="overflow-hidden text-ellipsis">{data?.text}</p>
              ) : (
                <div className="flex items-center">
                  <span className="mr-1">
                    <Paperclip size="4" />
                  </span>
                  <p>{data.mediaSnap}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs opacity-80">Start a conversation</p>
          )}
        </div>
      </div>
      <div className="w-1/12 flex justify-center items-center">
        <div
          className={clsx(
            "h-2 w-2 rounded-full",
            user.isOnline ? "bg-green-500" : "bg-red-500"
          )}
        ></div>
      </div>
    </div>
  );
};

export default User;
