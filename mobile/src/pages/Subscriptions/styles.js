import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Header = styled.View`
  align-self: center;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const DateInfo = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin: 0 15px;
`;

export const ChevronIcon = styled.TouchableOpacity``;
export const Fim = styled.Text`
  align-self: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 25px;
  font-weight: bold;
`;
