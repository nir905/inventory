import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { auth, logout } from "../services/firebase";
import { ReactComponent as BaseLogoutIcon } from "../../assets/logout.svg";
import { useAuthState } from "react-firebase-hooks/auth";

const Wrapper = styled.h1`
  padding: 32px 16px;
  margin: 0;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 24px;
`;

const Select = styled.select`
  border: 1px solid #bcbcbc;
  padding: 4px 8px;
  border-radius: 8px;
`;

const LogoutIcon = styled(BaseLogoutIcon)`
  width: 30px;
  height: 30px;
  color: #fff;
`;

const Header = ({ lang, setLang }) => {
  const { t, i18n } = useTranslation();
  const [user] = useAuthState(auth);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <Wrapper>
      {t("app_name")}
      <Select value={lang} onChange={(e) => setLang(e.target.value)}>
        <option value="en">{t("english")}</option>
        <option value="he">{t("hebrew")}</option>
      </Select>

      {user && <LogoutIcon onClick={logout} />}
    </Wrapper>
  );
};

export default Header;
