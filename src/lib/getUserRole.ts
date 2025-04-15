import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

export const getUserRole = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role || null;
  } catch {
    return null;
  }
};
