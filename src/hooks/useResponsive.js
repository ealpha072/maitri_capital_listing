import { useState, useEffect } from "react";

/*
Delay calculation by 120ms. 
Instead of React re-rendering every component that uses useResponsive on every single pixel of window resize, 
it waits until the user has stopped resizing for 120ms before doing anything.
*/

const BREAKPOINTS = { mobile: 640, tablet: 1024 };

export const useResponsive = () => {
  const getState = () => ({
    isMobile: window.innerWidth < BREAKPOINTS.mobile,
    isTablet: window.innerWidth < BREAKPOINTS.tablet,
    W: Window.innerWidth
  });

  const [ state, setState ] = useState(
    typeof window != "undefined" ? getState() : {isMobile: false, isTablet: false, w: 1200 }
  );

  useEffect (() => {
    let timer;
    const handler = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setState(getState()), 120);
    };

    window.addEventListener("resize", handler);
    return () => { window.removeEventListener("resize", handler); clearTimeout(timer); };
  }, []);

  return state;
};

/*
export const useResponsive = () => {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return { isMobile: w < 640, isTablet: w < 1024, w };
};
*/