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
};
