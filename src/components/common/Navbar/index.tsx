import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../services/firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../../context/auth";
import ProfileLogo from "../../svg/ProfileLogo";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (auth.currentUser)
      getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        }
      });
  }, [auth.currentUser]);

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
            src={require("../../../assets/images/owl-cup.png")}
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
        {user ? (
          <div className="flex items-center">
            <Link
              to="/profile"
              className="mr-4 border border-gray-600 px-2 py-1 rounded-sm flex items-center"
            >
              <ProfileLogo />
              {userName}
            </Link>
            <button
              className="bg-gray-600 px-3 py-1 rounded-sm"
              onClick={handleSignout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/signup" className="mr-2 pr-2 border-r border-gray-500">
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
