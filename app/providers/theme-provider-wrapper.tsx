'use client';

import { ThemeProvider } from "flowbite-react";
import { customTheme } from "../theme/flowbite-theme";
import { type ReactNode } from "react";

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={customTheme}>
      {children}
    </ThemeProvider>
  );
}
