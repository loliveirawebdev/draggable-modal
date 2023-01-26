import React from "react";
import { Card } from "./components/Card";
import { Image } from "./components/Image";
import { Title } from "./components/Title";
import { Modal } from "./components/Modal";
import { Action } from "./components/Action";
import { Container } from "./components/Container";
import { Description } from "./components/Description";
import { ContentContainer } from "./components/ContentContainer";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const cardRef = React.useRef(null);
  const modalRef = React.useRef(null);

  const onLongPress = () => {
    cardRef.current.prepareToOpenModal();
    modalRef.current.openModal();
  };

  const onCloseModal = () => {
    cardRef.current.afterCloseModal();
  };

  return (
    <SafeAreaProvider>
      <Container>
        <Card ref={cardRef}>
          <Image source={require("./assets/loliveirawebdev.jpg")} />

          <ContentContainer>
            <Title>Follow:</Title>
            <Description>@loliveirawebdev</Description>
            <Action onLongPress={onLongPress}>Long press here</Action>
          </ContentContainer>
        </Card>

        <Modal ref={modalRef} onClose={onCloseModal} />
      </Container>
    </SafeAreaProvider>
  );
}
