import React, { useEffect, useState } from "react";
import AttachmentBtn from "../../svg/AttachmentBtn";
import Paperclip from "../../svg/Paperclip";
import SendBtn from "../../svg/SendBtn";
import TimesCircle from "../../svg/TimesCircle";

const MessageForm = ({ handleSubmit, text, setText, setImg, img }: any) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const changeMsg = (e: any) => {
    setText(e.target.value);
  };

  const addImg = (e: any) => {
    setImg(e.target.files[0]);
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
          {console.log("line 46", img)}

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
          <SendBtn isDisabled={isDisabled} />
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
