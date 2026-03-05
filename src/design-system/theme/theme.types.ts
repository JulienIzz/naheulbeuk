import "@emotion/react";

import type { AppTheme } from "#design-system/theme/theme";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Theme extends AppTheme {}
}
