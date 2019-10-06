import styled from 'styled-components';
import { darken } from 'polished';

export const NButton = styled.button`
  border: 0;
  background: ${props => props.background};
  color: ${props => props.color};
  padding: 10px 20px;
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: ${props =>
      props.background
        ? darken(0.1, props.background)
        : darken(0.06, '#d44059')};
  }
`;
