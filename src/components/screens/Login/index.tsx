import React, { useState } from "react";
import FullButton from "../../common/FullButton";
import Social from "../../common/Social";
import InputField from "../../common/InputField";
import Owl from "../../common/Owl";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

const Login = () => {
  const [isFocused, setIsFocused] = useState(false);
  const changeOwl = () => setIsFocused(!isFocused);

  type dataVal = {
    email: string;
    password: string;
    error: any;
    loading: boolean;
  };

  const navigate = useNavigate();

  const [data, setData] = useState<dataVal>({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const { email, password, error, loading } = data;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
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
          className="w-11/12 max-w-sm rounded-lg -mt-3 p-5 md:py-12 md:px-7 text-white outline-none border-none"
        >
          <div className="text-center">
            <img
              className="h-16 m-auto mb-2"
              src={require("../../../assets/images/owl-post.png")}
              alt="owl post"
            />
            <h3 className="h3">Welcome Back!</h3>
          </div>

          <Social />

          <InputField
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            data={data}
            setData={setData}
          />

          <InputField
            id="password"
            placeholder="Password"
            type="password"
            handleOwl={changeOwl}
            value={password}
            data={data}
            setData={setData}
          />
          {error ? <p className="text-red-700 font-bold">{error}</p> : null}
          <FullButton
            label="Login"
            type="submit"
            isDisabled={loading}
            isDisabledTxt="Logging in..."
          />

          <div className="text-center my-2">
            <p>
              Don't have an account? <Link to="/signup"> Signup</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
