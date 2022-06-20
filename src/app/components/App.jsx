import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import Inventory from "../../inventory";
import useStoredState from "../../inventory/hooks/useStoredState";
import "../services/i18n";

const App = () => {
  const [lang, setLang] = useStoredState("lang", "en");

  return (
    <StyleSheetManager stylisPlugins={lang === "he" ? [rtlPlugin] : undefined}>
      <>
        <GlobalStyle />
        <Header lang={lang} setLang={setLang} />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inventory />} />
          </Routes>
        </BrowserRouter>
      </>
    </StyleSheetManager>
  );
};

export default App;
