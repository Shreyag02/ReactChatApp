import { Link, useNavigate } from "react-router-dom";
import ProfileLogo from "../../assets/svg/ProfileLogo";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { userLogoutFetch } from "../../store/reducers/userReducer";

const Navbar = () => {
  let currentUser = useSelector(
    (state: RootState) => state.user.currentUser.name
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignout = async () => {
    dispatch(userLogoutFetch({}));

    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center absolute w-screen text-white px-8 py-3">
      <Link to="/home">
        <div className="flex items-center">
          <img
            src={require("../../assets/images/owl-cup.png")}
            alt="owlpost"
            className="h-8 mr-2"
          />
          <img
            className="h-6 m-auto"
            src={require("../../assets/images/owl-post.png")}
            alt="owl post"
          />
        </div>
      </Link>
      <div>
        {currentUser ? (
          <div className="flex items-center">
            <Link
              to="/profile"
              className="mr-4 border border-gray-600 px-2 py-1 rounded-sm flex items-center"
            >
              <ProfileLogo />
              {currentUser}
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
