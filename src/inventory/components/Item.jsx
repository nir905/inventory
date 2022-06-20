import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useLongPress } from "use-long-press";

const Wrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 16px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr auto 50px auto;
  align-items: center;

  ${({ $empty }) => $empty && "color: #9a9999;"}
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  > span:last-child {
    font-size: 11px;
    color: #9a9999;
  }
`;

const AmountButton = styled.button`
  border: 1px solid #bcbcbc;
  background: #fff;
  border-radius: 100%;
  width: 32px;
  height: 32px;
  font-size: 18px;
`;

const Amount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > span:last-child {
    font-size: 11px;
  }
`;

const Item = ({ id, name, amount, type, comment, onChangeAmount, onEdit }) => {
  const { t } = useTranslation();
  const longPressEvent = useLongPress(onEdit);

  const handleChangeAmount = useCallback(
    (increase = true) => {
      const increaseBy =
        type === "gram" ? 100 : Number.isInteger(amount) ? 1 : 0.1;

      let newAmount = increase ? amount + increaseBy : amount - increaseBy;
      if (newAmount < 0) {
        newAmount = 0;
      }
      onChangeAmount(id, newAmount);
    },
    [type, amount, id]
  );

  return (
    <Wrapper {...longPressEvent()} $empty={amount === 0}>
      <Name>
        <span>{name}</span>
        <span>{comment}</span>
      </Name>

      <AmountButton onClick={() => handleChangeAmount(false)}>-</AmountButton>

      <Amount>
        <span>{amount}</span>
        <span>{t(type)}</span>
      </Amount>

      <AmountButton onClick={() => handleChangeAmount(true)}>+</AmountButton>
    </Wrapper>
  );
};

export default Item;
