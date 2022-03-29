import clsx from "clsx";
import React, { useEffect, createRef } from "react";
import Moment from "react-moment";

const Message = ({ msg, user1 }: any) => {
  const scrollRef = createRef<any>();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [msg, scrollRef]);
  return (
    <div
      className={clsx(
        "message_wrapper mt-1 mx-1",
        msg.from === user1 ? "own text-right" : ""
      )}
      ref={scrollRef}
    >
      <div
        className={clsx(
          "p-2.5 inline-block text-left rounded-md mx-2",
          msg.from === user1 ? "me bg-green-700" : "friend bg-gray-700"
        )}
        style={{ maxWidth: "50%" }}
      >
        {msg.media ? (
          <img
            src={msg.media}
            alt={msg.mediaSnap}
            className="rounded-md max-h-32"
          />
        ) : null}

        <p style={{ hyphens: "auto" }}>{msg.text ? msg.text : null}</p>

        <small className="block mt-1 opacity-60">
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </div>
    </div>
  );
};

export default Message;
