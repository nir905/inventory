import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const GoogleButton = styled.div`
  min-width: 210px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);

  .google-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin: 1px;
    border-radius: 2px;
    background-color: #fff;
  }
  .google-icon {
    width: 18px;
    height: 18px;
  }
  .btn-text {
    color: #fff;
    font-size: 14px;
    letter-spacing: 0.2px;
    font-weight: 600;
    text-align: center;
    margin: 0 12px;
    flex: 1;
  }
  &:hover {
    box-shadow: 0 0 6px #4285f4;
  }
  &:active {
    background: #1669f2;
  }
`;

const LoginPage = ({ onLoginWithGoogle }) => {
  const { t } = useTranslation();
  return (
    <>
      <GoogleButton onClick={onLoginWithGoogle}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p className="btn-text">{t("sign_in_with_google")}</p>
      </GoogleButton>
    </>
  );
};

export default LoginPage;
