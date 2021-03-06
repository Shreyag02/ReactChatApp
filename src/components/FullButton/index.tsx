import { FullButtonProps } from "../../utils/types";

const FullButton = ({
  label,
  type,
  isDisabled = false,
  isDisabledTxt = "Loading...",
}: FullButtonProps) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className="w-full bg-white  text-gray-900 py-2.5 text-lg font-semibold rounded cursor-pointer"
    >
      {isDisabled ? isDisabledTxt : label}
    </button>
  );
};

export default FullButton;
