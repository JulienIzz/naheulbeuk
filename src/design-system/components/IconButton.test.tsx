import { screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { IconButton } from "#design-system/components/IconButton";
import { renderWithProviders } from "#testing/render";

describe("IconButton", () => {
  it("renders enabled", () => {
    renderWithProviders(
      <IconButton
        icon={<Text>icon</Text>}
        onPress={jest.fn()}
        accessibilityLabel="Play"
      />,
    );

    expect(screen.getByText("icon")).toBeOnTheScreen();
    expect(screen).toMatchComponentSnapshot();
  });

  it("renders disabled", () => {
    renderWithProviders(
      <IconButton
        icon={<Text>icon</Text>}
        onPress={jest.fn()}
        accessibilityLabel="Play"
        disabled
      />,
    );

    expect(screen).toMatchComponentSnapshot();
  });
});
