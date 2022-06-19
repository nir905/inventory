import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 16px;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr auto 50px auto;
  align-items: center;
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
  text-align: center;
`;

const Item = ({ id, name, amount, onChangeAmount }) => {
  return (
    <Wrapper>
      <div>{name}</div>

      <AmountButton onClick={() => onChangeAmount(id, amount + 1)}>
        +
      </AmountButton>

      <Amount>{amount}</Amount>

      <AmountButton onClick={() => onChangeAmount(id, amount - 1)}>
        -
      </AmountButton>
    </Wrapper>
  );
};

export default Item;
