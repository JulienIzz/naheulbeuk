import { screen } from "@testing-library/react-native";
import { Text } from "react-native";

import { Button } from "#design-system/components/Button";
import { renderWithProviders } from "#testing/render";

describe("Button", () => {
  it("renders primary variant", () => {
    renderWithProviders(
      <Button label="Press me" variant="primary" onPress={jest.fn()} />,
    );

    expect(screen.getByText("Press me")).toBeOnTheScreen();
    expect(screen).toMatchComponentSnapshot();
  });

  it("renders secondary variant", () => {
    renderWithProviders(
      <Button label="Secondary" variant="secondary" onPress={jest.fn()} />,
    );

    expect(screen.getByText("Secondary")).toBeOnTheScreen();
    expect(screen).toMatchComponentSnapshot();
  });

  it("renders disabled state", () => {
    renderWithProviders(
      <Button
        label="Disabled"
        variant="primary"
        onPress={jest.fn()}
        disabled
      />,
    );

    expect(screen).toMatchComponentSnapshot();
  });

  it("renders with left and right slots", () => {
    renderWithProviders(
      <Button
        label="With slots"
        variant="primary"
        onPress={jest.fn()}
        left={<Text>L</Text>}
        right={<Text>R</Text>}
      />,
    );

    expect(screen.getByText("L")).toBeOnTheScreen();
    expect(screen.getByText("R")).toBeOnTheScreen();
    expect(screen).toMatchComponentSnapshot();
  });
});
