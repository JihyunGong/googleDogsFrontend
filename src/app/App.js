import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

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
        <Route path="/newDocument" element={<NewDoc />} />
      </Routes>
    </div>
  );
}

export default App;
