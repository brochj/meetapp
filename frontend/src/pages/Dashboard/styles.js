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

    button {
      display: flex;
      justify-content: center;
      height: 42px;

      svg {
        margin-right: 10px;
        height: 20px;
        width: 20px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
  border-radius: 5px;
  padding: 20px 25px;
  cursor: pointer;
  transition: background 0.3s;
  opacity: ${props => (props.past ? 0.3 : 1)};

  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  strong {
    color: #f2f2f2;
    font-size: 19px;
    align-self: center;
  }
`;

export const Date = styled.div`
  display: flex;
  align-items: center;

  span {
    color: #999;
  }
  svg {
    margin-left: 25px;
    height: 20px;
    width: 20px;
    color: #f2f2f2;
  }
`;
