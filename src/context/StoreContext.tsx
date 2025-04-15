import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface StoreContextType {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

// Provide a default context value as undefined
export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

function StoreContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  console.log("token", token);

  // logout functionality
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const contextValue = {
    setToken,
    logOut,
    token,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
