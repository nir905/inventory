import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Button, { SecondaryButton } from "../Button";
import { ReactComponent as CloseIcon } from "../../../assets/x.svg";

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

const jumpIn = keyframes`
    0%{transform: scale(0.5);}
    80%{transform: scale(1.05);}
    100%{transform: scale(1);}
`;

const Container = styled.div`
  width: 90%;
  max-height: 90%;
  overflow: scroll;
  background: #fff;
  animation: ${jumpIn} ease 300ms;
  border-radius: 3px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
`;

const Title = styled.div`
  font-size: 21px;
`;

const CloseIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  padding: 8px;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    background: #f1f1f1;
  }
`;

const Content = styled.div`
  padding: 16px;
`;

const Actions = styled.div`
  padding: 0 16px 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  > button {
    min-width: 100px;
  }
  > button:not(:last-child) {
    margin-right: 8px;
  }
`;

const Modal = ({
  title,
  children,
  primaryText,
  onPrimaryClick,
  secondaryText,
  onSecondaryClick,
  onClose,
}) => (
  <Wrapper>
    <Container>
      <Header>
        <Title>{title}</Title>

        <CloseIconWrapper onClick={onClose}>
          <CloseIcon />
        </CloseIconWrapper>
      </Header>

      <Content>{children}</Content>

      {(primaryText || secondaryText) && (
        <Actions>
          {primaryText && (
            <Button tabIndex={5} onClick={onPrimaryClick}>
              {primaryText}
            </Button>
          )}
          {secondaryText && (
            <SecondaryButton tabIndex={6} onClick={onSecondaryClick}>
              {secondaryText}
            </SecondaryButton>
          )}
        </Actions>
      )}
    </Container>
  </Wrapper>
);

export default Modal;
