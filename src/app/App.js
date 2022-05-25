import React, { useState } from "react";
import { Route, Routes, Switch, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import Header from "../common/components/Header/Header";
import Home from "../common/components/Home/Home";
import Docs from "../common/components/Docs/Docs";
import NewDoc from "../common/components/NewDoc/NewDoc";

function App() {
  const [token, setToken] = useState("");

  return (
    <div>
      <Header setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/documents" element={<Docs token={token} />} />
        <Route path="/newDocument" exact>
          <Navigate to={`/newDocument/${uuidV4}`} />
        </Route>
        <Route path="/newDocument/:id">
          <NewDoc />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
