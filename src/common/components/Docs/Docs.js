import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Docs({ token }) {
  const [myDocs, setMyDocs] = useState([]);

  useEffect(() => {
    const getData = async (token) => {
      try {
        const res = await axios.get("/api/documents", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log(res);
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
      <h2>My Docs</h2>
      <button><Link to="/newDocument">New Document</Link></button>
    </div>
  );
}

export default Docs;
