import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 18px;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;
export const Info = styled.View`
  padding: 20px;
  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Banner = styled.Image`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 150px;
  width: 100%;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 10px;
  margin-top: 5px;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const Time = styled.Text`
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
  margin-bottom: 5px;
  margin-left: 10px;
`;

export const Location = styled.Text`
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
  margin-bottom: 5px;
  margin-left: 10px;
`;

export const User = styled.Text`
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 15px;
`;
