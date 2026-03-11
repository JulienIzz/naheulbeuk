import { screen } from "@testing-library/react-native";

import { DebugInfos } from "#modules/setup/components/DebugInfos.component";
import { renderWithProviders } from "#testing/render";

describe("DebugInfos", () => {
  it("renders the version info", () => {
    renderWithProviders(<DebugInfos />);

    expect(screen.getByText(/Version/)).toBeOnTheScreen();
    expect(screen).toMatchComponentSnapshot();
  });
});
