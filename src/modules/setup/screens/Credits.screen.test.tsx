import { screen } from "@testing-library/react-native";

import { CreditsScreen } from "#modules/setup/screens/Credits.screen";
import { renderWithProviders } from "#testing/render";

describe("CreditsScreen", () => {
  it("renders credits content", () => {
    renderWithProviders(<CreditsScreen />);

    expect(screen.getByText("Propriété intellectuelle")).toBeOnTheScreen();
    expect(screen.getByText("Julien IZZILLO")).toBeOnTheScreen();
    expect(screen.getByText("Yolaine BOURREAU")).toBeOnTheScreen();
    expect(screen).toMatchComponentSnapshot();
  });
});
