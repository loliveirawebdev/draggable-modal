import React from "react";
import Animated, { FadeIn } from "react-native-reanimated";

import { BlurView } from "expo-blur";
import { Previewer } from "./Previewer";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

export const Modal = React.forwardRef<any, any>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  React.useImperativeHandle(ref, () => ({ openModal: () => setIsOpen(true) }));

  const closeModal = () => {
    props.onClose();
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <Animated.View style={styles.absolute} entering={FadeIn}>
        <BlurView tint="dark" style={styles.absolute}>
          <Previewer onStartClosing={props.onClose} onReadyToClose={() => setIsOpen(false)} />
        </BlurView>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
