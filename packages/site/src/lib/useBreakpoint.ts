import { useMediaQuery } from "react-responsive";

const getBreakpointSize = (screen: string) => {
  getComputedStyle(document.documentElement).getPropertyValue(
    `--breakpoint-${screen}`,
  );
};

const screens = {
  sm: getBreakpointSize("sm"),
  md: getBreakpointSize("md"),
  lg: getBreakpointSize("lg"),
  xl: getBreakpointSize("xl"),
  "2xl": getBreakpointSize("2xl"),
};

const breakpoints: Record<string, string> = screens as any;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
