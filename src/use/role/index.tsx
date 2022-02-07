import { createContext, useContext, useEffect, useState } from "react";

import { ROLES } from "../../../constants/auth";
import getRole from "../../api/roles/get";
import { auth } from "../../lib/firebase";

const RoleContext = createContext<ROLES | null | undefined>(ROLES.NONE);

export const RoleProvider: React.FC = ({ children }) => {
  const [role, setRole] = useState<ROLES | null | undefined>();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setRole((await getRole(await user?.getIdToken()))?.role as ROLES);
      } else setRole(user);
    });
    return () => {
      unsubscribe();
    };
  }, [setRole]);
  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
};

export const useRole = () => {
  return useContext(RoleContext);
};

export default useRole;
