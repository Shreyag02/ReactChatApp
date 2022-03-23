import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";

import AuthProvider from "./context/auth";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
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
      </Router>
    </AuthProvider>
  );
}

export default App;
