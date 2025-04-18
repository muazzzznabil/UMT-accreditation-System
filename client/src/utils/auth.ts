import Cookies from "js-cookie";

export const setToken = (token: string) => {
  Cookies.set("accessToken", token, { secure: true, sameSite: "Strict" });
};

export const getToken = (): string | null => {
  return Cookies.get("accessToken") || null;
};

export const removeToken = () => {
  Cookies.remove("accessToken");
};

export const isLoggedIn = (): boolean => {
  const token = getToken();
  if (!token) return false;


  const payload = JSON.parse(atob(token.split(".")[1]));
  const isExpired = payload.exp * 1000 < Date.now();
  return !isExpired;
};
