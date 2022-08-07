import styled from "styled-components";

const Button = styled.button`
  border-radius: 6px;
  border: none;
  background: #7364f0;
  border: 1px solid #7364f0;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transition: 300ms;
`;

export const SecondaryButton = styled(Button)`
  background: #fff;
  border: 1px solid #7364f0;
  color: #7364f0;

  &:hover {
    background: #dbecf6;
  }
`;

export const ImportantButton = styled(Button)`
  background: #fff;
  border: 1px solid #f11a1a;
  color: #f11a1a;
`;

export default Button;
