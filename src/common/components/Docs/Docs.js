import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Docs({ token }) {
  const [myDocs, setMyDocs] = useState([]);

  useEffect(() => {
    const getData = async (token) => {
      try {
        const res = await fetch("/api/documents", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setMyDocs(res);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      getData(token);
    }
  }, []);


  return (
    <div>
      <button><Link to="/">Home</Link></button>
      <h2>My Documents</h2>
      <button><Link to="/newDocument">New Document</Link></button>
    </div>
  );
}

export default Docs;
