import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../../../services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import Image from "../../../assets/images/avatar.png";
import startOwl from "../../../assets/images/owl-cup.png";

import User from "../../common/User";
import MessageForm from "../../common/MessageForm";
import CloseBtn from "../../svg/CloseBtn";
import Message from "../../common/Message";

const Home = () => {
  const [users, setUsers] = useState<any>([]);
  const [chat, setChat] = useState<any>("");
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<any>("");
  const [msgs, setMsgs] = useState<[]>([]);

  const user1 = auth.currentUser?.uid;

  useEffect(() => {
    if (user1) {
      const usersRef = collection(db, "users");
      // create query object
      const q = query(usersRef, where("uid", "not-in", [user1]));
      // execute query
      const unsub = onSnapshot(q, (querySnapshot) => {
        let users: any = [];

        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setUsers(users);
      });
      return () => unsub();
    }
  }, []);

  const selectUser = (user: any) => {
    setChat(user);

    const user2 = user.uid;
    if (user1) {
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      const msgsRef = collection(db, "messages", id, "chat");

      const q = query(msgsRef, orderBy("createdAt", "asc"));

      onSnapshot(q, (querySnapshot) => {
        let chatMsgs: any = [];
        querySnapshot.forEach((doc) => {
          chatMsgs.push(doc.data());
        });
        setMsgs(chatMsgs);
      });
    }
  };

  const closeChat = () => setChat("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const user2 = chat.uid;

    // messages => id => chat =>addDoc
    if (user1) {
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      let url, snap;

      if (img) {
        const imgRef = ref(
          storage,
          `images/${new Date().getTime()}-${img.name}`
        );

        const tempSnap = await uploadBytes(imgRef, img);
        const tempUrl = await getDownloadURL(
          ref(storage, tempSnap.ref.fullPath)
        );
        url = tempUrl;
        snap = tempSnap.ref.fullPath;
      }
      await addDoc(collection(db, "messages", id, "chat"), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        mediaSnap: snap || "",
      });
      setText("");
      setImg("");
    }
  };

  return (
    <div className="pt-16 pb-2 text-white flex h-screen">
      <div className="w-1/3 border-r border-gray-500">
        {users.map((user: any) => (
          <User user={user} key={user.uid} selectUser={selectUser} />
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
                <CloseBtn closeChat={closeChat} />
              </div>
            </div>
            <div
              className="messages"
              style={{ height: "calc(100vh - 200px)", overflowY: "auto" }}
            >
              {msgs.length
                ? msgs.map((msg: any, index: any) => (
                    <Message key={index} msg={msg} user1={user1} />
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
