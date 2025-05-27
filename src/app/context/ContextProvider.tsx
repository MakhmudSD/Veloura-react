import { GlobalContext } from "../hooks/useGlobals";
import { ReactNode, useEffect, useState } from "react";
import { Member } from "../lib/types/member";
import Cookies from "universal-cookie";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const parseMemberData = (): Member | null => {
    try {
      const data = localStorage.getItem("memberData");
      if (!data || data === "undefined") return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  const [authMember, setAuthMember] = useState<Member | null>(parseMemberData);
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());

  useEffect(() => {
    const cookies = new Cookies();

    if (!cookies.get("accessToken")) {
      localStorage.removeItem("memberData");
      setAuthMember(null);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
