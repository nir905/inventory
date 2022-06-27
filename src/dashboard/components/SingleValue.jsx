import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  > span:first-child {
    font-size: 21px;
  }

  > span:last-child {
    font-size: 14px;
  }
`;

const SingleValue = ({ label, value }) => (
  <Wrapper>
    <span>{value}</span>
    <span>{label}</span>
  </Wrapper>
);

export default SingleValue;
