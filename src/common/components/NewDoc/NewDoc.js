import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Quill from "quill";

function NewDoc() {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (!socket || !quill) {
      return;
    }

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    })

    socket.emit("get-document", documentId);

  }, [socket, quill, documentId]);

  useEffect(() => {
    if (!socket || !quill) {
      return;
    }

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 20000);

    return () => {
      clearInterval(interval);
    }
  }, [socket, quill]);

  useEffect(() => {
    const sk = io("http://localhost:3003");

    setSocket(sk);

    return () => {
      sk.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !quill) {
      return;
    }

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) {
      return;
    }

    const handler = (delta, source) => {
      if (source !== "user") {
        return;
      }

      socket.emit("send-change", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) {
      return;
    }

    wrapper.innerHTML = "";

    const editor = document.createElement("div");

    wrapper.append(editor);

    const ql = new Quill(editor, {
      placeholder: "Write down here!",
    });

    ql.disable();
    ql.setText("Loading...");
    setQuill(ql);
  }, []);

  return (
    <>
      <button><Link to="/">Home</Link></button>
      <h2>New Document</h2>
      <div className="container" ref={wrapperRef}></div>
    </>
  );
}

export default NewDoc;
