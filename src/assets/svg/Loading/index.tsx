import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen text-white">
      <img
        src={require("../../images/loading.gif")}
        alt="loading..."
        className="h-40 w-40"
      />
    </div>
  );
};

export default Loading;
