"use client";

import { useEffect } from "react";

export const ClearUrlParams = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.search) {
      url.search = "";
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return null;
};
