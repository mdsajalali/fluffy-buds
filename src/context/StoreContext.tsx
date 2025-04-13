import { createContext, ReactNode } from "react";

export const StoreContext = createContext(null);

function StoreContextProvider({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default StoreContextProvider;
