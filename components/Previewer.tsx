import React from "react";
import styled from "styled-components/native";
import Draggable from "react-native-draggable";
import { Animated, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PreviewerContainer = styled.View`
  width: 100%;
  padding: 24px;
`;

const ContentContainer = styled.View`
  flex: 1;
  border-radius: 14px;
  background: white;
  overflow: hidden;
`;

const Title = styled.Text`
  font-weight: bold;
  width: 100%;
  font-size: 16px;
  padding: 14px 0;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Image = styled.Image`
  flex: 1;
  width: 100%;
  background: black;
  object-fit: contain;
`;

export const Previewer = ({ onReadyToClose, onStartClosing }) => {
  const insets = useSafeAreaInsets();
  const containerRef = React.useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const maxAllowedPosition = screenHeight * 0.9;
  const previewerScale = React.useRef(new Animated.Value(1)).current;
  const previewerPosition = React.useRef(new Animated.Value(0)).current;

  const getContentPosition = (): Promise<any> => {
    return new Promise((res) => {
      containerRef.current.measure((x, y, width, height, pageX, pageY) => {
        res({ bottom: pageY + height, top: pageY, height });
      });
    });
  };

  const onDrag = async () => {
    const { top, height } = await getContentPosition();
    const normalizedMaxPosition = maxAllowedPosition - height;

    const totalMoved = ((top - 20) * 100) / normalizedMaxPosition;
    const normalizedTotalMoved = totalMoved < 100 ? Math.round(totalMoved) : 100;
    scalePreviewerTo(normalizedTotalMoved);
  };

  const onDragRelease = async (_, state) => {
    const { vy } = state;
    const { bottom } = await getContentPosition();

    if (bottom > maxAllowedPosition) {
      prepareToClose();
      return;
    }

    if (vy > 0.8) {
      prepareToClose();
      return;
    }

    resetPreviewerScale();
  };

  const scalePreviewerTo = (percentage) => {
    const scaleDownValue = ((-2 * (100 - percentage)) / 100 + 2) / 10;

    Animated.timing(previewerScale, {
      duration: 1,
      useNativeDriver: false,
      toValue: 1 - scaleDownValue,
    }).start();
  };

  const resetPreviewerScale = () => {
    Animated.timing(previewerScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const prepareToClose = () => {
    onStartClosing();

    Animated.timing(previewerPosition, {
      duration: 300,
      toValue: screenHeight,
      useNativeDriver: false,
    }).start(() => onReadyToClose());
  };

  return (
    <Draggable
      minY={0}
      minX={0}
      onDrag={onDrag}
      maxX={screenWidth}
      maxY={screenHeight}
      shouldReverse={true}
      onDragRelease={onDragRelease}
      touchableOpacityProps={{ activeOpacity: 1 }}
      animatedViewProps={{ style: { transform: [{ translateY: previewerPosition }, { scale: previewerScale }] } }}
    >
      <PreviewerContainer ref={containerRef} style={{ marginTop: insets.top, aspectRatio: 9 / 10 }}>
        <ContentContainer>
          <Title>Lucas Oliveira</Title>
          <Image source={require("../assets/rn.png")} />
        </ContentContainer>
      </PreviewerContainer>
    </Draggable>
  );
};
