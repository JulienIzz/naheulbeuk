import "react-native-gesture-handler/jestSetup";

import { setUpTests } from "react-native-reanimated";

setUpTests();

jest.mock("@expo/vector-icons/MaterialIcons", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Text } = require("react-native");
  const MaterialIcons = (props: Record<string, unknown>) =>
    React.createElement(Text, null, props.name);
  MaterialIcons.displayName = "MaterialIcons";
  return { __esModule: true, default: MaterialIcons };
});
