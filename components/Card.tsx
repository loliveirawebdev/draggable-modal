import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

const CardContainer = styled.View`
  width: 100%;
  display: flex;
  padding: 12px 24px;
  flex-direction: row;
  justify-content: flex-start;
  border: 1px solid #eee;
`;

export const Card = React.forwardRef<any, any>((props, ref) => {
  const { children } = props;

  const animatedScale = React.useRef(new Animated.Value(1)).current;
  const animatedShadow = React.useRef(new Animated.Value(0)).current;
  React.useImperativeHandle(ref, () => ({ prepareToOpenModal, afterCloseModal }));

  const prepareToOpenModal = React.useCallback(() => {
    const scaleAnimation = Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
    ]);

    const shadowAnimation = Animated.timing(animatedShadow, {
      toValue: 0.2,
      duration: 500,
      useNativeDriver: true,
    });

    Animated.parallel([scaleAnimation, shadowAnimation]).start();
  }, [animatedScale]);

  const afterCloseModal = React.useCallback(() => {
    const scaleAnimation = Animated.timing(animatedScale, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    });

    const shadowAnimation = Animated.timing(animatedShadow, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    });

    Animated.parallel([scaleAnimation, shadowAnimation]).start();
  }, [animatedScale]);

  return (
    <Animated.View
      style={{
        shadowRadius: 20,
        shadowOpacity: animatedShadow,
        shadowColor: "black",
        backgroundColor: "white",
        transform: [{ scale: animatedScale }],
      }}
    >
      <CardContainer>{children}</CardContainer>
    </Animated.View>
  );
});
