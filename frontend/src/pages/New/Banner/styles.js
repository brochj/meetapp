import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: 30px;
  height: 300px;
  max-width: 900px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    div {
      display: flex;
      flex-direction: column;
      max-width: 900px;
      align-items: center;
      justify-content: center;
      width: 100%;
      span {
        margin-top: 20px;
        font-size: 23px;
        color: #666;
        font-weight: bold;
      }
    }

    img {
      height: 300px;
      width: 900px;
      overflow: hidden;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.3);
    }

    input {
      display: none;
    }
  }
`;
