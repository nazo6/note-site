import { getEnv } from "waku/server";

type Env =
  | {
      ANALYTICS_ENABLED: true;
      BASE_URL: string;
      DEV: boolean;
      PRIVATE: boolean;
      GA_MEASUREMENT_ID: string;
    }
  | {
      ANALYTICS_ENABLED: false;
      BASE_URL: string;
      DEV: boolean;
      PRIVATE: boolean;
    };

const e = (name: string): string => {
  const value = getEnv(name);
  if (value === undefined) {
    throw new Error(`${name} is not defined`);
  }
  return value;
};

const load = (): Env => {
  const BASE_URL = e("BASE_URL");
  // @ts-ignore
  const DEV = import.meta.env.DEV as boolean;
  const PRIVATE = getEnv("MODE") === "private";
  const ANALYTICS_ENABLED = getEnv("ANALYTICS_ENABLED")
    ? getEnv("ANALYTICS_ENABLED") === "true"
    : !PRIVATE;

  if (ANALYTICS_ENABLED) {
    return {
      ANALYTICS_ENABLED,
      BASE_URL,
      DEV,
      PRIVATE,
      GA_MEASUREMENT_ID: e("GA_MEASUREMENT_ID"),
    };
  }

  return {
    ANALYTICS_ENABLED,
    BASE_URL,
    DEV,
    PRIVATE,
  };
};

const env = load();

export { env };
