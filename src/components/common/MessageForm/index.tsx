import React from "react";
import AttachmentBtn from "../AttachmentBtn";
import SendBtn from "../SendBtn";

const MessageForm = ({ handleSubmit, text, setText, setImg }: any) => {
  return (
    <form
      className="message_form absolute bottom-2 w-full flex items-center"
      onSubmit={handleSubmit}
    >
      <div className="w-1/12 text-center">
        <label htmlFor="img">
          <AttachmentBtn />
        </label>
        <input
          onChange={(e: any) => setImg(e.target.files[0])}
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
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="w-1/12 text-center">
        <SendBtn />
      </div>
    </form>
  );
};

export default MessageForm;
