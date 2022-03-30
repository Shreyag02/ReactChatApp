import React, { useState } from "react";
import FullButton from "../../components/FullButton";
import Social from "../../components/Social";
import InputField from "../../components/InputField";
import Owl from "../../components/Owl";

import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { handleError } from "../../utils/helper";

const Signup = () => {
  const [isFocused, setIsFocused] = useState(false);
  const changeOwl = () => setIsFocused(!isFocused);

  type dataVal = {
    name: string;
    email: string;
    password: string;
    error: any;
    loading: boolean;
  };

  const navigate = useNavigate();

  const [data, setData] = useState<dataVal>({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const { name, email, password, error, loading } = data;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });

    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });

      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });

      navigate("/home");
    } catch (error) {
      setData({ ...data, error: error, loading: false });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="flex justify-center items-center w-full md:w-1/2 flex-col p-2">
        <Owl isFocused={isFocused} />

        <form
          onSubmit={handleSubmit}
          className="form w-11/12 max-w-sm rounded-lg -mt-3 p-5 md:py-12 md:px-7 text-white outline-none border-none"
        >
          <div className="text-center">
            <img
              className="h-16 m-auto mb-2"
              src={require("../../assets/images/owl-post.png")}
              alt="owl post"
            />
            <h3 className="h3">Signup here</h3>
          </div>
          <Social />
          <InputField
            id="name"
            placeholder="Full Name"
            type="text"
            value={name}
            data={data}
            setData={setData}
          />

          <InputField
            id="email"
            placeholder="Email"
            type="email"
            data={data}
            value={email}
            setData={setData}
          />

          <InputField
            id="password"
            placeholder="Password"
            type="password"
            handleOwl={changeOwl}
            data={data}
            value={password}
            setData={setData}
          />
          {error ? handleError({ error }) : null}

          <FullButton
            label="Signup"
            type="submit"
            isDisabled={loading}
            isDisabledTxt="Registering..."
          />

          <div className="text-center my-2">
            <p>
              Already have an account?<Link to="/login"> Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
