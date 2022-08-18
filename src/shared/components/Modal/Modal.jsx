import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Button, { SecondaryButton, ImportantButton } from "../Button";
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
    0%{transform: translateY(100%);}
    100%{transform: translateY(0);}
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  overflow: auto;
  background: #fff;
  animation: ${jumpIn} ease 300ms;
  border-radius: 3px;
  position: absolute;
  bottom: 0;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${({ $fullScreen }) => $fullScreen && "height: 100%"};
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
  overflow: auto;
`;

const Actions = styled.div`
  padding: 0 16px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  align-items: center;

  > button {
    min-width: 100px;

    &:nth-child(3) {
      grid-column: 1/-1;
    }
  }
`;

const Modal = ({
  title,
  children,
  primaryText,
  onPrimaryClick,
  secondaryText,
  onSecondaryClick,
  thirdText,
  onThirdClick,
  thirdImportant = false,
  onClose,
  fullScreen = false,
}) => (
  <Wrapper onClick={onClose}>
    <Container onClick={(e) => e.stopPropagation()} $fullScreen={fullScreen}>
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

          {thirdText && (
            <SecondaryButton
              as={thirdImportant ? ImportantButton : undefined}
              tabIndex={7}
              onClick={onThirdClick}
            >
              {thirdText}
            </SecondaryButton>
          )}
        </Actions>
      )}
    </Container>
  </Wrapper>
);

export default Modal;
