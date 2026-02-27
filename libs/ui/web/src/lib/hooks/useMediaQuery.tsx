import { useMedia } from "react-use";

export const useMediaQuery = (type: "max" | "min", width: number) => {
  return useMedia(`(${type}-width: ${type === "max" ? width - 1 : width}px)`, false);
};
