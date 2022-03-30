import React from "react";

type closeProps = {
  closeChat: React.MouseEventHandler<HTMLButtonElement>;
};

const CloseBtn = ({ closeChat }: closeProps) => {
  return (
    <button onClick={closeChat}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CloseBtn;
