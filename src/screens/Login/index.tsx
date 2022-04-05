import React, { useState } from "react";
import FullButton from "../../components/FullButton";
import Social from "../../components/Social";
import InputField from "../../components/InputField";
import Owl from "../../components/Owl";
import { Link, useNavigate } from "react-router-dom";

import { handleError } from "../../utils/helper";
import { LoginCredentials } from "../../utils/types";
import { useDispatch } from "react-redux";
import { emailLogInFetch } from "../../store/reducers/userReducer";

const Login = () => {
  const [isFocused, setIsFocused] = useState(false);
  const changeOwl = () => setIsFocused(!isFocused);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState<LoginCredentials>({
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
      dispatch(emailLogInFetch({ email, password }));
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
          className="form w-11/12 max-w-sm rounded-lg -mt-3 p-5 md:py-12 md:px-7 text-white outline-none border-none"
        >
          <div className="text-center">
            <img
              className="h-16 m-auto mb-2"
              src={require("../../assets/images/owl-post.png")}
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
          {error ? handleError({ error }) : null}
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
