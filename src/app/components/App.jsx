import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import Inventory from "../../inventory";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inventory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
