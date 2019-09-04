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

  border-bottom: 1px solid #eee;

  div {
    display: flex;
    align-items: center;
  }

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
  a:hover {
    font-size: 17px;
    transition: font-size 1s ease;
    -webkit-transition: font-size 1s ease;
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
    margin-bottom: 15px;
  }
`;

export const FilterButton = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-around;

  button {
    background: #715fc1;
    border-radius: 4px;
    border: 0;
    padding: 15px;
    color: #fff;
    font-weight: bold;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const IssuesList = styled.ul`
  list-style: none;
  padding-top: 25px;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 20px;
    align-items: center;

    & + li {
      margin-top: 10px;
    }
    img {
      width: 36px;
      height: 36px;
      border-radius: 50px;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          line-height: 15px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 2px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const PaginateButton = styled.div.attrs(props => ({
  disabled: props.disabled,
}))`
  display: flex;
  align-items: center;
  justify-content: space-around;

  p {
    font-size: 16px;
    color: #715fc1;
    font-weight: bold;
  }

  button {
    background: #715fc1;
    border-radius: 4px;
    color: #fff;
    border: 0;
    font-weight: bold;
    padding: 15px;
    &:hover {
      opacity: 0.6;
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.35;
    }
  }
`;

export const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  a:hover {
    font-size: 17px;
    transition: font-size 1s ease;
    -webkit-transition: font-size 1s ease;
  }

  p {
    margin-top: 15px;
    color: #fb4539;
    font-size: 26px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-left: 15px;
    }
  }
`;
