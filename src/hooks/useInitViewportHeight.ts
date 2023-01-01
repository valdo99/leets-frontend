import { useEffect } from "react";

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/#aa-css-custom-properties-the-trick-to-correct-sizing
export const useInitViewportHeight = () => {
  useEffect(() => {
    const getViewportHeight = () => {
      // Get the viewport height and we multiple it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", getViewportHeight);

    getViewportHeight();

    return () => window.removeEventListener("resize", getViewportHeight);
  }, []);
};
