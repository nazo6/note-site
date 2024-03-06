"use client";

import { useEffect } from "react";
import nprogress from "nprogress";
import { useLocation } from "waku/router/client";

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

function Progress() {
  const url = useLocation();

  useEffect(() => {
    const pushState = history.pushState;

    history.pushState = function () {
      nprogress.start();
      // biome-ignore lint/style/noArguments: a
      return pushState.apply(this, arguments as any);
    };

    const replaceState = history.replaceState;
    history.replaceState = function () {
      nprogress.start();
      // biome-ignore lint/style/noArguments: a
      return replaceState.apply(this, arguments as any);
    };

    return () => {
      history.pushState = pushState;
      history.replaceState = replaceState;
    };
  }, []);

  useEffect(() => {
    nprogress.done();
  }, [url]);

  return null;
}

export default function RootLayoutClient() {
  return (
    <>
      <Progress />
    </>
  );
}
