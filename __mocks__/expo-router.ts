export const usePathname = jest.fn();
export const useRouter = jest.fn(() => ({ push: jest.fn() }));
export const useLocalSearchParams = jest.fn(() => ({}));
export const Stack = ({ children }: { children?: React.ReactNode }) =>
  children ?? null;

import React from "react";
