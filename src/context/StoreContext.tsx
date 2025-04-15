import { createContext, ReactNode, useState } from "react";

export interface StoreContextType {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

// Provide a default context value as undefined
export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

function StoreContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>("");

  console.log("token", token);

  const contextValue = {
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
