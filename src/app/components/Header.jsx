import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Wrapper = styled.h1`
  padding: 32px;
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

const Header = ({ lang, setLang }) => {
  const { t, i18n } = useTranslation();

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
    </Wrapper>
  );
};

export default Header;
