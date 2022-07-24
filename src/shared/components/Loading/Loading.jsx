import styled from "styled-components";

const Loading = styled.div`
  margin: 0 auto;
  width: 200px;
  height: 200px;
  background-color: #7364f0;
  border-radius: 50%;
  position: relative;
  box-shadow: inset 0 0 30px 0 rgba(0, 0, 0, 0.5),
    0 4px 10px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    top: -100px;
    background-color: #fff;
  }
  &:before {
    border-radius: 45%;
    background: rgba(255, 255, 255, 0.7);
    animation: wave 5s linear infinite;
  }
  &:after {
    border-radius: 35%;
    background: rgba(255, 255, 255, 0.3);
    animation: wave 5s linear infinite;
  }
  @keyframes wave {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
