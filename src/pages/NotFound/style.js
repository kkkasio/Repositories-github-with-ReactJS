import styled from 'styled-components';

export const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 25px;
  }

  a {
    display: flex;
    align-items: center;
    margin-top: 15px;
    text-decoration: none;
    color: #7951c8;
    font-weight: bold;
    font-size: 18px;

    &:hover {
      font-size: 22px;
      transition: font-size 1s ease-out;
      -webkit-transition: font-size 1s ease-out;
    }
  }
`;
