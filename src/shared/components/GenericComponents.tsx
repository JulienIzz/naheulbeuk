import styled from "@emotion/native";

export const FlexView = styled.View({
  flex: 1,
});

export const Row = styled.View({
  flexDirection: "row",
  alignItems: "center",
});

export const Col = styled.View({
  flexDirection: "column",
  alignItems: "center",
});

export const Spacer = styled.View<{ height?: number; width?: number }>(
  ({ height = 0, width = 0 }) => ({
    height,
    width,
  }),
);
