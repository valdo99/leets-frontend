import React, { ReactNode } from "react";
import classNames from "classnames";

const Container = ({ children, className }) => {
  return (
    <div className={classNames("max-w-6xl mx-auto px-4 sm:px-6", className)}>
      {children}
    </div>
  );
};

export default Container;
