import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 5px;
      height: 62px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 21px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
    }
    textarea {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 5px;
      height: 150px;
      padding: 10px 15px;
      color: #fff;
      max-width: 900px;
      margin: 0 0 10px;
      font-size: 19px;
      font-family: Arial, Helvetica, sans-serif;

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
        font-size: 21px;
        font-family: Arial, Helvetica, sans-serif;
      }
    }

    a {
      color: #ffff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const ButtonView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button {
    display: flex;
    justify-content: center;
    height: 42px;
    width: fit-content;
    align-self: flex-end;
    margin-top: 10px;
    margin-left: 10px;

    svg {
      margin-right: 10px;
      height: 20px;
      width: 20px;
    }
  }

  .cancelBtn {
    transition: background 0.3s;
    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;
