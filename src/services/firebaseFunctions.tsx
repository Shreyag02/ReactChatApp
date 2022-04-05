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
import { auth, db } from "./firebase";
import { useCallback, useState } from "react";
import { eventChannel } from "redux-saga";

const signupWithEmailAndPassword = async ({ email, password, name }: any) => {
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

const loginWithEmailAndPassword = async ({ email, password }: any) => {
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

const firebaseUsers = async ({ loggedInUserUID }: any) => {
  // const usersRef = collection(db, "users");
  // // create query object
  // const q = query(usersRef, where("uid", "not-in", [loggedInUserUID]));
  // return eventChannel((emmiter:any) => {
  //   // execute query
  //   const unsub = onSnapshot(q, (querySnapshot) => {
  //     let updatedUsers: any = [];
  //     querySnapshot.forEach((doc) => {
  //       updatedUsers.push(doc.data());
  //     });
  //     emmiter(updatedUsers)
  //   return () => unsub();
  // });

  const usersRef = collection(db, "users");
  // create query object
  const q = query(usersRef, where("uid", "not-in", [loggedInUserUID]));
  // execute query
  let usersRes: any = [];
  const unsub = onSnapshot(q, (querySnapshot) => {
    let users: any = [];

    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    console.log({ users });
    return users;
    // dispatch(getChatUsersSuccess(users));
  });
  usersRes = unsub();
  console.log({ usersRes });
  return usersRes;
};

export { signupWithEmailAndPassword, loginWithEmailAndPassword, firebaseUsers };
