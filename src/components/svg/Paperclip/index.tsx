import { type } from "node:os";
import React from "react";

type Props = {
  size?: string;
};
const Paperclip = ({ size }: Props) => {
  const no = size ? size : "6";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-${no} w-${no}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
      />
    </svg>
  );
};

export default Paperclip;
