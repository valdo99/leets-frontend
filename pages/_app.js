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
      white: "#fff",

      // brand colors
      background: "#050e1d",
      // "green"
      green1: "#D6FDDA",
      green2: "#AEFBBD",
      green3: "#83F3A4",
      green4: "#62E897",
      green5: "#33D985",
      green6: "#25BA7D",
      green7: "#199C74",
      green8: "#107D67",
      green9: "#09685E",

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

      primaryLight: "$green5",
      primaryLightHover: "$green6", // commonly used on hover state
      primaryLightActive: "$green7", // commonly used on pressed state
      primaryLightContrast: "$green9", // commonly used for text inside the component
      primary: "$green9",
      primaryBorder: "$green9",
      primaryBorderHover: "$green10",
      primarySolidHover: "$green11",
      primarySolidContrast: "$white", // commonly used for text inside the component
      primaryShadow: "$green8",

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
