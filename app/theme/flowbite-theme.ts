import { CustomFlowbiteTheme } from "flowbite-react/types";

export const customTheme: CustomFlowbiteTheme = {
  button: {
    size: {
      xs: "px-2 py-1 text-xl",
      sm: "px-3 py-1.5 text-xl",
      md: "px-4 py-2 text-xl",
      lg: "px-5 py-2.5 text-xl",
      xl: "px-6 py-3 text-xl",
    },
    color: {
      brown: "bg-[#69443c] text-white hover:opacity-80",
    },
    outlineColor: {
      brown: "outline outline-foreground text-foreground hover:opacity-80",
    }
  },
  modal: {
    root: {
      base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full [&>div]:p-0 md:[&>div]:p-4",
    },
    content: {
      inner: "min-h-screen md:min-h-auto relative flex md:max-h-[90dvh] flex-col rounded-[0] md:rounded-lg bg-white shadow"
    }
  }
};
