import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import useCategoriesProduct from "../hooks/useCategoriesProduct";
import { toast } from "sonner";

export interface StoreContextType {
  setToken: React.Dispatch<React.SetStateAction<string>>;
  logOut: () => void;
  token: string;
  addToCart: (itemId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  getTotalCartQuantity: () => number;
  getTotalCartAmount: () => number;
  cartItems: { [key: string]: number };
}

// Provide a default context value as undefined
export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);

function StoreContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>("");
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();
  const { products } = useCategoriesProduct();

  // add to cart functionality
  const addToCart = async (itemId: string): Promise<void> => {
    if (!token) {
      navigate("/login");
      toast.warning("You must be logged in to add items to your cart.");
      return;
    }

    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    await axiosInstance.post("/cart/add", { itemId }, { headers: { token } });
  };

  // remove from cart
  const removeFromCart = async (itemId: string): Promise<void> => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axiosInstance.post(
        "/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // get total cart amount
  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // get total cart quantity
  const getTotalCartQuantity = (): number => {
    let totalQuantity = 0;
    for (const item in cartItems) {
      totalQuantity += cartItems[item];
    }
    return totalQuantity;
  };

  // cart load data
  const loadCartData = async (token: string): Promise<void> => {
    const response = await axiosInstance.post(
      "/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response?.data?.cartData);
  };

  // logout functionality
  const logOut = (): void => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/");
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue: StoreContextType = {
    setToken,
    logOut,
    token,
    addToCart,
    removeFromCart,
    getTotalCartQuantity,
    getTotalCartAmount,
    cartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
