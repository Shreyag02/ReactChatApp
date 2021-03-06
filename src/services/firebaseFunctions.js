import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  signOut,
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
    const result = await setPersistence(auth, browserSessionPersistence).then(
      async () => {
        return await createUserWithEmailAndPassword(auth, email, password);
      }
    );

    const userData = {
      uid: result.user.uid,
      name,
      email,
      createdAt: Timestamp.fromDate(new Date()),
      isOnline: true,
      avatar: "",
      avatarPath: "",
    };
    const authData = auth.currentUser;
    await setDoc(doc(db, "users", result.user.uid), userData);
    return { userData, authData };
  } catch (error) {
    console.log(error, error.code);
    throw error;
  }
};

const reloadFirebaseData = async (sessionData) => {
  try {
    let userData = await getDoc(doc(db, "users", sessionData.uid)).then(
      (docSnap) => docSnap.data()
    );

    return { authData: sessionData, userData };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const result = await setPersistence(auth, browserSessionPersistence).then(
      async () => {
        return await signInWithEmailAndPassword(auth, email, password);
      }
    );

    await updateDoc(doc(db, "users", result.user.uid), {
      isOnline: true,
    });
    const authData = auth.currentUser;
    //store result as auth
    const userData = await getDoc(doc(db, "users", result.user.uid)).then(
      (docSnap) => {
        if (docSnap.exists()) {
          return docSnap.data();
        }
      }
    );

    return { userData, authData };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fun = async ({ authData }) => {
  let tempData = await getDoc(doc(db, "users", authData.uid)).then(
    (docSnap) => {
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        const temp = {
          uid: authData.uid,
          name: authData.displayName,
          email: authData.email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
          avatar: "",
          avatarPath: "",
        };
        setDoc(doc(db, "users", authData.uid), temp);
        return temp;
      }
    }
  );
  return tempData;
};

const signInWithGoogle = async ({ payload }) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const data = await setPersistence(auth, browserSessionPersistence)
    .then(async () => {
      return await signInWithPopup(auth, provider).then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const authData = result.user;
        console.log("line 124", authData);
        localStorage.setItem("token", authData.accessToken);
        localStorage.setItem("userId", authData.uid);
        let userData = await fun({ authData });
        return { userData, authData };
      });
    })
    .catch((error) => {
      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
      throw error;
    });

  return data;
};

const logout = async () => {
  if (auth.currentUser)
    await updateDoc(doc(db, "users", auth.currentUser?.uid), {
      isOnline: false,
    });
  localStorage.clear();
  sessionStorage.clear();
  await signOut(auth);
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
    console.log(error);
    throw error;
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
    console.log(error);
    throw error;
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
    console.log(error);
    throw error;
  }
};

const getUserLastMsg = async ({ id, data }) => {
  try {
    let lastMsg = {
      hi: "test",
    };
    onSnapshot(doc(db, "lastMsg", id), (doc) => {
      if (doc.exists()) return (lastMsg[`${id}`] = doc.data());
      else return (lastMsg[`${id}`] = null);
    });
  } catch (error) {
    // return eventChannel((emitter) => {
    //   let lastMsg = {
    //     hi: "test",
    //   };
    //   const unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
    //     if (doc.exists()) lastMsg[`${id}`] = doc.data();
    //     else lastMsg[`${id}`] = null;
    //     console.log(`from firebase func`, lastMsg);
    //     emitter(lastMsg);
    //   });
    //   return () => unsub();
    // });
    console.log(error);
    throw error;
  }
};

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
    console.log(error);
    throw error;
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
    console.log(error);
    throw error;
  }
};

const deleteUserAvatar = async ({ currentUser }) => {
  try {
    await deleteObject(ref(storage, currentUser.avatarPath));

    if (currentUser.uid)
      await updateDoc(doc(db, "users", currentUser.uid), {
        avatar: "",
        avatarPath: "",
      });
    return true;
  } catch (error) {
    console.log(error);
    throw error;
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
  logout,
  signInWithGoogle,
  reloadFirebaseData,
};
