import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import PrivateRoute from "./Routes/PrivateRoute";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { initialLoadFetch } from "./store/reducers/userReducer";
import Loading from "./assets/svg/Loading";

function App() {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const sessionData = sessionStorage.getItem(
      `firebase:authUser:${process.env.REACT_APP_API_KEY}:[DEFAULT]`
    );
    if (sessionData) {
      setLoader(true);
      dispatch(initialLoadFetch(JSON.parse(sessionData)));

      setTimeout(() => {
        setLoader(false);
      }, 1500);
    }
  }, [dispatch]);
  return (
    <Router>
      <Navbar />
      {loader ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/home" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
