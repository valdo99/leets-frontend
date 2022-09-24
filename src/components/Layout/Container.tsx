import classNames from "classnames";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={classNames("max-w-6xl mx-auto px-4 sm:px-6", className)}>
      {children}
    </div>
  );
};
