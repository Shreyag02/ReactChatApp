import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { auth, db, storage } from "./firebase";
import { eventChannel } from "redux-saga";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const signupWithEmailAndPassword = async ({ email, password, name }) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const userData = {
      uid: result.user.uid,
      name,
      email,
      createdAt: Timestamp.fromDate(new Date()),
      isOnline: true,
      avatar: "",
      avatarPath: "",
    };

    await setDoc(doc(db, "users", result.user.uid), userData);

    return userData;
  } catch (error) {
    return error;
  }
};

const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    await updateDoc(doc(db, "users", result.user.uid), {
      isOnline: true,
    });

    const loggedInUser = await getDoc(doc(db, "users", result.user.uid)).then(
      (docSnap) => {
        if (docSnap.exists()) {
          return docSnap.data();
        }
      }
    );
    return loggedInUser;
  } catch (error) {
    return error;
  }
};

const firebaseUsers = async ({ loggedInUserUID }) => {
  try {
    const usersRef = collection(db, "users");
    // create query object
    const q = query(usersRef, where("uid", "not-in", [loggedInUserUID]));

    return eventChannel((emitter) => {
      const unsub = onSnapshot(q, (querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        emitter(users);
      });
      return () => unsub();
    });
  } catch (error) {
    return error;
  }
};

const firebaseChatMsgs = async ({ id }) => {
  try {
    const msgsRef = collection(db, "messages", id, "chat");

    const q = query(msgsRef, orderBy("createdAt", "asc"));

    return eventChannel((emitter) => {
      const unsub = onSnapshot(q, (querySnapshot) => {
        let chatMsgs = [];
        querySnapshot.forEach((doc) => {
          chatMsgs.push(doc.data());
        });
        emitter(chatMsgs);
      });
      return () => unsub();
    });
  } catch (error) {
    return error;
  }
};

const addNewMsg = async ({ loggedInUserUID, chatUserUID, img, text }) => {
  try {
    const id =
      loggedInUserUID > chatUserUID
        ? `${loggedInUserUID + chatUserUID}`
        : `${chatUserUID + loggedInUserUID}`;

    let url, snap;
    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()}-${img.name}`);

      const tempSnap = await uploadBytes(imgRef, img);
      const tempUrl = await getDownloadURL(ref(storage, tempSnap.ref.fullPath));
      url = tempUrl;
      snap = tempSnap.ref.fullPath;
    }
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: loggedInUserUID,
      to: chatUserUID,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      mediaSnap: snap || "",
    });

    //setdoc will look for doc id, if it exists it will replace the existing doc, otherwise new doc will be created

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: loggedInUserUID,
      to: chatUserUID,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      mediaSnap: img.name || "",
      unread: true,
    });
    return true;
  } catch (error) {
    return error;
  }
};

const getUserLastMsg = async ({ id }) => {
  try {
    return eventChannel((emitter) => {
      const unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
        console.log({ id, data: doc.data() });
        let lastMsg = doc.data;
        emitter(lastMsg);
      });
      return () => unsub();
    });
  } catch (error) {
    return error;
  }
};

// if (user2 && loggedInUser) {
//   const id =
//     loggedInUser > user2
//       ? `${loggedInUser + user2}`
//       : `${user2 + loggedInUser}`;
//   let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
//     setData(doc.data());
//   });

//   return () => unsub();
// }

const lastMsgStatus = async ({ id, loggedInUserUID }) => {
  try {
    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data()?.from !== loggedInUserUID) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
    return true;
  } catch (error) {
    return error;
  }
};

const updateUserAvatar = async ({ avatar, currentUser }) => {
  try {
    const imgRef = ref(
      storage,
      `avatar/${new Date().getTime()}-${avatar.name}`
    );

    if (currentUser?.avatarPath) {
      await deleteObject(ref(storage, currentUser?.avatarPath));
    }

    const snap = await uploadBytes(imgRef, avatar);
    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

    if (currentUser.uid)
      await updateDoc(doc(db, "users", currentUser.uid), {
        avatar: url,
        avatarPath: snap.ref.fullPath,
      });

    return {
      avatar: url,
      avatarPath: snap.ref.fullPath,
    };
  } catch (error) {
    return error;
  }
};

const deleteUserAvatar = async ({ currentUser }) => {
  try {
    console.log("hello from delete avatar ");
    await deleteObject(ref(storage, currentUser.avatarPath));

    if (currentUser.uid)
      await updateDoc(doc(db, "users", currentUser.uid), {
        avatar: "",
        avatarPath: "",
      });
    return true;
  } catch (error) {
    return error;
  }
};

export {
  signupWithEmailAndPassword,
  loginWithEmailAndPassword,
  firebaseUsers,
  firebaseChatMsgs,
  addNewMsg,
  lastMsgStatus,
  deleteUserAvatar,
  updateUserAvatar,
  getUserLastMsg,
};
