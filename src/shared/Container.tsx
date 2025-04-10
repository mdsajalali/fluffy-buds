import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[1500px] mx-auto px-4 lg:px-0">{children}</div>;
};

export default Container;
