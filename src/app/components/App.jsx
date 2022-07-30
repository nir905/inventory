import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";
import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import Inventory from "../../inventory";
import Dashboard from "../../dashboard";
import "../services/i18n";
import AppContext from "./AppContext";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  loginWithGoogle,
  loginAnonymously,
} from "../../app/services/firebase";
import Loading from "../../shared/components/Loading";
import LoginPage from "../../shared/components/LoginPage";

const Wrapper = styled.main`
  background: #ffffff;
  border-radius: 25px 0 0 0;
  padding: 16px;
  height: 100%;
  overflow: scroll;
`;

const CenterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  gap: 10px;
`;

const AppContent = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <CenterContent>
        <Loading />
      </CenterContent>
    );
  }

  if (!user) {
    return (
      <CenterContent>
        <LoginPage
          onLoginWithGoogle={loginWithGoogle}
          onLoginAnonymously={loginAnonymously}
        >
          Login with Google
        </LoginPage>
      </CenterContent>
    );
  }

  return children;
};

const App = () => {
  const { lang } = useContext(AppContext);

  return (
    <StyleSheetManager stylisPlugins={lang === "he" ? [rtlPlugin] : undefined}>
      <>
        <BrowserRouter>
          <GlobalStyle />
          <Header />
          <Wrapper>
            <AppContent>
              <Routes>
                <Route path="/" element={<Inventory />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </AppContent>
          </Wrapper>
        </BrowserRouter>
      </>
    </StyleSheetManager>
  );
};

export default App;
