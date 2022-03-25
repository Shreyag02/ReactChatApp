import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../services/firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../../context/auth";

const Navbar = () => {
  console.log(useContext(AuthContext));
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignout = async () => {
    if (auth.currentUser)
      await updateDoc(doc(db, "users", auth.currentUser?.uid), {
        isOnline: false,
      });

    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center absolute w-screen text-white px-8 py-3">
      <Link to="/home">
        <div className="flex items-center">
          <img
            src={require("../../../assets/images/owl-logo.png")}
            alt="owlpost"
            className="h-8 mr-2"
          />
          <img
            className="h-6 m-auto"
            src={require("../../../assets/images/owl-post.png")}
            alt="owl post"
          />
        </div>
      </Link>
      <div>
        {console.log(auth)}
        {user ? (
          <>
            <Link to="/profile" className="mr-4 border-gray-400">
              Profile
            </Link>
            <button
              className="bg-gray-600 px-3 py-1 rounded-sm"
              onClick={handleSignout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="mr-2 pr-2 border-r border-gray-400">
              Signup
            </Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
