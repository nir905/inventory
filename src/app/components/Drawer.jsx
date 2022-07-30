import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import { auth, logout } from "../services/firebase";
import AppContext from "./AppContext";

const enter = keyframes`
0%{transform: translateX(-100%);}
100%{transform: translateX(0);}
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #00000087;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80%;
  background: #fff;
  padding-top: ${({ $hasImage }) => ($hasImage ? 0 : 90)}px;
  animation: ${enter} 250ms ease-out;
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
  margin: 7px 0;
`;

const Select = styled.select`
  border: none;
  padding: 0;
  border-radius: 8px;
  color: #7364f0;
  font-size: 16px;
  font-weight: 600;

  :hover{
    cursor: pointer;
  }
`;

const Item = styled.div`
  color: #7364f0;
  font-size: 16px;
  padding: 13px;
  border-top: 1px solid #dcd9d9;

  :hover{
    cursor: pointer;
  }
`;

const Drawer = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const { lang, onChangeLang } = useContext(AppContext);
  const [user] = useAuthState(auth);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <Wrapper onClick={onClose}>
      <Content
        $hasImage={!!user?.photoURL}
        onClick={(e) => e.stopPropagation()}
      >
        {user?.photoURL && (
          <Item>
            <Image src={user.photoURL} />
          </Item>
        )}

        <Item>
          <Select value={lang} onChange={(e) => onChangeLang(e.target.value)}>
            <option value="en">{t("english")}</option>
            <option value="he">{t("hebrew")}</option>
          </Select>
        </Item>

        {user && (
          <Item
            onClick={() => {
              logout();
              onClose();
            }}
          >
            {t("logout")}
          </Item>
        )}
      </Content>
    </Wrapper>
  );
};

export default Drawer;
