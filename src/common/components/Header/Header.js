import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authService, provider, signin, signout } from "../../../config/firebase-config";

function Header({ setToken }) {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    authService.onAuthStateChanged(async (data) => {
      try {
        if (data) {
          setAuth(true);
          window.localStorage.setItem("auth", "true");
          const token = await data.getIdToken();
          setToken(token);
          return;
        } 

        setAuth(false);
        window.localStorage.setItem("auth", "false");
        setToken("");
      } catch (err) {
        console.log(err);
      }
    })
  }, []);

  const signInWithGoogle = async () => {
    try {
      const data = await signin(authService, provider);
      if (data) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signOutWithGoogle = async () => {
    try {
      await signout(authService);
      setAuth(false);
      window.localStorage.setItem("auth", "false");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      {!auth
        ?
        <button onClick={signInWithGoogle}>Sign up with Google Account</button>
        :
        <>
          <button onClick={signOutWithGoogle}>Sign out</button>
          <button><Link to="/api/documents">My Docs</Link></button>
        </>
      }
    </header>
  );
}

export default Header;
