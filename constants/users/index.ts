import { ROLES } from "../auth";

export interface User {
  email: string;
  role: ROLES;
  displayName: string;
}
