import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { handleError } from "../../utils/helper";
import { LoginCredentials } from "../../utils/types";
import { emailLogInFetch } from "../../store/reducers/userReducer";
//components
import FullButton from "../../components/FullButton";
import Social from "../../components/Social";
import InputField from "../../components/InputField";
import Owl from "../../components/Owl";
import { RootState } from "../../store/reducers";
import { useSelector } from "react-redux";

const Login = () => {
  //local data
  const [isFocused, setIsFocused] = useState(false);
  const changeOwl = () => setIsFocused(!isFocused);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authData, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );
  const [sessionData, setSessionData] = useState<any>();

  useEffect(() => {
    setSessionData(
      sessionStorage.getItem(
        `firebase:authUser:${process.env.REACT_APP_API_KEY}:[DEFAULT]`
      )
    );
    if (sessionData) console.log("hello", JSON.parse(sessionData));

    if (authData) {
      // localStorage.setItem("authData", JSON.stringify(authData));

      navigate("/home");
    }
    // eslint-disable-next-line
  }, [authData, sessionData]);

  const [data, setData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const { email, password } = data;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setData({ ...data });
    if (!email || !password) {
      setData({
        ...data,
      });
    }

    try {
      dispatch(emailLogInFetch({ email, password }));

      console.log("running");
      setData({
        email: "",
        password: "",
      });
    } catch (error) {
      setData({
        ...data,
      });
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
          {error && console.log(error)}
          <FullButton
            label="Login"
            type="submit"
            isDisabled={isLoading}
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
