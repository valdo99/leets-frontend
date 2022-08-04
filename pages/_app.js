import { Provider } from "jotai";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import AuthProvider from "providers/AuthProvider";
import AuthGuard from "guards/AuthGuard";
import { ToastContainer } from "react-toastify";
import "@utils/i18n";

import "react-toastify/dist/ReactToastify.min.css";

const myDarkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      // brand colors
      background: "#1d1d1d",
      // "purple"
      purple1: "#fefcfe",
      purple2: "#fdfaff",
      purple3: "#f9f1fe",
      purple4: "#f3e7fc",
      purple5: "#eddbf9",
      purple6: "#e3ccf4",
      purple7: "#d3b4ed",
      purple8: "#be93e4",
      purple9: "#8e4ec6",
      purple10: "#8445bc",
      purple11: "#793aaf",
      purple12: "#2b0e44",

      // "yellow"
      yellowA1: "#abab05",
      yellowA2: "#ffdd02",
      yellowA3: "#ffea01",
      yellowA4: "#ffe601",
      yellowA5: "#fcdb00",
      yellowA6: "#f2c900",
      yellowA7: "#e3b200",
      yellowA8: "#ebbc00",
      yellowA9: "#f5d800",
      yellowA10: "#f7ce00",
      yellowA11: "#926600",
      yellowA12: "#291c00",

      primaryLight: "$purple5",
      primaryLightHover: "$purple6", // commonly used on hover state
      primaryLightActive: "$purple7", // commonly used on pressed state
      primaryLightContrast: "$purple9", // commonly used for text inside the component
      primary: "$purple9",
      primaryBorder: "$purple9",
      primaryBorderHover: "$purple10",
      primarySolidHover: "$purple11",
      primarySolidContrast: "$white", // commonly used for text inside the component
      primaryShadow: "$purple8",

      secondaryLight: "$yellowA4",
      secondaryLightHover: "$yellowA5", // commonly used on hover state
      secondaryLightActive: "$yellowA6", // commonly used on pressed state
      secondaryLightContrast: "$yellowA8", // commonly used for text inside the component
      secondary: "$yellowA8",
      secondaryBorder: "$yellowA8",
      secondaryBorderHover: "$yellowA9",
      secondarySolidHover: "$yellowA10",
      secondarySolidContrast: "$black", // commonly used for text inside the component
      secondaryShadow: "$yellowA7",
    },
    space: {},
    fonts: {},
    zIndices: {
      1: "100",
      2: "200",
      3: "300",
      4: "400",
      5: "500",
      10: "1000",
      max: "9998",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer
        position="top-right"
        closeOnClick
        pauseOnHover
        autoClose={5000}
        toastStyle={{
          zIndex: 9999,
          position: "relative",
        }}
      />
      <Provider>
        <NextUIProvider theme={myDarkTheme}>
          <AuthProvider>
            <AuthGuard auth={Component.auth}>
              <Component {...pageProps} />
            </AuthGuard>
          </AuthProvider>
        </NextUIProvider>
      </Provider>
    </>
  );
}

export default MyApp;
