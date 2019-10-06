import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 45px auto;

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 50px;
    flex: 1;

    h1 {
      color: #fff;
      font-size: 30px;
    }

    div {
      display: flex;
      flex-direction: row;
      button {
        display: flex;
        justify-content: center;
        height: 42px;
        margin-left: 15px;

        svg {
          margin-right: 10px;
          height: 20px;
          width: 20px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  margin-top: 20px;

  p {
    margin-top: 20px;
    color: #fff;
    font-size: 19px;
    line-height: 35px;
  }
`;

export const Banner = styled.img`
  height: 300px;
  width: 100%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.3);
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-right: 35px;
  svg {
    height: 20px;
    width: 20px;
    color: rgba(255, 255, 255, 0.5);
  }

  span {
    color: rgba(255, 255, 255, 0.5);
    font-size: 17px;
    margin-left: 10px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;
