import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import Inventory from "../../inventory";
import Dashboard from "../../dashboard";
import useStoredState from "../../inventory/hooks/useStoredState";
import "../services/i18n";

const Wrapper = styled.main`
  background: #ffffff;
  border-radius: 25px 0 0 0;
  padding: 16px;
  height: 100%;
  overflow: scroll;
`;

const App = () => {
  const [lang, setLang] = useStoredState("lang", "en");

  return (
    <StyleSheetManager stylisPlugins={lang === "he" ? [rtlPlugin] : undefined}>
      <>
        <GlobalStyle />
        <Header lang={lang} setLang={setLang} />
        <Wrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Inventory />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </>
    </StyleSheetManager>
  );
};

export default App;
