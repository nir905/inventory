import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ReactComponent as BaseMenuIcon } from "../../assets/menu.svg";
import Drawer from "./Drawer";

const Wrapper = styled.h1`
  padding: 32px 16px;
  margin: 0;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
`;

const MenuIcon = styled(BaseMenuIcon)`
  width: 24px;
  height: 24px;
  color: #fff;
    cursor: pointer;
`;

const Header = () => {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Wrapper>
      {t("app_name")}

      <MenuIcon onClick={() => setDrawerOpen(true)} />
      {drawerOpen && <Drawer onClose={() => setDrawerOpen(false)} />}
    </Wrapper>
  );
};

export default Header;
