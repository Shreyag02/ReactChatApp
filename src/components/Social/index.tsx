import { useDispatch } from "react-redux";
import { continueWithGoogleFetch } from "../../store/reducers/userReducer";

const Social = () => {
  const handleClick = () => {
    dispatch(continueWithGoogleFetch({}));
  };
  const dispatch = useDispatch();
  return (
    <div>
      <div className="social my-5">
        <div
          className="w-full text-white font-bold text-center py-2.5 rounded"
          onClick={handleClick}
        >
          Continue with Google
        </div>
      </div>

      <div className="flex items-center my-3 text-white font-extrabold ">
        <div className="border border-solid border-t-white w-5/12"></div>
        <div className="w-2/12 text-center">OR</div>
        <div className="border border-solid border-t-white w-5/12"></div>
      </div>
    </div>
  );
};

export default Social;
