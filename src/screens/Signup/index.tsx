import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FullButton from "../../components/FullButton";
import Social from "../../components/Social";
import InputField from "../../components/InputField";
import Owl from "../../components/Owl";

import { handleError } from "../../utils/helper";
import { UserCredentials } from "../../utils/types";
import { emailSignUpFetch } from "../../store/reducers/userReducer";
import { RootState } from "../../store/reducers";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authData, error, isLoading }: any = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (authData) {
      // localStorage.setItem("authData", JSON.stringify(authData));

      navigate("/home");
    }
    // eslint-disable-next-line
  }, [authData]);

  const [isFocused, setIsFocused] = useState(false);
  const changeOwl = () => setIsFocused(!isFocused);
  const [data, setData] = useState<UserCredentials>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = data;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setData({ ...data });

    if (!name || !email || !password) {
      setData({ ...data });
    }
    try {
      dispatch(emailSignUpFetch({ name, email, password }));

      setData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setData({ ...data });
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
            isDisabled={isLoading}
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
