import "./style.css";
import clsx from "clsx";

type props = {
  isFocused: boolean;
};

const Owl = ({ isFocused }: props) => {
  return (
    <div className="owl w-52 h-28 relative">
      <div
        className={clsx(
          "hand w-9 h-10 absolute left-1 -bottom-2",
          isFocused && "password"
        )}
      ></div>
      <div
        className={clsx(
          "hand w-9 h-10 absolute -bottom-2 hand-r left-44",
          isFocused && "password"
        )}
      ></div>
      <div className="arms absolute w-full overflow-hidden top-14 h-11">
        <div
          className={clsx(
            "arm w-10 h-16 absolute left-5 top-10",
            isFocused && "password"
          )}
        ></div>
        <div
          className={clsx(
            "arm w-10 h-16 absolute left-40 top-10 arm-r",
            isFocused && "password"
          )}
        ></div>
      </div>
    </div>
  );
};

export default Owl;
