import { screen } from "@testing-library/react-native";

import { ProgressBar } from "#modules/player/components/ProgressBar.component";
import { renderWithProviders } from "#testing/render";

import { formatSecondsAsMinutesAndSeconds } from "../../../shared/utils/date";

describe("formatSecondsAsMinutesAndSeconds", () => {
  it("formats 0 seconds", () => {
    expect(formatSecondsAsMinutesAndSeconds(0)).toBe("0:00");
  });

  it("formats seconds with padding", () => {
    expect(formatSecondsAsMinutesAndSeconds(62)).toBe("1:02");
  });

  it("formats large values", () => {
    expect(formatSecondsAsMinutesAndSeconds(3661)).toBe("61:01");
  });

  it("floors fractional seconds", () => {
    expect(formatSecondsAsMinutesAndSeconds(32.9)).toBe("0:32");
  });
});

describe("ProgressBar", () => {
  it("renders with zero duration", () => {
    renderWithProviders(
      <ProgressBar
        currentTime={0}
        duration={0}
        disabled={false}
        seekTo={jest.fn()}
      />,
    );

    expect(screen).toMatchComponentSnapshot();
  });

  it("renders disabled state", () => {
    renderWithProviders(
      <ProgressBar
        currentTime={0}
        duration={0}
        disabled={true}
        seekTo={jest.fn()}
      />,
    );

    expect(screen.getAllByText("--:--")).toHaveLength(2);
    expect(screen).toMatchComponentSnapshot();
  });

  it("renders with progress", () => {
    renderWithProviders(
      <ProgressBar
        currentTime={32}
        duration={225}
        disabled={false}
        seekTo={jest.fn()}
      />,
    );

    expect(screen.getByText("0:32")).toBeOnTheScreen();
    expect(screen.getByText("3:45")).toBeOnTheScreen();
    expect(screen).toMatchComponentSnapshot();
  });
});
