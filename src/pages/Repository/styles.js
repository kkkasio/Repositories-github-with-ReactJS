import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
from{
  transform: rotate(0deg);
}

to{
  transform: rotate(360deg);
}

`;

export const Loading = styled.div`
  color: #7951c8;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-left: 20px;
    animation: ${rotate} 2s linear infinite;
  }
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    color: #666;
    font-size: 14px;
    line-height: 1.6;
  }
`;
