import { screen } from "@testing-library/react-native";

import { Player } from "#modules/player/components/Player.component";
import { renderWithProviders } from "#testing/render";

it("renders with no track loaded", () => {
  renderWithProviders(<Player />);

  expect(screen).toMatchComponentSnapshot();
});

it("disables all buttons when no track is loaded", () => {
  renderWithProviders(<Player />);

  expect(screen.getByLabelText("Lecture")).toBeDisabled();
  expect(screen.getByLabelText("Suivant")).toBeDisabled();
  expect(screen.getByLabelText("Précédent")).toBeDisabled();
});

it("shows placeholder text when no track is loaded", () => {
  renderWithProviders(<Player />);

  expect(screen.getByText("Aucune piste en cours")).toBeOnTheScreen();
});
