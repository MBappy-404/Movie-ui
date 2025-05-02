import UserProvider from "@/components/context/UserContext";
import { ReactNode } from "react";
import StoreProvider from "./StoreProvider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <StoreProvider>{children}</StoreProvider>
    </UserProvider>
  );
};
