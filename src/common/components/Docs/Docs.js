import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Docs({ token }) {
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
    </div>
  );
}

export default Docs;
