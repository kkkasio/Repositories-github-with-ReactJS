import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const Form = styled.form.attrs(props => ({
  error: props.error,
}))`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 15px 10px;
    border-radius: 4px;
    font-size: 16px;
  }

  ${props =>
    props.error &&
    css`
      input {
        border: 1px solid #fb4539;
      }
    `}
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #715fc1;
  border-radius: 4px;
  border: 0;
  margin-left: 10px;
  padding: 0 15px;

  &:hover {
    opacity: 0.7;
  }

  svg {
    margin: 0px;
  }

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  margin-top: 20px;
  list-style: none;
  border-radius: 4px;
  padding: 5px 15px;
  border: 1px solid #eee;

  li {
    display: flex;
    padding: 15px 0;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }
  }

  a {
    color: #7951c8;
    text-decoration: none;
  }
`;

export const Empty = styled.div`
  padding: 10px 15px;
  margin-top: 20px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
  }

  svg {
    margin-left: 15px;
  }
`;

export const Code = styled.div`
  margin-top: 25px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  a {
    cursor: pointer;
    text-decoration: none;
  }
`;
