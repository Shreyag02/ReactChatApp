import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { UserProps } from "../../utils/types";
//assets
import CloseBtn from "../../assets/svg/CloseBtn";
import Image from "../../assets/images/avatar.png";
import startOwl from "../../assets/images/owl-cup.png";
//components
import User from "../../components/User";
import MessageForm from "../../components/MessageForm";
import Message from "../../components/Message";
//reducers
import { getChatUsersFetch } from "../../store/reducers/userReducer";
import {
  selectedChatMessagesFetch,
  selectedChatUserSuccess,
} from "../../store/reducers/chatReducer";
import {
  addNewMessageFetch,
  readStatusFetch,
} from "../../store/reducers/messageReducer";

const Home = () => {
  const dispatch = useDispatch();
  //data from state
  const users = useSelector((state: RootState) => state.user.allUsers);
  const loggedInUserUID = useSelector(
    (state: RootState) => state.user.currentUser.uid
  );
  const chat = useSelector((state: RootState) => state.chat.selectedChatUser);
  const msgs = useSelector(
    (state: RootState) => state.chat.selectedChatMessages
  );
  //local data
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<File | any>(null);

  useEffect(() => {
    console.log(loggedInUserUID);
    dispatch(getChatUsersFetch({ loggedInUserUID }));
  }, [loggedInUserUID, dispatch]);

  const selectUser = async (user: UserProps) => {
    dispatch(selectedChatUserSuccess(user));

    const chatUserUID = user.uid;
    if (loggedInUserUID && chatUserUID) {
      const id =
        loggedInUserUID > chatUserUID
          ? `${loggedInUserUID + chatUserUID}`
          : `${chatUserUID + loggedInUserUID}`;
      dispatch(selectedChatMessagesFetch({ id }));
      dispatch(readStatusFetch({ id, loggedInUserUID }));
    }
  };

  const closeChat = () => dispatch(selectedChatUserSuccess(""));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const chatUserUID = chat.uid;
    // messages => id => chat =>addDoc
    if (loggedInUserUID && chatUserUID) {
      dispatch(addNewMessageFetch({ loggedInUserUID, chatUserUID, img, text }));
      setText("");
      setImg("");
    }
  };

  return (
    <div className="pt-16 pb-2 text-white flex h-screen">
      <div className="w-1/3 border-r border-gray-500">
        {users.length &&
          users?.map((user: any) => (
            <User
              user={user}
              key={user.uid}
              selectUser={selectUser}
              loggedInUser={loggedInUserUID}
              chat={chat}
            />
          ))}
      </div>
      <div className="w-2/3">
        {chat ? (
          <div
            className="relative"
            style={{ height: "-webkit-fill-available" }}
          >
            <div className="selected_user p-2 px-3">
              <div className="flex items-center justify-between border-b border-gray-500 pb-2">
                <div className="flex items-center">
                  <div className="user_img mr-2">
                    <img
                      src={chat.avatar || Image}
                      alt="avatar"
                      className="h-12 w-12 rounded-full border border-gray-500"
                    />
                  </div>
                  <div className="user_info">
                    <p className="text-lg">{chat.name}</p>
                  </div>
                </div>
                <button onClick={closeChat}>
                  <CloseBtn />
                </button>
              </div>
            </div>
            <div
              className="messages overflow-y-auto overflow-x-hidden"
              style={{ height: "calc(100vh - 200px)" }}
            >
              {msgs.length
                ? msgs.map((msg: any, index: any) => (
                    <Message
                      key={index}
                      msg={msg}
                      loggedInUser={loggedInUserUID}
                    />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              img={img}
              setImg={setImg}
            />
          </div>
        ) : (
          <div
            className="flex justify-center items-center flex-col"
            style={{ height: "-webkit-fill-available" }}
          >
            <div>
              <img src={startOwl} alt="select user" className="h-36 w-36" />
            </div>
            <div>Select a user to start a chat</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
