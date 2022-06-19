import React from "react";
import styled from "styled-components";
import useLongPress from "../../shared/hooks/useLongPress";

const Wrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 16px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr auto 50px auto;
  align-items: center;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  > span:last-child {
    font-size: 11px;
    color: #bcbcbc;
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

const TYPE_LABELS = {
  unit: "",
  box: "Boxes",
  gram: "gram",
};

const Item = ({ id, name, amount, type, comment, onChangeAmount, onEdit }) => {
  const longPressEvent = useLongPress(onEdit, null, {
    shouldPreventDefault: false,
  });

  return (
    <Wrapper {...longPressEvent}>
      <Name>
        <span>{name}</span>
        <span>{comment}</span>
      </Name>

      <AmountButton onClick={() => onChangeAmount(id, amount - 1)}>
        -
      </AmountButton>

      <Amount>
        <span>{amount}</span>
        <span>{TYPE_LABELS[type]}</span>
      </Amount>

      <AmountButton onClick={() => onChangeAmount(id, amount + 1)}>
        +
      </AmountButton>
    </Wrapper>
  );
};

export default Item;
