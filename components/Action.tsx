import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  margin-top: 4px;
  border-radius: 8px;
  align-items: center;
  background: #4ae31b;
  justify-content: center;
`;

const Text = styled.Text`
  color: #207008;
`;

export const Action = ({ onLongPress, children }) => {
  return (
    <TouchableWithoutFeedback onLongPress={onLongPress}>
      <Container>
        <Text>{children}</Text>
      </Container>
    </TouchableWithoutFeedback>
  );
};
