import { CustomFlowbiteTheme } from "flowbite-react/types";

export const customTheme: CustomFlowbiteTheme = {
  button: {
    base: "relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 font-bold cursor-pointer",
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
