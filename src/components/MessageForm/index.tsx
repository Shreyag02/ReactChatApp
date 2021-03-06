import React, { useEffect, useState } from "react";
import clsx from "clsx";

import AttachmentBtn from "../../assets/svg/AttachmentBtn";
import Paperclip from "../../assets/svg/Paperclip";
import SendBtn from "../../assets/svg/SendBtn";
import TimesCircle from "../../assets/svg/TimesCircle";

import { MessageFormProps } from "../../utils/types";

const MessageForm = ({
  handleSubmit,
  text,
  setText,
  setImg,
  img,
}: MessageFormProps) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const changeMsg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImg(e.target.files[0]);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (text || img) {
      setIsDisabled(false);
    }

    if (!text && !img) {
      setIsDisabled(true);
    }
  }, [text, img]);

  return (
    <div className="flex flex-col">
      {img ? (
        <div
          className="flex -mt-11 z-10 relative"
          // style={{ background: "#080710" }}
        >
          <div className="w-1/12"></div>
          <div className="w-10/12">
            <div className="bg-gray-500 p-2 rounded z-10 relative">
              <button
                type="button"
                onClick={() => setImg("")}
                className="absolute -top-2 -right-2"
              >
                <TimesCircle />
              </button>
              <div className="flex items-center">
                <span className="inline-block mr-2">
                  <Paperclip />
                </span>
                <p className="inline-block">{img.name}</p>
              </div>
            </div>
          </div>
          <div className="w-1/12"></div>
        </div>
      ) : null}
      <form
        className="message_form absolute bottom-2 w-full flex items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-1/12 text-center">
          <label htmlFor="img">
            <AttachmentBtn />
          </label>
          <input
            onChange={addImg}
            type="file"
            id="img"
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <div className="w-10/12">
          <input
            className="w-full py-2 px-3 focus:outline-none
          placeholder:text-gray-200"
            type="text"
            placeholder="Enter message"
            value={text}
            onChange={changeMsg}
          />
        </div>
        <div className="w-1/12 text-center">
          <button
            disabled={isDisabled}
            className={clsx(
              "p-2 rounded-full cursor-pointer",
              isDisabled
                ? " border-gray-500 bg-gray-500"
                : "bg-green-700 border-green-700"
            )}
          >
            <SendBtn isDisabled={isDisabled} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
